"use client";
import { Bell, Cable, Cloud, DatabaseZap, HeartPulse, Home, LogOut } from "lucide-react";
import React, { useMemo } from "react";
import { Links, Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { useAuth } from "@/lib/hooks/useAuth";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const iconClassName = "h-5 w-5 flex-shrink-0";
  const links: Links[] = useMemo(
    () => [
      {
        icon: <Home className={iconClassName} />,
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: <HeartPulse className={iconClassName} />,
        label: "Monitoring",
        href: "/monitoring",
        children: [
          {
            icon: <Cloud className={iconClassName} />,
            label: "Cluster",
            href: "/monitoring/cluster",
          },
          {
            icon: <DatabaseZap className={iconClassName} />,
            label: "Nas",
            href: "/monitoring/nas",
          },
        ],
      },
      {
        icon: <Cable className={iconClassName} />,
        label: "Services",
        href: "/service",
      },
      {
        icon: <Bell className={iconClassName} />,
        label: "Notifications",
        href: "/notifications",
      },
    ],
    [user]
  );

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className="h-screen rounded-md flex flex-col md:flex-row bg-gray-10 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="flex flex-col h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Link href={user ? "/dashboard" : "#"}>
              <Logo />
            </Link>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  disabled={!user}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50"
                onClick={handleLogout}
              >
                <LogOut className={iconClassName} />
                {/* <span>Logout</span> */}
              </Button>
            ) : (
              <SidebarLink
                link={{
                  icon: <LogOut className={iconClassName} />,
                  label: "Login",
                  href: "/auth/login",
                }}
              />
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
