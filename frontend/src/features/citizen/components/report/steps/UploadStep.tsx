import { ImageDropzone } from '../ImageDropzone';

interface UploadStepProps {
  onFileSelect: (file: File) => void;
}

export function UploadStep({ onFileSelect }: UploadStepProps) {
  return (
    <div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', color: '#fff', marginBottom: 8 }}>
        Step 1: Upload Photo of Road Defect
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 24 }}>
        Our vision AI model will scan your photo to classify damage type and estimate severity.
      </p>
      <ImageDropzone onFileSelect={onFileSelect} />
    </div>
  );
}
