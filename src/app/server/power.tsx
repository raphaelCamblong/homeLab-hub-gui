"use client";

import * as React from "react";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePower } from "@/services/backend/hooks/usePower";
import { Loader } from "lucide-react";
import { PowerDetail } from "@/services/backend/types";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  Average: {
    label: "Average",
    color: "hsl(var(--chart-1))",
  },
  Minimum: {
    label: "Minimum",
    color: "hsl(var(--chart-1))",
  },
  Peak: {
    label: "Maximum",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Power() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Average");
  const { data: power, isLoading } = usePower();
  const [sampleSelector, setSampleSelector] = React.useState<string>("0");
  const [powerDataSelected, setPowerDataSelected] = React.useState<
    PowerDetail[]
  >([]);

  useEffect(() => {
    if (power) {
      const number = power.Samples / 2;
      setSampleSelector(String(number));
      setPowerDataSelected(power.PowerDetail.slice(-number));
    }
  }, [power]);

  const selectSampleRange = (value: string) => {
    setSampleSelector(value);
    const sample = Number(value);
    setPowerDataSelected(power?.PowerDetail.slice(-sample) ?? []);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{power?.Id}</CardTitle>
          {power && (
            <CardDescription>
              Showing total consumption of power in Watts/hour ({sampleSelector}
              /{power?.Samples})
              <Select value={sampleSelector} onValueChange={selectSampleRange}>
                <SelectTrigger className="grow-0">
                  <SelectValue placeholder="Select sample range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sample numbers</SelectLabel>
                    {Array.from(
                      { length: 4 },
                      (_, index) => (index + 1) * Math.floor(power.Samples / 4),
                    ).map((value, i) => (
                      <SelectItem key={i} value={String(value)}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardDescription>
          )}
        </div>
        <div className="flex">
          {["Average", "Minimum", "Peak"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            const valueKey = (
              chart === "Peak" ? "Maximum" : chart
            ) as keyof typeof Power;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {power?.[valueKey] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading ||
          (!power && (
            <div className="flex justify-center">
              <Loader size={34} className="animate-spin" />
            </div>
          ))}
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={powerDataSelected}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis dataKey="Peak" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="Time"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-green)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Power;
