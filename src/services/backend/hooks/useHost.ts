import { Host } from "../types";
import { useResource } from "@/lib/useRessourceHook";
import Backend from "@/services/backend/Backend";

const useHost = () => {
  const fetch = async () => {
    const apiService = Backend.getInstance();
    return await apiService.getHost();
  };

  return useResource<Host>(fetch);
};

export { useHost };
