import WebSocket from "../websocket/WebSocket";

class QueuePublisher {

deleteFromQueue(queueId: string) {

    WebSocket.send(
    JSON.stringify({
        type: "queue",
        action: "delete",
        queueId: queueId
    })
);
}
}

export default new QueuePublisher();
