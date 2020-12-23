import audio from '../AudioContext.mjs';

let Modulator;
let Carrier;
let Master;
let Modulator_index;
let Modulator_freq = 1;
let on = false;
let ctx;

// private values 
audio.then(context => {
    Modulator = context.createOscillator();
    Carrier = context.createOscillator();
    Master = context.createGain();
    Modulator_index = context.createGain();
    Modulator_freq = 1;
    on = false;
    ctx = context;
})

export default class {

    constructor() {
        // Wiring everything up
        Modulator.connect(Modulator_index);
        Modulator_index.connect(Carrier.frequency);
        Carrier.connect(Master);
        Master.gain.value = 0.02;
        Modulator.start();
        Carrier.start();
    }

    start() {
        if (!on) {
            Master.connect(ctx.destination);
        } else {
            Master.disconnect(ctx.destination);
        }
        on = !on;
        return on;
    }

    set amp(value) {
        Master.gain.value = value;
    }

    set freq(freq) {
        Carrier.frequency.value = freq;
        Modulator.frequency.value = freq * Modulator_freq;
    }

    set index_modulator(freq) {
        Modulator_index.gain.value = freq;
    }

    get index_modulator() {
        return Modulator_index.gain.value;
    }

    get freq_modulator() {
        return Modulator_freq;
    }

    set freq_modulator(freq) {
        Modulator_freq = freq;
        Modulator.frequency.value = Carrier.frequency.value * Modulator_freq;
    }

    set analyseur(analyseur) {
        Master.connect(analyseur);
    }

}