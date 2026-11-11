import './Button.css';

function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon: Icon,
  iconOnly = false,
  className = '',
  iconSize = 18,
  ariaLabel,
}) {
  const buttonClasses = [
    'button',
    `button-${variant}`,
    fullWidth && 'button-full-width',
    iconOnly && 'button-icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {Icon && <Icon size={iconSize} aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
