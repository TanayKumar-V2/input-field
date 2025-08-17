InputField Component

A highly flexible and accessible input component built with React, TypeScript, and Tailwind CSS. It supports various states, visual variants, and optional features like clear and password toggles, designed for seamless integration and robust user interaction.
🚀 Overview

The InputField component is designed for modularity and reusability, providing a consistent and customizable text input solution across your application. Its styling leverages Tailwind CSS for efficiency and responsiveness, including built-in support for light and dark themes when the parent container has the dark class.
🧩 Features:

    Text Input: Basic text input functionality with clear label, placeholder, helperText, and errorMessage props.

    States: Visually distinct states for disabled, invalid (for validation feedback), and loading (with an integrated spinner).

    Variants: Three distinct visual styles:

        filled: Has a solid background.

        outlined: Features a clear border.

        ghost: Minimal styling, often just a bottom border on focus/hover.

    Sizes: Control the input's size with sm (small), md (medium), and lg (large) options.

    Optional Clear Button: A clickable icon appears inside the input to clear its content when showClearButton is true and the input has a value.

    Optional Password Toggle: For inputs with type="password", a toggle button allows users to show or hide the password.

    Theme Support: Automatically adapts to light and dark modes based on your Tailwind CSS configuration and the presence of a dark class on a parent element.

    Accessibility: Utilizes useId for unique IDs to link labels and inputs, and includes aria-invalid for screen readers.

📦 Props:

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
  className?: string; // Optional custom Tailwind CSS classes
}

🧑‍💻 Usage Example:

To integrate InputField into your React application, import it and pass the necessary props:

import React, { useState } from 'react';
import InputField from './components/InputField/InputField'; // Adjust path as per your project structure

const MyForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [emailError, setEmailError] = useState(false);

  return (
    <div className="p-4 space-y-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Input Field Examples</h2>

      <InputField
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        helperText="This is your unique identifier."
        variant="outlined"
        size="md"
      />

      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showClearButton
        variant="filled"
      />

      <InputField
        label="Email"
        placeholder="your@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(!e.target.value.includes('@')); // Simple validation example
        }}
        invalid={emailError}
        errorMessage="Please enter a valid email address."
        variant="ghost"
      />

      <InputField
        label="Disabled Field"
        value="You cannot edit this"
        disabled
        size="sm"
        helperText="This field is currently inactive."
      />

      <InputField
        label="Loading Data"
        placeholder="Fetching..."
        isLoading
        size="lg"
      />
    </div>
  );
};

export default MyForm;

