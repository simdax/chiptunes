class IProcessor extends AudioWorkletProcessor {
    process(ins, outs, params) {
        const [channels] = outs;
        for (const channel of channels) {
            for (const sample in channel) {
                channel[sample] = this.generate(this.get_params(params, sample));
            }
        }
        return true;
    }

    get_params(args, i) {
        return Object.entries(args).reduce((ret, [key, val]) => {
            ret[key] = val[i] || val[0];
            return ret;
        }, {})
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

class FM extends ISignal {
    static get parameterDescriptors() {
        return [{
            name: 'index_mod',
            defaultValue: 1,
            minValue: 0,
            maxValue: 200,
            automationRate: 'a-rate'
        }, {
            name: 'freq_mod',
            defaultValue: 1,
            minValue: 0,
            maxValue: 200,
            automationRate: 'a-rate'
        },
        ...Oscillator.parameterDescriptors
        ];
    }
}

registerProcessor('osc',
    class extends Oscillator {
        generate({ freq, amp }) {
            const val = Math.sin(this.time);
            this.time += (this.tau / this.sr) * freq;
            return val * amp;
        }
    }
)

registerProcessor('fm',
    class extends FM {
        time2 = 0.0;

        generate({ freq, amp, freq_mod, index_mod }) {
            const val = Math.sin(
                this.time + (Math.sin(this.time2) * index_mod)
            );
            this.time += (this.tau / this.sr) * freq;
            this.time2 += (this.tau / this.sr) * (freq * freq_mod);
            return val * amp;
        }
    }
)