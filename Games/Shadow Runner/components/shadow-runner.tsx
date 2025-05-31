"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GameOverScreen from "./game-over-screen"
import SettingsMenu from "./settings-menu"
import AchievementsPanel from "./achievements-panel"
import { useToast } from "@/hooks/use-toast"
import useMobile from "@/hooks/use-mobile"
import MusicManager from "./music-manager"

// Game constants
const GAME_WIDTH = 600
const GAME_HEIGHT = 800
const PLAYER_SIZE = 30
const INITIAL_OBSTACLE_SPEED = 3
const SPEED_INCREMENT = 0.05
const OBSTACLE_FREQUENCY = 1500
const FREQUENCY_DECREMENT = 8

// Power-up types
enum PowerUpType {
  SHIELD = "shield",
  SPEED_BOOST = "speedBoost",
  SLOW_TIME = "slowTime",
  SCORE_MULTIPLIER = "scoreMultiplier",
}

// Obstacle types
enum ObstacleType {
  NORMAL = "normal",
  DIAGONAL = "diagonal",
  SPLITTER = "splitter",
  SLOW = "slow",
  SHAKER = "shaker",
}

interface Obstacle {
  id: number
  x: number
  y: number
  width: number
  height: number
  color: string
  type: ObstacleType
  speed: number
  direction?: number // For diagonal obstacles
  hasTriggered?: boolean // For special effects
}

interface PowerUp {
  id: number
  x: number
  y: number
  type: PowerUpType
  color: string
  pulsePhase: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface GameSettings {
  musicEnabled: boolean
  soundEnabled: boolean
  sensitivity: number
  particlesEnabled: boolean
}

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  progress: number
  target: number
}

