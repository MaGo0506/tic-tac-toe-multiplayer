import { Socket } from "socket.io-client";
import { PlayMatrix } from "../../components/ticTacToe";

class GameService {

  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join-game", { roomId });
      socket.on("room-joined", () => rs(true));
      socket.on("room-join-error", (err) => rj(err.error));
    });
  }

  public async updateGame(socket: Socket, gameMatrix: PlayMatrix) {
    socket.emit("update-game", { matrix: gameMatrix });
  }

  public async onGameUpdate(socket: Socket, listener: (matrix: PlayMatrix) => void) {
    socket.on("on-game-update", ({ matrix }) => listener(matrix));
  }
}

const GameServiceClass = new GameService();

export default GameServiceClass;