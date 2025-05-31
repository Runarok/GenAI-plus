"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Trophy, Lock } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  progress: number
  target: number
}

interface AchievementsPanelProps {
  isOpen: boolean
  onClose: () => void
  achievements: Achievement[]
}

export default function AchievementsPanel({ isOpen, onClose, achievements }: AchievementsPanelProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-lg border border-purple-700 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Achievements</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-black/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Progress</span>
                <span className="text-blue-400 font-bold">
                  {unlockedCount}/{totalCount}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.unlocked
                      ? "bg-yellow-900/20 border-yellow-600 shadow-lg shadow-yellow-600/20"
                      : "bg-gray-800/50 border-gray-600"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-yellow-500" : "bg-gray-600"}`}>
                      {achievement.unlocked ? (
                        <Trophy className="w-4 h-4 text-white" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 ${achievement.unlocked ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>

                      {!achievement.unlocked && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-400">
                              {Math.min(achievement.progress, achievement.target)}/{achievement.target}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-purple-700">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-md text-white font-semibold hover:from-blue-600 hover:to-pink-600 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
