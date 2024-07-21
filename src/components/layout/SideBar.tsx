"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Cloud, Keyboard, Menu, Settings } from "lucide-react";

interface SideBarRoute {
  path: string;
  icon: React.ReactNode;
  name: string;
}

export const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const routesItems: SideBarRoute[] = [
    {
      path: "/cluster",
      icon: <Cloud />,
      name: "Cluster info",
    },
    {
      path: "/service",
      icon: <Keyboard />,
      name: "Service",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Open Sidebar"
          className="hover:scale-110 hover:rotate-6"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col w-[200px] sm:w-[240px]"
      >
        <SheetHeader className="flex justify-center items-center">
          <SheetTitle className="font-ppneuemachina">HUB</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-grow gap-0">
          {routesItems.map((route) => (
            <Button
              key={route.name}
              variant={pathName == route.path ? "secondary" : "ghost"}
              onClick={() => router.push(route.path)}
              className="flex items-center space-between gap-2 w-full text-right"
            >
              {route.icon}
              <p>{route.name}</p>
            </Button>
          ))}
        </div>
        <SheetFooter>
          <Button variant="default" size="icon" aria-label="Open Sidebar">
            <Settings />
          </Button>
        </SheetFooter>
      </SheetContent>
      <SheetDescription></SheetDescription>
    </Sheet>
  );
};
