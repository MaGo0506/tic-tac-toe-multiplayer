import { io, Socket } from "socket.io-client";

class SocketService {
  public socket: Socket | null = null;

  public connect(url: string) {
    return new Promise((rs, rj) => {

      this.socket = io(url);

      if (!this.socket) return rj();

      this.socket.on("connection", () => {
        rs(this.socket as Socket)
      });

      this.socket.on("connect-error", (err) => {
        console.log("Connection error:", err);
      })
    });
  }
}

const SocketServiceClass = new SocketService();

export default SocketServiceClass;