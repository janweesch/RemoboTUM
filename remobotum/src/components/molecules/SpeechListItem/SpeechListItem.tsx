import { type JSX } from "react";
import {CancelButton, PlayButton} from "../../atoms/IconButton/IconButton";
import "./SpeechListItem.css";
import { Button } from "../../atoms/Button/Button";

interface SpeechListItemProps {
    id: string;
    title: string;
    onSelect: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function SpeechListItem({
    id,
    title,
    onSelect,
    onEdit,
    onDelete
}: SpeechListItemProps): JSX.Element {

    return ( 
    <div className="speech-list-item"> 
        <PlayButton position="relative" onClick={() => onSelect(id)} /> 
        <Button label={title} position="relative" onClick={() => onEdit(id)} />
        <CancelButton position="relative" onClick={() => onDelete(id)} /> 
    </div> 
    ); 
}

