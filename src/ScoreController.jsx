import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const ScoreController = () => {
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

  const updateGameState = (newState) => {
    socket.emit('updateGameState', newState);
  };

  const increaseScore = (team) => {
    const newGameState = {
      ...gameState,
      [team]: { ...gameState[team], score: gameState[team].score + 1 },
    };
    updateGameState(newGameState);
  };

  const decreaseScore = (team) => {
    const newGameState = {
      ...gameState,
      [team]: { ...gameState[team], score: gameState[team].score - 1 },
    };
    updateGameState(newGameState);
  };

  const handleNameChange = (team, name) => {
    const newGameState = {
      ...gameState,
      [team]: { ...gameState[team], name },
    };
    updateGameState(newGameState);
  };

  const handleColorChange = (team, color) => {
    const newGameState = {
      ...gameState,
      [team]: { ...gameState[team], color },
    };
    updateGameState(newGameState);
  };

  const handleTimerChange = (newTimer) => {
    updateGameState({ ...gameState, timer: newTimer });
  };

  const toggleTimer = () => {
    const newGameState = {
      ...gameState,
      isRunning: !gameState.isRunning,
    };
    updateGameState(newGameState);
  };

  return (
    <div>
      <h1>Score Controller</h1>

      <div>
        <h2>{gameState.teamA.name}</h2>
        <input
          type="text"
          value={gameState.teamA.name}
          onChange={(e) => handleNameChange('teamA', e.target.value)}
          placeholder="Team A Name"
        />
        <input
          type="color"
          value={gameState.teamA.color}
          onChange={(e) => handleColorChange('teamA', e.target.value)}
        />
        <button onClick={() => increaseScore('teamA')}>Increase Score</button>
        <button onClick={() => decreaseScore('teamA')}>Decrease Score</button>
      </div>

      <div>
        <h2>{gameState.teamB.name}</h2>
        <input
          type="text"
          value={gameState.teamB.name}
          onChange={(e) => handleNameChange('teamB', e.target.value)}
          placeholder="Team B Name"
        />
        <input
          type="color"
          value={gameState.teamB.color}
          onChange={(e) => handleColorChange('teamB', e.target.value)}
        />
        <button onClick={() => increaseScore('teamB')}>Increase Score</button>
        <button onClick={() => decreaseScore('teamB')}>Decrease Score</button>
      </div>

      <div>
        <h2>Timer: {gameState.timer} seconds</h2>
        <button onClick={toggleTimer}>
          {gameState.isRunning ? 'Pause Timer' : 'Start Timer'}
        </button>
      </div>
    </div>
  );
};

export default ScoreController;
