// version 20220303

// FREQUENCY
AFRAME.registerComponent('frequency', {
    schema: {
        log: {
            type: 'boolean',
            default: false
        },
        delay: {
            type: 'number',
            default: 1000
        },
    },
    init: function () {
        this.tick = AFRAME.utils.throttleTick(this.tick, this.data.delay, this);
    },
    tick: function (time, delta) {
        if (this.data.log) {
            console.log("interval = " + delta.toFixed(3));
        }
    }
});

// CURRENTPOSITION
let player = {
    pos: {
        x: 0,
        y: 0,
        z: 0
    }
}

function dist(mypos) {
    return Math.sqrt((player.pos.x - mypos.x) ** 2 + (player.pos.z - mypos.z) ** 2)
}

AFRAME.registerComponent('currentposition', {
    schema: {
        trace: {
            type: 'boolean',
            default: false
        },
    },
    tick: function () {
        var pos = this.el.object3D.position;
        var wposition = new THREE.Vector3();
        var wpos = this.el.object3D.getWorldPosition(wposition);

        player.pos.x = pos.x + wpos.x;
        player.pos.y = pos.y + wpos.y;
        player.pos.z = pos.z + wpos.z;
        //console.log(player.pos);

        if (this.data.trace) {
            var trace = document.querySelector('#txtlog');
            var newvalue = 'x = ' + player.pos.x.toFixed(2) + ", z = " + player.pos.z.toFixed(2);
            trace.setAttribute('value', newvalue);
        }
    }
});

// START GAME
var gamein = false;

AFRAME.registerComponent('startgame', {
    schema: {
        trace: { type: 'boolean', default: false },
        xlimit: { type: 'number', default: 1 },
        zlimit: { type: 'number', default: 1 },
    },
    init: function () {
        var data = this.data;
    },
    tick: function () {
        if(!gamein) {
            var data = this.data;
            if (Math.abs(player.pos.x) > data.xlimit) gamein = true;
            if (Math.abs(player.pos.z) > data.zlimit) gamein = true;
            //console.log("inside = "+inside);
        }

    }
});

// OUTOFLIMIT
var inside = true;

AFRAME.registerComponent('outoflimit', {
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
        if(Math.abs(player.pos.x) > data.xlimit) inside = false;
        if(Math.abs(player.pos.z) > data.zlimit) inside = false;
        //console.log("inside = "+inside);
    }
});

// CHRONO
var tempsDebut = 0;
var tempsFin = 0;
var tempsTotal = 0;

AFRAME.registerComponent('chrono', {
    schema: {
        trace: { type: 'boolean', default: false },
    },
    init: function () {
        tempsDebut = Date.now();
    },
    tick: function () {


        if (this.data.trace) {
            var trace = document.querySelector('#txtlog');
            // if(newgame){
            //     tempsDebut = Date.now();
            //     newgame = false;
            // }
            if(newgame){
                tempsDebut = Date.now();
                inside = true;
                newgame = false;
            }

            if(inside){
                tempsFin = Date.now();
                tempsTotal = tempsFin - tempsDebut;
            }
            trace.setAttribute('value', tempsTotal + "ms");
        }
    }
});

// newgame
var newgame = false;
AFRAME.registerComponent('xkey_reset', {
    init: function () {
        window.addEventListener('keydown', function (event) {
            if (event.key === 'x') {
                //newgame = true;
                var cam = document.getElementById('cam');
                cam.setAttribute('position', '0 0.5 0');
                newgame = true;
            }
        });
    }
});


