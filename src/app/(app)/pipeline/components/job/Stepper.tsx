"use client";
import { formatDate, getDuration } from "@/lib/utils";
import { Step, Status } from "@/types/api/pipeline";
import { getStatusIcon, getStatusColor } from "../stepUtils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Utility functions for step styling
const getStepStyles = (status: Status) => {
  const baseStyles = "transition-all duration-300";

  switch (status) {
    case Status.Running:
      return cn(baseStyles, "bg-indigo-dye/5 border-indigo-dye");
    case Status.Completed:
    case Status.Success:
      return cn(baseStyles, "bg-green-pastel/5 border-green-pastel");
    case Status.Failed:
      return cn(baseStyles, "bg-red-pastel/5 border-red-pastel");
    default:
      return cn(baseStyles, "bg-muted border-muted-foreground/20");
  }
};

interface NodePosition {
  x: number;
  y: number;
}

interface StepNodeProps {
  step: Step;
  position: NodePosition;
}

function StepNode({ step, position }: StepNodeProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          style={{ left: position.x, top: position.y }}
          className={cn(
            "absolute z-10",
            "transition-all duration-300 cursor-pointer"
          )}
        >
          <Card
            className={cn(
              "w-44 p-3 border-2 bg-background/80 backdrop-blur-md",
              getStepStyles(step.status),
              "hover:scale-105 hover:shadow-lg"
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getStatusIcon(step.status)}</span>
                <span className="font-medium text-sm truncate">
                  {step.step_template?.name} {step.executionOrder}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {step.started_at && step.ended_at
                  ? getDuration(step.started_at, step.ended_at)
                  : "Not available"}
              </p>
              <Badge
                variant="outline"
                className={cn("text-xs", getStatusColor(step.status))}
              >
                {step.status}
              </Badge>
            </div>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{step.step_template?.name}</span>
            <Badge variant="outline" className={getStatusColor(step.status)}>
              {getStatusIcon(step.status)}
              {step.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <StepDetails step={step} />
      </DialogContent>
    </Dialog>
  );
}

interface StepDetailsProps {
  step: Step;
}

function StepDetails({ step }: StepDetailsProps) {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{step.step_template?.name}</span>
            <Badge variant="outline" className={getStatusColor(step.status)}>
              {getStatusIcon(step.status)}
              {step.status}
            </Badge>
          </div>
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="space-y-4">
            {step.step_template?.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {step.step_template.description}
                </p>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Started At</h4>
                <p className="text-sm text-muted-foreground">
                  {step.started_at
                    ? formatDate(step.started_at)
                    : "Not started"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Ended At</h4>
                <p className="text-sm text-muted-foreground">
                  {step.ended_at ? formatDate(step.ended_at) : "Not ended"}
                </p>
              </div>
              <div className="space-y-2 col-span-2">
                <h4 className="text-sm font-medium">Duration</h4>
                <p className="text-sm text-muted-foreground">
                  {step.started_at
                    ? getDuration(step.started_at, step.ended_at)
                    : "Not available"}
                </p>
              </div>
            </div>

            {step.result && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Result</h4>
                  <div className="text-sm p-3 rounded-lg bg-muted">
                    {step.result}
                  </div>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="h-[400px] bg-muted rounded-lg p-4 font-mono text-sm">
            {step.log ? (
              <pre className="whitespace-pre-wrap">{step.log}</pre>
            ) : (
              <p className="text-muted-foreground">No logs available</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Step Template</h4>
              <div className="p-3 rounded-lg bg-muted">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(step.step_template, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}

// Calculate node positions in a more compact layout
const calculateNodePositions = (steps: Step[]): NodePosition[] => {
  const positions: NodePosition[] = [];
  const nodeWidth = 176; // w-44 = 11rem = 176px
  const nodeHeight = 100; // Approximate height
  const horizontalGap = 48;
  const verticalGap = 32;
  const maxNodesPerRow = 4;

  steps.forEach((_, index) => {
    const row = Math.floor(index / maxNodesPerRow);
    const col = index % maxNodesPerRow;

    positions.push({
      x: col * (nodeWidth + horizontalGap),
      y: row * (nodeHeight + verticalGap),
    });
  });

  return positions;
};

interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  const nodePositions = useMemo(
    () => calculateNodePositions(steps),
    [steps.length]
  );

  return (
    <div className="relative bg-muted/50 rounded-xl p-4">
      <ScrollArea className="h-[400px] w-full">
        <div
          className="relative"
          style={{
            width: `${Math.max(...nodePositions.map((p) => p.x)) + 200}px`,
            height: `${Math.max(...nodePositions.map((p) => p.y)) + 120}px`,
          }}
        >
          {/* SVG connectors */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {steps.map((step, i) => {
              if (i === steps.length - 1) return null;
              const from = nodePositions[i];
              const to = nodePositions[i + 1];

              return (
                <g key={i}>
                  <path
                    d={`M${from.x + 176} ${from.y + 50} L${to.x} ${to.y + 50}`}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    className={cn(
                      "text-muted-foreground/50",
                      step.status === Status.Running &&
                        "text-indigo-dye animate-pulse",
                      step.status === Status.Completed && "text-green-pastel",
                      step.status === Status.Failed && "text-red-pastel"
                    )}
                  />
                  <ArrowRight
                    className={cn(
                      "absolute text-muted-foreground/50",
                      step.status === Status.Running &&
                        "text-indigo-dye animate-pulse",
                      step.status === Status.Completed && "text-green-pastel",
                      step.status === Status.Failed && "text-red-pastel"
                    )}
                    style={{
                      left: `${to.x - 12}px`,
                      top: `${to.y + 42}px`,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Step nodes */}
          {steps.map((step, i) => (
            <StepNode key={step.ID} step={step} position={nodePositions[i]} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
