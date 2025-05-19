import { LucideIcon } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string | number;
    unit: string;
}

export function StatCard({ icon: Icon, title, value, unit }: StatCardProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5" />
                <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="flex items-baseline">
                <span className="text-2xl font-bold">{value}</span>
                <span className="ml-1 text-neutral-600 dark:text-neutral-400">{unit}</span>
            </div>
        </Card>
    );
} 