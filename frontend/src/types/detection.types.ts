import type { SEVERITY } from '../constants/severity';

export type SeverityLevel = typeof SEVERITY[keyof typeof SEVERITY];
export type DamageType = 'Pothole' | 'Crack' | 'No Damage';
export type DetectionPhase = 0 | 1 | 2 | 3;

export interface Detection {
  detection_id: string;
  damage_type: DamageType;
  confidence: number;
  severity_level: SeverityLevel;
  severity_score: number;
  damage_count: number;
  annotated_image_url?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}
