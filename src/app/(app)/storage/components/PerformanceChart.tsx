'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from "@/components/ui/card";

// Mock data - replace with real data from your API
const performanceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    read: Math.floor(Math.random() * 100),
    write: Math.floor(Math.random() * 80),
}));

export function PerformanceChart() {
    return (
        <Card className="p-4">
            <h3 className="font-semibold mb-4">Disk I/O Performance</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="read"
                            stackId="1"
                            stroke="#2563eb"
                            fill="#3b82f6"
                        />
                        <Area
                            type="monotone"
                            dataKey="write"
                            stackId="1"
                            stroke="#16a34a"
                            fill="#22c55e"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
} 