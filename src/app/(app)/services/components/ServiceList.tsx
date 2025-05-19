import { serviceApi } from "@/lib/api/services";
import { ServiceCard } from "./ServiceCard";
import { Service } from "@/types/api/Service";

async function getServices(searchParams?: {
  [key: string]: string;
}): Promise<Service[]> {
  try {
    const services = await serviceApi.getAll({ cache: "no-store" });

    if (!searchParams) return services;

    return services.filter((service) => {
      const matchesSearch = searchParams.search
        ? service.name
            .toLowerCase()
            .includes(searchParams.search.toLowerCase()) ||
          service.description
            ?.toLowerCase()
            .includes(searchParams.search.toLowerCase()) ||
          service.namespace
            .toLowerCase()
            .includes(searchParams.search.toLowerCase())
        : true;

      const matchesStatus =
        searchParams.status && searchParams.status !== "all"
          ? service.status.toLowerCase() === searchParams.status.toLowerCase()
          : true;

      return matchesSearch && matchesStatus;
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load services");
  }
}

export async function ServiceList({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const services = await getServices(searchParams);

  if (!services.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-medium">No services found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.ID} service={service} />
      ))}
    </div>
  );
}
