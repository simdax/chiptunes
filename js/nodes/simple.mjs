import audio from '../AudioContext.mjs';
import { Visualizer } from '../Visualiser.mjs';

// class INode extends AudioNode {
    // set freq();
    // set amp();
// }

class Signal {
    signal;
    amp;
    visualizer;

    constructor(ctx, type) {
        this.signal = ctx.createOscillator();
        this.signal.type = type;
        this.amp = ctx.createGain();
        this.amp.gain.value = 0;
        const visu = document.createElement('canvas');
        const id =  Math.random();
        visu.id = [...("" + id)].map(l => "apfjwlrstn"[l]).join('');
        visu.width= 200;
        visu.height= 200;
        document.body.appendChild(visu);
        this.analyzerNode = ctx.createAnalyser();
        this.visualizer = new Visualizer("#" + visu.id, );
        this.signal.connect(this.amp);
        this.amp.connect(this.analyzerNode);
    }

    get frequency() {
        return this.signal.frequency;
    }

    get amp() {
        return this.amp.gain;
    }

    start() {
        this.amp.gain.value = 0.2;
        this.visualizer.visualize('getByteTimeDomainData', this.analyzerNode);
        this.signal.start();
    }

    stop() {
        this.visualizer.clean();
        this.signal.stop();
    }

    connect(dst) {
        this.amp.connect(dst);
    }
}

let PulseOne;
let PulseTwo;
let Triangle;
let Noise;
let Master;
let on = false;
let ctx;

// private values 
audio.then(context => {
    PulseOne = new Signal(context, 'sine'); 
    PulseTwo = new Signal(context, 'sine'); 
    Triangle = new Signal(context, 'triangle'); 
    // Noise    = new Signal(context, ''); 
    Master = context.createGain();
    on = false;
    ctx = context;
})

export default class {
    allSounds;
    
    constructor() {
        const allSounds = [PulseOne, PulseTwo, Triangle];
        for (const s of allSounds) {
            s.connect(Master);
        }
        Master.gain.value = 0.02;
        for (const s of allSounds) {
            s.start();
        }
        this.freqs = allSounds.map(x => x.frequency);
        this.amps = allSounds.map(x => x.amp);
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

    freq(index, freq) {
        this.freqs[index].value = freq;
    }

}