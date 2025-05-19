import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Info, Clock, StopCircle, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Job, Status, Step } from "@/types/api/pipeline";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn, formatDate, getDuration } from "@/lib/utils";
import { Stepper } from "./Stepper";
import { getProgressPercentage, getStatusColor } from "../stepUtils";
import { Card } from "@/components/ui/card";
import { pipelinesApi } from "@/lib/api/pipelines";
import { StopJobButton } from "../../actions/jobButton";

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  const progress = getProgressPercentage(job.steps);

  const currentStep =
    job.steps.find((step) => step.status === Status.Running) ||
    job.steps[job.steps.length - 1];

  return (
    <DrawerContent className="h-[85vh] max-h-[85vh]">
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        <DrawerHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <Info className="h-5 w-5 text-indigo-dye" />
              <span className="text-indigo-dye">
                {job.pipeline.name} {job.ID}
              </span>
            </DrawerTitle>
            <div className="flex items-center gap-4">
              <DrawerClose>
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        {/* Main content area - Split view */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left side - Job details */}
          <div className="w-full lg:w-1/3 border-r">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Overall Progress
                    </span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress
                    value={progress}
                    className={getStatusColor(job.status)}
                  />
                </div>

                {/* Pipeline description */}
                {job.pipeline.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Description</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        {job.pipeline.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Timing information */}
                {job.started_at && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Timing</h3>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground text-xs">
                            Started
                          </span>
                          <p className="font-medium leading-tight">
                            {formatDate(job.started_at)}
                          </p>
                        </div>
                      </div>
                      {job.ended_at && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <span className="text-muted-foreground text-xs">
                              Ended
                            </span>
                            <p className="font-medium leading-tight">
                              {formatDate(job.ended_at)}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground text-xs">
                            Duration
                          </span>
                          <p className="font-medium leading-tight">
                            {getDuration(job.started_at, job.ended_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep && (
                  <div className="px-6 py-4 border-b bg-muted/30">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Current Step</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">
                          {currentStep.step_template?.name}
                        </p>
                        {currentStep.step_template?.description && (
                          <p className="text-sm text-muted-foreground">
                            {currentStep.step_template.description}
                          </p>
                        )}
                      </div>
                    </Card>
                  </div>
                )}
                {/* actions */}
                <div className="p-6 border-t">
                  <div className="flex justify-end gap-2">
                    <StopJobButton
                      pipelineId={job.ID.toString()}
                      disabled={job.status !== Status.Running}
                    >
                      Stop Job
                    </StopJobButton>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Right side - Workflow visualization */}
          <div className="w-full lg:w-2/3">
            <ScrollArea className="h-full">
              <div className="p-6">
                <Stepper steps={job.steps} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </DrawerContent>
  );
}
