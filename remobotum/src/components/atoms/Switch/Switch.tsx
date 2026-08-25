import './Switch.css';
import { type FC } from 'react';

interface SwitchProps {
  isOn: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  testId?: string;
}

/**
 * Toggle Switch Component
 * 
 * A customizable switch component with label support.
 * Uses CSS variables for theming and dark mode support.
 * 
 * @example
 * <Switch 
 *   isOn={isOn}
 *   onChange={setIsOn}
 *   label="Enable notifications"
 * />
 */
const Switch: FC<SwitchProps> = ({
  isOn,
  onChange,
  label,
  disabled = false,
  testId = 'switch-component'
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!isOn);
    }
  };

  return (
    <div className="switch-wrapper" data-testid={testId}>
      {label && (
        <span className="switch-label-text">
          {label}
        </span>
      )}
      
      <input
        checked={isOn}
        onChange={handleChange}
        className="react-switch-checkbox"
        id={`switch-${label || 'default'}`}
        type="checkbox"
        disabled={disabled}
        aria-label={label || 'Toggle switch'}
      />
      
      <label
        className="react-switch-label"
        htmlFor={`switch-${label || 'default'}`}
      >
        <span className="react-switch-button" />
      </label>
    </div>
  );
};

export default Switch;