import { useState, useCallback } from 'react';
import { StepProgressBar, StepConfig } from '../../../../components/organisms/StepProgressBar/StepProgressBar';
import { UploadStep } from './steps/UploadStep';
import { AnalysisStep } from './steps/AnalysisStep';
import { ResultStep } from './steps/ResultStep';
import { ComplaintFormStep } from './steps/ComplaintFormStep';
import { SuccessStep } from './steps/SuccessStep';
import { AlertBanner } from '../../../../components/molecules/AlertBanner/AlertBanner';
import { useDetection } from '../../../../hooks/useDetection';
import { useNotification } from '../../../../store/notification/useNotification';
import { complaintService } from '../../../../services/complaint.service';
import type { Complaint } from '../../../../types/complaint.types';

const STEPS: StepConfig[] = [
  { number: 1, label: 'Upload Photo' },
  { number: 2, label: 'AI Diagnostic' },
  { number: 3, label: 'Review Findings' },
  { number: 4, label: 'Submit Ticket' },
];

interface ReportWizardProps {
  onTrackRedirect?: () => void;
}

export function ReportWizard({ onTrackRedirect }: ReportWizardProps) {
  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { phase, detection, startAnalysis, reset: resetDetection } = useDetection();
  const { notify } = useNotification();

  const handleFileSelect = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);

    setStep(2);
    startAnalysis(file);
    // Advance to step 3 when analysis completes
    setTimeout(() => setStep(3), 2700);
  }, [startAnalysis]);

  const handleProceedToForm = () => setStep(4);

  const handleScanAgain = () => {
    resetDetection();
    setPreviewUrl(null);
    setStep(1);
  };

  const handleFormSubmit = async (title: string, description: string, address: string) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const complaint = await complaintService.create({
        detection_id: detection?.detection_id,
        title,
        description,
        address,
        damage_type: detection?.damage_type || 'Pothole',
        severity_level: detection?.severity_level || 'HIGH',
        severity_score: String(detection?.severity_score || '8.5'),
        confidence: String(detection?.confidence || '94.2'),
        latitude: String(detection?.latitude || '17.4947'),
        longitude: String(detection?.longitude || '78.3996'),
      });

      setCreatedComplaint(complaint);
      setStep(5);
      notify({ type: 'success', message: 'Complaint registered successfully!' });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Failed to submit complaint. Please try again.';
      setSubmitError(msg);
      notify({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFullReset = () => {
    resetDetection();
    setPreviewUrl(null);
    setCreatedComplaint(null);
    setSubmitError(null);
    setStep(1);
  };

  return (
    <div className="card">
      {step <= 4 && <StepProgressBar steps={STEPS} currentStep={step} />}

      {submitError && <AlertBanner type="error">{submitError}</AlertBanner>}

      {step === 1 && <UploadStep onFileSelect={handleFileSelect} />}
      {step === 2 && <AnalysisStep previewUrl={previewUrl} phase={phase} />}
      {step === 3 && (
        <ResultStep
          detection={detection}
          onProceed={handleProceedToForm}
          onScanAgain={handleScanAgain}
        />
      )}
      {step === 4 && (
        <ComplaintFormStep
          detection={detection}
          onSubmit={handleFormSubmit}
          isSubmitting={submitting}
        />
      )}
      {step === 5 && (
        <SuccessStep
          complaint={createdComplaint}
          onTrack={() => onTrackRedirect?.()}
          onReset={handleFullReset}
        />
      )}
    </div>
  );
}
