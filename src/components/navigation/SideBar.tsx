"use client";
import {
  Bell,
  HardDrive,
  Gauge,
  Database,
  Activity,
  Home,
  LogOut,
  Server,
  Network,
  Cpu,
  PlayCircle,
  FolderOpen,
  Settings,
  Boxes,
  BringToFront,
  Building2,
  UserRoundCog,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Links, Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { useAuth } from "@/lib/hooks/useAuth";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const iconClassName = "h-5 w-5 flex-shrink-0";
  const links: Links[] = useMemo(
    () => [
      {
        icon: <Home className={iconClassName} />,
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: <Building2 className={iconClassName} />,
        label: "Infra",
        href: "/infrastructure",
        children: [
          {
            icon: <Server className={iconClassName} />,
            label: "Devices",
            href: "/infrastructure/devices",
          },
          {
            icon: <Network className={iconClassName} />,
            label: "Network",
            href: "/infrastructure/network",
          },
          {
            icon: <Activity className={iconClassName} />,
            label: "Monitoring",
            href: "/monitoring",
            children: [
              {
                icon: <Boxes className={iconClassName} />,
                label: "Cluster",
                href: "/monitoring/cluster",
              },
              {
                icon: <Database className={iconClassName} />,
                label: "Nas",
                href: "/monitoring/nas",
              },
            ],
          },
        ],
      },
      {
        icon: <Boxes className={iconClassName} />,
        label: "Cluster",
        href: "/cluster",
      },
      {
        icon: <PlayCircle className={iconClassName} />,
        label: "Services",
        href: "/services",
      },
      {
        icon: <BringToFront className={iconClassName} />,
        label: "Pipelines",
        href: "/pipeline",
      },
      {
        icon: <FolderOpen className={iconClassName} />,
        label: "Storage",
        href: "/storage",
      },
      {
        icon: <Bell className={iconClassName} />,
        label: "Notifications",
        href: "/notifications",
      },
    ],
    []
  );

  const authLinks: Links[] = useMemo(() => {
    if (user?.roles.some((role) => role.name === "admin")) {
      return [
        {
          icon: <UserRoundCog className={iconClassName} />,
          label: "Admin",
          href: "/admin",
        },
      ];
    }
    return [];
  }, [user?.roles]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="h-screen rounded-md flex flex-col md:flex-row bg-gray-10 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="flex flex-col h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="block">
              <Logo />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} disabled={!user} />
              ))}
              {authLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} disabled={!user} />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-center">
            {user ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50"
                    onClick={handleLogout}
                  >
                    <LogOut className={iconClassName} />
                  </Button>
                </div>
              </div>
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
