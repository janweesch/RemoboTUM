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

    updateSpeech(id: string, title: string, text: string) {
    WebSocket.send(
        JSON.stringify({
            type: "speech",
            action: "update",
            speech: {
                id, 
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

    deleteSpeech(id: string){
        WebSocket.send(
            JSON.stringify({
                type: "speech",
                action: "delete",
                id
            })
        );
    }
}

export default new SpeechPublisher();