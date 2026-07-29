import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    const classes = [
      styles.input,
      styles.textarea,
      error ? styles.hasError : '',
      className,
    ].filter(Boolean).join(' ');

    return <textarea ref={ref} className={classes} {...props} />;
  }
);

Textarea.displayName = 'Textarea';
