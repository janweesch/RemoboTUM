import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../../components/molecules/PageHeader/PageHeader";
import ScrollableView from "../../../../../components/molecules/ScrollableButtonList/ScrollableView";

import { BackButton } from "../../../../../components/atoms/IconButton/IconButton";
import { Button } from "../../../../../components/atoms/Button/Button";

import SpeechListItem from "../../../../../components/molecules/SpeechListItem/SpeechListItem";
import AddSpeechDialog from "../../../../../components/organisms/AddSpeechDialog/AddSpeechDialog";

import SpeechPublisher from "../../../../../features/connection/publishers/SpeechPublisher";
import type { Speech } from "../../../../../features/connection/listeners/SpeechListener";

import "./SpeechesPage.css";
import BottomBar from "../../../../../components/molecules/BottomBar/BottomBar";

export default function SpeechesPage(): JSX.Element {

    const navigate = useNavigate();

    const [speeches, setSpeeches] = useState<Speech[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSpeech, setEditingSpeech] = useState<Speech | null>(null);

    const handleAddSpeech = () => {
        setEditingSpeech(null);
        setIsAddDialogOpen(true);
    };

    const handleEdit = (id: string) => {
        const speech = speeches.find(
            (speech) => speech.id === id
        );

        if (!speech) {
            return;
        }

        setEditingSpeech(speech);
        setIsAddDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        SpeechPublisher.deleteSpeech(id);

        setSpeeches((currentSpeeches) =>
            currentSpeeches.filter(
                (speech) => speech.id !== id
            )
        );
    };

    const handleSaveSpeech = (title: string, text: string) => {

        if (editingSpeech) {

            SpeechPublisher.updateSpeech(
                editingSpeech.id,
                title,
                text
            );

            setSpeeches((currentSpeeches) =>
                currentSpeeches.map((speech) =>
                    speech.id === editingSpeech.id
                        ? {
                            ...speech,
                            title,
                            text
                        }
                        : speech
                )
            );

        } else {

            SpeechPublisher.addSpeech(title, text);
        }

        setIsAddDialogOpen(false);
        setEditingSpeech(null);
    };

    return (
        <div className="speeches-page-wrapper">

            <PageHeader>
                <BackButton
                    position="top-left-fixed"
                    onClick={() => navigate(-1)}
                />
            </PageHeader>

            <ScrollableView gap={10}>

                {speeches.map((speech) => (
                    <SpeechListItem
                        key={speech.id}
                        id={speech.id}
                        title={speech.title}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}

            </ScrollableView>

            <BottomBar>
                <Button
                    label="Add Speech"
                    position="relative"
                    onClick={handleAddSpeech}
                />
            </BottomBar>


            <AddSpeechDialog
                isOpen={isAddDialogOpen}
                initialTitle={editingSpeech?.title ?? ""}
                initialText={editingSpeech?.text ?? ""}
                isEditing={editingSpeech !== null}
                onCancel={() => {
                    setIsAddDialogOpen(false);
                    setEditingSpeech(null);
                }}
                onSave={handleSaveSpeech}
            />

        </div>
    );
}