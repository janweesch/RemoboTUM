import { type JSX } from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  percentage: number;
  position?: 'top-left-fixed' | 'relative';
}


const getBatteryColor = (percentage: number): string => {
  if (percentage <= 20) {
    return "red";
  }

  if (percentage <= 50) {
    return "yellow";
  }

  return "green";
};

export default function ProgressBar({percentage, position = 'relative'}: ProgressBarProps): JSX.Element {

  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`progress-bar-container progress-bar-${position}`}>
      <div className="progress-bar-fill" style={{ width: `${clampedPercentage}%`, backgroundColor: getBatteryColor(clampedPercentage)}}/>

      <span className="progress-bar-text">{clampedPercentage}%</span>
    </div>
  );
}