"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout>();

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (value: string) => {
    if (searchDebounce) clearTimeout(searchDebounce);
    setSearchDebounce(
      setTimeout(() => {
        router.push(`?${createQueryString(value)}`);
      }, 500)
    );
  };

  return (
    <>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search pipelines..."
        className="pl-8"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search") ?? ""}
      />
    </>
  );
}
