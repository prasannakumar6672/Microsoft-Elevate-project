import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, ...props }, ref) => {
    const classes = [
      styles.input,
      styles.select,
      error ? styles.hasError : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <select ref={ref} className={classes} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
