"use client";

import { Activity, Cpu, Download, Upload } from "lucide-react";
import { StatCard } from "./StatCard";
import { PerformanceChart } from "./PerformanceChart";
import { StorageView } from "./StorageView";

export function NasMonitoringDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Cpu} title="CPU Usage" value={42} unit="%" />
        <StatCard icon={Activity} title="System Load" value={1.25} unit="avg" />
        <StatCard icon={Download} title="Network In" value={125} unit="MB/s" />
        <StatCard icon={Upload} title="Network Out" value={45} unit="MB/s" />
      </div>

      <div className="w-full flex flex-col gap-4">
        <StorageView />
        <PerformanceChart />
      </div>
    </div>
  );
}
