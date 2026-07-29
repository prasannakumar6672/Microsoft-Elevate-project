import React from 'react';

interface RoleTabSelectorProps {
  role: 'citizen' | 'official';
  onChange: (role: 'citizen' | 'official') => void;
}

export function RoleTabSelector({ role, onChange }: RoleTabSelectorProps) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--card2)',
        borderRadius: 10,
        padding: 4,
        marginBottom: 20,
      }}
    >
      <button
        type="button"
        onClick={() => onChange('citizen')}
        style={{
          flex: 1,
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          background: role === 'citizen' ? 'var(--orange)' : 'transparent',
          color: role === 'citizen' ? '#fff' : 'var(--muted)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        Citizen Portal
      </button>
      <button
        type="button"
        onClick={() => onChange('official')}
        style={{
          flex: 1,
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          background: role === 'official' ? 'var(--orange)' : 'transparent',
          color: role === 'official' ? '#fff' : 'var(--muted)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        Official Portal
      </button>
    </div>
  );
}
