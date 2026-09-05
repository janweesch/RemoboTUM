import type { JSX } from "react";
import { Megaphone } from "lucide-react";
import "./VolumeBar.css";

interface VolumeBarProps {
    volume: number;
    onChange: (volume: number) => void;
}

export default function VolumeBar({
    volume,
    onChange
}: VolumeBarProps): JSX.Element {

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onChange(Number(event.target.value));
    };

    return (
        <div className="volume-bar">

            <Megaphone className="volume-icon" />

            <input
                className="volume-slider"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleChange}
            />

            <span className="volume-value">
                {volume}
            </span>

        </div>
    );
}