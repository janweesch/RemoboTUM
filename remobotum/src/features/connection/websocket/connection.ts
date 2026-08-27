const ROBOT_WS_URL = "ws://192.168.123.164:8000";

type MessageHandler = (message: string) => void;

class Connection {

  private socket: WebSocket | null = null;

  private reconnectTimer: number | null = null;

  private shouldReconnect = true;

  private messageHandler: MessageHandler | null = null;


  // --------------------------------------------------
  // MESSAGE HANDLER
  // --------------------------------------------------

  setMessageHandler(handler: MessageHandler) {

    this.messageHandler = handler;

  }


  // --------------------------------------------------
  // CONNECT
  // --------------------------------------------------

  connect() {

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


    this.socket.onopen = () => {

      console.log("Connected to robot");

      if (this.reconnectTimer !== null) {

        window.clearTimeout(this.reconnectTimer);

        this.reconnectTimer = null;

      }

    };


    // --------------------------------------------------
    // MESSAGE
    // --------------------------------------------------

    this.socket.onmessage = (event) => {

      console.log(
        "Received from robot:",
        event.data
      );

      this.messageHandler?.(event.data);

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
    // CLOSE
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
  // SEND
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

    this.shouldReconnect = false;


    if (this.reconnectTimer !== null) {

      window.clearTimeout(
        this.reconnectTimer
      );

      this.reconnectTimer = null;

    }


    if (this.socket) {

      this.socket.close();

      this.socket = null;

    }

  }

}


export default new Connection();