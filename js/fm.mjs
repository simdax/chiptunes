import { midi_to_freq, play_mel } from './utils.mjs';
import FMNode from './webaudio.mjs';
import { event } from './slider.mjs';
import cursor, { print_vals } from './cursor.mjs';
import get_analyseur, { Visualizers } from './visu.mjs';

const start = document.querySelector('#start');
const canvas = document.querySelector('canvas');

get_analyseur.then(analyseur => {
    const visualizers = new Visualizers();
    const node = new FMNode();
    node.analyseur = analyseur;

    event.push((x, y) => {
        cursor(x, y);
        // node.freq_modulator = x / canvas.width * 20;
        node.index_modulator = y * 20;
        x /= canvas.width;
        y /= canvas.height;
        node.freq_modulator = 1 + x * 3;
        // node.index_modulator = Math.pow(5000, y);
        print_vals(node.freq_modulator, node.index_modulator)
    });
    start.addEventListener('click', async () => {
        if (node.start()) {
            visualizers.visualize();
            play_mel(
                Array(10).fill(0).map(() => Math.floor(Math.random() * 7)),
                Array(10).fill(0).map(() => Math.floor(Math.random() * 3)),
                (n) => {
                    node.freq = midi_to_freq(n);
                }
            );
        } else {
            visualizers.clean();
        }
    });
})