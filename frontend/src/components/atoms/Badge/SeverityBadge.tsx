import { Badge } from './Badge';
import { SEVERITY_COLORS } from '../../../constants/severity';
import type { SeverityLevel } from '../../../types/detection.types';

interface SeverityBadgeProps {
  level?: SeverityLevel | string;
  className?: string;
}

export function SeverityBadge({ level = 'LOW', className }: SeverityBadgeProps) {
  const normLevel = (level?.toUpperCase() as SeverityLevel) || 'LOW';
  const colors = SEVERITY_COLORS[normLevel] || SEVERITY_COLORS.LOW;

  return (
    <Badge
      bg={colors.bg}
      color={colors.text}
      borderColor={colors.border}
      className={className}
    >
      {normLevel}
    </Badge>
  );
}
