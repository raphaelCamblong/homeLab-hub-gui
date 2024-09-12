import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/app/cluster/dashboard";
import CloudNode from "@/app/cluster/node";
import Host from "@/app/cluster/hosts";

interface ClusterProps {}

const Cluster: React.FC<ClusterProps> = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl">Cluster K3s</h1>
      <div className="flex flex-row flex-grow justify-between">
        <Tabs defaultValue="Host">
          <TabsList>
            <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="Node">Nodes</TabsTrigger>
            <TabsTrigger value="Host">Hosts</TabsTrigger>
          </TabsList>
          <TabsContent value="Dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="Node">
            <CloudNode />
          </TabsContent>
          <TabsContent value="Host">
            <Host />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Cluster;
