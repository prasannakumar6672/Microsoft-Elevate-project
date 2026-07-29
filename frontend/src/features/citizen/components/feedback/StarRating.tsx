import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange?: (r: number) => void;
  readOnly?: boolean;
}

export function StarRating({ rating, onChange, readOnly = false }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(star => {
        const active = star <= (hover || rating);
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: readOnly ? 'default' : 'pointer',
              padding: 2,
            }}
          >
            <Star
              size={24}
              fill={active ? 'var(--yellow)' : 'transparent'}
              color={active ? 'var(--yellow)' : 'var(--muted)'}
              style={{ transition: 'all 0.2s ease' }}
            />
          </button>
        );
      })}
    </div>
  );
}
