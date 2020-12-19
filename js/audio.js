class IProcessor extends AudioWorkletProcessor {
    process(ins, outs, params) {
        const [channels] = outs;
        for (const channel of channels) {
            for (const sample in channel) {
                const value = this.generate();
                channel[sample] = value;
            }
        }
        return true;
    }
}

class ISignal extends IProcessor {
    time = 0.0;
    sr = 48000;
    tau = Math.PI * 2;
    freq = 220.0;
    amp = 0.1;
}

class Signal extends ISignal {}

registerProcessor('fm',
    class extends ISignal {
        generate() {
            const val = Math.sin(this.time);
            this.time += (this.tau / this.sr) * this.freq;
            return val * this.amp;
        }
    }
)