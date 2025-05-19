'use client';
import { DashboardCards } from "@/app/(app)/dashboard/components/DashboardCards";
import { QuickStats } from "@/app/(app)/dashboard/components/QuickStats";
import { WelcomeMessage } from "@/app/(app)/dashboard/components/WelcomeMessage";

export default function DashboardPage() {
    return (
        <div className="container mx-auto p-6">
            <WelcomeMessage />
            <DashboardCards />
            <QuickStats />
        </div>
    );
}
