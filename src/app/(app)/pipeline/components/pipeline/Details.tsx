import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Info, ListChecks, ChevronDown, Settings } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PipelineTemplate } from "@/types/api/pipeline";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CreateJobButton } from "../../actions/jobButton";
import { DialogDescription } from "@radix-ui/react-dialog";

interface PipelineDetailsProps {
  pipeline: PipelineTemplate;
}

export function PipelineDetails({ pipeline }: PipelineDetailsProps) {
  return (
    <DialogContent
      className="max-w-3xl max-h-[85vh] flex flex-col"
      aria-describedby={undefined}
    >
      <DialogHeader className="pb-4">
        <DialogTitle className="flex items-center gap-2 text-xl">
          <Info className="h-5 w-5 text-indigo-dye" />
          <span className="text-indigo-dye">{pipeline.name}</span>
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-6 py-2">
        {pipeline.description && (
          <div className="bg-indigo-dye/5 dark:bg-indigo-dye/10 rounded-lg p-4">
            <p className="text-sm text-indigo-dye dark:text-indigo-dye/90">
              {pipeline.description}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-indigo-dye" />
            <h3 className="text-lg font-semibold text-indigo-dye">
              Pipeline Steps
            </h3>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {pipeline.steps.map((step, index) => (
                <Collapsible key={String(step.ID)}>
                  <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-indigo-dye/5 transition-all hover:shadow-md">
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-indigo-dye/80">
                              Step {index + 1}
                            </span>
                            <Badge
                              variant="outline"
                              className="bg-indigo-dye/5 text-indigo-dye border-indigo-dye/20"
                            >
                              {step.type}
                            </Badge>
                          </div>
                          <h4 className="text-base font-semibold text-indigo-dye">
                            {step.name}
                          </h4>
                          {step.description && (
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          )}
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Toggle config</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>

                      <CollapsibleContent>
                        {step.config && (
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Settings className="h-4 w-4" />
                              <span>Configuration</span>
                            </div>
                            <pre className="text-xs bg-muted/50 p-3 rounded-lg overflow-auto max-h-[200px]">
                              {JSON.stringify(
                                JSON.parse(step.config || "{}"),
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        )}
                      </CollapsibleContent>
                    </div>
                  </div>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Pipeline ID: <span className="font-mono">{pipeline.ID}</span>
          </p>
          <CreateJobButton
            pipelineId={pipeline.ID.toString()}
            className="gap-2 bg-indigo-dye hover:bg-indigo-dye/90 text-white"
            // disabled={pipeline.running_jobs.length > 0}
            disabled={false}
          >
            Run Pipeline
          </CreateJobButton>
        </div>
      </div>
    </DialogContent>
  );
}
