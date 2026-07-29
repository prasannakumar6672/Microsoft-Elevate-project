import React, { useState } from 'react';
import { FormField } from '../../../../../components/molecules/FormField/FormField';
import { Input } from '../../../../../components/atoms/Input/Input';
import { Textarea } from '../../../../../components/atoms/Input/Textarea';
import { Button } from '../../../../../components/atoms/Button/Button';
import { Spinner } from '../../../../../components/atoms/Spinner/Spinner';
import type { Detection } from '../../../../../types/detection.types';

interface ComplaintFormStepProps {
  detection: Detection | null;
  onSubmit: (title: string, description: string, address: string) => void;
  isSubmitting: boolean;
}

export function ComplaintFormStep({ detection, onSubmit, isSubmitting }: ComplaintFormStepProps) {
  const [title, setTitle] = useState(
    detection ? `${detection.damage_type} at ${detection.address || 'Kukatpally'}` : 'Road Damage Complaint'
  );
  const [address, setAddress] = useState(detection?.address || 'Kukatpally, Hyderabad');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 20 }}>
        Step 4: Finalize Complaint Details
      </h3>

      <FormField label="Complaint Title">
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </FormField>

      <FormField label="GPS Location / Landmark">
        <Input
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Additional Details / Impact (Optional)">
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe hazard impact, e.g., near bus stop, causing traffic slowdowns..."
        />
      </FormField>

      <Button type="submit" fullWidth disabled={isSubmitting} style={{ marginTop: 12 }}>
        {isSubmitting ? <Spinner size={18} /> : null}
        <span>{isSubmitting ? 'Submitting Report...' : 'Submit Official Civic Complaint'}</span>
      </Button>
    </form>
  );
}
