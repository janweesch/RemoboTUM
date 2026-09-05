import type { JSX } from "react";
import { useState, useEffect } from "react";
import "./AddSpeechDialog.css";
import { Button } from "../../atoms/Button/Button";

interface AddSpeechDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (title: string, text: string) => void;

  initialTitle?: string;
  initialText?: string;
  isEditing?: boolean;
}

export default function AddSpeechDialog({
  isOpen,
  onCancel,
  onSave,
  initialTitle = "",
  initialText = "",
  isEditing = false
}: AddSpeechDialogProps): JSX.Element | null {

  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setTitle(initialTitle);
    setText(initialText);
  }, [initialTitle, initialText]);

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

        <h2>
          {isEditing ? "Edit Speech" : "Add Speech"}
        </h2>

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

          <Button
            label="Cancel"
            onClick={onCancel}
          />

          <Button
            label="Save"
            onClick={handleSave}
          />

        </div>

      </div>

    </div>
  );
}