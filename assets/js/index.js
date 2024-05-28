'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};
const context = new AudioContext()
const o = context.createOscillator();
let frequency = 1440;
let type = "sine"

// FUNKTIONEN
const domMapping = () => {
    elements.btnStart = document.querySelector('#btnStart');
    elements.btnStop = document.querySelector('#btnStop');
    elements.rngFrequency = document.querySelector('#rngFrequency');
    elements.selType = document.querySelector('#selType');
}
const setDefaults = () => {
    elements.rngFrequency.value = frequency;
    elements.selType.value = type;
}

const appendEventlisteners = () => {
    elements.btnStart.addEventListener('click', play);
    elements.btnStop.addEventListener('click', stop);
    elements.rngFrequency.addEventListener('input', chngFrequency);
    elements.selType.addEventListener('input', chngType);
}

const chngFrequency = evt => {
    frequency = +evt.target.value;
    o.frequency.setValueAtTime(frequency, context.currentTime);
}

const chngType = evt => {
    type = evt.target.value;
    o.type = type;
}

const play = () => {
    o.type = "sawtooth";
    o.frequency.setValueAtTime(frequency, context.currentTime);
    o.connect(context.destination)
    o.start()
}

const stop = () => {
    o.stop();
}

const init = () => {
    domMapping();
    setDefaults();
    appendEventlisteners();
}

// INIT
init();