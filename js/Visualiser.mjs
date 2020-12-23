import ctx from './AudioContext.mjs';

let analyseur;

export default ctx.then(audio => {
  analyseur = audio.createAnalyser();
  return analyseur;
})

export class Visualizer {
  renduVisuel;

  constructor(label) {
    this.label = label;
  }

  visualize(type, analyseur) {
    const canvas = document.querySelector(this.label);
    const canvasCtx = canvas.getContext('2d');
    const LARGEUR = canvas.width;
    const HAUTEUR = canvas.height;
    const tailleBuffer = analyseur.frequencyBinCount; // la moitié de la valeur FFT (Transformation de Fourier rapide)
    const tableauDonnees = new Uint8Array(tailleBuffer); // crée un tableau pour stocker les données
    const sliceWidth = LARGEUR / tailleBuffer;

    analyseur.fftSize = 2048;
    canvasCtx.clearRect(0, 0, LARGEUR, HAUTEUR);
    const draw = () => {
      let x = 0;

      this.renduVisuel = requestAnimationFrame(draw);
      analyseur[type](tableauDonnees); // récupère les données de l'onde de forme et les met dans le tableau créé
      canvasCtx.fillStyle = 'rgb(200, 200, 200)'; // dessine une onde dans le canvas
      canvasCtx.fillRect(0, 0, LARGEUR, HAUTEUR);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
      for (var i = 0; i < tailleBuffer; i++) {
        var v = tableauDonnees[i] / 128.0;
        var y = v * HAUTEUR / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };
    draw();
  }

  clean() {
    const canvas = document.querySelector(this.label);
    const canvasCtx = canvas.getContext('2d');
    const LARGEUR = canvas.width;
    const HAUTEUR = canvas.height;

    cancelAnimationFrame(this.renduVisuel);
    canvasCtx.clearRect(0, 0, LARGEUR, HAUTEUR);
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, LARGEUR, HAUTEUR);
  }

}


export class Visualizers {

  constructor() {
    this.time = new Visualizer('#visu');
    this.freq = new Visualizer('#freq');
  }

  visualize() {
    this.time.visualize('getByteTimeDomainData', analyseur);
    this.freq.visualize('getByteFrequencyData', analyseur);
  }

  clean() {
    this.time.clean();
    this.freq.clean();
  }

}
