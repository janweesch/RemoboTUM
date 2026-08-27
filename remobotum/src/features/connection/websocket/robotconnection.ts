import { BatteryHandler } from "./listeners/BatteryListener";

const ROBOT_WS_URL = "ws://192.168.123.164:8000";

class RobotConnection {

  private socket: WebSocket | null = null;

  private reconnectTimer: number | null = null;

  private shouldReconnect = true;

  public battery = new BatteryHandler();


  // --------------------------------------------------
  // CONNECT
  // --------------------------------------------------

  connect() {

    // Don't create another connection if one already exists
    if (
      this.socket &&
      (
        this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING
      )
    ) {
      return;
    }

    console.log("Trying to connect to robot...");

    this.shouldReconnect = true;

    this.socket = new WebSocket(ROBOT_WS_URL);


    // --------------------------------------------------
    // CONNECTION SUCCESSFUL
    // --------------------------------------------------

    this.socket.onopen = () => {

      console.log("Connected to robot");

      // Cancel a pending reconnect attempt
      if (this.reconnectTimer !== null) {

        window.clearTimeout(this.reconnectTimer);

        this.reconnectTimer = null;
      }
    };


    // --------------------------------------------------
    // MESSAGE RECEIVED
    // --------------------------------------------------

    this.socket.onmessage = (event) => {

      console.log("Received from robot:", event.data);

      try {

        const message = JSON.parse(event.data);

        switch (message.type) {

          case "battery":

            this.battery.handle(message.percentage);

            break;


          default:

            console.log(
              "Unknown message type:",
              message.type
            );

        }

      } catch (error) {

        console.error(
          "Failed to parse WebSocket message:",
          error
        );

      }
    };


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    this.socket.onerror = (error) => {

      console.error(
        "WebSocket error:",
        error
      );

    };


    // --------------------------------------------------
    // CONNECTION CLOSED
    // --------------------------------------------------

    this.socket.onclose = () => {

      console.log("Disconnected from robot");

      this.socket = null;

      if (this.shouldReconnect) {

        this.scheduleReconnect();

      }
    };
  }


  // --------------------------------------------------
  // RECONNECT
  // --------------------------------------------------

  private scheduleReconnect() {

    // Don't create multiple reconnect timers
    if (this.reconnectTimer !== null) {
      return;
    }

    console.log(
      "Trying to reconnect in 3 seconds..."
    );

    this.reconnectTimer = window.setTimeout(() => {

      this.reconnectTimer = null;

      this.connect();

    }, 3000);
  }


  // --------------------------------------------------
  // SEND MESSAGE
  // --------------------------------------------------

  send(message: string) {

    if (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {

      console.log(
        "Sending to robot:",
        message
      );

      this.socket.send(message);

    } else {

      console.error(
        "WebSocket is not connected"
      );

    }
  }


  // --------------------------------------------------
  // DISCONNECT
  // --------------------------------------------------

  disconnect() {

    console.log(
      "Disconnecting from robot..."
    );

    // Don't reconnect after intentional disconnect
    this.shouldReconnect = false;


    // Cancel pending reconnect
    if (this.reconnectTimer !== null) {

      window.clearTimeout(
        this.reconnectTimer
      );

      this.reconnectTimer = null;
    }


    // Close WebSocket
    if (this.socket) {

      this.socket.close();

      this.socket = null;
    }
  }
}


export default new RobotConnection();