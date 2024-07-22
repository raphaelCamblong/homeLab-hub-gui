import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClusterProps {
  name: string;
}

const Cluster: React.FC<ClusterProps> = ({ name }) => {
  return (
    <div>
      <h1 className="font-ppneuemachina text-3xl">Cluster</h1>
      <div className="flex flex-row flex-grow justify-between">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="metric">Metrics</TabsTrigger>
            <TabsTrigger value="statistic">Statistic</TabsTrigger>
          </TabsList>
          <TabsContent value="metric">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="statistic">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Cluster;
