"use client";
import React from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { Separator } from "@/components/ui/separator";
import { useService } from "@/services/backend/hooks/useService";
import { Loader } from "lucide-react";
import { ServiceState } from "@/services/backend/types/Service";
import { Filter } from "@/lib/useFilters";
import { motion } from "framer-motion";

export interface ServiceFilterItems extends Filter {
  tags: string[];
  state: ServiceState[];
}

interface ServiceProps {}

const Service: React.FC<ServiceProps> = () => {
  const { data: services, isLoading } = useService();

  console.log("filteredServices", services);
  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h1 className="text-3xl">Service</h1>
      <Separator />
      {isLoading && <Loader />}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        layout
      >
        {services?.map((service, index) => (
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
