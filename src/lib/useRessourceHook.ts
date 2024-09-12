import { useEffect, useState } from "react";
import useNotification from "@/services/notification/useNotification";

interface UseResourceHook<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: string | undefined;
}

const useResource = <T>(
  fetchFunction: () => Promise<T>,
): UseResourceHook<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<string | undefined>(undefined);
  const { pushNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newData = await fetchFunction();
        setData(newData);
        setError(undefined);
      } catch (err: any) {
        pushNotification({ message: err.message, type: "error" });
        setError(err.message.toString());
        setData(undefined);
      } finally {
        // pushNotification({ message: "data retrieved", type: "info" });
        setLoading(false);
      }
    };
    fetchData().then(() => {});
  }, []);

  return { data, isLoading, isError };
};

export { useResource };
