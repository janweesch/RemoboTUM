import type { RobotAction } from "../listeners/MovementListener";
import WebSocket from "../websocket/WebSocket";

class MovementPublisher {

  addToQueue(movement: RobotAction) {


    WebSocket.send(
      JSON.stringify({
        type: "queue",
        action: "add",
        movement:{
          id: movement.id,
          name: movement.name,
          kind: movement.kind,
        }
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
