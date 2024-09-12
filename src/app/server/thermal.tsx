"use client";
import React from "react";
import { useThermal } from "@/services/backend/hooks/useThermal";
import { Fan, Temperature } from "@/services/backend/types";
import { Loader } from "lucide-react";
import FanCard from "@/components/Card/FanCard";
import TemperatureCard from "@/components/Card/TemperatureCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FanSpeedCard: React.FC<{ fans: Fan[] }> = ({ fans }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Fan Speed</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row justify-evenly flex-wrap p-2">
        {fans.map((fan: Fan, index: number) => (
          <FanCard key={index} fan={fan} />
        ))}
      </CardContent>
    </Card>
  );
};

const ChassisCard: React.FC<{ name: string; small?: boolean }> = ({
  name,
  small = false,
}) => {
  const { data: thermal } = useThermal();

  const temperaturesFromPhysicalContext = (context: string) => {
    if (!thermal) return [];
    return thermal.Temperatures.filter(
      (value) => value.PhysicalContext === context,
    );
  };

  const className = small
    ? "grid sm:grid-cols-2 gap-4"
    : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4";
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className={className}>
          {temperaturesFromPhysicalContext(name).map(
            (temp: Temperature, index: number) => (
              <TemperatureCard key={index} temperature={temp} />
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Thermal: React.FC = () => {
  const { data: thermal, isLoading, isError } = useThermal();

  return (
    <div className="flex flex-col w-full metrics-container">
      {isLoading && (
        <div className="flex justify-center">
          <Loader size={34} className="animate-spin" />
        </div>
      )}
      {isError && <div>{isError}</div>}
      {thermal && (
        <>
          <div className="flex flex-col gap-2">
            <FanSpeedCard fans={thermal.Fans} />
            <div className="flex flex-row gap-2">
              <ChassisCard name={"CPU"} small />
              <ChassisCard name={"Intake"} small />
            </div>
            <ChassisCard name={"SystemBoard"} />
          </div>
        </>
      )}
    </div>
  );
};

export default Thermal;
