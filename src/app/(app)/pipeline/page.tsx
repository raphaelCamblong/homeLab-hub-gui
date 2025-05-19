import { BringToFront } from "lucide-react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "@/components/ErrorAlert";
import { pipelinesApi } from "@/lib/api/pipelines";
import { PipelineHeader } from "./components/PipelineHeader";
import { PipelineCard } from "./components/pipeline/Card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RunningJobList from "./components/job/List";

async function getInitialData(searchParams?: { [key: string]: string }) {
  const pipelines = await pipelinesApi.getAllPipelines({ cache: "no-store" });
  return {
    pipelines,
  };
}

export default async function PipelinePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { pipelines } = await getInitialData(searchParams);

  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle
          title="Pipelines"
          icon={<BringToFront className="h-6 w-6" />}
          description="Monitor and manage system pipelines"
        >
          <PipelineHeader />
        </PageTitle>
        <div className="mt-6 space-y-6">
          <ErrorBoundary FallbackComponent={ErrorAlert}>
            <div className="grid gap-8 lg:grid-cols-2">
              <section className="animate-fade-up">
                <RunningJobList />
              </section>
              <section
                className="animate-fade-up"
                style={{ animationDelay: "150ms" }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Available Pipelines
                </h2>
                <Suspense fallback={<Loader />}>
                  <ScrollArea className="h-[calc(100vh-250px)] rounded-lg border p-4">
                    {pipelines.length === 0 ? (
                      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
                        <div className="text-center">
                          <h3 className="text-lg font-medium">
                            No pipelines found
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            No pipelines are currently configured
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-1 pr-4">
                        {pipelines.map((pipeline, index) => (
                          <div
                            key={pipeline.ID}
                            className="animate-fade-up"
                            style={{ animationDelay: `${(index + 3) * 150}ms` }}
                          >
                            <PipelineCard pipeline={pipeline} />
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </Suspense>
              </section>
            </div>
          </ErrorBoundary>
        </div>
      </PageContainer>
    </WithPermission>
  );
}
