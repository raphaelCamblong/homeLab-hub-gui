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
      setLoading(true);
      fetchFunction()
        .then((res) => {
          setData(res);
          setError(undefined);
        })
        .catch((err) => {
          pushNotification({ message: err.message, type: "error" });
          setError(err.message.toString());
          setData(undefined);
        })
        .finally(() => setLoading(false));
    };
    fetchData().then((r) => r);
  }, []);

  return { data, isLoading, isError };
};

export { useResource };
