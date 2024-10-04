import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export function WORK() {
  const [gameState, setGameState] = useState({
    teamA: { name: 'Team A', score: 0, color: '#ff9999' },
    teamB: { name: 'Team B', score: 0, color: '#9999ff' },
    timer: 0,
    isRunning: false,
  });

  useEffect(() => {
    // Listen for updates from the server
    const handleUpdateGameState = (state) => {
      console.log('Received game state:', state); // Log the state received
      setGameState(state); // Update state with new game state
    };

    socket.on('updateGameState', handleUpdateGameState);

    // Cleanup the socket listener on component unmount
    return () => {
      socket.off('updateGameState', handleUpdateGameState);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full flex flex-col z-50">
      <div className="flex items-stretch h-14">
        <div
          className={`flex-1 flex items-center justify-between px-2`}
          style={{ backgroundColor: gameState.teamA.color }}>
          <div className="text-sm font-bold text-white">{gameState.teamA.name}</div>
        </div>
        <div className="bg-white flex items-center justify-center px-4 font-bold text-2xl">
          <span style={{ color: gameState.teamA.color }}>{gameState.teamA.score}</span>
          <span className="mx-1">-</span>
          <span style={{ color: gameState.teamB.color }}>{gameState.teamB.score}</span>
        </div>
        <div
          className={`flex-1 flex items-center justify-between px-2`}
          style={{ backgroundColor: gameState.teamB.color }}>
          <div className="text-sm font-bold text-white">{gameState.teamB.name}</div>
        </div>
      </div>
      <div className="bg-gray-800 text-white text-sm font-semibold flex items-center justify-center h-6">
        {formatTime(gameState.timer)}
      </div>
    </div>
  );
}
