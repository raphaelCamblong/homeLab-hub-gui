import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { FilteredServiceList } from "./components/FilteredServiceList";
import { ServiceError } from "./components/ServiceError";
import { serviceApi } from "@/lib/api/services";
import { Loader } from "@/components/ui/loader";
import { ApiError } from "@/lib/api/config";
import { ErrorBoundary } from "react-error-boundary";

async function ServiceList() {
  try {
    const services = await serviceApi.getAll({ cache: 'no-store' });
    return <FilteredServiceList services={services} />;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Failed to load services');
  }
}

export default function ServicePage() {
  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h1 className="text-3xl">Service</h1>
      <Separator />
      <Suspense fallback={<Loader />}>
        <ErrorBoundary FallbackComponent={ServiceError}>
          <ServiceList />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}