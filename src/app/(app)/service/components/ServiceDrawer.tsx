"use client";
import React from "react";
import { Service } from "@/types/api/Service";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CircleDot,
  CircleDotDashed,
  Forward,
  ListPlus,
  Clock,
  Calendar,
  Tag,
  Info,
  Link as LinkIcon,
  Activity
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface ServiceDrawerProps {
  service: Service;
}

export const ServiceDrawer = ({ service }: ServiceDrawerProps) => {
  const router = useRouter();
  const isRunning = service.state === "running";
  const StatusIcon = isRunning ? CircleDot : CircleDotDashed;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <ListPlus className="mr-2 h-4 w-4" />
          Details
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {service.logo_path && (
                <img
                  src={service.logo_path}
                  alt={service.name}
                  className="w-8 h-8 rounded"
                />
              )}
              <span className="text-xl font-bold">{service.name}</span>
            </div>
            <Badge
              variant={isRunning ? "success" : "destructive"}
              className="flex items-center gap-1"
            >
              <StatusIcon className="w-3 h-3" />
              {isRunning ? "Running" : "Stopped"}
            </Badge>
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Description Section */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 mt-1 text-muted-foreground" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description || "No description available"}
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="w-full"
                onClick={() => router.push(service.url)}
              >
                <Forward className="mr-2 h-4 w-4" />
                Open GUI
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(service.url, '_blank')}
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Open in New Tab
              </Button>
            </div>
          </div>

          {/* Tags Section */}
          {service.tags && service.tags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tags?.split(',').map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Timestamps
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Created At</p>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {formatDate(service.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {formatDate(service.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
