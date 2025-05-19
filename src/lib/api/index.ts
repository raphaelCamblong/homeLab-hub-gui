import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { toast } from "sonner";
import useNotificationStore, {
  Notification,
} from "@/lib/store/notificationStore";

export const API_BASE_URL =
  `${process.env.API_BASE_URL}/api/v1` || "http://api-url-invalid";

export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  cache?: RequestCache;
  next?: { revalidate?: number };
  headers?: HeadersInit;
  requireAuth?: boolean;
  body?: any;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const getAuthToken = async () => {
  const session = await getServerSession(authOptions);
  return session?.accessToken;
};

const pushNotification = (notification: Notification) => {
  notification.id = String(Date.now());
  useNotificationStore.getState().addNotification(notification);
  // toast(notification.type, {
  //   description: notification.message,
  //   action: {
  //     label: "Undo",
  //     onClick: () => console.log("Undo"),
  //   },
  // });
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = new ApiError(
      response.status,
      `API Error: ${response.status} ${response.statusText}[${response.url}]`,
    );
    throw error;
  }
  return response.json();
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = { requireAuth: true },
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (options.requireAuth == undefined) {
      options.requireAuth = true;
    }

    if (options.requireAuth) {
      const token = await getAuthToken();
      if (token) {
        (headers as Record<string, string>)["Authorization"] =
          `Bearer ${token}`;
      } else {
        throw new ApiError(401, "No authentication token available");
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      pushNotification({
        type: "error",
        message: error.message,
        id: String(Date.now()),
      });
    } else {
      pushNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        id: String(Date.now()),
      });
    }
    throw error;
  }
}

export async function streamFetchApi(
  endpoint: string,
  options: FetchOptions = { requireAuth: true },
): Promise<Response> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
      accept: "text/event-stream",
      ...options.headers,
    };

    if (options.requireAuth == undefined) {
      options.requireAuth = true;
    }

    if (options.requireAuth) {
      const token = await getAuthToken();
      if (token) {
        (headers as Record<string, string>)["Authorization"] =
          `Bearer ${token}`;
      } else {
        throw new ApiError(401, "No authentication token available");
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
