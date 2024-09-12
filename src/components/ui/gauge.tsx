import React, { useCallback } from "react";

interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  size?: number;
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 6,
}) => {
  const numSections = 23;

  const getSectionClasses = useCallback(
    (index: number) => {
      const percentage = ((value - min) / (max - min)) * 100;
      const state_index = Math.floor((percentage / 100) * numSections);
      return state_index >= index ? "bg-green-pastel" : "bg-gray-300";
    },
    [value, min, max],
  );

  const getSectionWidth = useCallback(() => {
    return 2;
  }, [numSections]);

  return (
    <div className="flex flex-row gap-x-0.5 w-full h-full">
      {Array.from({ length: numSections }).map((_, index) => (
        <div
          key={index}
          className={`h-${size} rounded-full ${getSectionClasses(index)}`}
          style={{ width: getSectionWidth() }}
        ></div>
      ))}
    </div>
  );
};

export { Gauge };
