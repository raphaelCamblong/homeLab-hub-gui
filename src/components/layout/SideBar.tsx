"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cloud, Keyboard, Menu, Settings } from "lucide-react";

interface SideBarRoute {
  path: string;
  icon: React.ReactNode;
  name: string;
}

export const Sidebar = () => {
  const router = useRouter();

  const routesItems: SideBarRoute[] = [
    {
      path: "/cluster",
      icon: <Cloud />,
      name: "Cluster info",
    },
    {
      path: "/service",
      icon: <Keyboard />,
      name: "Services",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          aria-label="Open Sidebar"
          className="hover:scale-110 hover:rotate-6"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px] sm:w-[240px]">
        <SheetTitle>Hub</SheetTitle>
        <div className="space-y-4">
          {routesItems.map((route) => (
            <Button
              key={route.name}
              variant="ghost"
              onClick={() => router.push(route.path)}
              className="flex items-center space-x-6"
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
    </Sheet>
  );
};
