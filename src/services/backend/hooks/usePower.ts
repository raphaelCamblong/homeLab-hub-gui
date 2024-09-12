import { Power } from "../types";
import { useResource } from "@/lib/useRessourceHook";
import Backend from "@/services/backend/Backend";

const usePower = () => {
  const fetch = async () => {
    const apiService = Backend.getInstance();
    return await apiService.getPower();
  };

  return useResource<Power>(fetch);
};

export { usePower };
