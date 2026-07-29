import { useState } from 'react';
import { ComplaintFilters } from './ComplaintFilters';
import { ComplaintListItem } from './ComplaintListItem';
import { ComplaintDetailDrawer } from './ComplaintDetailDrawer';
import { SearchBar } from '../../../../components/molecules/SearchBar/SearchBar';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import { EmptyState } from '../../../../components/molecules/EmptyState/EmptyState';
import { AlertBanner } from '../../../../components/molecules/AlertBanner/AlertBanner';
import { useAllComplaints } from '../../../../hooks/useAllComplaints';
import { useDebouncedSearch } from '../../../../hooks/useDebouncedSearch';
import type { Complaint } from '../../../../types/complaint.types';

export function AllComplaintsTab() {
  const [filter, setFilter] = useState('All');
  const { query, setQuery, debouncedQuery } = useDebouncedSearch(250);
  const [selected, setSelected] = useState<Complaint | null>(null);

  const { data: complaints, isLoading, error, refetch } = useAllComplaints();

  const filtered = (complaints || []).filter(c => {
    const matchFilter =
      filter === 'All' ||
      (c.severity_level || c.priority) === filter ||
      c.status === filter;

    const matchSearch =
      !debouncedQuery ||
      c.complaint_number.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (c.address || c.title).toLowerCase().includes(debouncedQuery.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: selected ? '1.2fr 1.3fr' : '1fr',
        gap: 24,
        transition: 'all 0.3s ease',
      }}
    >
      <div>
        <ComplaintFilters activeFilter={filter} onFilterChange={setFilter} />

        <div style={{ marginBottom: 16 }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search by ID number or street area..."
          />
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <Spinner size={32} />
          </div>
        ) : error ? (
          <AlertBanner type="error">{error.message}</AlertBanner>
        ) : filtered.length === 0 ? (
          <EmptyState title="No Complaints Found" message="No records match your active search filter." />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              maxHeight: 520,
              overflowY: 'auto',
              paddingRight: 4,
            }}
          >
            {filtered.map(c => (
              <ComplaintListItem
                key={c.id}
                complaint={c}
                isSelected={selected?.id === c.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <ComplaintDetailDrawer
          complaint={selected}
          onClose={() => setSelected(null)}
          onRefresh={refetch}
        />
      )}
    </div>
  );
}
