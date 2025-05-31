"use client"

import { useEffect, useRef, useCallback } from "react"

interface MusicManagerProps {
  isPlaying: boolean
  musicEnabled: boolean
  intensity: number // 0-1 scale based on game difficulty
  gameSpeed: number
}

export default function MusicManager({ isPlaying, musicEnabled, intensity, gameSpeed }: MusicManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const bassOscillatorRef = useRef<OscillatorNode | null>(null)
  const leadOscillatorRef = useRef<OscillatorNode | null>(null)
  const padOscillatorRef = useRef<OscillatorNode | null>(null)
  const drumGainRef = useRef<GainNode | null>(null)
  const bassGainRef = useRef<GainNode | null>(null)
  const leadGainRef = useRef<GainNode | null>(null)
  const padGainRef = useRef<GainNode | null>(null)
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const reverbRef = useRef<ConvolverNode | null>(null)
  const drumIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const bassIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const leadIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentIntensityRef = useRef(0)

  // Synthwave chord progressions and scales
  const bassNotes = [55, 65.4, 73.4, 82.4] // A1, C2, D2, E2
  const leadNotes = [220, 261.6, 293.7, 329.6, 392, 440, 493.9, 523.3] // A3-C4 scale
  const padChords = [
    [220, 277.2, 329.6], // Am
    [261.6, 329.6, 392], // C
    [293.7, 369.9, 440], // Dm
    [329.6, 415.3, 493.9], // Em
  ]

  // Initialize audio context and nodes
  const initializeAudio = useCallback(() => {
    if (!musicEnabled || audioContextRef.current) return

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      const ctx = audioContextRef.current

      // Master gain
      masterGainRef.current = ctx.createGain()
      masterGainRef.current.gain.setValueAtTime(0.3, ctx.currentTime)
      masterGainRef.current.connect(ctx.destination)

      // Create reverb
      createReverb(ctx)

      // Create filter for dynamic effects
      filterRef.current = ctx.createBiquadFilter()
      filterRef.current.type = "lowpass"
      filterRef.current.frequency.setValueAtTime(2000, ctx.currentTime)
      filterRef.current.Q.setValueAtTime(1, ctx.currentTime)
      filterRef.current.connect(reverbRef.current || masterGainRef.current)

      // Create gain nodes for different layers
      bassGainRef.current = ctx.createGain()
      bassGainRef.current.gain.setValueAtTime(0, ctx.currentTime)
      bassGainRef.current.connect(filterRef.current)

      leadGainRef.current = ctx.createGain()
      leadGainRef.current.gain.setValueAtTime(0, ctx.currentTime)
      leadGainRef.current.connect(filterRef.current)

      padGainRef.current = ctx.createGain()
      padGainRef.current.gain.setValueAtTime(0, ctx.currentTime)
      padGainRef.current.connect(filterRef.current)

      drumGainRef.current = ctx.createGain()
      drumGainRef.current.gain.setValueAtTime(0, ctx.currentTime)
      drumGainRef.current.connect(masterGainRef.current)
    } catch (error) {
      console.warn("Failed to initialize audio context:", error)
    }
  }, [musicEnabled])

  // Create reverb impulse response
  const createReverb = (ctx: AudioContext) => {
    const convolver = ctx.createConvolver()
    const length = ctx.sampleRate * 2 // 2 seconds
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2)
      }
    }

    convolver.buffer = impulse
    reverbRef.current = convolver

    // Connect reverb with dry/wet mix
    const reverbGain = ctx.createGain()
    reverbGain.gain.setValueAtTime(0.2, ctx.currentTime)
    convolver.connect(reverbGain)
    reverbGain.connect(masterGainRef.current!)
  }

  // Create bass line
  const startBassLine = useCallback(() => {
    if (!audioContextRef.current || !bassGainRef.current) return

    const ctx = audioContextRef.current
    let bassIndex = 0

    const playBassNote = () => {
      if (!ctx || !bassGainRef.current) return

      // Create bass oscillator
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(bassNotes[bassIndex % bassNotes.length], ctx.currentTime)

      // Add sub-bass
      const subOsc = ctx.createOscillator()
      subOsc.type = "sine"
      subOsc.frequency.setValueAtTime(bassNotes[bassIndex % bassNotes.length] / 2, ctx.currentTime)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)

      const subGain = ctx.createGain()
      subGain.gain.setValueAtTime(0, ctx.currentTime)
      subGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01)
      subGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)

      osc.connect(gain)
      subOsc.connect(subGain)
      gain.connect(bassGainRef.current)
      subGain.connect(bassGainRef.current)

      osc.start(ctx.currentTime)
      subOsc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.5)
      subOsc.stop(ctx.currentTime + 0.5)

      bassIndex++
    }

    playBassNote()
    const tempo = Math.max(300, 500 - gameSpeed * 20) // Faster tempo with higher game speed
    bassIntervalRef.current = setInterval(playBassNote, tempo)
  }, [gameSpeed])

  // Create lead melody
  const startLeadMelody = useCallback(() => {
    if (!audioContextRef.current || !leadGainRef.current) return

    const ctx = audioContextRef.current
    let leadIndex = 0

    const playLeadNote = () => {
      if (!ctx || !leadGainRef.current) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = "sawtooth"
      const noteIndex = Math.floor(Math.random() * leadNotes.length)
      osc.frequency.setValueAtTime(leadNotes[noteIndex], ctx.currentTime)

      filter.type = "lowpass"
      filter.frequency.setValueAtTime(1000 + intensity * 2000, ctx.currentTime)
      filter.Q.setValueAtTime(5, ctx.currentTime)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(leadGainRef.current)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.4)

      leadIndex++
    }

    const tempo = Math.max(400, 800 - gameSpeed * 30)
    leadIntervalRef.current = setInterval(playLeadNote, tempo)
  }, [intensity, gameSpeed])

  // Create pad chords
  const startPadChords = useCallback(() => {
    if (!audioContextRef.current || !padGainRef.current) return

    const ctx = audioContextRef.current
    let chordIndex = 0

    const playChord = () => {
      if (!ctx || !padGainRef.current) return

      const chord = padChords[chordIndex % padChords.length]

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        filter.type = "lowpass"
        filter.frequency.setValueAtTime(800 + intensity * 1200, ctx.currentTime)
        filter.Q.setValueAtTime(2, ctx.currentTime)

        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1)
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(padGainRef.current)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 2.1)
      })

      chordIndex++
    }

    playChord()
    const chordInterval = setInterval(playChord, 2000) // 2 second chord changes
    return chordInterval
  }, [intensity])

  // Create drum pattern
  const startDrumPattern = useCallback(() => {
    if (!audioContextRef.current || !drumGainRef.current) return

    const ctx = audioContextRef.current
    let beatCount = 0

    const playDrum = (type: "kick" | "snare" | "hihat") => {
      if (!ctx || !drumGainRef.current) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      switch (type) {
        case "kick":
          osc.type = "sine"
          osc.frequency.setValueAtTime(60, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.1)
          gain.gain.setValueAtTime(0.4, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
          break
        case "snare":
          osc.type = "square"
          osc.frequency.setValueAtTime(200, ctx.currentTime)
          filter.type = "highpass"
          filter.frequency.setValueAtTime(1000, ctx.currentTime)
          gain.gain.setValueAtTime(0.2, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
          break
        case "hihat":
          osc.type = "square"
          osc.frequency.setValueAtTime(8000, ctx.currentTime)
          filter.type = "highpass"
          filter.frequency.setValueAtTime(5000, ctx.currentTime)
          gain.gain.setValueAtTime(0.1, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
          break
      }

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(drumGainRef.current)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.3)
    }

    const playBeat = () => {
      const beat = beatCount % 16

      // Kick on 1, 5, 9, 13
      if (beat % 4 === 0) {
        playDrum("kick")
      }

      // Snare on 5, 13
      if (beat === 4 || beat === 12) {
        playDrum("snare")
      }

      // Hi-hats on off-beats (intensity dependent)
      if (intensity > 0.3 && beat % 2 === 1) {
        playDrum("hihat")
      }

      beatCount++
    }

    playBeat()
    const tempo = Math.max(80, 120 - gameSpeed * 5) // Faster drums with higher speed
    drumIntervalRef.current = setInterval(playBeat, tempo)
  }, [intensity, gameSpeed])

  // Update music intensity
  const updateIntensity = useCallback(() => {
    if (!audioContextRef.current || !musicEnabled) return

    const ctx = audioContextRef.current
    const targetIntensity = Math.min(1, intensity)

    // Smooth intensity transition
    const smoothIntensity = currentIntensityRef.current + (targetIntensity - currentIntensityRef.current) * 0.1
    currentIntensityRef.current = smoothIntensity

    // Update layer volumes based on intensity
    if (bassGainRef.current) {
      bassGainRef.current.gain.linearRampToValueAtTime(0.4 * smoothIntensity, ctx.currentTime + 0.1)
    }

    if (leadGainRef.current) {
      // Lead comes in at 30% intensity
      const leadVolume = Math.max(0, (smoothIntensity - 0.3) * 0.3)
      leadGainRef.current.gain.linearRampToValueAtTime(leadVolume, ctx.currentTime + 0.1)
    }

    if (padGainRef.current) {
      // Pads come in at 20% intensity
      const padVolume = Math.max(0, (smoothIntensity - 0.2) * 0.2)
      padGainRef.current.gain.linearRampToValueAtTime(padVolume, ctx.currentTime + 0.1)
    }

    if (drumGainRef.current) {
      // Drums come in at 40% intensity
      const drumVolume = Math.max(0, (smoothIntensity - 0.4) * 0.4)
      drumGainRef.current.gain.linearRampToValueAtTime(drumVolume, ctx.currentTime + 0.1)
    }

    // Update filter cutoff for dynamic feel
    if (filterRef.current) {
      const cutoff = 1000 + smoothIntensity * 3000
      filterRef.current.frequency.linearRampToValueAtTime(cutoff, ctx.currentTime + 0.1)
    }
  }, [intensity, musicEnabled])

  // Start music
  const startMusic = useCallback(() => {
    if (!musicEnabled || !audioContextRef.current) return

    // Resume audio context if suspended
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    startBassLine()
    startPadChords()

    // Start lead and drums after a delay based on intensity
    setTimeout(() => {
      if (intensity > 0.3) startLeadMelody()
    }, 2000)

    setTimeout(() => {
      if (intensity > 0.4) startDrumPattern()
    }, 4000)
  }, [musicEnabled, intensity, startBassLine, startPadChords, startLeadMelody, startDrumPattern])

  // Stop music
  const stopMusic = useCallback(() => {
    // Clear all intervals
    if (bassIntervalRef.current) {
      clearInterval(bassIntervalRef.current)
      bassIntervalRef.current = null
    }
    if (leadIntervalRef.current) {
      clearInterval(leadIntervalRef.current)
      leadIntervalRef.current = null
    }
    if (drumIntervalRef.current) {
      clearInterval(drumIntervalRef.current)
      drumIntervalRef.current = null
    }

    // Fade out all gains
    if (audioContextRef.current) {
      const ctx = audioContextRef.current
      if (bassGainRef.current) {
        bassGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      }
      if (leadGainRef.current) {
        leadGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      }
      if (padGainRef.current) {
        padGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      }
      if (drumGainRef.current) {
        drumGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      }
    }
  }, [])

  // Initialize audio when component mounts
  useEffect(() => {
    if (musicEnabled) {
      initializeAudio()
    }
  }, [musicEnabled, initializeAudio])

  // Handle play/stop
  useEffect(() => {
    if (isPlaying && musicEnabled) {
      startMusic()
    } else {
      stopMusic()
    }

    return () => {
      stopMusic()
    }
  }, [isPlaying, musicEnabled, startMusic, stopMusic])

  // Update intensity continuously
  useEffect(() => {
    if (isPlaying && musicEnabled) {
      updateIntensity()
    }
  }, [intensity, isPlaying, musicEnabled, updateIntensity])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopMusic])

  return null // This component doesn't render anything
}
