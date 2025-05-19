import { Suspense } from "react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { Package } from "lucide-react";
import { ServiceList } from "./components/ServiceList";
import { Loader } from "@/components/ui/loader";
import { ErrorBoundary } from "react-error-boundary";
import { ServiceHeader } from "./components/ServiceHeader";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function ServicePage() {
  return (
    <WithPermission permission="canManageServices" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle title="Services" icon={<Package className="h-6 w-6" />} />
        <div className="mt-6 space-y-6">
          <ServiceHeader />
          <ErrorBoundary FallbackComponent={ErrorAlert}>
            <Suspense fallback={<Loader />}>
              <ServiceList />
            </Suspense>
          </ErrorBoundary>
        </div>
      </PageContainer>
    </WithPermission>
  );
}
