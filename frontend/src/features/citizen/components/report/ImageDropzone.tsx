import React, { useState, useCallback } from 'react';
import { UploadCloud, Camera } from 'lucide-react';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
}

export function ImageDropzone({ onFileSelect }: ImageDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped && dropped.type.startsWith('image/')) {
        onFileSelect(dropped);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) onFileSelect(selected);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragOver ? 'var(--orange)' : 'var(--border)'}`,
        borderRadius: 16,
        padding: '50px 30px',
        textAlign: 'center',
        background: dragOver ? 'rgba(255,92,0,0.05)' : 'rgba(255,255,255,0.01)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
      />
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(255,92,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}
      >
        <UploadCloud size={32} style={{ color: 'var(--orange)' }} />
      </div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', marginBottom: 8, color: '#fff' }}>
        Drop Road Photo Here or Click to Upload
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', maxWidth: 440, margin: '0 auto 20px' }}>
        Supports JPG, PNG, WEBP. For optimal AI detection, capture the defect directly with good lighting.
      </p>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 8, background: 'var(--card2)', color: 'var(--text)', fontSize: '0.85rem', fontWeight: 600 }}>
        <Camera size={16} style={{ color: 'var(--orange)' }} />
        <span>Use Smartphone Camera</span>
      </div>
    </div>
  );
}
