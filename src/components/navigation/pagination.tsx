"use client";

import { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  per_page: number;
  total: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  per_page,
  total,
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const totalPages = Math.ceil(total / per_page);

  const createQueryString = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    return params.toString();
  };

  const prevPage = () => {
    router.push(`${pathname}?${createQueryString(Number(page) - 1)}`);
  };

  const nextPage = () => {
    router.push(`${pathname}?${createQueryString(Number(page) + 1)}`);
  };

  const firstPage = () => {
    router.push(`${pathname}?${createQueryString(1)}`);
  };

  const lastPage = () => {
    router.push(`${pathname}?${createQueryString(totalPages)}`);
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={firstPage}
        disabled={!hasPrevPage}
      >
        First
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={prevPage}
        disabled={!hasPrevPage}
      >
        Prev
      </Button>
      <div className="text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={nextPage}
        disabled={!hasNextPage}
      >
        Next
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={lastPage}
        disabled={!hasNextPage}
      >
        Last
      </Button>
    </div>
  );
};

export default PaginationControls;
