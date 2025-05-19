import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/navigation/SideBar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "@/lib/providers/NextAuthProvider";
import { RBACProvider } from "@/lib/providers/RBACContext";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeLab Hub",
  description: "Built with brain",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <NextAuthProvider>
      <RBACProvider role={session?.user?.role || "GUEST"}>
        <html lang="en">
          <body className={cn(inter.className, "font-ppneuemachina")}>
            <AppSidebar>
              <div className="px-4 py-2 flex w-full h-full overflow-y-scroll">
                <Toaster position="top-right" duration={2000} />
                {children}
              </div>
            </AppSidebar>
          </body>
        </html>
      </RBACProvider>
    </NextAuthProvider>
  );
}
