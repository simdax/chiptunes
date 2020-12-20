
export function play_mel(notes, durs, hook) {
    ([...Array(notes.length).keys()].reduce((ret, i) => [...ret, [notes[i], durs[i]]], []))
        .map(([n, d]) => () => new Promise((res, _rej) => {
            hook(n);
            setTimeout(res, d * 1000 / 3);
        })).reduce((prev, p) => prev.then(p), Promise.resolve())
        .then(play_mel.bind(null, notes, durs, hook));
}

export function midi_to_freq(n) {
    const gamme = [0, 2, 4, 5, 7, 9, 11];
    return 440 * Math.pow(2, gamme[n] / 12);
};


