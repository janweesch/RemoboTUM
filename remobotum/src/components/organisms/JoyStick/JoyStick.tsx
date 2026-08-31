import { useRef, useState } from "react";
import "./JoyStick.css";

interface JoystickValue {
    x: number;
    y: number;
}

interface JoystickProps {
    onMove?: (value: JoystickValue) => void;
    onRelease?: () => void;
}

export default function Joystick({
    onMove,
    onRelease,
}: JoystickProps) {

    const joystickRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<JoystickValue>({
        x: 0,
        y: 0,
    });

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {

        if (!joystickRef.current) {
            return;
        }

        const rect = joystickRef.current.getBoundingClientRect();

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        let x = event.clientX - rect.left - centerX;
        let y = event.clientY - rect.top - centerY;

        const radius = rect.width / 2;

        const distance = Math.sqrt(x * x + y * y);

        if (distance > radius) {
            x = (x / distance) * radius;
            y = (y / distance) * radius;
        }

        const normalizedX = x / radius;
        const normalizedY = y / radius;

        const value = {
            x: normalizedX,
            y: -normalizedY,
        };

        setPosition(value);

        onMove?.(value);
    };

    const handlePointerUp = () => {

        setPosition({
            x: 0,
            y: 0,
        });

        onRelease?.();
    };

    return (
        <div
            ref={joystickRef}
            className="joystick"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <div
                className="joystick-knob"
                style={{
                    transform: `
                        translate(
                            ${position.x * 50}px,
                            ${-position.y * 50}px
                        )
                    `,
                }}
            />
        </div>
    );
}