"use client";

import React from "react";
import { Service } from "@/types/api/Service";
import { ServiceDialog } from "./ServiceDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Activity, Globe, Lock, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceActions } from "./ServiceActions";
import { ServiceImage } from "./ServiceImage";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const isRunning = service.status === "active";

  const statusColor =
    {
      active: "success",
      inactive: "secondary",
      error: "destructive",
    }[service.status.toLowerCase()] || "default";

  const uptimeColor =
    service.observability?.uptime_percent >= 99
      ? "success"
      : service.observability?.uptime_percent >= 95
        ? "destructive"
        : "default";

  return (
    <Card className="group relative flex flex-col h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 hover:-translate-y-1 overflow:hidden">
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg transition-colors ${
          isRunning ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {service.logo_url ? (
              <div className="relative h-8 w-8">
                <ServiceImage
                  src={service.logo_url}
                  alt={service.name}
                  className="rounded"
                  size="small"
                />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                <Settings className="h-4 w-4" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <CardDescription className="text-sm">
                {service.namespace}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {service.tags && (
              <div className="max-w-[200px] overflow-x-auto scrollbar-none">
                <div className="flex gap-1 px-1">
                  {service.tags.split(",").map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs whitespace-nowrap"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <ServiceActions service={service} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between gap-4 pt-4">
        <div className="relative group/image flex justify-center">
          <div className="relative w-[150px] h-[150px] transition-transform group-hover/image:scale-105">
            <ServiceImage
              src={service.logo_url || "/not_found.svg"}
              alt={service.name}
              size="large"
            />
          </div>
        </div>

        <div className="space-y-4">
          {service.observability.last_checked_at && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="h-4 w-4" />
              <span>
                Last updated: {new Date(service.UpdatedAt).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Badge variant={statusColor as any}>{service.status}</Badge>
            {service.observability && (
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <Badge variant={uptimeColor as any}>
                  {service.observability.uptime_percent}% uptime
                </Badge>
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {service.description}
          </div>
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-2 px-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 whitespace-nowrap"
                    >
                      <Globe className="h-3 w-3" />
                      {service.ip}:{service.port}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Service endpoint</TooltipContent>
                </Tooltip>
                {service.security?.auth_required && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 whitespace-nowrap"
                      >
                        <Lock className="h-3 w-3" />
                        Auth required
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Authentication required</TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 whitespace-nowrap"
                    >
                      <Clock className="h-3 w-3" />
                      {new Date(
                        service.observability?.deployed_at
                      ).toLocaleDateString()}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Deployment date</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <ServiceDialog service={service} />
        </div>
      </CardContent>
    </Card>
  );
};
