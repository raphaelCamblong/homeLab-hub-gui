"use client";

import * as React from "react";
import { Cpu } from "lucide-react";
import { useHost } from "@/services/backend/hooks/useHost";
import { Loader } from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";

function Hosts() {
  const { data: host, isLoading } = useHost();

  return (
    <div className="flex flex-col w-full gap-2">
      {isLoading && <Loader />}
      <h1>XCPng Host - Hypervisor</h1>
      <Separator className={"w-full h-0.5 bg-black rounded"} />
      <div className="flex items-center">
        <Cpu />
        <span className="ml-2">x {host?.cpus.cores}</span>
      </div>
      <div className="flex items-center">
        <h3>Socket:</h3>
        <div className="flex items-center">
          <Cpu />
          <span className="ml-2">x {host?.cpus.cores ?? 1 / 2}</span>
        </div>
        <div className="flex items-center">
          <Cpu />
          <span className="ml-2">x {host?.cpus.cores ?? 1 / 2}</span>
        </div>
      </div>
      <div className="flex items-center">
        <h3>Vms:</h3>
        <span className="ml-2">x {host?.residentVms?.length ?? "unknown"}</span>
      </div>
    </div>
  );
}

export default Hosts;
