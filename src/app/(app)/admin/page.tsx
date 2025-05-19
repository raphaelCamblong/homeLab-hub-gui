import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { UserCog } from "lucide-react";
import { UsersManagement } from "./components/UsersManagement";
import { RBACManagement } from "./components/RBACManagement";
import { TokenManagement } from "./components/TokenManagement";
import { AuditLogs } from "./components/AuditLogs";
import ErrorBoundaryWithSuspense from "@/components/navigation/ErrorBoundaryWithSuspense";

export default function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <WithPermission permission="canManageUsers" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle
          title="Admin Dashboard"
          icon={<UserCog className="h-6 w-6" />}
        />
        <div className="mt-6">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="rbac">RBAC</TabsTrigger>
              <TabsTrigger value="tokens">API Tokens</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-6">
              <ErrorBoundaryWithSuspense>
                <UsersManagement />
              </ErrorBoundaryWithSuspense>
            </TabsContent>
            <TabsContent value="rbac" className="mt-6">
              <ErrorBoundaryWithSuspense>
                <RBACManagement />
              </ErrorBoundaryWithSuspense>
            </TabsContent>
            <TabsContent value="tokens" className="mt-6">
              <ErrorBoundaryWithSuspense>
                <TokenManagement />
              </ErrorBoundaryWithSuspense>
            </TabsContent>
            <TabsContent value="audit" className="mt-6">
              <ErrorBoundaryWithSuspense>
                <AuditLogs searchParams={searchParams} />
              </ErrorBoundaryWithSuspense>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </WithPermission>
  );
}
