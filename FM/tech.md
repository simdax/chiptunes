---
---

L'architecture de la Megadrive et de
## La synthese sonore

## Yes
<button id=start>CLICK</button> 
<canvas width=200 height=200 style='background:red;'></canvas>

Voici le code en SuperCollider en passant
```supercollider
(
SynthDef(\pulse, { arg freq, gate = 1;
	var sig = SinOsc.ar(
		freq + SinOsc.ar(freq * MouseY.kr(0.1,5), mul: MouseX.kr(0, 2000))
	);
	Out.ar([0, 1], sig * Env.adsr.kr(2, gate:gate) * 0.13);
}).add
)

(
Pdef(\a, Pbind(
	\instrument, \pulse,
	\degree, Pwhite(0, 9),
	\dur, Prand([1, 2, 4], inf),
	\tempo, 4)
).play
)
```