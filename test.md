---
title: test layout: default
---
<script type="module" src="/chiptunes/js/fm.mjs"> </script>

## En 1607,

Un jeune loup nomme Monteverdi arriva a la cour de Venise. Il avait sous le
bras une oeuvre qui allait faire tourner des tetes plusieurs siecles plus tard, denomme l'Orfeo.

La meme annee, un vieil aristocrate dechu, misanthrope et a la limite de la
folie, Carlo Gesualdo, commence l'ecriture de son cinquieme livre de
madrigaux. Ces derniers seront peu joues, car leur musique est litteralement  

 representant
la pointe de la recherche.

Gesualdo referme derriere lui trois siecles de pratique vocale, Monteverdi, lui, ouvre la porte des trois prochains.

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2431_RC04/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/m/02h4pg","geo":"","time":"2004-01-01 2020-12-20"},{"keyword":"/m/01vlj","geo":"","time":"2004-01-01 2020-12-20"}],"category":0,"property":""}, {"exploreQuery":"date=all&q=%2Fm%2F02h4pg,%2Fm%2F01vlj","guestPath":"https://trends.google.fr:443/trends/embed/"}); </script>

Meme pour nos oreilles modernes, la difference est evidente.
# La guerre des consoles
Commencons par la base: tout le monde sait qu'au debut des annees 90, parler
de jeux video, c'etait d'une maniere ou d'une autre se placer du bon cote de
la riviere, la rivalite principale qui opposait la Super Nintendo et la
MegaDrive.

Cette rivalite pouvait se baser sur plusieurs aspects:
* les licences exclusives (Mario contre Sonic), les jeux communs mais qui
* n'avaient rien a voir dans leur gameplay entre les deux consoles (Aladdin),
* les differences graphiques qui pouvaient quelques fois etre tres notables:
![](https://assets-prd.ignimgs.com/2019/08/29/3-scoobydoomystery-1567116080076.jpg)

Mais les vrais connoisseurs, les esthetes au nez fin et a l'ouie poilue,
arguaient eux, sur la seule et veritable experience spirituelle, laissant aux
paiens materialistes leurs arguties sur les tromperies de l'oeil.
## L'experience sonore
Avec le recul du temps, la rivalite entre les deux consoles soulignent la
rapidite avec laquelle l'informatique a
[evoluee](https://fr.wikipedia.org/wiki/Loi_de_Moore).

Le nerf de la guerre, c'est l'espace. La rapidite de traitement est une
chose, faire apparaitre 1000 fois le meme sprite sur une image est un defi
certes, un joli reflet dans l'eau ca eclabousse les mirettes pas mal peut-etre, mais ce
qui fait veritablement la difference, c'est le contenu.

Un contenu, c'est une information, et par definition, il y a quelque chose
"d'irreductible" derriere.
## Anciennes et nouvelles ecoles
Dans le domaine du son, il y a deux types de donnees irreductibles.

D'un cote, on a les notes, les durees, parfois d'autres notes d'intention. On a pris
l'habitude d'appeler cela une partition, et c'est
la donnee que nos ancetres nous ont leguee depuis l'an de grace 1300.

Mais ces donnees sont en quelque sorte de la meta data pour nos oreilles. Ce que percoit
veritablement cette derniere, c'est de la vibration. Et pour l'informaticien, c'est de cette
derniere qu'il s'agira en premier lieu.

 C'est le type
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