import { useState, useEffect } from 'react';
import WebService from '../WebService';
import { Service } from '../types/Service';
import { getIconSvg } from "@/lib/utils";

const webService = new WebService();

const useService = () => {
  const [services, setServices] = useState<Service[] | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await webService.getAllServices();

        data.forEach(service => service.logo_path = getIconSvg(service.logo_path ?? '') ?? '/logo.svg');

        setServices(data);
        setError(null);
      } catch (err: any) {
        setError(err.message.toString());
        setServices(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, isLoading, isError };
};

export {useService};
