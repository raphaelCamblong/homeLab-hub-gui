"use client";
import { Cloud, Cable, Bot, Settings, Bell, MemoryStick } from "lucide-react";

import React, { useMemo, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, Links } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import path from "path";

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
    ],
    [pathName]
  );

  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        "h-screen rounded-md flex flex-col md:flex-row bg-gray-10 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
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

export const Logo = () => {
  return (
    <Link
      href="#"
      className="flex space-x-2 items-center text-sm text-black py-1 relative"
    >
      <Bot size={30} className="flex-shrink-0 text-regal-blue" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre font-ppneuemachina text-2xl"
      >
        HomeLab
      </motion.span>
    </Link>
  );
};
