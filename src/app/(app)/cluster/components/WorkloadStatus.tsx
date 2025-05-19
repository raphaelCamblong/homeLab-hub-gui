'use client';

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Workload {
    name: string;
    type: 'Deployment' | 'StatefulSet' | 'DaemonSet';
    ready: string;
    upToDate: number;
    available: number;
    age: string;
    status: 'Healthy' | 'Warning' | 'Error';
    namespace: string;
}

// Mock data - replace with real workload data
const workloads: Workload[] = [
    {
        name: "nginx-ingress",
        type: "Deployment",
        ready: "3/3",
        upToDate: 3,
        available: 3,
        age: "15d",
        status: 'Healthy',
        namespace: 'kube-system'
    },
    {
        name: "prometheus",
        type: "StatefulSet",
        ready: "1/1",
        upToDate: 1,
        available: 1,
        age: "7d",
        status: 'Warning',
        namespace: 'monitoring'
    },
    {
        name: "elasticsearch",
        type: "StatefulSet",
        ready: "0/3",
        upToDate: 0,
        available: 0,
        age: "2d",
        status: 'Error',
        namespace: 'logging'
    }
];

const getStatusColor = (status: Workload['status']) => {
    switch (status) {
        case 'Healthy': return 'success';
        case 'Warning': return 'default';
        case 'Error': return 'destructive';
    }
};

export function WorkloadStatus() {
    return (
        <Card>
            <CardHeader className="flex-row flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Box className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">Workloads</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View in Dashboard
                    </Button>
                    <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b dark:border-neutral-700">
                                <th className="pb-2">Name</th>
                                <th className="pb-2">Namespace</th>
                                <th className="pb-2">Type</th>
                                <th className="pb-2">Ready</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workloads.map((workload) => (
                                <tr key={workload.name}
                                    className="border-b dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                >
                                    <td className="py-2 font-medium">{workload.name}</td>
                                    <td className="py-2">
                                        <Badge variant="outline" className="font-mono">
                                            {workload.namespace}
                                        </Badge>
                                    </td>
                                    <td className="py-2">
                                        <Badge variant="secondary">
                                            {workload.type}
                                        </Badge>
                                    </td>
                                    <td className="py-2">{workload.ready}</td>
                                    <td className="py-2">
                                        <Badge variant={getStatusColor(workload.status)}>
                                            {workload.status}
                                        </Badge>
                                    </td>
                                    <td className="py-2 text-neutral-600 dark:text-neutral-400">
                                        {workload.age}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
} 