function cl() {
    (
        async () => {
            const audio = new AudioContext();
            await audio.audioWorklet.addModule("./audio.js");
            const node = new AudioWorkletNode(audio, 'fm');
            node.connect(audio.destination);
        }
    )();
}
