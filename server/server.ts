const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

io.on("connection", (socket) => {
  console.log('socket connected');

  socket.on('client-ready', () => {
    console.log('client ready', socket.id);
  })
})

server.listen(3001, () => {
  console.log("Server listening on port 3001");
})