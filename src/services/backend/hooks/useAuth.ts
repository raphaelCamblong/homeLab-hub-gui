import { useEffect, useState } from "react";
import useNotification from "@/services/notification/useNotification";
import Backend from "@/services/backend/Backend";

interface UseAuthProps {
  isAuth: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  isLoading: boolean;
  isError: string | undefined;
}

const useAuth = (): UseAuthProps => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isError, setError] = useState<string | undefined>(undefined);

  const { pushNotification } = useNotification();

  const login = async (email: string, password: string) => {
    setLoading(true);
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(() => {
        pushNotification({
          message: `Login successful`,
          type: "success",
        });
        setIsAuth(true);
      })
      .catch((err) => {
        setIsAuth(false);
        setError(err);
        pushNotification({
          message: `Login unsuccessful`,
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const register = (email: string, password: string) => {
    Backend.getInstance()
      .register(email, password)
      .then(() => {
        setIsAuth(true);
        pushNotification({
          message: `Register successful`,
          type: "success",
        });
      })
      .catch((err) => {
        setIsAuth(false);
        setError(err);
        pushNotification({
          message: `Register unsuccessful`,
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {}, []);

  return { isAuth, login, register, isLoading, isError };
};

export { useAuth };
