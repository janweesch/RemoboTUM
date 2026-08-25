import type { JSX } from "react";
import VoicePlayback from "../../molecules/VoicePlayback/VoicePlayback";
import ConversationControls from "../../molecules/ConversationControls/ConversationControls";
import "./ConversationInterface.css";

interface ConversationInterfaceProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function ConversationInterface({isPlaying, onPlay, onPause, onStop}: ConversationInterfaceProps): JSX.Element {

  return (
    <div className="conversation-interface">
      <VoicePlayback isPlaying={isPlaying}/> 
      <ConversationControls isPlaying={isPlaying} onPlay={onPlay} onPause={onPause} onStop={onStop}/>
    </div>
  );
}