import { useState, useCallback, useRef, useEffect } from 'react';
import { detectionService } from '../services/detection.service';
import type { Detection, DetectionPhase } from '../types/detection.types';
import type { ApiError } from '../types/api.types';

export function useDetection() {
  const [phase, setPhase] = useState<DetectionPhase>(0);
  const [detection, setDetection] = useState<Detection | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const startAnalysis = useCallback(async (file: File) => {
    clearTimers();
    setIsAnalyzing(true);
    setError(null);
    setPhase(0);

    // Schedule visual phases for realistic feedback
    timersRef.current.push(setTimeout(() => setPhase(1), 600));
    timersRef.current.push(setTimeout(() => setPhase(2), 1400));
    timersRef.current.push(setTimeout(() => setPhase(3), 2200));

    try {
      const result = await detectionService.predict(file);
      timersRef.current.push(
        setTimeout(() => {
          setDetection(result);
          setIsAnalyzing(false);
        }, 2600)
      );
    } catch (err) {
      timersRef.current.push(
        setTimeout(() => {
          setError(err as ApiError);
          setIsAnalyzing(false);
        }, 2600)
      );
    }
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase(0);
    setDetection(null);
    setIsAnalyzing(false);
    setError(null);
  }, [clearTimers]);

  return {
    phase,
    detection,
    isAnalyzing,
    error,
    startAnalysis,
    reset,
  };
}
