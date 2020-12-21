import { midi_to_freq, play_mel } from './utils.mjs';
import FMNode from './webaudio.mjs';
import { event } from './slider.mjs';
import cursor from './cursor.mjs';

const start = document.querySelector('#start');
const canvas = document.querySelector('canvas');
const node = new FMNode();

event.push((x, y) => {
    node.freq_modulator = x / canvas.width * 20;
    node.index_modulator = y * 10;
    cursor(x, y);
});
start.addEventListener('click', async () => {
    if (node.start()) {
        play_mel(
            Array(10).fill(0).map(() => Math.floor(Math.random() * 7)),
            Array(10).fill(0).map(() => Math.floor(Math.random() * 3)),
            (n) => {
                node.freq = midi_to_freq(n);
            }
        );
    }
});
