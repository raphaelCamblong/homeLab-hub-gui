import { HardDrive, Thermometer, AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

interface SmartStatus {
    reallocatedSectors: number;
    powerOnHours: number;
    temperature: number;
    lastTestStatus: 'PASS' | 'FAIL' | 'UNKNOWN';
}

interface DiskUsageCardProps {
    name: string;
    used: number;
    total: number;
    temperature: number;
    smart: SmartStatus;
    isRaidMember: boolean;
    raidRole: string;
}

export function DiskUsageCard({
    name,
    used,
    total,
    temperature,
    smart,
    isRaidMember,
    raidRole
}: DiskUsageCardProps) {
    const usagePercent = (used / total) * 100;

    return (
        <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5" />
                    <div>
                        <h3 className="font-semibold">{name}</h3>
                        {isRaidMember && (
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                RAID5 {raidRole}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={temperature > 50 ? "destructive" : "secondary"}>
                        <Thermometer className="h-4 w-4 mr-1" />
                        {temperature}°C
                    </Badge>
                    <Badge variant={smart.lastTestStatus === 'PASS' ? "secondary" : "destructive"}>
                        SMART
                    </Badge>
                </div>
            </div>

            <div className="space-y-2">
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${usagePercent}%` }}
                    />
                </div>
                <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                    <span>{used}GB used</span>
                    <span>{total}GB total</span>
                </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Power On Time</span>
                    <span>{Math.floor(smart.powerOnHours / 24)} days</span>
                </div>
                <div className="flex justify-between">
                    <span>Reallocated Sectors</span>
                    <Badge variant={smart.reallocatedSectors > 0 ? "destructive" : "secondary"}>
                        {smart.reallocatedSectors}
                    </Badge>
                </div>
            </div>
        </Card>
    );
} 