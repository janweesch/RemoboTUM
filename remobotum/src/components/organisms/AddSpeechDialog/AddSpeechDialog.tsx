import type { JSX } from "react";
import { useState } from "react";
import "./AddSpeechDialog.css";
import { Button } from "../../atoms/Button/Button";

interface AddSpeechDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (title: string, text: string) => void;
}

export default function AddSpeechDialog({isOpen, onCancel, onSave}: AddSpeechDialogProps): JSX.Element | null {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (!title.trim() || !text.trim()) {
      return;
    }

    onSave(title, text);

    setTitle("");
    setText("");
  };

  return (
    <div className="add-speech-overlay">

      <div className="add-speech-dialog">

        <h2>Add Speech</h2>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
        />

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What should the robot say?"
        />

        <div className="add-speech-actions">

            <Button label="Cancel" onClick={onCancel}/>

            <Button label="Save" onClick={handleSave}/>

        </div>

      </div>

    </div>
  );
}