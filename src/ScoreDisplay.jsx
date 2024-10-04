import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const ScoreDisplay = () => {
  const [gameState, setGameState] = useState({
    teamA: { name: 'Team A', score: 0, color: '#ff9999', logo: '' },
    teamB: { name: 'Team B', score: 0, color: '#9999ff', logo: '' },
    timer: 0,
    isRunning: false,
  });

  useEffect(() => {
    socket.on('updateGameState', (state) => {
      setGameState(state);
    });

    return () => {
      socket.off('updateGameState');
    };
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: gameState.teamA.color }}>
        <h1>{gameState.teamA.name}</h1>
        <p>Score: {gameState.teamA.score}</p>
        {/* Team A Logo (Optional) */}
        {gameState.teamA.logo && <img src={gameState.teamA.logo} alt="Team A Logo" />}
      </div>

      <div style={{ backgroundColor: gameState.teamB.color }}>
        <h1>{gameState.teamB.name}</h1>
        <p>Score: {gameState.teamB.score}</p>
        {/* Team B Logo (Optional) */}
        {gameState.teamB.logo && <img src={gameState.teamB.logo} alt="Team B Logo" />}
      </div>

      <div>
        <h2>Timer: {gameState.timer} seconds</h2>
      </div>
    </div>
  );
};

export default ScoreDisplay;
