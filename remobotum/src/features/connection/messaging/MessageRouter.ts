import BatteryListener from "../listeners/BatteryListener";
import { MovementListener } from "../listeners/MovementListener";
import QueueListener from "../listeners/QueueListener";

class MessageRouter {

  public battery = new BatteryListener();
  public movements = new MovementListener();
  public queue = new QueueListener();


  handle(rawMessage: string) {

    try {

      const message = JSON.parse(rawMessage);

      switch (message.type) {

        case "battery":

          this.battery.handle(message.percentage);

          break;

        case "movements":
          
          this.movements.handle(message.items);

          break;

        case "queue":

          this.queue.handle(message.items)

          break;


        default:

          console.log(
            "Unknown message type:",
            message.type
          );

      }

    } catch (error) {

      console.error(
        "Failed to parse robot message:",
        error
      );

    }

  }
}


export default new MessageRouter();