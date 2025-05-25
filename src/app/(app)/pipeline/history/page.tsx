import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { ApiError } from "@/lib/api";
import { History, ArrowLeft } from "lucide-react";
import { HistoryCard } from "./components/HistoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pipelinesApi } from "@/lib/api/pipelines";
import { Status } from "@/types/api/pipeline";

export const dynamic = "force-dynamic";

async function getHistory() {
  try {
    const history = await pipelinesApi.getAllJobs();

    return history.filter((job) =>
      [Status.Success, Status.Stopped, Status.Failed].includes(job.status)
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error(error);
    throw new Error("Failed to load history");
  }
}

export default async function HistoryPage() {
  const history = await getHistory();

  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle
          title="Pipelines History"
          icon={<History className="h-6 w-6" />}
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/pipeline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to pipelines
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              View the history of system pipelines
            </p>
          </div>
        </PageTitle>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {history.length === 0 ? (
            <div className="col-span-full flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="text-lg font-medium">No history found</h3>
                <p className="text-sm text-muted-foreground">
                  No actions have been executed yet
                </p>
              </div>
            </div>
          ) : (
            history.map((item) => <HistoryCard key={item.ID} history={item} />)
          )}
        </div>
      </PageContainer>
    </WithPermission>
  );
}
