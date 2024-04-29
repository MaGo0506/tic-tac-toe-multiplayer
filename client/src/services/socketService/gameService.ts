import { Socket } from "socket.io-client";

class GameService {

  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join-game", { roomId });
      socket.on("room-joined", () => rs(true));
      socket.on("room-join-error", (err) => rj(err.error));
    })
  }
}

const GameServiceClass = new GameService();

export default GameServiceClass;