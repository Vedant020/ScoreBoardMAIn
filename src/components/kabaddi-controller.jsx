import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronUp, ChevronDown, Play, Pause, RotateCcw } from 'lucide-react';

const socket = io('http://localhost:4000'); // Ensure this URL is correct

export function ControllerBasic() {
  const [gameState, setGameState] = useState({
    teamA: { name: 'Team A', score: 0, color: '#ff9999' },
    teamB: { name: 'Team B', score: 0, color: '#9999ff' },
    timer: 1200,
    isRunning: false,
  });

  useEffect(() => {
    // Emit the initial game state when the component mounts
    socket.emit('updateGameState', gameState);
    
    // Emit game state updates every time it changes
    socket.on('updateGameState', (newState) => {
      setGameState(newState);
    });

    // Cleanup on unmount
    return () => {
      socket.off('updateGameState');
    };
  }, []);

  const updateGameState = (newState) => {
    setGameState(newState);
    socket.emit('updateGameState', newState); // Emit the new game state to the server
  };

  // Additional functions (updateTeam, updateScore, toggleTimer, etc.) remain the same...

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      {/* Controller UI goes here */}
      {['teamA', 'teamB'].map((team) => (
        <div key={team} className="space-y-2 p-4 border-2 border-gray-300 rounded-lg">
          <Input
            value={gameState[team].name}
            onChange={(e) => updateGameState({ ...gameState, [team]: { ...gameState[team], name: e.target.value }})}
            className="w-full" />
          <div className="flex items-center space-x-2">
            <Button onClick={() => updateGameState({ ...gameState, [team]: { ...gameState[team], score: Math.max(0, gameState[team].score - 1) }})}><ChevronDown className="h-4 w-4" /></Button>
            <span className="text-2xl font-bold">{gameState[team].score}</span>
            <Button onClick={() => updateGameState({ ...gameState, [team]: { ...gameState[team], score: gameState[team].score + 1 }})}><ChevronUp className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor={`${team}-color`}>Color:</Label>
            <Input
              type="color"
              id={`${team}-color`}
              value={gameState[team].color}
              onChange={(e) => updateGameState({ ...gameState, [team]: { ...gameState[team], color: e.target.value }})}
              className="w-16 h-8" />
          </div>
        </div>
      ))}
      {/* Additional controls for timer and game status... */}
    </div>
  );
}
