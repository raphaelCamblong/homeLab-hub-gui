import { Job } from "@/types/api/pipeline";
import { Card } from "@/components/ui/card";
import { Clock, StopCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getProgressPercentage } from "../stepUtils";
import { getDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JobDetails } from "./Details";
import { getStatusColor } from "../stepUtils";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const progress = getProgressPercentage(job.steps);
  return (
    <Drawer>
      <DrawerTrigger>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold truncate">
                  {job.pipeline.name}
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  className={getStatusColor(job.status)}
                />
              </div>

              {job.started_at && (
                <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {getDuration(job.started_at, job.ended_at)}
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              {job.status === "running" && (
                <Button variant="destructive" size="sm" className="gap-2">
                  <StopCircle className="h-4 w-4" />
                  Stop
                </Button>
              )}
            </div>
          </div>
        </Card>
      </DrawerTrigger>
      <JobDetails job={job} />
    </Drawer>
  );
}
