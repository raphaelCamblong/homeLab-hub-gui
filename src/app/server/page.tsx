import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServerProps {
  name: string;
}

const Server: React.FC<ServerProps> = ({ name }) => {
  return (
    <div>
      <h1 className="font-ppneuemachina text-3xl">Server</h1>
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

export default Server;
