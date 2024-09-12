import { VM } from "../types";
import { useResource } from "@/lib/useRessourceHook";
import Backend from "@/services/backend/Backend";

const useVms = () => {
  const fetch = async () => {
    const apiService = Backend.getInstance();
    return await apiService.getVms();
  };

  return useResource<VM[]>(fetch);
};

export { useVms };
