"use client";
import { History } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./SearchInput";

export function PipelineHeader() {
  const defaultValue = "all";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 sm:max-w-[300px]">
          <SearchInput />
        </div>
        <Button variant="outline" asChild>
          <a href="/pipeline/history">
            <History className="mr-2 h-4 w-4" />
            History
          </a>
        </Button>
      </div>
    </div>
  );
}
