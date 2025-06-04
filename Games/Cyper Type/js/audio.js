const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const sounds = {
    hit: createSound(440, 0.1),
    combo: createSound(660, 0.15),
    gameOver: createSound(220, 0.3)
};

function createSound(frequency, duration) {
    return () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    };
}