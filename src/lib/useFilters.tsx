import { useMemo, useState } from "react";

interface Filter<T = any> {
  [key: string]: T;
}

const useFilters = <T extends Filter>(
  initial: T = {} as T,
): [T, (modifier: (filters: T) => T) => void, () => void] => {
  const [filter, setFilter] = useState<T>(initial);
  const initialFilter = useMemo(() => initial, [initial]);

  const updateFilter = (modifier: (filters: T) => T) => {
    setFilter(modifier(filter));
  };

  const resetFilter = () => {
    setFilter(initialFilter);
  };

  return [filter, updateFilter, resetFilter];
};

export default useFilters;
export type { Filter };
