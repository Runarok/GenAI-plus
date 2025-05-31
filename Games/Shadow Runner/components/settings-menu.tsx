"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Volume2, VolumeX, Music, MicOffIcon as MusicOff } from "lucide-react"

interface GameSettings {
  musicEnabled: boolean
  soundEnabled: boolean
  sensitivity: number
  particlesEnabled: boolean
}

interface SettingsMenuProps {
  isOpen: boolean
  onClose: () => void
  settings: GameSettings
  onSettingsChange: (settings: GameSettings) => void
}

export default function SettingsMenu({ isOpen, onClose, settings, onSettingsChange }: SettingsMenuProps) {
  const updateSetting = (key: keyof GameSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value })
  }

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
            className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-lg border border-purple-700 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Audio Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Audio</h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {settings.musicEnabled ? (
                      <Music className="w-5 h-5 text-blue-400" />
                    ) : (
                      <MusicOff className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-gray-300">Background Music</span>
                  </div>
                  <button
                    onClick={() => updateSetting("musicEnabled", !settings.musicEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.musicEnabled ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.musicEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {settings.soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-blue-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-gray-300">Sound Effects</span>
                  </div>
                  <button
                    onClick={() => updateSetting("soundEnabled", !settings.soundEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.soundEnabled ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.soundEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Controls</h3>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Movement Sensitivity</span>
                    <span className="text-blue-400 font-mono">{settings.sensitivity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.sensitivity}
                    onChange={(e) => updateSetting("sensitivity", Number.parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Graphics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Graphics</h3>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Particle Effects</span>
                  <button
                    onClick={() => updateSetting("particlesEnabled", !settings.particlesEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.particlesEnabled ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.particlesEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-700">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-md text-white font-semibold hover:from-blue-600 hover:to-pink-600 transition-all"
              >
                Save Settings
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
