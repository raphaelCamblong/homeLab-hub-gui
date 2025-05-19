import { Cloud } from "lucide-react";
import { ClusterMonitoringDashboard } from "./components/ClusterMonitoringDashboard";

export default function ClusterPage() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-8">
                <Cloud className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Kubernetes Cluster</h1>
            </div>

            <ClusterMonitoringDashboard />
        </div>
    );
}
