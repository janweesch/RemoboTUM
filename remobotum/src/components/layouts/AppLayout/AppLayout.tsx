import { type JSX, type ReactNode } from "react";
import { StopButton } from "../../atoms/Button/Button";
import "./AppLayout.css";
import MovementPublisher from "../../../features/connection/publishers/MovementPublisher";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({children}: AppLayoutProps): JSX.Element {

    const handleStop = () => {
        MovementPublisher.stopMovement();
        console.log("STOP ROBOT");
    };

    return (
        <div className="app-layout">
            {children}
            <StopButton position="bottom-center-fixed" onClick={handleStop}/>
        </div>
    );
}