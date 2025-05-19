import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader } from "../ui/loader";
import { ErrorAlert } from "../ErrorAlert";

function ErrorBoundaryWithSuspense({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorAlert}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWithSuspense;
