'use client';

import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Mock data - replace with real metrics
const resourceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    network: Math.floor(Math.random() * 1000),
}));

export function ResourceUsageChart() {
    return (
        <div className="space-y-4">
            <Card className="p-4">
                <h3 className="font-semibold mb-4">Cluster Resource Usage</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={resourceData}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="cpu"
                                stroke="#2563eb"
                                name="CPU (%)"
                            />
                            <Line
                                type="monotone"
                                dataKey="memory"
                                stroke="#16a34a"
                                name="Memory (%)"
                            />
                            <Line
                                type="monotone"
                                dataKey="network"
                                stroke="#d97706"
                                name="Network (MB/s)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
} 