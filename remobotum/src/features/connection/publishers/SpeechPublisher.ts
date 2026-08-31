import WebSocket from "../websocket/WebSocket";

class SpeechPublisher {

    addSpeech(title: string, text: string) {
        WebSocket.send(
            JSON.stringify({
                type: "speech",
                action: "add",
                speech: {
                    title,
                    text
                }
            })
        );
    }

    getSpeeches() {
        WebSocket.send(
            JSON.stringify({
                type: "speech",
                action: "get"
            })
        );
    }

    playSpeech(id: string) {
        WebSocket.send(
            JSON.stringify({
                type: "speech",
                action: "play",
                id
            })
        );
    }

    pauseSpeech() {
        WebSocket.send(
            JSON.stringify({
                type: "speech",
                action: "pause"
            })
        );
    }

    stopSpeech() {
        WebSocket.send(
            JSON.stringify({
                type: "speech",
                action: "stop"
            })
        );
    }
}

export default new SpeechPublisher();