import { Server, Socket } from "socket.io";

type updateGame = {
  io: Server,
  socket: Socket,
  message: {
    roomId: string
  }
}

const getSocketGameRoom = (socket: Socket) => {
  const socketRooms = Array.from(socket.rooms.values()).filter(r => r !== socket.id);
  const gameRoom = socketRooms && socketRooms[0];

  return gameRoom;
}

exports.updateGame = async ({ io, socket, message }: updateGame) => {
  const gameRoom = getSocketGameRoom(socket);
  socket.to(gameRoom).emit("on-game-update", message);
};

exports.gameWin = async ({ io, socket, message }: updateGame) => {
  const gameRoom = getSocketGameRoom(socket);
  socket.to(gameRoom).emit("on-game-win", message);
};