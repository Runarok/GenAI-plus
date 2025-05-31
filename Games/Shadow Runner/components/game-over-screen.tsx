"use client"

import { motion } from "framer-motion"

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  progress: number
  target: number
}

interface GameOverScreenProps {
  score: number
  highScore: number
  combo: number
  achievements: Achievement[]
  onRestart: () => void
}

export default function GameOverScreen({ score, highScore, combo, achievements, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score >= highScore
  const recentlyUnlocked = achievements.filter((a) => a.unlocked).slice(-3)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 overflow-y-auto"
    >
      <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-bold text-white mb-6">
        Game Over
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <p className="text-3xl text-gray-200 mb-2">Score: {score}</p>
        <p className="text-xl text-gray-300 mb-2">Best Combo: {combo}x</p>
        <p className="text-lg text-gray-400">High Score: {highScore}</p>

        {isNewHighScore && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              repeat: 3,
              repeatType: "reverse",
              duration: 0.3,
            }}
            className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500"
          >
            🎉 New High Score! 🎉
          </motion.div>
        )}
      </motion.div>

      {recentlyUnlocked.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 p-4 bg-purple-900/30 rounded-lg border border-purple-700"
        >
          <h3 className="text-lg font-bold text-white mb-2">Recent Achievements</h3>
          {recentlyUnlocked.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-300 mb-1"
            >
              <span className="text-yellow-400">🏆</span>
              <span className="font-semibold">{achievement.name}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onRestart}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-pink-600 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Again
      </motion.button>
    </motion.div>
  )
}
