import { useState, useEffect, useCallback, useMemo } from 'react';
import { complaintService } from '../services/complaint.service';
import type { Complaint, ComplaintFilters } from '../types/complaint.types';
import type { ApiError } from '../types/api.types';

interface UseAllComplaintsResult {
  data: Complaint[] | null;
  isLoading: boolean;
  isFetching: boolean;
  error: ApiError | null;
  refetch: () => void;
}

/**
 * useAllComplaints — fetches all complaints for officials.
 * Re-fetches automatically when filters change.
 */
export function useAllComplaints(filters?: ComplaintFilters): UseAllComplaintsResult {
  const [data, setData] = useState<Complaint[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Stable filter key — prevents re-fetching when the object reference changes but values haven't
  const filterKey = useMemo(
    () => JSON.stringify(filters ?? {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters?.severity, filters?.status, filters?.search]
  );

  const fetch = useCallback(async (isBackground: boolean) => {
    if (isBackground) {
      setIsFetching(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const result = await complaintService.getAll(filters);
      setData(result);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [filterKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(data !== null);
  }, [fetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => fetch(true), [fetch]);

  return { data, isLoading, isFetching, error, refetch };
}
