
import { Player } from '../App';

interface StartPageProps {
  leaderboard: Player[];
  onStartGame: () => void;
}

export const StartPage = ({ leaderboard, onStartGame }: StartPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
          Build-A-Rig
        </h1>
        
        {/* Description */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8 border border-purple-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">What is a Mining Rig?</h2>
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            A cryptocurrency mining rig is a specialized computer system designed to mine digital currencies like Bitcoin and Ethereum. 
            It consists of multiple high-performance components working together to solve complex mathematical problems and earn crypto rewards.
          </p>
          
          <h3 className="text-2xl font-bold text-blue-300 mb-4">How to Play</h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            Your mission: Assemble a complete mining rig by placing 8 essential components in their correct positions as fast as possible! 
            The faster you build, the higher you'll rank on the leaderboard. Can you become the ultimate rig builder?
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-2xl font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg mb-8"
        >
          🚀 START BUILDING
        </button>

        {/* Leaderboard */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <h3 className="text-2xl font-bold text-green-400 mb-4">🏆 Top Builders</h3>
          <div className="space-y-2">
            {leaderboard.map((player, index) => (
              <div key={index} className="flex justify-between items-center text-white">
                <span className="flex items-center">
                  <span className="text-yellow-400 font-bold mr-2">#{index + 1}</span>
                  {player.name}
                </span>
                <span className="text-blue-300 font-mono">{player.time.toFixed(1)}s</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};