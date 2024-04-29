import { Server, Socket } from "socket.io";

type joinGame = {
  io: Server,
  socket: Socket,
  message: {
    roomId: string
  }
}

exports.joinGame = async ({ io, socket, message }: joinGame) => {
  console.log(`New User joined room: ${message.roomId}`);

  const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
  const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);

  if (socketRooms.length > 0 || connectedSockets && connectedSockets.size === 2) {
    socket.emit("room-join-error", {
      error: "Room is full please choose another room to play!"
    })
  } else {
    await socket.join(message.roomId);
    socket.emit("room-joined");
  }
};