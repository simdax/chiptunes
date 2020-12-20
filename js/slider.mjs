export const event = [];

const canvas = document.querySelector('canvas');
let clicked = false;
let x = 0;
let y = 0;

function updateXY(ev) {
    const [_x, _y] = [canvas.offsetLeft, canvas.offsetTop];
    x = ev.pageX - _x;
    y = ev.pageY - _y;
    for (const e of event) { 
        e(x, y); 
    }
}

document.addEventListener('mouseup', () => {
    clicked = false;
})

canvas.addEventListener('mousedown', (ev) => {
    clicked = true;
    updateXY(ev);
});

canvas.addEventListener('mousemove', (ev) => {
    if (clicked) { updateXY(ev); }
});
