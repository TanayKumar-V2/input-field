import React, { useState, useRef, useId} from 'react';

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  type?: 'text' | 'password';
  isLoading?: boolean;
  className?: string;
}

const App: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  showClearButton = false,
  type = 'text',
  isLoading = false,
  className,
}) => {
  const inputId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const actualInputType = type === 'password' && showPassword ? 'text' : type;

  const baseInputStyles = `
    w-full
    rounded-lg
    outline-none
    focus:outline-none
    transition-all
    duration-200
    ease-in-out
    dark:text-white
  `;

  const variantStyles = {
    filled: `
      bg-gray-100 dark:bg-gray-700
      border border-transparent
      focus:border-blue-500 focus:ring-blue-500 focus:ring-2
    `,
    outlined: `
      bg-white dark:bg-gray-800
      border border-gray-300 dark:border-gray-600
      focus:border-blue-500 focus:ring-blue-500 focus:ring-2
    `,
    ghost: `
      bg-transparent
      border-b border-gray-300 dark:border-gray-600
      rounded-none
      focus:border-blue-500 focus:ring-blue-500 focus:ring-2
      pb-1
    `,
  };

  const sizeStyles = {
    sm: 'text-sm h-8 px-2',
    md: 'text-base h-10 px-3',
    lg: 'text-lg h-12 px-4',
  };

  const stateStyles = {
    disabled: 'opacity-60 cursor-not-allowed bg-gray-200 dark:bg-gray-600 dark:text-gray-400',
    invalid: 'border-red-500 focus:border-red-500 focus:ring-red-500',
  };

  const inputClasses = `
    ${baseInputStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? stateStyles.disabled : ''}
    ${invalid ? stateStyles.invalid : ''}
    ${(type === 'password' || showClearButton || isLoading) ? 'pr-10' : ''}
  `.replace(/\s+/g, ' ').trim();

  const helperTextColor = 'text-gray-500 dark:text-gray-400';
  const errorTextColor = 'text-red-500 dark:text-red-400';

  const handleClear = () => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: inputRef.current || null,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`relative flex flex-col mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-1 text-gray-700 dark:text-gray-200 ${disabled ? 'opacity-60' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        <input
          id={inputId}
          type={actualInputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          aria-invalid={invalid}
          ref={inputRef}
          className={inputClasses}
        />

        {isLoading && (
          <div className="absolute right-3">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {!disabled && showClearButton && value && value.length > 0 && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {!disabled && type === 'password' && !isLoading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.665m1.129-1.129A8.995 8.995 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.268 5.765M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 10-6 0 3 3 0 006 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <p className={`mt-1 text-xs ${helperTextColor}`}>{helperText}</p>
      )}

      {errorMessage && invalid && (
        <p className={`mt-1 text-xs ${errorTextColor}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default App;
