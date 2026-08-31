import { type JSX, useEffect, useState } from "react";

import SpeechListItem from "../../molecules/SpeechListItem/SpeechListItem";
import AddSpeechDialog from "../AddSpeechDialog/AddSpeechDialog";

import { type Speech } from "../../../features/connection/listeners/SpeechListener";
import SpeechPublisher from "../../../features/connection/publishers/SpeechPublisher";
import MessageRouter from "../../../features/connection/messaging/MessageRouter";

import "./SpeechSelectionView.css";

interface SpeechSelectionViewProps {
    onClose: () => void;
    onSelect: (speech: Speech) => void;
}

export default function SpeechSelectionView({onClose, onSelect}: SpeechSelectionViewProps): JSX.Element {

    const [speeches, setSpeeches] = useState<Speech[]>([]);
    const [editingSpeech, setEditingSpeech] = useState<Speech | null>(null);

    /*
     * Get speeches from the robot
     */
    useEffect(() => {

        MessageRouter.speeches.onSpeeches((actions) => {
            setSpeeches(actions);
        });

        SpeechPublisher.getSpeeches();

        return () => {
            MessageRouter.speeches.removeListener();
        };

    }, []);

    /*
     * Play / select speech
     */
    const handleSelect = (id: string) => {

    const speech = speeches.find(
        speech => speech.id === id
    );

    if (!speech) {
        return;
    }

    onSelect(speech);
    onClose();
    };

    /*
     * Open speech in edit dialog
     */
    const handleEdit = (id: string) => {
        const speech = speeches.find(
            speech => speech.id === id
        );
        if (!speech) {
            return;
        }
        setEditingSpeech(speech);
    };


    /*
     * Delete speech
     */
    const handleDelete = (id: string) => {
        console.log("Deleting speech:", id);
        SpeechPublisher.deleteSpeech(id);
    };


    /*
     * Save edited speech
     */
    const handleSave = (title: string, text: string) => {

        if (!editingSpeech) {
            return;
        }
        SpeechPublisher.updateSpeech(
            editingSpeech.id,
            title,
            text
        );
        setEditingSpeech(null);
    };

    return (
        <div className="speech-selection-view">

            <div className="speech-list">

                {speeches.map((speech) => (

                    <SpeechListItem
                        key={speech.id}
                        id={speech.id}
                        title={speech.title}
                        onSelect={handleSelect}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                ))}

            </div>
            <AddSpeechDialog
                isOpen={editingSpeech !== null}
                initialTitle={editingSpeech?.title ?? ""}
                initialText={editingSpeech?.text ?? ""}
                onCancel={() => {setEditingSpeech(null);}}
                onSave={handleSave}/>
        </div>
    );
}

