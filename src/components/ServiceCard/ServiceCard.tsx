import React from "react";
import { Service } from "@/services/api/types/Service";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ServiceDrawer } from "@/components/ServiceDrawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

import { MonitorCheck, MonitorStop } from "lucide-react";
interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="flex flex-col flex-grow hover:translate-y-[-3px] shadow-lg">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          {service.name}
          {service.state === "running" ? (
            <MonitorCheck color="green" aria-label="Running" />
          ) : (
            <MonitorStop color="red" aria-label="Stopped" />
          )}
        </CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between gap-2">
        <div className="flex flex-col items-center">
          <div className="relative w-150 h-150">
            <Image
              src={service.logo_path ?? "/not_found.svg"}
              priority
              width={150}
              height={150}
              alt="logo"
              // className="object-contain"
              // onError={(e) => {
              //   e.currentTarget.src = "/not_found.svg";
              // }}
            />
          </div>
        </div>
        <div className="mt-auto flex justify-center">
          <ServiceDrawer service={service} />
        </div>
      </CardContent>
    </Card>
  );
};

export { ServiceCard };
