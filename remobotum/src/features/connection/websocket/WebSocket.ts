
const ROBOT_WS_URL: string = "ws://192.168.123.164:8000";

type MessageHandler = (message: string) => void;


class Connection {

  private socket: globalThis.WebSocket | null = null;

  private reconnectTimer: number | null = null;

  private shouldReconnect: boolean = true;

  private messageHandler: MessageHandler | null = null;


  // --------------------------------------------------
  // MESSAGE HANDLER
  // --------------------------------------------------

  setMessageHandler(handler: MessageHandler): void {

    this.messageHandler = handler;

  }


  // --------------------------------------------------
  // CONNECTION STATUS
  // --------------------------------------------------

  isConnected(): boolean {

    return (
      this.socket !== null &&
      this.socket.readyState === globalThis.WebSocket.OPEN
    );

  }


  // --------------------------------------------------
  // CONNECT
  // --------------------------------------------------

  connect(): void {

    if (
      this.socket &&
      (
        this.socket.readyState === globalThis.WebSocket.OPEN ||
        this.socket.readyState === globalThis.WebSocket.CONNECTING
      )
    ) {

      return;

    }


    console.log("Trying to connect to robot...");

    this.shouldReconnect = true;

    this.socket = new globalThis.WebSocket(
      ROBOT_WS_URL
    );


    // --------------------------------------------------
    // CONNECTION SUCCESSFUL
    // --------------------------------------------------

    this.socket.onopen = (): void => {

      console.log("Connected to robot");


      if (this.reconnectTimer !== null) {

        window.clearTimeout(
          this.reconnectTimer
        );

        this.reconnectTimer = null;

      }

    };


    // --------------------------------------------------
    // MESSAGE
    // --------------------------------------------------

    this.socket.onmessage = (
      event: MessageEvent
    ): void => {

      console.log(
        "Received from robot:",
        event.data
      );


      this.messageHandler?.(
        event.data
      );

    };


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    this.socket.onerror = (
      error: Event
    ): void => {

      console.error(
        "WebSocket error:",
        error
      );

    };


    // --------------------------------------------------
    // CLOSE
    // --------------------------------------------------

    this.socket.onclose = (): void => {

      console.log(
        "Disconnected from robot"
      );


      this.socket = null;


      if (this.shouldReconnect) {

        this.scheduleReconnect();

      }

    };

  }


  // --------------------------------------------------
  // RECONNECT
  // --------------------------------------------------

  private scheduleReconnect(): void {

    if (this.reconnectTimer !== null) {

      return;

    }


    console.log(
      "Trying to reconnect in 3 seconds..."
    );


    this.reconnectTimer = window.setTimeout(
      (): void => {

        this.reconnectTimer = null;

        this.connect();

      },
      3000
    );

  }


  // --------------------------------------------------
  // SEND
  // --------------------------------------------------

  send(message: string): void {

    if (!this.isConnected()) {

      console.error(
        "WebSocket is not connected"
      );

      return;

    }


    console.log(
      "Sending to robot:",
      message
    );


    this.socket!.send(
      message
    );

  }


  // --------------------------------------------------
  // DISCONNECT
  // --------------------------------------------------

  disconnect(): void {

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

