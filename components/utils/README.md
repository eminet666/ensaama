## composants utiles

### outils communs : trace VR (casque)
* paramètres trace et log selon les composants
```js
trace: { type: 'boolean', default: false}
```
* prequis : ajouter un a-text dans l'entity caméra pour afficher la trace
```html
<a-text id="txtlog" value="" align="center" color="#FF0000" 
    position="0 0 -1" rotation="0 0 0" scale="0.25 0.25 0.25">
</a-text>
```
* remarque : un parmètre log apparait sur certains composants pour un affichage console
* [exemple](./trace.html)

### composants : 

### composant : nom
* objet : 
* résultat : 
* syntaxe :  
```html     
```
* remarques : 
* [exemple]()



#### frequency
* objet : change la fréquence des boucles de rendu (nécessite moins de ressources)
* résultat : en particulier le suivi du joueur se fait à des intervalles plus espacés
* paramètres : 
```js
log: { type: 'boolean', default: false},
delay: { type: 'number', default: 1000 }
```
* syntaxe : 
```html
<a-scene frequency="delay: 500;"></a-scene>
```
* [exemple](./frequency.html)
    

#### currentposition.js : repère la position du player et crée une variable globale
```js
let player = { pos: { x: 0, y: 0, z: 0 } }
``` 

* paramètres : 
```js
trace: { type: 'boolean', default: false}
```

* syntaxe : 
```html
<a-entity currentposition="trace: true;"></a-entity>
```

#### modify-objcolor.js : change la couleur d'un modele 3D
* paramètres :
Attention : l'objname correspond au nom d'objet dans la fenêtre Collection de Blender 
```js
schema: {
    log: { type: 'boolean', default: false },
    objname: { type: 'string', default: "Cube"},
    newcolor: { type: 'string', default: "none"},
}
```

* syntaxe : 
```html
<a-entity modify-objcolor="objname: Suzanne; newcolor: red; log: true;"></a-entity>
```
* [exemple](../modifiy-objcolor.html)
    