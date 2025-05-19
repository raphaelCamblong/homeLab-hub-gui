import { DatabaseZap } from "lucide-react";
import { NasMonitoringDashboard } from "./components/NasMonitoringDashboard";

export default function NasPage() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-8">
                <DatabaseZap className="h-6 w-6" />
                <h1 className="text-2xl font-bold">NAS Management</h1>
            </div>

            <NasMonitoringDashboard />
        </div>
    );
}
