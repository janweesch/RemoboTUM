import "./ConversationControls.css"
import type { JSX } from "react";
import { PauseButton, PlayButton, StopButton } from "../../atoms/IconButton/IconButton";

interface ConversationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function ConversationControls({isPlaying, onPlay, onPause, onStop}: ConversationControlsProps): JSX.Element {

  return (
    <div className="conversation-controls">
      {isPlaying ? (<PauseButton onClick={onPause}/>) : (<PlayButton onClick={onPlay}/>)}
      <StopButton onClick={onStop}/>
    </div>
  );
}