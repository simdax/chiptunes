---
title: tech
--- 
# La synthèse sonore

## Un petit peu de classement

On a l'habitude	de classifier la synthèse sonore en plusieurs techniques. 

Si l'on décide de ne pas se baser sur des échantillons, c'est-a-dire des données,
mais uniquement sur des calculs, on parle de synthèse additive, soustractive, aussi
vrai que lorsque l'on parle de mathématique on parle de plus et de moins. 

L'idée principale, c'est que les chiffres représentent une brique de base, un atome.
Quel est l'atome du son ?

A partir du moment ou on a établi qu'un atome existe, une méthodologie simple peut 
s'établir a peu pres ainsi.

### la Réalité ---> l'Atome ---> la Théorie ---> la Réalité

Le son est fait d'ondes sinusoïdales. Voila c'est dit.

Ces ondes sont a l'air ce que les vagues sont a la mer. Voila pour la definition.

La question n'est pas de comprendre plus loin. Il s'agit de transformer les choses.

* Quand on enregistre les vibrations d'une membranes fine, on remarque
ce mouvement. C'est la contribution du Réel a ce phénomène. Enregistrer des sons
finira invariablement par dessiner une series de courbes plus ou moins rapides.

* Mais si on se suffit de programmer ces membranes pour les faire vibrer,  
on peut alors simplement

Enfin, on peut se demander, quelles sont les raisons pour les vibrations 


## Un truc

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