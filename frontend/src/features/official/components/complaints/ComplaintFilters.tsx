interface ComplaintFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ComplaintFilters({ activeFilter, onFilterChange }: ComplaintFiltersProps) {
  const filters = ['All', 'HIGH', 'MEDIUM', 'LOW', 'Pending', 'In Progress', 'Resolved'];

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            border: `1px solid ${activeFilter === f ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
            background: activeFilter === f ? 'rgba(255,92,0,0.15)' : 'rgba(255,255,255,0.01)',
            color: activeFilter === f ? 'var(--orange)' : 'var(--muted)',
            fontSize: '0.78rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
