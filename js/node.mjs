export class MyAudioContext extends AudioContext {
    async init() {
        await this.audioWorklet.addModule("./audio.js");
    }
}

export default class Node extends AudioWorkletNode {
    on = false;

    constructor(audio, processor) {
        super(audio, processor);
        this.audio = audio;
    }

    play_mel(notes, durs) {
        ([...Array(notes.length).keys()].reduce((ret, i) => [...ret, [notes[i], durs[i]] ], []))
            .map(([n, d]) => () => new Promise((res, _rej) => {
                this.play(n);
                setTimeout(res, d * 1000 / 3);
            })).reduce((prev, p) => prev.then(p), Promise.resolve())
        .then(this.play_mel.bind(this,notes, durs));
    }
        
    play(n) {
        const gamme = [0, 2, 4, 5, 7, 9, 11];
        const note = 440 * Math.pow(2, gamme[n] / 12);
        this.parameters.get('freq').setValueAtTime(note, this.audio.currentTime) 
    };

    start() {
        this.connect(this.audio.destination);
        this.on = true;
    }

    stop() {
        this.disconnect(this.audio.destination);
        this.on = false;
    }

    set(name, value) {
        this.parameters.get(name)
            .linearRampToValueAtTime(value, this.audio.currentTime + 0.1);
    }
}

export class FMNode extends Node {
    constructor(audioCtx) {
        this.carrier = audioCtx.createOscillator();
        this.modulator = audioCtx.createOscillator();
    }

    set(name, value) {

    }
}