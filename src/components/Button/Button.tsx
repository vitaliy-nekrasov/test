import React from 'react';
import './Button.css';

type ButtonVariant = 'default' | 'negative';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className = '',
  type = 'button',
  children,
  ...rest
}) => {
  const variantClass = variant === 'default'
    ? 'button--default'
    : 'button--negative';

  return (
    <button
      type={type}
      className={`button ${variantClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;