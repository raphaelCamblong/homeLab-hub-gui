import React from "react";
import { motion } from "framer-motion";
import { Service } from "@/types/api/Service";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
    services: Service[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
    return (
        <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            layout
        >
            {services.map((service, index) => (
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
    );
}; 