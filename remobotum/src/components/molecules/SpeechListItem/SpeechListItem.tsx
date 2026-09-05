import { type JSX } from "react";
import {
    CancelButton,
    EditButton
} from "../../atoms/IconButton/IconButton";

import "./SpeechListItem.css";

interface SpeechListItemProps {
    id: string;
    title: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function SpeechListItem({
    id,
    title,
    onEdit,
    onDelete
}: SpeechListItemProps): JSX.Element {

    return (
        <div className="speech-list-item">
            <EditButton position="relative" onClick={() => onEdit(id)}/>
            <span className="speech-title"> {title} </span>
            <CancelButton position="relative" onClick={() => onDelete(id)}/>
        </div>
    );
}