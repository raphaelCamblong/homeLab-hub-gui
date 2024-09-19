"use client";
import React, { useCallback, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MonitorCheck, MonitorStop, SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "@/lib/useFilters";
import { ServiceFilterItems } from "./page";
import { Button } from "@/components/ui/button";

interface ServiceFiltersProps {
  availableTags: string[];
  filters: ServiceFilterItems;
  setFilters: (filters: Filter) => Filter;
  resetFilter: () => void;
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  availableTags,
  filters,
  setFilters,
  resetFilter,
}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>([
    "running",
    "stopped",
  ]);
  const [selectedTags, setSelectedTags] = useState<string>("");

  const updateFilters = useCallback(() => {
    setFilters((filters: Filter) => {
      return { ...filters, state: selectedStates, tags: selectedTags };
    });
  }, [selectedTags, selectedStates]);

  return (
    <div className="flex flex-row justify-between">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-row gap-2">
              <SlidersHorizontal />
              <h3>Filters</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-row justify-between gap-4 p-2">
              <ToggleGroup
                type="multiple"
                value={filters.state}
                onValueChange={setSelectedStates}
              >
                <ToggleGroupItem value="running">
                  <MonitorCheck color="green" aria-label="Running" />
                </ToggleGroupItem>
                <ToggleGroupItem value="stopped">
                  <MonitorStop color="red" aria-label="Stopped" />
                </ToggleGroupItem>
              </ToggleGroup>
              <Select
                value={selectedTags}
                onValueChange={(value) => {
                  setSelectedTags(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={resetFilter}>Reset</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ServiceFilters;
