import { useState, useEffect, useCallback, useRef } from 'react';
import { complaintService } from '../services/complaint.service';
import type { Complaint } from '../types/complaint.types';
import type { ApiError } from '../types/api.types';

interface UseComplaintsResult {
  data: Complaint[] | null;
  isLoading: boolean;
  isFetching: boolean;
  error: ApiError | null;
  refetch: () => void;
}

/**
 * useComplaints — fetches the current citizen's own complaints.
 * Caches result for the session lifetime; uses refetch() for manual refresh.
 */
export function useComplaints(): UseComplaintsResult {
  const [data, setData] = useState<Complaint[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const hasFetched = useRef(false);

  const fetch = useCallback(async (background = false) => {
    if (background) {
      setIsFetching(true);
    } else if (!hasFetched.current) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const result = await complaintService.getMine();
      setData(result);
      hasFetched.current = true;
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const refetch = useCallback(() => fetch(hasFetched.current), [fetch]);

  return { data, isLoading, isFetching, error, refetch };
}
