import { signIn, signOut, useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut();
  };

  return {
    isAuth: !!session,
    isLoading: status === "loading",
    user: session?.user,
    login,
    logout,
  };
}
