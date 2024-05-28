const audioContext = new AudioContext();

const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(80, audioContext.currentTime);

const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

oscillator.connect(gainNode).connect(audioContext.destination);


// Um die Lautstärke zu ändern:
function changeVolume(volume) {
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
}

const play = () => {
    oscillator.start();
}

const changeVol = evt => {
    changeVolume(+evt.target.value)
}

document.querySelector("#btnStart").addEventListener('click', play);
document.querySelector("#rngVolume").addEventListener('input', changeVol);