export default function ShadowRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Game state
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2)
  const [combo, setCombo] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)

  // Power-up states
  const [shieldActive, setShieldActive] = useState(false)
  const [speedBoostActive, setSpeedBoostActive] = useState(false)
  const [slowTimeActive, setSlowTimeActive] = useState(false)
  const [scoreMultiplierActive, setScoreMultiplierActive] = useState(false)
  const [powerUpTimeLeft, setPowerUpTimeLeft] = useState(0)

  // Settings
  const [settings, setSettings] = useState<GameSettings>({
    musicEnabled: true,
    soundEnabled: true,
    sensitivity: 1,
    particlesEnabled: true,
  })

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_dodge",
      name: "First Steps",
      description: "Dodge your first obstacle",
      unlocked: false,
      progress: 0,
      target: 1,
    },
    {
      id: "combo_10",
      name: "Combo Master",
      description: "Achieve a 10x combo",
      unlocked: false,
      progress: 0,
      target: 10,
    },
    { id: "score_100", name: "Century", description: "Score 100 points", unlocked: false, progress: 0, target: 100 },
    {
      id: "survive_60",
      name: "Survivor",
      description: "Survive for 60 seconds",
      unlocked: false,
      progress: 0,
      target: 60,
    },
    {
      id: "power_up_master",
      name: "Power User",
      description: "Collect 20 power-ups",
      unlocked: false,
      progress: 0,
      target: 20,
    },
    {
      id: "speed_demon",
      name: "Speed Demon",
      description: "Reach maximum game speed",
      unlocked: false,
      progress: 0,
      target: 1,
    },
  ])

  const { toast } = useToast()
  const isMobile = useMobile()

  // Game state refs
  const playerXRef = useRef(playerX)
  const obstaclesRef = useRef<Obstacle[]>([])
  const powerUpsRef = useRef<PowerUp[]>([])
  const particlesRef = useRef<Particle[]>([])
  const gameSpeedRef = useRef(INITIAL_OBSTACLE_SPEED)
  const obstacleFrequencyRef = useRef(OBSTACLE_FREQUENCY)
  const scoreRef = useRef(0)
  const comboRef = useRef(0)
  const multiplierRef = useRef(1)
  const gameOverRef = useRef(false)
  const gamePausedRef = useRef(false)
  const animationFrameRef = useRef<number>(0)
  const lastObstacleTimeRef = useRef(0)
  const lastPowerUpTimeRef = useRef(0)
  const gameStartTimeRef = useRef(0)
  const keysPressed = useRef<{ [key: string]: boolean }>({})
  const screenShakeRef = useRef(0)
  const playerGlowIntensityRef = useRef(1)
  const nearMissCountRef = useRef(0)

  // Power-up timers
  const powerUpTimersRef = useRef<{ [key: string]: number }>({})

  // Update refs when state changes
  useEffect(() => {
    playerXRef.current = playerX
  }, [playerX])
  useEffect(() => {
    scoreRef.current = score
  }, [score])
  useEffect(() => {
    comboRef.current = combo
  }, [combo])
  useEffect(() => {
    multiplierRef.current = multiplier
  }, [multiplier])
  useEffect(() => {
    gameOverRef.current = gameOver
  }, [gameOver])
  useEffect(() => {
    gamePausedRef.current = gamePaused
  }, [gamePaused])

  // Load saved data
  useEffect(() => {
    const savedHighScore = localStorage.getItem("shadowRunnerHighScore")
    if (savedHighScore) setHighScore(Number.parseInt(savedHighScore))

    const savedSettings = localStorage.getItem("shadowRunnerSettings")
    if (savedSettings) setSettings(JSON.parse(savedSettings))

    const savedAchievements = localStorage.getItem("shadowRunnerAchievements")
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
  }, [])

  // Save settings when changed
  useEffect(() => {
    localStorage.setItem("shadowRunnerSettings", JSON.stringify(settings))
  }, [settings])

  // Save achievements when changed
  useEffect(() => {
    localStorage.setItem("shadowRunnerAchievements", JSON.stringify(achievements))
  }, [achievements])

  // Audio setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Sound effects
  const playSound = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine") => {
      if (!settings.soundEnabled || !audioContextRef.current) return

      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    },
    [settings.soundEnabled],
  )

  // Achievement system
  const checkAchievements = useCallback(() => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.unlocked) return achievement

        let newProgress = achievement.progress

        switch (achievement.id) {
          case "first_dodge":
            newProgress = scoreRef.current > 0 ? 1 : 0
            break
          case "combo_10":
            newProgress = Math.max(newProgress, comboRef.current)
            break
          case "score_100":
            newProgress = scoreRef.current
            break
          case "survive_60":
            newProgress = gameStartTimeRef.current ? Math.floor((Date.now() - gameStartTimeRef.current) / 1000) : 0
            break
          case "speed_demon":
            newProgress = gameSpeedRef.current >= 8 ? 1 : 0
            break
        }

        const unlocked = newProgress >= achievement.target

        if (unlocked && !achievement.unlocked) {
          toast({
            title: "Achievement Unlocked!",
            description: achievement.name,
          })
          playSound(800, 0.3)
        }

        return { ...achievement, progress: newProgress, unlocked }
      }),
    )
  }, [toast, playSound])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysPressed.current.left = true
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysPressed.current.right = true
      }
      if (e.key === " " && !gameStarted && !gameOver) {
        e.preventDefault()
        startGame()
      }
      if (e.key === "p" || e.key === "P") {
        e.preventDefault()
        togglePause()
      }
      if (e.key === "Escape") {
        e.preventDefault()
        setShowSettings(!showSettings)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysPressed.current.left = false
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysPressed.current.right = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gameStarted, gameOver, showSettings])

  // Touch controls
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!gameStarted && !gameOver) {
        startGame()
        return
      }

      const touch = e.touches[0]
      const container = gameContainerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const touchX = touch.clientX - rect.left

      if (touchX < rect.width / 2) {
        keysPressed.current.left = true
        keysPressed.current.right = false
      } else {
        keysPressed.current.right = true
        keysPressed.current.left = false
      }
    }

    const handleTouchEnd = () => {
      keysPressed.current.left = false
      keysPressed.current.right = false
    }

    const container = gameContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart)
      container.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [gameStarted, gameOver])

  // Particle system
  const addParticles = useCallback(
    (x: number, y: number, color: string, count = 5) => {
      if (!settings.particlesEnabled) return

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          id: Date.now() + i,
          x,
          y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 60,
          maxLife: 60,
          color,
          size: Math.random() * 4 + 2,
        })
      }
    },
    [settings.particlesEnabled],
  )

  // Power-up effects
  const activatePowerUp = useCallback(
    (type: PowerUpType) => {
      const duration = 5000 // 5 seconds

      switch (type) {
        case PowerUpType.SHIELD:
          setShieldActive(true)
          powerUpTimersRef.current.shield = Date.now() + duration
          break
        case PowerUpType.SPEED_BOOST:
          setSpeedBoostActive(true)
          powerUpTimersRef.current.speedBoost = Date.now() + duration
          break
        case PowerUpType.SLOW_TIME:
          setSlowTimeActive(true)
          powerUpTimersRef.current.slowTime = Date.now() + duration
          break
        case PowerUpType.SCORE_MULTIPLIER:
          setScoreMultiplierActive(true)
          powerUpTimersRef.current.scoreMultiplier = Date.now() + duration
          break
      }

      setPowerUpTimeLeft(duration)
      playSound(600, 0.2)

      // Update achievement progress
      setAchievements((prev) =>
        prev.map((achievement) => {
          if (achievement.id === "power_up_master" && !achievement.unlocked) {
            return { ...achievement, progress: achievement.progress + 1 }
          }
          return achievement
        }),
      )
    },
    [playSound],
  )

  // Game loop
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (gameOverRef.current || gamePausedRef.current) return

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Apply screen shake
      if (screenShakeRef.current > 0) {
        ctx.save()
        ctx.translate((Math.random() - 0.5) * screenShakeRef.current, (Math.random() - 0.5) * screenShakeRef.current)
        screenShakeRef.current *= 0.9
        if (screenShakeRef.current < 0.1) screenShakeRef.current = 0
      }

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT)
      gradient.addColorStop(0, "#0a0118")
      gradient.addColorStop(1, "#1a0a2e")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Draw background grid with glow
      drawGrid(ctx)

      // Update power-up timers
      updatePowerUpTimers()

      // Generate new obstacles
      if (timestamp - lastObstacleTimeRef.current > obstacleFrequencyRef.current) {
        generateObstacle()
        lastObstacleTimeRef.current = timestamp
      }

      // Generate power-ups occasionally
      if (timestamp - lastPowerUpTimeRef.current > 8000 + Math.random() * 5000) {
        generatePowerUp()
        lastPowerUpTimeRef.current = timestamp
      }

      // Update player position
      updatePlayer()

      // Update and draw obstacles
      updateObstacles(ctx)

      // Update and draw power-ups
      updatePowerUps(ctx)

      // Update and draw particles
      updateParticles(ctx)

      // Draw player with dynamic glow
      drawPlayer(ctx)

      // Draw UI
      drawUI(ctx)

      // Check achievements
      checkAchievements()

      if (screenShakeRef.current > 0) {
        ctx.restore()
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(gameLoop)

      // Calculate music intensity based on game state
      const musicIntensity = Math.min(1, (gameSpeedRef.current - INITIAL_OBSTACLE_SPEED) / 5 + scoreRef.current / 200)
    },
    [checkAchievements],
  )

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#2a1a4a"
    ctx.lineWidth = 1
    ctx.shadowBlur = 5
    ctx.shadowColor = "#2a1a4a"

    for (let x = 0; x <= GAME_WIDTH; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, GAME_HEIGHT)
      ctx.stroke()
    }

    for (let y = 0; y <= GAME_HEIGHT; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(GAME_WIDTH, y)
      ctx.stroke()
    }

    ctx.shadowBlur = 0
  }

  const updatePowerUpTimers = () => {
    const now = Date.now()

    Object.entries(powerUpTimersRef.current).forEach(([key, endTime]) => {
      if (now >= endTime) {
        switch (key) {
          case "shield":
            setShieldActive(false)
            break
          case "speedBoost":
            setSpeedBoostActive(false)
            break
          case "slowTime":
            setSlowTimeActive(false)
            break
          case "scoreMultiplier":
            setScoreMultiplierActive(false)
            break
        }
        delete powerUpTimersRef.current[key]
      } else {
        setPowerUpTimeLeft(endTime - now)
      }
    })
  }

  const updatePlayer = () => {
    const playerSpeed = speedBoostActive ? 12 : 8
    const adjustedSpeed = playerSpeed * settings.sensitivity

    if (keysPressed.current.left && playerXRef.current > PLAYER_SIZE / 2) {
      const newX = Math.max(PLAYER_SIZE / 2, playerXRef.current - adjustedSpeed)
      setPlayerX(newX)

      // Add trail particles when moving fast
      if (settings.particlesEnabled && Math.abs(playerXRef.current - newX) > 2) {
        addParticles(playerXRef.current, GAME_HEIGHT - PLAYER_SIZE / 2, "#00ffff", 2)
      }
    }

    if (keysPressed.current.right && playerXRef.current < GAME_WIDTH - PLAYER_SIZE / 2) {
      const newX = Math.min(GAME_WIDTH - PLAYER_SIZE / 2, playerXRef.current + adjustedSpeed)
      setPlayerX(newX)

      // Add trail particles when moving fast
      if (settings.particlesEnabled && Math.abs(playerXRef.current - newX) > 2) {
        addParticles(playerXRef.current, GAME_HEIGHT - PLAYER_SIZE / 2, "#00ffff", 2)
      }
    }
  }

  const updateObstacles = (ctx: CanvasRenderingContext2D) => {
    const obstacles = obstaclesRef.current
    const timeMultiplier = slowTimeActive ? 0.3 : 1

    const newObstacles = obstacles.filter((obstacle) => {
      // Move obstacle based on type
      switch (obstacle.type) {
        case ObstacleType.DIAGONAL:
          obstacle.x += (obstacle.direction || 1) * 2 * timeMultiplier
          obstacle.y += obstacle.speed * timeMultiplier
          break
        case ObstacleType.SPLITTER:
          obstacle.y += obstacle.speed * timeMultiplier
          // Split when reaching middle of screen
          if (obstacle.y > GAME_HEIGHT / 2 && !obstacle.hasTriggered) {
            obstacle.hasTriggered = true
            // Create two smaller obstacles
            obstaclesRef.current.push(
              {
                ...obstacle,
                id: Date.now() + 1,
                x: obstacle.x - obstacle.width / 2,
                width: obstacle.width / 2,
                type: ObstacleType.NORMAL,
              },
              {
                ...obstacle,
                id: Date.now() + 2,
                x: obstacle.x + obstacle.width / 2,
                width: obstacle.width / 2,
                type: ObstacleType.NORMAL,
              },
            )
            return false // Remove original
          }
          break
        default:
          obstacle.y += obstacle.speed * timeMultiplier
      }

      // Check for collision with player
      const playerBottom = GAME_HEIGHT - PLAYER_SIZE / 2
      const playerTop = GAME_HEIGHT - PLAYER_SIZE * 1.5

      if (
        obstacle.y + obstacle.height > playerTop &&
        obstacle.y < playerBottom &&
        obstacle.x < playerXRef.current + PLAYER_SIZE / 2 &&
        obstacle.x + obstacle.width > playerXRef.current - PLAYER_SIZE / 2
      ) {
        if (shieldActive) {
          // Shield absorbs hit
          addParticles(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, "#ffff00", 10)
          playSound(400, 0.1)
          return false
        } else {
          // Handle special obstacle effects
          if (obstacle.type === ObstacleType.SLOW && !obstacle.hasTriggered) {
            obstacle.hasTriggered = true
            // Slow player temporarily (handled in updatePlayer)
            playSound(200, 0.5)
          } else if (obstacle.type === ObstacleType.SHAKER && !obstacle.hasTriggered) {
            obstacle.hasTriggered = true
            screenShakeRef.current = 20
            playSound(100, 0.3, "sawtooth")
          }

          endGame()
          return false
        }
      }

      // Check for near miss (increases glow intensity)
      const nearMissDistance = 50
      if (
        Math.abs(obstacle.x + obstacle.width / 2 - playerXRef.current) < nearMissDistance &&
        Math.abs(obstacle.y + obstacle.height / 2 - (GAME_HEIGHT - PLAYER_SIZE / 2)) < nearMissDistance
      ) {
        playerGlowIntensityRef.current = Math.min(2, playerGlowIntensityRef.current + 0.1)
        nearMissCountRef.current++
      }

      // Remove obstacles that have gone off screen
      if (obstacle.y > GAME_HEIGHT) {
        // Increase score and combo
        const baseScore = scoreMultiplierActive ? 2 : 1
        const comboBonus = Math.floor(comboRef.current / 5)
        const totalScore = (baseScore + comboBonus) * multiplierRef.current

        setScore((prev) => prev + totalScore)
        setCombo((prev) => prev + 1)

        // Update multiplier based on combo
        const newMultiplier = Math.min(5, Math.floor(comboRef.current / 10) + 1)
        setMultiplier(newMultiplier)

        // Increase game speed and frequency
        gameSpeedRef.current += SPEED_INCREMENT
        obstacleFrequencyRef.current = Math.max(200, obstacleFrequencyRef.current - FREQUENCY_DECREMENT)

        // Add sparkle particles
        addParticles(obstacle.x + obstacle.width / 2, obstacle.y, "#ffff00", 3)
        playSound(800, 0.1)

        return false
      }

      // Draw obstacle with glow effect
      ctx.fillStyle = obstacle.color
      ctx.shadowBlur = 15
      ctx.shadowColor = obstacle.color

      // Special rendering for different types
      switch (obstacle.type) {
        case ObstacleType.SPLITTER:
          // Draw with pulsing effect
          const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7
          ctx.globalAlpha = pulse
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
          ctx.globalAlpha = 1
          break
        case ObstacleType.SHAKER:
          // Draw with jagged edges
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
          // Add spikes
          ctx.fillRect(obstacle.x - 5, obstacle.y + obstacle.height / 2 - 2, 10, 4)
          ctx.fillRect(obstacle.x + obstacle.width - 5, obstacle.y + obstacle.height / 2 - 2, 10, 4)
          break
        default:
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      }

      ctx.shadowBlur = 0

      return true
    })

    obstaclesRef.current = newObstacles
  }

  const updatePowerUps = (ctx: CanvasRenderingContext2D) => {
    const powerUps = powerUpsRef.current

    const newPowerUps = powerUps.filter((powerUp) => {
      powerUp.y += 2
      powerUp.pulsePhase += 0.1

      // Check for collection
      if (
        powerUp.y + 20 > GAME_HEIGHT - PLAYER_SIZE &&
        powerUp.y < GAME_HEIGHT &&
        powerUp.x < playerXRef.current + PLAYER_SIZE / 2 &&
        powerUp.x + 20 > playerXRef.current - PLAYER_SIZE / 2
      ) {
        activatePowerUp(powerUp.type)
        addParticles(powerUp.x + 10, powerUp.y + 10, powerUp.color, 8)
        return false
      }

      // Remove if off screen
      if (powerUp.y > GAME_HEIGHT) return false

      // Draw power-up with pulsing glow
      const pulse = Math.sin(powerUp.pulsePhase) * 0.3 + 0.7
      ctx.fillStyle = powerUp.color
      ctx.shadowBlur = 20 * pulse
      ctx.shadowColor = powerUp.color
      ctx.globalAlpha = pulse

      ctx.beginPath()
      ctx.arc(powerUp.x + 10, powerUp.y + 10, 10, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      return true
    })

    powerUpsRef.current = newPowerUps
  }

  const updateParticles = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current

    const newParticles = particles.filter((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--
      particle.vx *= 0.98
      particle.vy *= 0.98

      if (particle.life <= 0) return false

      // Draw particle
      const alpha = particle.life / particle.maxLife
      ctx.fillStyle = particle.color
      ctx.globalAlpha = alpha
      ctx.shadowBlur = 5
      ctx.shadowColor = particle.color

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      return true
    })

    particlesRef.current = newParticles
  }

  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const playerY = GAME_HEIGHT - PLAYER_SIZE / 2

    // Gradually reduce glow intensity
    playerGlowIntensityRef.current = Math.max(1, playerGlowIntensityRef.current - 0.02)

    // Shield effect
    if (shieldActive) {
      const shieldPulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7
      ctx.strokeStyle = "#ffff00"
      ctx.lineWidth = 3
      ctx.shadowBlur = 15 * shieldPulse
      ctx.shadowColor = "#ffff00"
      ctx.globalAlpha = 0.7 * shieldPulse

      ctx.beginPath()
      ctx.arc(playerXRef.current, playerY, PLAYER_SIZE, 0, Math.PI * 2)
      ctx.stroke()

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    // Player orb with dynamic glow
    const glowIntensity = playerGlowIntensityRef.current
    ctx.fillStyle = speedBoostActive ? "#ff00ff" : "#00ffff"
    ctx.shadowBlur = 20 * glowIntensity
    ctx.shadowColor = speedBoostActive ? "#ff00ff" : "#00ffff"

    ctx.beginPath()
    ctx.arc(playerXRef.current, playerY, PLAYER_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()

    // Outer glow
    const gradient = ctx.createRadialGradient(
      playerXRef.current,
      playerY,
      0,
      playerXRef.current,
      playerY,
      PLAYER_SIZE * glowIntensity,
    )
    gradient.addColorStop(0, speedBoostActive ? "rgba(255, 0, 255, 0.3)" : "rgba(0, 255, 255, 0.3)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    ctx.fillStyle = gradient
    ctx.shadowBlur = 0
    ctx.beginPath()
    ctx.arc(playerXRef.current, playerY, PLAYER_SIZE * glowIntensity, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawUI = (ctx: CanvasRenderingContext2D) => {
    // Score and combo
    ctx.font = "bold 20px 'Inter', sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "left"
    ctx.shadowBlur = 5
    ctx.shadowColor = "#ffffff"
    ctx.fillText(`Score: ${scoreRef.current}`, 20, 30)

    if (comboRef.current > 5) {
      ctx.fillStyle = "#ffff00"
      ctx.shadowColor = "#ffff00"
      ctx.fillText(`Combo: ${comboRef.current}x`, 20, 55)
    }

    if (multiplierRef.current > 1) {
      ctx.fillStyle = "#ff00ff"
      ctx.shadowColor = "#ff00ff"
      ctx.fillText(`Multiplier: ${multiplierRef.current}x`, 20, 80)
    }

    // High score
    ctx.textAlign = "right"
    ctx.fillStyle = "#aaaaaa"
    ctx.shadowColor = "#aaaaaa"
    ctx.fillText(`High: ${highScore}`, GAME_WIDTH - 20, 30)

    // Power-up indicators
    let yOffset = 0
    if (shieldActive) {
      ctx.fillStyle = "#ffff00"
      ctx.shadowColor = "#ffff00"
      ctx.fillText("SHIELD", GAME_WIDTH - 20, 60 + yOffset)
      yOffset += 25
    }
    if (speedBoostActive) {
      ctx.fillStyle = "#ff00ff"
      ctx.shadowColor = "#ff00ff"
      ctx.fillText("SPEED", GAME_WIDTH - 20, 60 + yOffset)
      yOffset += 25
    }
    if (slowTimeActive) {
      ctx.fillStyle = "#00ff00"
      ctx.shadowColor = "#00ff00"
      ctx.fillText("SLOW TIME", GAME_WIDTH - 20, 60 + yOffset)
      yOffset += 25
    }
    if (scoreMultiplierActive) {
      ctx.fillStyle = "#ff8800"
      ctx.shadowColor = "#ff8800"
      ctx.fillText("SCORE x2", GAME_WIDTH - 20, 60 + yOffset)
    }

    // Music intensity indicator (only show if music is enabled and playing)
    if (settings.musicEnabled && gameStarted && !gameOver) {
      const musicIntensity = Math.min(1, (gameSpeedRef.current - INITIAL_OBSTACLE_SPEED) / 5 + scoreRef.current / 200)
      ctx.fillStyle = `rgba(255, 100, 255, ${0.3 + musicIntensity * 0.7})`
      ctx.shadowColor = "#ff64ff"
      ctx.font = "12px 'Inter', sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(`♪ ${Math.floor(musicIntensity * 100)}%`, 20, GAME_HEIGHT - 20)
    }

    ctx.shadowBlur = 0
  }

  const generateObstacle = () => {
    const types = Object.values(ObstacleType)
    const type = types[Math.floor(Math.random() * types.length)]

    let width = Math.random() * 80 + 40
    let height = 20
    let color = "#ff00ff"
    let speed = gameSpeedRef.current
    const direction = Math.random() > 0.5 ? 1 : -1

    switch (type) {
      case ObstacleType.DIAGONAL:
        color = "#ff3377"
        speed *= 0.8
        break
      case ObstacleType.SPLITTER:
        color = "#ff8800"
        width *= 1.5
        break
      case ObstacleType.SLOW:
        color = "#8800ff"
        width *= 0.7
        break
      case ObstacleType.SHAKER:
        color = "#ff0000"
        width *= 0.8
        height = 30
        break
      default:
        color = "#00ffff"
    }

    const x = Math.random() * (GAME_WIDTH - width)

    obstaclesRef.current.push({
      id: Date.now(),
      x,
      y: -height,
      width,
      height,
      color,
      type,
      speed,
      direction,
    })
  }

  const generatePowerUp = () => {
    const types = Object.values(PowerUpType)
    const type = types[Math.floor(Math.random() * types.length)]

    let color = "#ffff00"
    switch (type) {
      case PowerUpType.SHIELD:
        color = "#ffff00"
        break
      case PowerUpType.SPEED_BOOST:
        color = "#ff00ff"
        break
      case PowerUpType.SLOW_TIME:
        color = "#00ff00"
        break
      case PowerUpType.SCORE_MULTIPLIER:
        color = "#ff8800"
        break
    }

    powerUpsRef.current.push({
      id: Date.now(),
      x: Math.random() * (GAME_WIDTH - 20),
      y: -20,
      type,
      color,
      pulsePhase: 0,
    })
  }

  const startGame = () => {
    if (gameStarted) return

    setGameStarted(true)
    setGameOver(false)
    setGamePaused(false)
    setScore(0)
    setCombo(0)
    setMultiplier(1)

    // Reset game state
    obstaclesRef.current = []
    powerUpsRef.current = []
    particlesRef.current = []
    gameSpeedRef.current = INITIAL_OBSTACLE_SPEED
    obstacleFrequencyRef.current = OBSTACLE_FREQUENCY
    lastObstacleTimeRef.current = 0
    lastPowerUpTimeRef.current = 0
    gameStartTimeRef.current = Date.now()
    screenShakeRef.current = 0
    playerGlowIntensityRef.current = 1
    nearMissCountRef.current = 0

    // Reset power-ups
    setShieldActive(false)
    setSpeedBoostActive(false)
    setSlowTimeActive(false)
    setScoreMultiplierActive(false)
    powerUpTimersRef.current = {}

    // Start game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop)

    playSound(440, 0.3)
    toast({
      title: "Game Started",
      description: "Dodge the falling obstacles!",
    })
  }

  const endGame = () => {
    gameOverRef.current = true
    setGameOver(true)
    setGameStarted(false)
    setCombo(0)

    // Update high score
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current)
      localStorage.setItem("shadowRunnerHighScore", scoreRef.current.toString())
    }

    // Stop animation loop
    cancelAnimationFrame(animationFrameRef.current)

    // Game over sound
    playSound(200, 1, "sawtooth")

    // Add explosion particles
    addParticles(playerXRef.current, GAME_HEIGHT - PLAYER_SIZE / 2, "#ff0000", 20)
  }

  const togglePause = () => {
    if (!gameStarted || gameOver) return

    setGamePaused(!gamePaused)

    if (!gamePausedRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      toast({
        title: "Game Paused",
        description: "Press P to resume",
      })
    } else {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
      toast({
        title: "Game Resumed",
        description: "Good luck!",
      })
    }
  }

  const restartGame = () => {
    setGameOver(false)
    gameOverRef.current = false
    startGame()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 relative">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
          Shadow Runner
        </h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors"
        >
          ⚙️
        </button>
        <button
          onClick={() => setShowAchievements(true)}
          className="p-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors"
        >
          🏆
        </button>
      </div>

      <div
        ref={gameContainerRef}
        className="relative w-full max-w-[600px] h-[800px] border-2 border-purple-900 rounded-lg overflow-hidden"
      >
        <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} className="bg-[#0a0118]" />

        <AnimatePresence>
          {!gameStarted && !gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Shadow Runner</h2>
              <p className="text-lg text-gray-300 mb-8 text-center">
                Dodge the falling obstacles and collect power-ups to survive as long as possible!
              </p>
              <div className="mb-8 text-center">
                <p className="text-gray-300 mb-2">Controls:</p>
                {isMobile ? (
                  <p className="text-gray-400">Tap left/right side of screen to move</p>
                ) : (
                  <p className="text-gray-400">Use Arrow Keys or A/D to move • P to pause • ESC for settings</p>
                )}
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-pink-600 transition-all"
              >
                Start Game
              </button>
            </motion.div>
          )}

          {gameOver && (
            <GameOverScreen
              score={score}
              highScore={highScore}
              combo={combo}
              achievements={achievements}
              onRestart={restartGame}
            />
          )}

          {gamePaused && gameStarted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Game Paused</h2>
              <button
                onClick={togglePause}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-pink-600 transition-all"
              >
                Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Power-up timer display */}
        {powerUpTimeLeft > 0 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full">
            <div className="text-white text-sm font-bold">Power-up: {Math.ceil(powerUpTimeLeft / 1000)}s</div>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={togglePause}
          className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors"
          disabled={!gameStarted || gameOver}
        >
          {gamePaused ? "Resume" : "Pause"} (P)
        </button>
        <button
          onClick={restartGame}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          disabled={gameStarted && !gameOver}
        >
          {gameOver ? "Play Again" : "Restart"}
        </button>
      </div>

      <div className="text-gray-400 text-sm mt-4 text-center">
        {isMobile ? (
          <p>Tap left or right side of the screen to move</p>
        ) : (
          <p>Use Arrow Keys or A/D to move • P to pause • ESC for settings</p>
        )}
      </div>

      <SettingsMenu
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />

      <AchievementsPanel
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={achievements}
      />

      <MusicManager
        isPlaying={gameStarted && !gameOver && !gamePaused}
        musicEnabled={settings.musicEnabled}
        intensity={Math.min(1, (gameSpeedRef.current - INITIAL_OBSTACLE_SPEED) / 5 + scoreRef.current / 200)}
        gameSpeed={gameSpeedRef.current}
      />
    </div>
  )
}
