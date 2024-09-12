"use client";
import React from "react";
import { Fan as FanType } from "@/services/backend/types";
import { Fan } from "lucide-react";

const FanCard: React.FC<{ fan: FanType }> = ({ fan }) => {
  const percentage = Math.floor((fan.CurrentReading / 100) * 100);

  return (
    <div className="relative w-24 h-24 rounded-full">
      <div className="absolute w-full h-full rounded-full border-2 border-gray-300"></div>
      <div
        className="absolute w-full h-full rounded-full border-4"
        style={{
          transform: `rotate(${percentage}deg)`,
          borderTopColor: "green",
          borderLeftColor: "green",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
        }}
      ></div>
      <div className="absolute flex space-y-1 flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Fan className="text-dartmouth-green text-2xl" />
        <div className="text-center">{`${percentage}%`}</div>
      </div>
    </div>
  );
};

export default FanCard;
