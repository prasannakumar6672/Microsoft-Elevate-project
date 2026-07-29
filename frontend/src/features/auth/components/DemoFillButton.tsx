import React from 'react';

interface DemoFillButtonProps {
  onFill: () => void;
}

export function DemoFillButton({ onFill }: DemoFillButtonProps) {
  // Only render if demo mode is enabled or in development environment
  const isDemo = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.DEV;
  if (!isDemo) return null;

  return (
    <button
      type="button"
      onClick={onFill}
      style={{
        width: '100%',
        padding: '8px',
        borderRadius: 8,
        border: '1px dashed rgba(255,92,0,0.4)',
        background: 'rgba(255,92,0,0.05)',
        color: 'var(--orange)',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: 12,
        marginBottom: 16,
      }}
    >
      ⚡ Fill Demo Credentials
    </button>
  );
}
