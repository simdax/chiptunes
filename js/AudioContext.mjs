let context;

const back = document.createElement("div");
back.style = "width:100vw;alpha:30;opacity:50%;height:100vh;position:absolute;top:0;z-index:100;background:black;";
const button = document.createElement("button");
button.textContent = "ACTIVER le son ?";
button.style = "position:absolute;top:50%;left:50%;z-index:101;";

document.body.appendChild(back);
document.body.appendChild(button);
let resolve;
const promise = new Promise((res) => {
    resolve = res
});
button.onclick = () => {
    context = new AudioContext();
    document.body.removeChild(back);
    document.body.removeChild(button);
    resolve(context);
}

export default promise;
