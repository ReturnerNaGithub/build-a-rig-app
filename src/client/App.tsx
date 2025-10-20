import React, { useState } from 'react';
import { StartPage } from './components/StartPage';
import { GamePage } from './components/GamePage';
import { WinPage } from './components/WinPage';

export type GameState = 'start' | 'playing' | 'win';

export interface Player {
  name: string;
  time: number;
}

export const App = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerTime, setPlayerTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<Player[]>([
    { name: 'CryptoMiner1', time: 45.2 },
    { name: 'RigBuilder', time: 52.8 },
    { name: 'HashMaster', time: 58.1 },
    { name: 'BlockChainer', time: 61.5 },
    { name: 'DigitalGold', time: 67.3 },
  ]);

  const handleGameComplete = (time: number) => {
    setPlayerTime(time);
    setGameState('win');
    
    // Add player to leaderboard if they make top 10
    const newPlayer: Player = { name: 'You', time };
    const newLeaderboard = [...leaderboard, newPlayer]
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);
    setLeaderboard(newLeaderboard);
  };

  const resetGame = () => {
    setGameState('start');
    setPlayerTime(0);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: 'url(/pictures/bg.png)' }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-green-900/80">
        {gameState === 'start' && (
          <StartPage 
            leaderboard={leaderboard}
            onStartGame={() => setGameState('playing')}
          />
        )}
        {gameState === 'playing' && (
          <GamePage onGameComplete={handleGameComplete} />
        )}
        {gameState === 'win' && (
          <WinPage 
            playerTime={playerTime}
            leaderboard={leaderboard}
            onPlayAgain={resetGame}
          />
        )}
      </div>
    </div>
  );
};
