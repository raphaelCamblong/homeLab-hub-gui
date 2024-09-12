"use client";

import * as React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Construction } from "lucide-react";

function Dashboard() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row"></CardHeader>
      <CardContent>
        <Construction /> Under Construction
      </CardContent>
    </Card>
  );
}

export default Dashboard;
