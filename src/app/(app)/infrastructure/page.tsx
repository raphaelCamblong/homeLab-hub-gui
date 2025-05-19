import { HeartPulse, DatabaseZap, BringToFront, Building2 } from "lucide-react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";

export default function InfrastructurePage() {
  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle
          title="Infrastructure"
          icon={<Building2 className="h-6 w-6" />}
        />
      </PageContainer>
    </WithPermission>
  );
}
