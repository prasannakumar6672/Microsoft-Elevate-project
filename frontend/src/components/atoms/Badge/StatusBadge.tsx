import { Badge } from './Badge';
import { STATUS_COLORS } from '../../../constants/statuses';
import type { ComplaintStatus } from '../../../types/complaint.types';

interface StatusBadgeProps {
  status?: ComplaintStatus | string;
  className?: string;
}

export function StatusBadge({ status = 'Pending', className }: StatusBadgeProps) {
  const normStatus = (status as ComplaintStatus) || 'Pending';
  const colors = STATUS_COLORS[normStatus] || STATUS_COLORS.Pending;

  return (
    <Badge
      bg={colors.bg}
      color={colors.text}
      borderColor={colors.border}
      className={className}
    >
      {normStatus}
    </Badge>
  );
}
