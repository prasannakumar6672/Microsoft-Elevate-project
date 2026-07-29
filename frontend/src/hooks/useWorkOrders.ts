import { useState, useEffect, useCallback } from 'react';
import { teamService } from '../services/team.service';
import type { WorkOrder } from '../types/team.types';
import type { SeverityLevel } from '../types/detection.types';
import type { ApiError } from '../types/api.types';

export function useWorkOrders() {
  const [data, setData] = useState<WorkOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetch = useCallback(async (background = false) => {
    background ? setIsFetching(true) : setIsLoading(true);
    setError(null);
    try {
      const result = await teamService.getWorkOrders();
      setData(result);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const issueWorkOrder = useCallback(async (payload: {
    complaint_id: string;
    team_id: string;
    instructions?: string;
    priority: SeverityLevel;
  }) => {
    const wo = await teamService.issueWorkOrder(payload);
    setData(prev => (prev ? [wo, ...prev] : [wo]));
    return wo;
  }, []);

  const refetch = useCallback(() => fetch(true), [fetch]);

  return { data, isLoading, isFetching, error, issueWorkOrder, refetch };
}
