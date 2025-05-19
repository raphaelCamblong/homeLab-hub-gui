import { Cloud } from "lucide-react";
import { ClusterMonitoringDashboard } from "./components/ClusterMonitoringDashboard";

import { HeartPulse, DatabaseZap, Boxes } from "lucide-react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";

export default function ClusterPage() {
  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle title="Cluster" icon={<Cloud className="h-6 w-6" />} />
        <ClusterMonitoringDashboard />
      </PageContainer>
    </WithPermission>
  );
}
