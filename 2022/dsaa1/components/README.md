## composants

### outils communs : trace VR (casque) et/ou log (console) pour mise au point des projets
* paramètres trace et log selon les composants
```js
trace: { type: 'boolean', default: false}
log: { type: 'boolean', default: false}
```

* prequis : ajouter un a-text dans l'entity caméra pour afficher la trace
```js
<a-text id="txtlog" value="" align="center" color="#FF0000" 
    position="0 0 -1" rotation="0 0 0" scale="0.25 0.25 0.25">
</a-text>
```

### composants : 
#### frequency.js
* objet : change la fréquence des boucles de rendu
* paramètres : 
```js
log: { type: 'boolean', default: false}
delay: { type: 'number', default: 1000 }
```

* syntaxe : 
```js
<a-scene frequency="delay: 500;">
```
    

#### currentposition.js
* objet : repère la position du player et crée une variable globale
```js
let player = { pos: { x: 0, y: 0, z: 0 } }
``` 

* paramètres : 
```js
trace: { type: 'boolean', default: false}
```

* syntaxe : 
```js
<a-entity currentposition="trace: true;">
```
    