// Audio manager for the game

export function setupAudio() {
  // Create audio context
  let audioContext;
  let isMuted = false;
  const sounds = {};
  
  // Initialize audio
  function init() {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      
      // Create sounds
      createSounds();
      
      return true;
    } catch (error) {
      console.error("Web Audio API is not supported in this browser", error);
      return false;
    }
  }
  
  // Create all sound effects
  function createSounds() {
    // Game start sound
    sounds.start = createOscillatorSound([
      { frequency: 440, type: 'sine', duration: 100 },
      { frequency: 554, type: 'sine', duration: 100 },
      { frequency: 659, type: 'sine', duration: 200 }
    ]);
    
    // Collect item sound
    sounds.collect = createOscillatorSound([
      { frequency: 880, type: 'sine', duration: 50 },
      { frequency: 1320, type: 'sine', duration: 100 }
    ]);
    
    // Level up sound
    sounds.levelUp = createOscillatorSound([
      { frequency: 440, type: 'sine', duration: 100 },
      { frequency: 554, type: 'sine', duration: 100 },
      { frequency: 659, type: 'sine', duration: 100 },
      { frequency: 880, type: 'sine', duration: 200 }
    ]);
    
    // Game over sound
    sounds.gameOver = createOscillatorSound([
      { frequency: 494, type: 'sawtooth', duration: 100 },
      { frequency: 466, type: 'sawtooth', duration: 100 },
      { frequency: 440, type: 'sawtooth', duration: 100 },
      { frequency: 392, type: 'sawtooth', duration: 300 }
    ]);
  }
  
  // Create a sound using oscillator nodes
  function createOscillatorSound(notes) {
    return () => {
      if (isMuted || !audioContext) return;
      
      let startTime = audioContext.currentTime;
      
      notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = note.type || 'sine';
        oscillator.frequency.value = note.frequency;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + (note.duration / 1000));
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + (note.duration / 1000) + 0.01);
        
        startTime += note.duration / 1000;
      });
    };
  }
  
  // Play a sound by name
  function playSound(name) {
    if (sounds[name] && !isMuted) {
      // Resume audio context if it's suspended (needed for Chrome)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      sounds[name]();
    }
  }
  
  // Toggle mute state
  function toggleMute() {
    isMuted = !isMuted;
    return isMuted;
  }
  
  // Initialize audio
  const isSupported = init();
  
  // Return public API
  return {
    playSound,
    toggleMute,
    isSupported
  };
}