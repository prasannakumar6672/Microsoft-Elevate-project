import { useState } from 'react';
import { SearchBar } from '../../../../components/molecules/SearchBar/SearchBar';
import { ComplaintCard } from './ComplaintCard';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import { EmptyState } from '../../../../components/molecules/EmptyState/EmptyState';
import { AlertBanner } from '../../../../components/molecules/AlertBanner/AlertBanner';
import { useComplaints } from '../../../../hooks/useComplaints';
import { useDebouncedSearch } from '../../../../hooks/useDebouncedSearch';

export function TrackTab() {
  const { data: complaints, isLoading, error } = useComplaints();
  const { query, setQuery, debouncedQuery } = useDebouncedSearch(250);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Resolved'>('All');

  const filtered = (complaints || []).filter(c => {
    const matchFilter = filter === 'All' || c.status === filter;
    const matchSearch =
      !debouncedQuery ||
      c.complaint_number.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (c.address || '').toLowerCase().includes(debouncedQuery.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search by ticket ID or address..." />
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {(['All', 'Pending', 'In Progress', 'Resolved'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${filter === s ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
                background: filter === s ? 'rgba(255,92,0,0.15)' : 'rgba(255,255,255,0.01)',
                color: filter === s ? 'var(--orange)' : 'var(--muted)',
                fontSize: '0.78rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Spinner size={32} />
        </div>
      ) : error ? (
        <AlertBanner type="error">{error.message}</AlertBanner>
      ) : filtered.length === 0 ? (
        <EmptyState title="No Matching Tickets" message="No complaints found matching your search filters." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map(c => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      )}
    </div>
  );
}
