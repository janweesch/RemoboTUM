import WebSocket from "../websocket/WebSocket";

class MovementPublisher {

  addToQueue(movementId: number) {


    WebSocket.send(
      JSON.stringify({
        type: "queue",
        action: "add",
        actionId: movementId
      })
    );

  }

  getMovements(){
    WebSocket.send(
      JSON.stringify({
        type: "movements",
        action: "get",
      })
    );

}
}

export default new MovementPublisher();
