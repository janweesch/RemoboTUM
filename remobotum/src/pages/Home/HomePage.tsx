import {type JSX, useState, useEffect} from "react"
import Switch from "../../components/atoms/Switch/Switch";
import {SettingsButton}  from "../../components/atoms/IconButton/IconButton";
import { ButtonContainer } from "../../components/molecules/ButtonContainer/ButtonContainer";
import { Button } from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import "../../components/atoms/Button/Button.css"
import './HomePage.css';
import ConfirmationDialog from "../../components/molecules/ConfirmationDialog/ConfirmationDialog";
import ProgressBar from "../../components/atoms/ProgressBar/ProgressBar";
import PageHeader from "../../components/molecules/PageHeader/PageHeader";
import messagerouter from "../../features/connection/messaging/messagerouter";



export default function HomePage(): JSX.Element {
  
  const [battery, setBattery] = useState(100);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [value, setValue] = useState(false);
  const navigate = useNavigate();

  const handleFollowMeChange = () => {
    if (!value) 
      {
        setIsConfirmOpen(true)
      }
    else 
      {
        setValue(false);
      }
    };

  const handleConfirmFollowMe = () => {setValue(prev => !prev); setIsConfirmOpen(false);};

  const handleCancelFollowMe = () => {setIsConfirmOpen(false);};
  
  useEffect(() => {messagerouter.getBattery().onBattery((percentage) => {setBattery(percentage);});

  return () => {messagerouter.getBattery().removeListener();};

  }, []);

  return (
    <div className="home-page-wrapper">
      
      <PageHeader>
        <ProgressBar percentage={battery} position="top-left-fixed" />
        <SettingsButton position="top-right-fixed" onClick={() => navigate('settings')} />
      </PageHeader> 

      <div className="home-page-content">
        <ButtonContainer container='button-container-vertical'  gap={20}>
          <Button label="Conversation" onClick={()=>navigate('/conversation')}/>
          <Button label="Movements" onClick={() => navigate('/movements')}/>
          <Button label="Remote Control" onClick={() => navigate('/remote-control')}/>
          <Switch isOn={value} onChange={handleFollowMeChange} label="Follow Me"/>
        </ButtonContainer>
      </div>

      <ConfirmationDialog isOpen={isConfirmOpen} title="Enable Follow Me?" message="Are you sure you want to enable Follow Me?" onCancel={handleCancelFollowMe} onConfirm={handleConfirmFollowMe}/>
    </div>
  );
}