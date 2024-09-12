import { Service } from "../types/Service";
import { getIconSvg } from "@/lib/utils";
import { useResource } from "@/lib/useRessourceHook";
import Backend from "@/services/backend/Backend";

const useService = () => {
  const fetch = async () => {
    const apiService = Backend.getInstance();
    const data: Service[] = await apiService.getAllServices();

    data.forEach(
      (service) =>
        (service.logo_path =
          getIconSvg(service.logo_path ?? "") ?? "/logo.svg"),
    );
    return data;
  };

  return useResource<Service[]>(fetch);
};

export { useService };
