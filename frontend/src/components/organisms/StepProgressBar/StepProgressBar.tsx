import { Check } from 'lucide-react';
import styles from './StepProgressBar.module.css';

export interface StepConfig {
  number: number;
  label: string;
}

interface StepProgressBarProps {
  steps: StepConfig[];
  currentStep: number;
  className?: string;
}

export function StepProgressBar({ steps, currentStep, className = '' }: StepProgressBarProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {steps.map(step => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className={styles.stepItem}>
            <div
              className={`${styles.stepCircle} ${
                isCompleted ? styles.completed : isActive ? styles.active : ''
              }`}
            >
              {isCompleted ? <Check size={16} /> : step.number}
            </div>
            <span
              className={`${styles.label} ${
                isActive || isCompleted ? styles.labelActive : ''
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
