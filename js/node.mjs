export default class Node {
    async init() {
        this.audio = new AudioContext();
        await this.audio.audioWorklet.addModule("./audio.js");
        this.node = new AudioWorkletNode(this.audio, 'fm');
    }

    start() {
        this.node.connect(this.audio.destination);
    }

    stop() {
        this.node.disconnect(this.audio.destination);
    }

    set(name, value) {
        this.node.parameters.get(name)
            .setValueAtTime(value, this.audio.currentTime);
    }
}
