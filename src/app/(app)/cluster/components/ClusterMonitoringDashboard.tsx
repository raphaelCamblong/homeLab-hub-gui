'use client';

import { Server, Cpu, MemoryStick, Database, Network, Boxes } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from './StatCard';
import { ClusterOverview } from './ClusterOverview';
import { ResourceUsageChart } from './ResourceUsageChart';
import { WorkloadStatus } from './WorkloadStatus';

export function ClusterMonitoringDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Server}
                    title="Nodes Ready"
                    value="3/3"
                    unit="nodes"
                />
                <StatCard
                    icon={Boxes}
                    title="Pods Running"
                    value="24/26"
                    unit="pods"
                />
                <StatCard
                    icon={MemoryStick}
                    title="Memory Usage"
                    value={68}
                    unit="%"
                />
                <StatCard
                    icon={Cpu}
                    title="CPU Usage"
                    value={45}
                    unit="%"
                />
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="workloads">Workloads</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <ClusterOverview />
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                    <ResourceUsageChart />
                </TabsContent>

                <TabsContent value="workloads" className="space-y-4">
                    <WorkloadStatus />
                </TabsContent>
            </Tabs>
        </div>
    );
} 