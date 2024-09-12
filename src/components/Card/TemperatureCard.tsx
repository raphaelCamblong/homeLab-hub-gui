"use client";
import React from "react";
import { Temperature } from "@/services/backend/types";
import { Gauge } from "@/components/ui/gauge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Separator } from "@/components/ui/separator";

const TemperatureCard: React.FC<{ temperature: Temperature }> = ({
  temperature,
}) => {
  const name = temperature.Name.split("-")[1] ?? temperature.Name;
  const unit = temperature.Units === "Celsius" ? "°C" : temperature.Units;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="bg-white shadow-md rounded-md overflow-hidden">
          <CardTitle
            className={
              "flex flex-col items-stretch space-y-0 border-b p-1 sm:flex-row"
            }
          >
            {name}
          </CardTitle>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <h1 className="text-3xl font-bold text-center">
              {temperature.ReadingCelsius} {unit}
            </h1>
            <Gauge
              value={temperature.ReadingCelsius}
              min={0}
              max={temperature.UpperThresholdCritical}
            />
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent>
        <CardContent className="bg-white shadow-md rounded-md flex flex-col items-center justify-center p-4 border">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col items-center space-x-2">
                <h3 className="text-sm font-bold">Critical</h3>
                <h2 className="text-xl font-bold">
                  {temperature.UpperThresholdCritical} {unit}
                </h2>
              </div>
              <Separator orientation="vertical" className="h-11 w-0.5" />
              <div className="flex flex-col items-center space-x-2">
                <h3 className="text-sm font-bold">Fatal</h3>
                <h2 className="text-xl font-bold">
                  {temperature.UpperThresholdFatal} {unit}
                </h2>
              </div>
            </div>
          </div>
        </CardContent>
      </HoverCardContent>
    </HoverCard>
  );
};
export default TemperatureCard;
