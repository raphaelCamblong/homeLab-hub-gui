'use client';

import { Database, Shield, Activity, AlertTriangle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PoolHealth {
    status: 'ONLINE' | 'DEGRADED' | 'FAULTED';
    capacity: number;
    deduplication: number;
    compression: number;
    scrubStatus: {
        lastRun: string;
        errors: number;
        inProgress: boolean;
    };
}

// Mock data - replace with real data from your ZFS API
const poolHealth: PoolHealth = {
    status: 'ONLINE',
    capacity: 72,
    deduplication: 1.8,
    compression: 1.45,
    scrubStatus: {
        lastRun: '2024-03-20',
        errors: 0,
        inProgress: false
    }
};

const getStatusColor = (status: PoolHealth['status']) => {
    switch (status) {
        case 'ONLINE': return 'bg-green-500';
        case 'DEGRADED': return 'bg-yellow-500';
        case 'FAULTED': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};

export function ZfsPoolStatus() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">ZFS Pool Status</h3>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(poolHealth.status)}`} />
                    <span className="font-medium">{poolHealth.status}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                Pool Health
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Capacity Used</span>
                            <Badge variant={poolHealth.capacity > 80 ? "destructive" : "secondary"}>
                                {poolHealth.capacity}%
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-4 w-4" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                Performance Ratios
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span>Deduplication</span>
                                <span className="font-medium">{poolHealth.deduplication}x</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Compression</span>
                                <span className="font-medium">{poolHealth.compression}x</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                Scrub Status
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span>Last Run</span>
                                <span className="font-medium">{poolHealth.scrubStatus.lastRun}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Errors Found</span>
                                <Badge variant={poolHealth.scrubStatus.errors > 0 ? "destructive" : "secondary"}>
                                    {poolHealth.scrubStatus.errors}
                                </Badge>
                            </div>
                            {poolHealth.scrubStatus.inProgress && (
                                <Badge variant="outline" className="mt-2">
                                    Scrub in progress
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
} 