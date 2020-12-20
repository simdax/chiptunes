var ctx = new AudioContext();

// private values 
const Modulator = ctx.createOscillator();
const Carrier = ctx.createOscillator();
const Master = ctx.createGain();
const Modulator_index = ctx.createGain();
let Modulator_freq = 1;
let on = false;

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

    set freq_modulator(freq) {
        Modulator_freq = freq;
        Modulator.frequency.value = Carrier.frequency.value * Modulator_freq;
    }

}