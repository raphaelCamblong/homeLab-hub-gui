import { Suspense } from "react";
import { LoginForm } from "./components/login-form";
import { Loader } from "@/components/ui/loader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center flex-col m-auto h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
} 