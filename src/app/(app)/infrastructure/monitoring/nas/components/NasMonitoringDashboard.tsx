'use client';

import { Activity, Cpu, Download, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from './StatCard';
import { PerformanceChart } from './PerformanceChart';
import { StorageView } from './StorageView';

export function NasMonitoringDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Cpu}
                    title="CPU Usage"
                    value={42}
                    unit="%"
                />
                <StatCard
                    icon={Activity}
                    title="System Load"
                    value={1.25}
                    unit="avg"
                />
                <StatCard
                    icon={Download}
                    title="Network In"
                    value={125}
                    unit="MB/s"
                />
                <StatCard
                    icon={Upload}
                    title="Network Out"
                    value={45}
                    unit="MB/s"
                />
            </div>

            <Tabs defaultValue="performance" className="w-full">
                <TabsList>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="storage">Storage</TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="space-y-4">
                    <PerformanceChart />
                </TabsContent>

                <TabsContent value="storage" className="space-y-4">
                    <StorageView />
                </TabsContent>
            </Tabs>
        </div>
    );
} 