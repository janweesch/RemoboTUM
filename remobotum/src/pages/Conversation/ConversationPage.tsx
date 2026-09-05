import "./ConversationPage.css";
import { type JSX, useState } from "react";

import {
    BackButton,
    PopUpButton,
    SettingsButton
} from "../../components/atoms/IconButton/IconButton";

import PageHeader from "../../components/molecules/PageHeader/PageHeader";
import BottomBar from "../../components/molecules/BottomBar/BottomBar";

import BottomSheet from "../../components/organisms/BottomSheet/BottomSheet";
import ConversationInterface from "../../components/organisms/ConversationInterface/ConversationInterface";
import SpeechSelectionView from "../../components/organisms/SpeechSelectionView/SpeechSelectionView";

import { useNavigate } from "react-router-dom";

import SpeechPublisher from "../../features/connection/publishers/SpeechPublisher";
import type { Speech } from "../../features/connection/listeners/SpeechListener";


export default function ConversationPage(): JSX.Element {

    const navigate = useNavigate();

    const [isPlaying, setIsPlaying] = useState(false);

    const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);

    const [isSelectOpen, setIsSelectOpen] = useState(false);


    // --------------------------------------------------
    // PLAY
    // --------------------------------------------------

    const handlePlay = () => {

        if (!selectedSpeech) {
            return;
        }

        SpeechPublisher.playSpeech(selectedSpeech.id);
        setIsPlaying(true);
    };


    // --------------------------------------------------
    // PAUSE
    // --------------------------------------------------

    const handlePause = () => {

        SpeechPublisher.pauseSpeech();
        setIsPlaying(false);
    };


    // --------------------------------------------------
    // STOP
    // --------------------------------------------------

    const handleStop = () => {

        SpeechPublisher.stopSpeech();
        setIsPlaying(false);
    };


    // --------------------------------------------------
    // SELECT SPEECH
    // --------------------------------------------------

    const handleSpeechSelect = (speech: Speech) => {

        // Remember selected speech
        setSelectedSpeech(speech);

        // Immediately play selected speech
        SpeechPublisher.playSpeech(speech.id);

        // Update play/pause interface
        setIsPlaying(true);

        // Close bottom sheet
        setIsSelectOpen(false);
    };


    return (
        <div className="conversation-page-wrapper">

            <PageHeader>

                <BackButton
                    position="top-left-fixed"
                    onClick={() => navigate(-1)}
                />

                <SettingsButton
                    position="top-right-fixed"
                    onClick={() => navigate("/settings")}
                />

            </PageHeader>


            {/* Selected speech title */}
            {selectedSpeech && (
                <div className="selected-speech">
                    {selectedSpeech.title}
                </div>
            )}


            {/* Play / Pause / Stop controls */}
            <ConversationInterface
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onStop={handleStop}
            />


            {/* Bottom bar */}
            <BottomBar>

                <PopUpButton
                    onClick={() => setIsSelectOpen(true)}
                />

            </BottomBar>


            {/* Speech selection bottom sheet */}
            <BottomSheet
                isOpen={isSelectOpen}
                onClose={() => setIsSelectOpen(false)}
            >

                <SpeechSelectionView
                    onClose={() => setIsSelectOpen(false)}
                    onSelect={handleSpeechSelect}
                />

            </BottomSheet>

        </div>
    );
}
