"use client";

import { Job } from "@/types/api/pipeline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, User, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate, getDuration } from "@/lib/utils";
import {
  getStatusColor,
  getStatusColorBgGradient,
  getStatusIcon,
} from "../../components/stepUtils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { JobDetails } from "../../components/job/Details";
import { cn } from "@/lib/utils";
import { DrawerTitle } from "@/components/ui/drawer";

interface HistoryCardProps {
  history: Job;
}

export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <TooltipProvider>
      <Drawer>
        <DrawerTrigger asChild>
          <Card
            className={cn(
              "transition-all duration-300 hover:shadow-md relative overflow-hidden bg-gradient-to-br",
              getStatusColorBgGradient(history.status)
            )}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(history.status)}
                    <h3 className="text-base">Action #{history.pipeline.ID}</h3>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <User className="h-3 w-3" />
                        {history.runBy}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Executed by</TooltipContent>
                  </Tooltip>
                </div>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Duration: {getDuration(history.started_at, history.ended_at)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Started: {formatDate(history.started_at || "")}
                </div>
              </div>

              {history.pipeline && (
                <div className="text-sm flex items-start gap-2">
                  <Info className="h-4 w-4" />
                  <p className="text-muted-foreground text-xs">
                    {history.pipeline.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Job Details #{history.ID}</DrawerTitle>
          <JobDetails job={history} />
        </DrawerContent>
      </Drawer>
    </TooltipProvider>
  );
}
