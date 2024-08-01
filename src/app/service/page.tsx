"use client";
import React, { use, useCallback, useMemo } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { Separator } from "@/components/ui/separator";
import { useService } from "@/services/api/hooks/useService";
import { Loader } from "lucide-react";
import { Services, ServiceState } from "@/services/api/types/Service";
import useFilters, { Filter } from "@/lib/useFilters";
import ServiceFilters from "./filters";
import { motion } from "framer-motion";

export interface ServiceFilterItems extends Filter {
  tags: string[];
  state: ServiceState[];
}

interface ServiceProps {
  name: string;
}

function getAllTags(services: Services): string[] {
  if (!services) {
    return [];
  }
  const tagsSet = new Set<string>();
  services.forEach((service) => {
    service.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });
  return Array.from(tagsSet);
}

const Service: React.FC<ServiceProps> = ({ name }) => {
  const { services, isError, isLoading } = useService();
  const [filters, setFilters, resetFilter] = useFilters<ServiceFilterItems>({
    tags: [],
    state: [ServiceState.Running, ServiceState.Stopped],
  });

  const allTags = useMemo(() => {
    return getAllTags(services as Services);
  }, [services]);

  const filteredServices = useMemo(() => {
    return services
      ?.filter(
        (service) => service.state && filters.state.includes(service.state)
      )
      .filter((service) => {
        return (
          filters.tags.length === 0 ||
          service.tags.some((tag) => filters.tags.includes(tag))
        );
      });
  }, [services, filters]);

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h1 className="font-ppneuemachina text-3xl">Service</h1>
      <ServiceFilters
        availableTags={allTags}
        filters={filters}
        setFilters={setFilters}
        resetFilter={resetFilter}
      />
      <Separator />
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        layout
      >
        {isLoading && <Loader />}
        {isError && <div>{isError}</div>}
        {filteredServices?.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Service;
