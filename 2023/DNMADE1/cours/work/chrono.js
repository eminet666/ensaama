// version 20230325

// START GAME
AFRAME.registerComponent('begingame', {
    schema: {
        trace: { type: 'boolean', default: false },
        xlimit: { type: 'number', default: 0.2 },
        zlimit: { type: 'number', default: 0.2 },
    },
    init: function () {
        var data = this.data;
    },
    tick: function () {
        if(tempsDebut == 0) {
            var data = this.data;
            //console.log(Math.abs(player.pos.z).toFixed(2)+"_"+data.zlimit);
            if (Math.abs(player.pos.x) > data.xlimit || Math.abs(player.pos.z) > data.zlimit) 
            {
               this.el.emit("begingame");
               //console.log("emit chrono_start");
            }
        }
    }
});

// OUTOFLIMIT
AFRAME.registerComponent('endgame', {
    schema: {
        trace: { type: 'boolean', default: false },
        xlimit: { type: 'number', default: 1 },
        zlimit: { type: 'number', default: 1 },
    },
    init: function () {
        var data = this.data;
    },
    tick: function () {
        var data = this.data;
        if (Math.abs(player.pos.x) > data.xlimit || Math.abs(player.pos.z) > data.zlimit) {
            this.el.emit("endgame");           
        }
        
    }
});

// CHRONO
var playing = false;
var tempsDebut = 0;
var tempsCourant= 0;
var tempsFinal = 0;

AFRAME.registerComponent('chrono', {
    schema: {
        trace: { type: 'boolean', default: false },
    },
    init: function () {
        document.addEventListener('begingame', evt => {
            console.log("evt: begingame");
            tempsDebut = Date.now();
            playing = true;
        });
        document.addEventListener('endgame', evt => {
            console.log("evt: endgame");
            if(tempsFinal == 0) tempsFinal = Date.now()- tempsDebut;
        });

        var lefthand = document.getElementById('lefthand');
        lefthand.addEventListener("xbuttondown", function (event) {   
            console.log(lefthand);
            console.log("evt: xbuttondown");
            reset_game();
        });

        window.addEventListener('keydown', function (event) {
            if (event.key === 'x') {
                console.log("evt: xkeydown");
                reset_game();
            }
        });

        function reset_game() {
            var cam = document.getElementById('cam');
            cam.setAttribute('position', '0 0.5 0');
            playing = false;
        }

    },
    tick: function () {
        if (this.data.trace) {
            var console = document.querySelector('#txtlog');

            if(!playing){
                tempsDebut = 0;
                tempsCourant = 0;
                tempsFinal = 0;
                console.setAttribute('value', "please, move to start");
            }
            else if(tempsFinal == 0) {
                tempsCourant = Date.now()-tempsDebut;
                console.setAttribute('value', tempsCourant+ " ms");
            }
            else {
                console.setAttribute('value', "game over : "+ tempsFinal + " ms");
            }
            
        }
    },

});



