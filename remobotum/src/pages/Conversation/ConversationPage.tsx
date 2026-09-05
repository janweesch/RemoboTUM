import "./ConversationPage.css";
import { type JSX, useState } from "react";

import {
    BackButton,
    PopUpButton,
    SettingsButton
} from "../../components/atoms/IconButton/IconButton";

import { Button } from "../../components/atoms/Button/Button";
import PageHeader from "../../components/molecules/PageHeader/PageHeader";
import BottomBar from "../../components/molecules/BottomBar/BottomBar";

import BottomSheet from "../../components/organisms/BottomSheet/BottomSheet";
import ConversationInterface from "../../components/organisms/ConversationInterface/ConversationInterface";
import AddSpeechDialog from "../../components/organisms/AddSpeechDialog/AddSpeechDialog";
import SpeechSelectionView from "../../components/organisms/SpeechSelectionView/SpeechSelectionView";

import { useNavigate } from "react-router-dom";

import SpeechPublisher from "../../features/connection/publishers/SpeechPublisher";
import type { Speech } from "../../features/connection/listeners/SpeechListener";


export default function ConversationPage(): JSX.Element {

    const navigate = useNavigate();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);

    const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const handlePlay = () => {

    if (!selectedSpeech) {
        return;
    }

    SpeechPublisher.playSpeech(selectedSpeech.id);
    setIsPlaying(true);
  };

    const handlePause = () => {
        SpeechPublisher.pauseSpeech();
        setIsPlaying(false);
  };

    const handleStop = () => {
        SpeechPublisher.stopSpeech();
        setIsPlaying(false);
  };

    // --------------------------------------------------
    // ADD SPEECH
    // --------------------------------------------------

    const handleSaveSpeech = (
        title: string,
        text: string
    ) => {

        SpeechPublisher.addSpeech(
            title,
            text
        );

        setIsAddDialogOpen(false);
    };

  const handleSpeechSelect = (speech: Speech) => {
    setSelectedSpeech(speech);
  };


    return (
        <div className="conversation-page-wrapper">

            <PageHeader>
              <BackButton position="top-left-fixed" onClick={() => navigate("/")}/>
              <SettingsButton position="top-right-fixed" onClick={() => navigate("/settings")}/>
            </PageHeader>


            {selectedSpeech && (
              <div className="selected-speech">
                {selectedSpeech.title}
              </div>
            )}

            <ConversationInterface isPlaying={isPlaying} onPlay={handlePlay} onPause={handlePause} onStop={handleStop}/>

            <BottomBar>            
              <PopUpButton onClick={() => setIsSelectOpen(true)}/>
              {/* <Button label="Add" position="bottom-left-fixed" onClick={() => setIsAddDialogOpen(true)} />
              <Button label="Select" position="bottom-right-fixed" onClick={() => setIsSelectOpen(true)}/> */}
            </BottomBar>

            <AddSpeechDialog isOpen={isAddDialogOpen} onCancel={() => setIsAddDialogOpen(false)} onSave={handleSaveSpeech}/>

            <BottomSheet isOpen={isSelectOpen} onClose={() => setIsSelectOpen(false)}>
                <SpeechSelectionView onClose={() => setIsSelectOpen(false)} onSelect={handleSpeechSelect}/>
            </BottomSheet>

        </div>
    );
}

