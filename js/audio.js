class IProcessor extends AudioWorkletProcessor {
    process(ins, outs, params) {
        const [channels] = outs;
        for (const channel of channels) {
            for (const sample in channel) {
                const value = this.generate(params, sample);
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
}

class Oscillator extends ISignal {
    static get parameterDescriptors() {
        return [{
            name: 'freq',
            defaultValue: 440,
            minValue: 0,
            maxValue: 20000,
            automationRate: 'a-rate'
        }, {
            name: 'amp',
            defaultValue: 0.3,
            minValue: 0,
            maxValue: 0.6,
            automationRate: 'a-rate'
        },
        ]
    }
}

registerProcessor('fm',
    class extends Oscillator {
        generate({ freq, amp }, i) {
            const val = Math.sin(this.time);
            this.time += (this.tau / this.sr) * freq[0];
            return val * amp[0];
        }
    }
)