import BatteryListener from "../listeners/BatteryListener";

class MessageRouter {

  private battery = new BatteryListener();


  handle(rawMessage: string) {

    try {

      const message = JSON.parse(rawMessage);

      switch (message.type) {

        case "battery":

          this.battery.handle(
            message.percentage
          );

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


  getBattery() {

    return this.battery;

  }

}


export default new MessageRouter();