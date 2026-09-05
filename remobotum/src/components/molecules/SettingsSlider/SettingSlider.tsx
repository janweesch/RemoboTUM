import type { JSX } from "react";
import "./SettingSlider.css";

interface SettingSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (value: number) => void;
}

export default function SettingSlider({
    label,
    value,
    min,
    max,
    step,
    unit,
    onChange
}: SettingSliderProps): JSX.Element {

    return (
        <div className="setting-slider">

            <div className="setting-slider-header">
                <span className="setting-slider-label">
                    {label}
                </span>

                <span className="setting-slider-value">
                    {value} {unit}
                </span>
            </div>

            <input
                className="setting-slider-input"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) =>
                    onChange(Number(event.target.value))
                }
            />

            <div className="setting-slider-range">
                <span>{min} {unit}</span>
                <span>{max} {unit}</span>
            </div>

        </div>
    );
}