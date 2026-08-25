import type { JSX } from "react";
import "./VoicePlayback.css"

interface VoicePlaybackProps {
  isPlaying: boolean;
}

export default function VoicePlayback({isPlaying}: VoicePlaybackProps): JSX.Element {

  return (
    <div className={`voice-playback ${isPlaying ? "playing" : ""}`}>
      <span className="voice-bar" />
      <span className="voice-bar" />
      <span className="voice-bar" />
      <span className="voice-bar" />
      <span className="voice-bar" />
      <span className="voice-bar" />
      <span className="voice-bar" />
      <span className="voice-bar" />
    </div>
  );
}