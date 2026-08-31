import { BackButton } from "../../components/atoms/IconButton/IconButton";
import PageHeader from "../../components/molecules/PageHeader/PageHeader";
import Joystick from "../../components/organisms/JoyStick/JoyStick";
import { useNavigate } from "react-router-dom";
import "./RemoteControlPage.css"

export default function RemoteControlPage() {

    const navigate = useNavigate();

    const handleMove = (value: { x: number; y: number }) => {
        console.log("Joystick:", value);
    };

    const handleRelease = () => {
        console.log("Joystick released");
    };

    return (
        <div className="remotecontrol-page-wrapper">

            <PageHeader> 
                    <BackButton onClick={() => navigate('/')} /> 
            </PageHeader>

            <Joystick onMove={handleMove} onRelease={handleRelease}/>            
        </div>
    );
}