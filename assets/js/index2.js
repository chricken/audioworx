'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};
const context = new AudioContext()
console.log(context.state);
const o = context.createOscillator();
const g = context.createGain();

o.connect(g).connect(context.destination);

let frequency = 250;
let volume = .5;
let type = "sine"

// FUNKTIONEN
const domMapping = () => {
    elements.btnStart = document.querySelector('#btnStart');
    elements.btnStop = document.querySelector('#btnStop');
    elements.rngFrequency = document.querySelector('#rngFrequency');
    elements.rngVolume = document.querySelector('#rngVolume');
    elements.selType = document.querySelector('#selType');
}
const setDefaults = () => {
    elements.rngFrequency.value = frequency;
    elements.rngVolume.value = volume;
    elements.selType.value = type;
}

const appendEventlisteners = () => {
    elements.btnStart.addEventListener('click', play);
    elements.btnStop.addEventListener('click', stop);
    elements.rngFrequency.addEventListener('input', chngFrequency);
    elements.rngVolume.addEventListener('input', chngVolume);
    elements.selType.addEventListener('input', chngType);
}

const chngFrequency = evt => {
    frequency = +evt.target.value;
    o.frequency.setValueAtTime(frequency, context.currentTime);
    // o.frequency.exponentialRampToValueAtTime(frequency*2,context.currentTime+1 )
}

const chngVolume = evt => {
    volume = +evt.target.value;
    g.gain.setValueAtTime(volume, context.currentTime);
}

const chngType = evt => {
    type = evt.target.value;
    o.type = type;
}

const play = () => {
    o.type = type;
    o.frequency.setValueAtTime(frequency, context.currentTime);
    g.gain.setValueAtTime(volume, context.currentTime);
    o.start()
}

const stop = () => {
    o.stop();
}

const changeVolSine = () => {
    let fasterSin = 3;
    let fasterCos = 7;

    let ts = (Date.now() *fasterSin) % 360;
    ts = ts / 180 * Math.PI;
    let sine = Math.sin(ts);
    sine = (sine + 1) / 2
    
    ts = (Date.now() * fasterCos) % 360;
    let cosine = Math.cos(ts);
    cosine = (cosine + 1) / 2
    g.gain.setValueAtTime(sine * cosine, context.currentTime);
}

const init = () => {
    domMapping();
    setDefaults();
    appendEventlisteners();

    setInterval(changeVolSine, 30)
}

// INIT
init();