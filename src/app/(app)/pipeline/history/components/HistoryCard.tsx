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
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  Timer,
  User,
  AlertTriangle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate, getDuration } from "@/lib/utils";
import { getStatusIcon } from "../../components/stepUtils";

interface HistoryCardProps {
  history: Job;
}

export function HistoryCard({ history }: HistoryCardProps) {
  const getStatusColor = (
    status: string
  ): "default" | "destructive" | "outline" | "secondary" | "success" => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "running":
        return "default";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <TooltipProvider>
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge
              variant={getStatusColor(history.status)}
              className="flex items-center gap-1"
            >
              {getStatusIcon(history.status)}
              {history.status}
            </Badge>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {history.runBy}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Executed by</TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-base mt-2">Action #{history.ID}</CardTitle>
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
            {history.ended_at && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3 w-3" />
                Ended: {formatDate(history.ended_at || "")}
              </div>
            )}
          </div>

          {history.result && (
            <div className="text-sm mt-2">
              <strong>Result:</strong> {history.result}
            </div>
          )}

          {history.result && (
            <div className="text-sm text-destructive flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>{history.result}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
