const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

let btn = document.querySelector("button");

btn.addEventListener("click", camera);

// function nextPage() {
//   var timer = setTimeout(function() {
//     window.location='question_2.html'
// }, 1000);

// }

function camera() {
    webcam.start()
   .then(result =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });
   

    // var picture = webcam.snap();
    // document.querySelector('#download-photo').href = picture;

    // webcam.stop();

}

