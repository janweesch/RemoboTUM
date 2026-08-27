import WebSocket from "../websocket/WebSocket";

class MovementPublisher {

addToQueue(movementId: number) {


WebSocket.send(
  JSON.stringify({
    type: "movement",
    actionId: movementId
  })
);

}

}

export default new MovementPublisher();
