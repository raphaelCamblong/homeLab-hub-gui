"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Thermal from "./thermal";
import Power from "./power";
import Dashboard from "@/app/server/dashboard";

interface ServerProps {}

const Server: React.FC<ServerProps> = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl">Server HP proliant dl 380 gen 9</h1>
      <div className="flex flex-row justify-between">
        <Tabs defaultValue="Dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="Thermals">Thermals</TabsTrigger>
            <TabsTrigger value="Power">Power</TabsTrigger>
          </TabsList>
          <div className="p-2 m-2">
            <TabsContent value="Dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="Thermals">
              <Thermal />
            </TabsContent>
            <TabsContent value="Power">
              <Power />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Server;
