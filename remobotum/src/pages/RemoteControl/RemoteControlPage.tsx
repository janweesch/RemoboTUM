import { useNavigate } from "react-router-dom";

import { BackButton } from "../../components/atoms/IconButton/IconButton";
import PageHeader from "../../components/molecules/PageHeader/PageHeader";
import Joystick from "../../components/organisms/JoyStick/JoyStick";

import "./RemoteControlPage.css";

export default function RemoteControlPage() {
    const navigate = useNavigate();

    const handleLeftMove = (value: { x: number; y: number }) => {
        console.log("Left joystick:", value);
    };

    const handleLeftRelease = () => {
        console.log("Left joystick released");
    };

    const handleRightMove = (value: { x: number; y: number }) => {
        console.log("Right joystick:", value);
    };

    const handleRightRelease = () => {
        console.log("Right joystick released");
    };

    return (
        <div className="remotecontrol-page-wrapper">

            <PageHeader>
                <BackButton onClick={() => navigate(-1)} />
            </PageHeader>

            <div className="joysticks-container">

                <div className="joystick-left">
                    <Joystick
                        onMove={handleLeftMove}
                        onRelease={handleLeftRelease}
                    />
                </div>

                <div className="joystick-right">
                    <Joystick
                        onMove={handleRightMove}
                        onRelease={handleRightRelease}
                    />
                </div>

            </div>

        </div>
    );
}