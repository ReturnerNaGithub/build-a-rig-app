import { useEffect, useState } from 'react';
import { Player } from '../App';

interface WinPageProps {
  playerTime: number;
  leaderboard: Player[];
  onPlayAgain: () => void;
}

export const WinPage = ({ playerTime, leaderboard, onPlayAgain }: WinPageProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  const playerRank = leaderboard.findIndex(player => player.name === 'You' && player.time === playerTime) + 1;
  const isTopTen = playerRank <= 10 && playerRank > 0;

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1500);
    const timer3 = setTimeout(() => setAnimationPhase(3), 2500);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(confettiTimer);
    };
  }, []);

  // Confetti component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className={`w-3 h-3 ${['bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-yellow-400', 'bg-pink-400'][
              Math.floor(Math.random() * 5)
            ]
              } transform rotate-45 animate-fall`}
            style={{
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        </div>
      ))}

    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative">
      {showConfetti && <Confetti />}

      {/* Desktop Layout: Single column */}
      <div className="hidden md:block max-w-4xl mx-auto text-center relative z-10">
        {/* Mining Rig Image */}
        <div className={`mb-8 transition-all duration-1000 ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <img
            src="/pictures/miningrig.png"
            alt="Completed Mining Rig"
            className="w-64 h-64 mx-auto object-contain filter drop-shadow-2xl"
          />
        </div>

        {/* Congratulations */}
        <div className={`transition-all duration-1000 delay-500 ${animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            🎉 CONGRATULATIONS! 🎉
          </h1>

          <h2 className="text-4xl font-bold text-white mb-6">
            Mining Rig Complete!
          </h2>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 mb-8 border border-yellow-500/30">
            <div className="text-3xl font-bold text-yellow-400 mb-4">
              ⏱️ Your Time: {playerTime.toFixed(1)} seconds
            </div>

            {isTopTen ? (
              <div className="text-2xl font-bold text-green-400 mb-4">
                🏆 Rank #{playerRank} - You made the Top 10!
              </div>
            ) : (
              <div className="text-xl text-blue-300 mb-4">
                Keep practicing to make the leaderboard!
              </div>
            )}

            <p className="text-lg text-gray-200 leading-relaxed">
              Excellent work, crypto miner! You've successfully assembled a complete mining rig.
              Your rig is now ready to mine cryptocurrency and generate digital wealth.
              The components are perfectly aligned and your mining operation can begin!
            </p>
          </div>
        </div>

        {/* Updated Leaderboard */}
        <div className={`transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-green-500/30">
            <h3 className="text-2xl font-bold text-green-400 mb-4">🏆 Updated Leaderboard</h3>
            <div className="space-y-2">
              {leaderboard.slice(0, 10).map((player, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-2 rounded ${player.name === 'You' && player.time === playerTime
                    ? 'bg-yellow-500/20 border border-yellow-400'
                    : ''
                    }`}
                >
                  <span className="flex items-center text-white">
                    <span className={`font-bold mr-3 ${index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-300' :
                        index === 2 ? 'text-orange-400' : 'text-blue-300'
                      }`}>
                      #{index + 1}
                    </span>
                    <span className={player.name === 'You' && player.time === playerTime ? 'font-bold text-yellow-300' : ''}>
                      {player.name}
                    </span>
                  </span>
                  <span className="text-blue-300 font-mono">{player.time.toFixed(1)}s</span>
                </div>
              ))}
            </div>
          </div>

          {/* Play Again Button */}
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-2xl font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Build Another Rig
          </button>
        </div>
      </div>

      {/* Mobile Layout: Two-column flex layout */}
      <div className="md:hidden w-full max-w-sm mx-auto relative z-10">
        {/* Top Section: Mining Rig Image and Title */}
        <div className={`text-center mb-6 transition-all duration-1000 ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <img
            src="/pictures/miningrig.png"
            alt="Completed Mining Rig"
            className="w-32 h-32 mx-auto object-contain filter drop-shadow-2xl mb-4"
          />
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            🎉 CONGRATULATIONS! 🎉
          </h1>
          <h2 className="text-xl font-bold text-white mb-4">
            Mining Rig Complete!
          </h2>
        </div>

        {/* Main Content: Two-column flex layout */}
        <div className={`flex flex-col space-y-4 transition-all duration-1000 delay-500 ${animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Stats Card */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
            <div className="text-xl font-bold text-yellow-400 mb-2">
              ⏱️ Time: {playerTime.toFixed(1)}s
            </div>
            {isTopTen ? (
              <div className="text-lg font-bold text-green-400">
                🏆 Rank #{playerRank} - Top 10!
              </div>
            ) : (
              <div className="text-sm text-blue-300">
                Keep practicing!
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
            <p className="text-sm text-gray-200 leading-relaxed">
              Excellent work! Your mining rig is ready to mine cryptocurrency and generate digital wealth.
            </p>
          </div>
        </div>

        {/* Leaderboard - Mobile optimized */}
        <div className={`mt-6 transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 mb-6 border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">🏆 Leaderboard</h3>
            <div className="space-y-1">
              {leaderboard.slice(0, 5).map((player, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-2 rounded text-sm ${player.name === 'You' && player.time === playerTime
                    ? 'bg-yellow-500/20 border border-yellow-400'
                    : ''
                    }`}
                >
                  <span className="flex items-center text-white">
                    <span className={`font-bold mr-2 ${index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-300' :
                        index === 2 ? 'text-orange-400' : 'text-blue-300'
                      }`}>
                      #{index + 1}
                    </span>
                    <span className={player.name === 'You' && player.time === playerTime ? 'font-bold text-yellow-300' : ''}>
                      {player.name}
                    </span>
                  </span>
                  <span className="text-blue-300 font-mono">{player.time.toFixed(1)}s</span>
                </div>
              ))}
            </div>
          </div>

          {/* Play Again Button - Mobile */}
          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Build Another Rig
          </button>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>


    </div>
  );
};