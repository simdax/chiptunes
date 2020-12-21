const canvas = document.querySelector('canvas');
const canvas_ctx = canvas.getContext('2d');
const infos = document.querySelector('#infos');

export default function cursor(x, y) {
    canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas_ctx.beginPath();
    canvas_ctx.fillStyle = 'blue';
    canvas_ctx.rect(x - 4, y - 3, 10, 10);
    canvas_ctx.closePath();
    canvas_ctx.fill();
}

export function print_vals(a, b) {
    infos.innerHTML = `${a} ${b}`;
}