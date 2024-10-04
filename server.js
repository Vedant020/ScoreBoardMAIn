import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let gameState = {
  teamA: { name: 'Team A', score: 0, color: '#ff9999' },
  teamB: { name: 'Team B', score: 0, color: '#9999ff' },
  timer: 1200,
  isRunning: false,
};

// Broadcast game state to all clients
const broadcastGameState = () => {
  io.emit('updateGameState', gameState);
};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current game state to the newly connected client
  socket.emit('updateGameState', gameState);

  // Listen for game state updates from the controller
  socket.on('updateGameState', (newState) => {
    gameState = { ...gameState, ...newState };
    broadcastGameState();
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
