import { Network } from "lucide-react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";

export default function NetworkPage() {
  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle title="Network" icon={<Network className="h-6 w-6" />} />
      </PageContainer>
    </WithPermission>
  );
}
