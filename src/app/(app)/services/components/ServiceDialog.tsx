import { Service } from "@/types/api/Service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Activity,
  Globe,
  Lock,
  Settings,
  ExternalLink,
  ChevronRight,
  Power,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ServiceImage } from "./ServiceImage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";

interface ServiceDialogProps {
  service: Service;
}

export function ServiceDialog({ service }: ServiceDialogProps) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <ServiceImage
                src={service.logo_url || "/not_found.svg"}
                alt={service.name}
                size="large"
                className="rounded-lg"
              />
            </div>
            <div>
              <DialogTitle className="text-xl">{service.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {service.namespace}
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Status Section */}
            <div className="flex items-center justify-between">
              <Badge variant={statusColor as any} className="text-sm px-3 py-1">
                {service.status.toUpperCase()}
              </Badge>
              {service.observability && (
                <Badge
                  variant={uptimeColor as any}
                  className="text-sm px-3 py-1"
                >
                  <Activity className="h-4 w-4 mr-1" />
                  {service.observability.uptime_percent}% uptime
                </Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>

            <Separator />

            {/* Quick Actions */}
            <div>
              <h3 className="font-medium mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {service.api_info.base_url && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open(service.api_info.base_url, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Service
                  </Button>
                )}
                {service.api_info.openapi_url && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open(service.api_info.openapi_url, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    API Docs
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" className="w-full">
                  <Power className="h-4 w-4 mr-2" />
                  Restart
                </Button>
              </div>
            </div>

            <Separator />

            {/* Service Info */}
            <div>
              <h3 className="font-medium mb-3">Service Information</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Endpoint
                  </div>
                  <code className="bg-muted px-2 py-1 rounded">
                    {service.ip}:{service.port}
                  </code>
                </div>
                {service.security?.auth_required && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Authentication
                    </div>
                    <Badge variant="outline">Required</Badge>
                  </div>
                )}
                {service.tags && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tags</span>
                    <div className="flex gap-1">
                      {service.tags.split(",").map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div>
              <h3 className="font-medium mb-3">Timeline</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Created
                  </div>
                  <span>{formatDate(service.CreatedAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Last Updated
                  </div>
                  <span>{formatDate(service.UpdatedAt)}</span>
                </div>
                {service.observability?.deployed_at && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      Deployed
                    </div>
                    <span>{formatDate(service.observability.deployed_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
