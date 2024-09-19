"use client";

import * as React from "react";
import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useVms } from "@/services/backend/hooks/useVms";
import { VM } from "@/services/backend/types";
import {
  Cable,
  Cpu,
  HardDrive,
  MemoryStick,
  Power,
  PowerOff,
} from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@radix-ui/react-checkbox";

const NodeCard: React.FC<{ vm: VM }> = ({ vm }) => {
  console.log(vm);

  const getInGb = (bytes: number) => {
    return Math.round(bytes / 1024 / 1024 / 1024);
  };
  return (
    <Card className="rounded-lg shadow-md">
      <CardContent className="grid sm:grid-cols-1 p-3">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="ml-2 text-lg font-semibold">{vm.name_label}</div>
            {vm.power_state === "Running" ? (
              <Power color="green" />
            ) : (
              <PowerOff color="red" />
            )}
            <Checkbox />
          </div>
          <div className="text-sm text-gray-500">
            {new Date(vm.creation.date).toLocaleString()}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <MemoryStick />
            <span className="ml-2">
              {Math.round(getInGb(vm.memory.dynamic[0]))} GB
            </span>
          </div>
          <div className="flex items-center">
            <HardDrive />
            <span className="ml-2">
              {getInGb(vm.memory.static[0])}/{getInGb(vm.memory.static[1])}GB
            </span>
          </div>
          <div className="flex items-center">
            <Cpu />
            <span className="ml-2">
              {vm.CPUs["number"]}/{vm.CPUs["max"]}
            </span>
          </div>
          <div className="flex items-center">
            <Cable />
            <span className="ml-2">{vm.mainIpAddress}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function CloudNode() {
  const { data: vms, isLoading, isError } = useVms();
  const [serverNode, setServerNode] = React.useState<VM[]>([]);
  const [agentNode, setAgentNode] = React.useState<VM[]>([]);
  const [otherNode, setotherNode] = React.useState<VM[]>([]);

  useEffect(() => {
    if (vms) {
      setServerNode(vms.filter((vm) => vm.name_label.startsWith("Server")));
      setAgentNode(vms.filter((vm) => vm.name_label.startsWith("Agent")));
      setotherNode(
        vms.filter(
          (vm) =>
            !vm.name_label.startsWith("Agent") &&
            !vm.name_label.startsWith("Server"),
        ),
      );
    }
  }, [vms]);

  return (
    <div className="flex flex-col w-full gap-2">
      {isLoading && <Loader />}
      {isError && <div>Failed to load VMs</div>}

      <h1>External Database & others</h1>
      <Separator className={"w-full h-0.5 bg-black rounded"} />
      <div className={"flex flex-row flex-wrap gap-4"}>
        {otherNode.map((vm) => (
          <NodeCard key={vm.id} vm={vm} />
        ))}
      </div>
      <h1>Server nodes</h1>
      <div className={"flex flex-row flex-wrap gap-4"}>
        {serverNode.map((vm) => (
          <NodeCard key={vm.id} vm={vm} />
        ))}
      </div>
      <Separator className={"w-full h-0.5 bg-black rounded"} />
      <h1>Agent nodes</h1>
      <div className={"flex flex-row flex-wrap gap-4"}>
        {agentNode.map((vm) => (
          <NodeCard key={vm.id} vm={vm} />
        ))}
      </div>
    </div>
  );
}

export default CloudNode;
