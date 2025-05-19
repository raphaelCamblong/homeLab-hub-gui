import React from "react";
import { PipelineTemplate } from "@/types/api/pipeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PipelineDetails } from "./Details";
import { cn } from "@/lib/utils";
import { getStatusColor } from "../stepUtils";

interface PipelineCardProps {
  pipeline: PipelineTemplate;
}

export function PipelineCard({ pipeline }: PipelineCardProps) {
  return (
    <TooltipProvider>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all hover:shadow-lg",
          "bg-gradient-to-br from-white to-indigo-dye/5 dark:from-indigo-dye/10 dark:to-indigo-dye/20"
        )}
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-10",
            getStatusColor(pipeline.running_jobs?.[0]?.status)
          )}
        />

        <Dialog>
          <DialogTrigger className="w-full text-left">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold text-indigo-dye dark:text-white">
                    {pipeline.name}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-indigo-dye dark:text-indigo-dye/80">
                    <ListChecks className="h-4 w-4" />
                    <span className="font-medium">
                      {pipeline.steps?.length || 0} steps
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {pipeline.running_jobs?.[0]?.status && (
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium text-white",
                          getStatusColor(pipeline.running_jobs[0].status)
                        )}
                      >
                        {pipeline.running_jobs[0].status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </DialogTrigger>
          <PipelineDetails pipeline={pipeline} />
        </Dialog>
      </Card>
    </TooltipProvider>
  );
}
