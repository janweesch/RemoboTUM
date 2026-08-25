import "./ConversationPage.css"
import { type JSX, useState } from 'react';
import { PopUpButton, BackButton, SettingsButton } from '../../components/atoms/IconButton/IconButton';
import { Button } from '../../components/atoms/Button/Button';
import PageHeader from '../../components/molecules/PageHeader/PageHeader';
import BottomBar from '../../components/molecules/BottomBar/BottomBar';
import { useNavigate } from "react-router-dom";
import ConversationInterface from "../../components/organisms/ConversationInterface/ConversationInterface";
import AddSpeechDialog from "../../components/organisms/AddSpeechDialog/AddSpeechDialog";

export default function ConversationPage(): JSX.Element
{
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handlePlay = () => {
  setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div className="conversation-page-wrapper">
        <PageHeader>
            <BackButton position="top-left-fixed" onClick={() => navigate('/')} />
            <SettingsButton position="top-right-fixed" onClick={() => navigate("/settings")} />
        </PageHeader>

        <ConversationInterface isPlaying={isPlaying} onPlay={handlePlay} onPause={handlePause} onStop={handleStop}/>
      
        <BottomBar>
          <Button label="Add" position="bottom-left-fixed" onClick={()=> setIsAddDialogOpen(true)}/>
          <PopUpButton onClick={()=>setIsSheetOpen(true)}/>
          <Button label="Select" position="bottom-right-fixed" onClick={()=>navigate('')}/>
        </BottomBar>

        <AddSpeechDialog 
        isOpen={isAddDialogOpen} 
        onCancel={() => setIsAddDialogOpen(false)} 
        onSave={(title, text) => {console.log("Title:", title);
        console.log("Text:", text); 
        setIsAddDialogOpen(false);}}/>

      {/* <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <QueueList items={queueItems} onClose={() => setIsSheetOpen(false)} onDelete={handleDeleteQueueItem}/>
      </BottomSheet> */}
    </div>
  );
}