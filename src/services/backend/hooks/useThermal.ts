import { Thermal } from "../types";
import { useResource } from "@/lib/useRessourceHook";
import Backend from "@/services/backend/Backend";

const useThermal = () => {
  const fetch = async () => {
    const apiService = Backend.getInstance();
    return await apiService.getThermal();
  };

  return useResource<Thermal>(fetch);
};

export { useThermal };
