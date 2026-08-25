import type { JSX } from "react";
import { Button } from "../../atoms/Button/Button";
import "./ConfirmationDialog.css"

interface ConfirmationDialogProps{
    isOpen: boolean;
    title: string;
    message: string;
    onCancel: ()=>void;
    onConfirm: ()=>void;
}

export default function ConfirmationDialog({isOpen, title, message, onCancel, onConfirm}: ConfirmationDialogProps): JSX.Element { 
    if (!isOpen) 
    {
        return <></>;
    }

    return (
        <div className="confirmation-dialog-backdrop">
            <div className="confirmation-dialog">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirmation-dialog-actions">
                    <Button onClick={onCancel} label="Cancel"/>
                    <Button onClick={onConfirm} label="Continue"/>
                </div>
            </div>
        </div>
    );
}