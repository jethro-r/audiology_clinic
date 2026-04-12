"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseAdminPaginationOptions {
  limit?: number;
  extraParams?: Record<string, string>;
}

export default function useAdminPagination<T>(
  endpoint: string,
  options: UseAdminPaginationOptions = {}
) {
  const { limit = 10, extraParams } = options;
  const [items, setItems] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounce search input
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(limit),
      });
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      }
      if (extraParams) {
        for (const [key, value] of Object.entries(extraParams)) {
          params.set(key, value);
        }
      }

      const res = await fetch(`${endpoint}?${params.toString()}`);
      if (res.ok) {
        const data: PaginatedResponse<T> = await res.json();
        setItems(data.items);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, currentPage, limit, debouncedSearch, extraParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, page));
  }, []);

  return {
    items,
    totalItems,
    totalPages,
    currentPage,
    setPage,
    search,
    setSearch,
    loading,
    refetch: fetchData,
  };
}
