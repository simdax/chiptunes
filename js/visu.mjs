import ctx from './AudioContext.mjs';

const canvas = document.querySelector('#visu');
const canvasCtx = canvas.getContext('2d');
// const canvas = document.querySelector('#freq');

let analyseur;
export let renduVisuel;

export default ctx.then(audio => {
  analyseur = audio.createAnalyser();
  return analyseur;
})

export function genererVisualisation(flux) {
  const LARGEUR = canvas.width;
  const HAUTEUR = canvas.height;
  const tailleBuffer = analyseur.frequencyBinCount; // la moitié de la valeur FFT (Transformation de Fourier rapide)
  const tableauDonnees = new Uint8Array(tailleBuffer); // crée un tableau pour stocker les données
  const sliceWidth = LARGEUR * 1.0 / tailleBuffer;

  analyseur.fftSize = 2048;
  canvasCtx.clearRect(0, 0, LARGEUR, HAUTEUR);
  function draw() {
    let x = 0;

    renduVisuel = requestAnimationFrame(draw);
    analyseur.getByteTimeDomainData(tableauDonnees); // récupère les données de l'onde de forme et les met dans le tableau créé
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

export function clean() {
  canvasCtx.clearRect(0, 0, LARGEUR, HAUTEUR);
  canvasCtx.fillStyle = "red";
  canvasCtx.fillRect(0, 0, LARGEUR, HAUTEUR);
}
