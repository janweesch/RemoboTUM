import { type JSX, useEffect, useState } from "react";

import ScrollableView from "../../molecules/ScrollableButtonList/ScrollableView";
import BottomBar from "../../molecules/BottomBar/BottomBar";

import { Button } from "../../atoms/Button/Button";
import { PopDownButton } from "../../atoms/IconButton/IconButton";

import { type Speech } from "../../../features/connection/listeners/SpeechListener";
import SpeechPublisher from "../../../features/connection/publishers/SpeechPublisher";
import MessageRouter from "../../../features/connection/messaging/MessageRouter";

interface SpeechSelectionViewProps {
    onClose: () => void;
    onSelect: (speech: Speech) => void;
}

export default function SpeechSelectionView({
    onClose,
    onSelect
}: SpeechSelectionViewProps): JSX.Element {

    const [speeches, setSpeeches] = useState<Speech[]>([]);

    useEffect(() => {

        MessageRouter.speeches.onSpeeches((speeches) => {
            setSpeeches(speeches);
        });

        SpeechPublisher.getSpeeches();

        return () => {
            MessageRouter.speeches.removeListener();
        };

    }, []);

    const handleSelect = (speech: Speech) => {
        onSelect(speech);
        onClose();
    };

    return (
        <div className="speech-selection-view">

            <ScrollableView gap={10}>

                {speeches.map((speech) => (

                    <Button
                        key={speech.id}
                        label={speech.title}
                        position="relative"
                        onClick={() => handleSelect(speech)}
                    />

                ))}

            </ScrollableView>

            <BottomBar>

                <PopDownButton
                    position="relative"
                    onClick={onClose}
                />

            </BottomBar>

        </div>
    );
}
