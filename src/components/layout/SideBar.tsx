"use client";
import { Bell, Cable, Cloud, MemoryStick, ScanEye } from "lucide-react";

import React, { useMemo, useState } from "react";
import { Links, Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const iconclassName = " h-5 w-5 flex-shrink-0";
  const links: Links[] = useMemo(
    () => [
      {
        icon: <MemoryStick className={iconclassName} />,
        label: "Server Status",
        href: "/server",
      },
      {
        icon: <Cloud className={iconclassName} />,
        label: "Cluster info",
        href: "/cluster",
      },
      {
        icon: <Cable className={iconclassName} />,
        label: "Services",
        href: "/service",
      },
      {
        icon: <Bell className={iconclassName} />,
        label: "Notifications",
        href: "/notifications",
      },
      {
        icon: <ScanEye className={iconclassName} />,
        label: "Login",
        href: "/auth/login",
      },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        "h-screen rounded-md flex flex-col md:flex-row bg-gray-10 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      }
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  selected={pathName == link.href}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
