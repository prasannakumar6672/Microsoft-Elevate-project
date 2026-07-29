import { useState, useEffect, useCallback } from 'react';
import { teamService } from '../services/team.service';
import type { Team } from '../types/team.types';
import type { ApiError } from '../types/api.types';

export function useTeams() {
  const [data, setData] = useState<Team[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetch = useCallback(async (background = false) => {
    background ? setIsFetching(true) : setIsLoading(true);
    setError(null);
    try {
      const result = await teamService.getTeams();
      setData(result);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  const refetch = useCallback(() => fetch(true), [fetch]);

  return { data, isLoading, isFetching, error, refetch };
}
