"use client";

import { Server, Cpu, MemoryStick, HardDrive, AlertCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface NodeHealth {
  name: string;
  status: "Ready" | "NotReady" | "Unknown";
  role: "master" | "worker";
  version: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
  };
  conditions: {
    type: string;
    status: boolean;
    message?: string;
  }[];
}

export function NodeCard({ node }: { node: NodeHealth }) {
  const isHealthy = node.status === "Ready";

  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">{node.name}</h3>
              <CardDescription>{node.version}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={node.role === "master" ? "default" : "secondary"}>
              {node.role}
            </Badge>
            <Badge variant={isHealthy ? "success" : "destructive"}>
              {node.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Resource Usage Metrics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span>CPU</span>
              </div>
              <span>{node.metrics.cpu}%</span>
            </div>
            <Progress value={node.metrics.cpu} className="h-1" />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4" />
                <span>Memory</span>
              </div>
              <span>{node.metrics.memory}%</span>
            </div>
            <Progress value={node.metrics.memory} className="h-1" />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                <span>Disk</span>
              </div>
              <span>{node.metrics.disk}%</span>
            </div>
            <Progress value={node.metrics.disk} className="h-1" />
          </div>

          {/* Conditions */}
          <div className="space-y-1">
            {node.conditions
              .filter((c) => c.status)
              .map((condition) => (
                <div
                  key={condition.type}
                  className="flex items-center gap-2 text-sm text-yellow-500 dark:text-yellow-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>{condition.type}</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
