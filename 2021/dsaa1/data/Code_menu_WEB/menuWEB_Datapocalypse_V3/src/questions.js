// Question 2 //

// Déclencher l'animation du bouton 'valider'

let buttonValider = document.querySelector("button");

buttonValider.addEventListener("click", active);

function active() {
  buttonValider.classList.toggle("is_active");
}

// Déclencher le passage à la page suivante lors du clic sur le bouton 'valider'
// buttonValider.addEventListener("click", nextPage);

// function nextPage() {
//   var timer = setTimeout(function() {
//     window.location='question_3.html'
// }, 1000);

// }

//Jusque là ça marche...

//////////////////////////////

// RECUPERER LA CHAINE DE CARACTERE 'nom de l'animal'

//Récupérer la chaine de caractères situé dans le cadre de remplissage, qui s'appelle 'input'
let inputName = document.querySelector('input').innerHTML;

const div = document.querySelector('.response.ok')
// div.remove()

export const handleNom = (inputName) => {

    const clone = div.cloneNode(true)

    clone.querySelector('span.user-input').innerHTML = inputName
    

    clone.querySelector('span.text').innerHTML = `bravo`

    // document.body.classList.toggle ('response-is-higher', inputNumber > secretNumber )
    // if (inputNumber > secretNumber){
    //     clone.querySelector('span.text').innerHTML = `trop grand, fé attention` 
    // }

    // document.body.classList.toggle ('response-is-lower', inputNumber < secretNumber )
    // if (inputNumber < secretNumber){
    //     clone.querySelector('span.text').innerHTML = `trop petit, dude` 
    // }

    // document.body.classList.toggle ('response-is-good', inputNumber === secretNumber )
    // if (inputNumber === secretNumber){
    //     clone.querySelector('span.text').innerHTML = `Bravooo, tu gères` 
    // }

    document.querySelector('#responses').append(clone)

}

//Quand le bouton 'valider' est pressé, déclencher la récupération de la chaine de caractères
document.querySelector('button').onkeyup = (event) => {
  if (event.key === 'Enter'){

      //Reset le cadre de remplissage à son état de départ (sans la chaine de caractère)
      const inputJSPquoi = document.querySelector('button').value
      
      //appliquer la fonction qui insère la chaine de caractère dans le div sous le cadre de remplissage
      handleNom(inputName)
          
  }
}

// AUTRES TENTATIVES

// remplissage.onclick = function() {
//   let name = prompt('Quel est le nom de votre animal de compagnie?');
//   alert('Hello ' + name + ', sympa de vous voir !');
// }


