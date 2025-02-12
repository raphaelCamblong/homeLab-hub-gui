"use client";
import { Service } from "@/types/api/Service";
import { ServiceGrid } from "./ServiceGrid";
import { ServiceFilters } from "./ServiceFilters";
import { useState, useMemo } from "react";

interface FilteredServiceListProps {
    services: Service[];
}

export const FilteredServiceList: React.FC<FilteredServiceListProps> = ({ services }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredServices = useMemo(() => {
        return services.filter((service) => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || service.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [services, searchTerm, statusFilter]);

    return (
        <div>
            <ServiceFilters
                onSearchChange={setSearchTerm}
                onStatusChange={setStatusFilter}
            />
            <ServiceGrid services={filteredServices} />
        </div>
    );
}; 