import { DatabaseZap } from "lucide-react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { NasMonitoringDashboard } from "./components/NasMonitoringDashboard";

export default function StoragePage() {
  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle title="Storage" icon={<DatabaseZap className="h-6 w-6" />} />
        <NasMonitoringDashboard />
      </PageContainer>
    </WithPermission>
  );
}
