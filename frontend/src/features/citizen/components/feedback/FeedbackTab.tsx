import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { FormField } from '../../../../components/molecules/FormField/FormField';
import { Textarea } from '../../../../components/atoms/Input/Textarea';
import { Button } from '../../../../components/atoms/Button/Button';
import { useNotification } from '../../../../store/notification/useNotification';

export function FeedbackTab() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { notify } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    notify({ type: 'success', message: 'Thank you for your feedback! It helps improve municipal repair quality.' });
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="card">
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 8 }}>
          Citizen Service Quality Feedback
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>
          Rate your experience with the AI damage detection and municipal road repair turnaround time.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--green)', fontSize: '1.1rem', marginBottom: 8 }}>
              Feedback Submitted Successfully!
            </h4>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 16 }}>
              Your review has been routed to the Municipal Oversight Committee.
            </p>

            <Button variant="ghost" onClick={() => { setSubmitted(false); setComment(''); }}>
              Submit Another Review
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField label="Overall Service Rating">
              <StarRating rating={rating} onChange={setRating} />
            </FormField>

            <FormField label="Detailed Comments or Suggestions">
              <Textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your thoughts on repair quality, crew response time, or app experience..."
                required
              />
            </FormField>

            <Button type="submit" variant="primary" style={{ marginTop: 8 }}>
              Submit Official Review
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
