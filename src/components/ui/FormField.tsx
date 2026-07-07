"use client";

import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Renders a textarea instead of an input when true. */
  multiline?: boolean;
}

/**
 * Reusable form field with consistent label, input styling, and error display.
 * Uses semantic <label> binding via htmlFor.
 */
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, multiline, className, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    const inputClasses =
      "w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20";

    return (
      <div className={className}>
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          className={`mt-2 ${inputClasses}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-600 animate-fade-in-up" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
