import React from "react";
import { Service } from "@/types/api/Service";
import Image from "next/image";
import { ServiceDrawer } from "./ServiceDrawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MonitorCheck, MonitorStop, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const isRunning = service.state === "running";
  const StatusIcon = isRunning ? MonitorCheck : MonitorStop;

  return (
    <Card className="group relative flex flex-col h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 hover:-translate-y-1 overflow:hidden ">
      {/* Status Indicator Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg transition-colors ${isRunning ? 'bg-green-500' : 'bg-red-500'
          }`}
      />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <span>{service.name}</span>
            <HoverCard>
              <HoverCardTrigger>
                <StatusIcon
                  className={`h-5 w-5 transition-colors ${isRunning ? "text-green-500" : "text-red-500"
                    }`}
                  aria-label={isRunning ? "Running" : "Stopped"}
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-48">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">
                    {isRunning ? "Service Running" : "Service Stopped"}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {isRunning
                      ? "The service is operational and responding to requests"
                      : "The service is currently not running"
                    }
                  </span>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardTitle>
          <div className="flex gap-1">
            {service.tags?.split(',').map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between gap-4 pt-4">
        <div className="relative group/image flex justify-center">
          <div className="relative w-[150px] h-[150px] transition-transform group-hover/image:scale-105">
            <Image
              src={service.logo_path ?? "/not_found.svg"}
              fill
              alt={`${service.name} logo`}
              className="object-contain"
              priority
            />
          </div>
          {service.url && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 dark:bg-black/90 backdrop-blur-sm"
                onClick={() => window.open(service.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Service
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {service.lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date(service.lastUpdated).toLocaleDateString()}</span>
            </div>
          )}
          <ServiceDrawer service={service} />
        </div>
      </CardContent>
    </Card>
  );
};
