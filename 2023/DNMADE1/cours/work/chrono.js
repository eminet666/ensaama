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
        if(tempsFin == 0) {
            var data = this.data;
            if (Math.abs(player.pos.x) > data.xlimit || Math.abs(player.pos.z) > data.zlimit) 
            {
                tempsDebut = Date.now();
                inside = true;
            }
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
        // if(Math.abs(player.pos.x) > data.xlimit) inside = false;
        // if(Math.abs(player.pos.z) > data.zlimit) inside = false;
        if (Math.abs(player.pos.x) > data.xlimit || Math.abs(player.pos.z) > data.zlimit)
        inside = false;
        //console.log("inside = "+inside);

        if (this.data.trace) {
            var trace = document.querySelector('#txtlog');
            var text = Math.abs(player.pos.z).toFixed(2)+"_"+data.zlimit+"_"+inside;
            trace.setAttribute('value', text);
        }
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
        //tempsDebut = Date.now();
        //var data = this.data;
    },
    tick: function () {
        if (this.data.trace) {
            var trace = document.querySelector('#txtlog');

            if (tempsDebut == 0) { tempsTotal = "please, \nmove to start"; }
            else if(inside){
                tempsFin = Date.now();
                tempsTotal = (tempsFin - tempsDebut)+ " ms";
            }
            
            trace.setAttribute('value', tempsTotal);
        }
    }
});

// NEWGAME
AFRAME.registerComponent('xkey_reset', {
    init: function () {
        window.addEventListener('keydown', function (event) {
            if (event.key === 'x') {
                var cam = document.getElementById('cam');
                cam.setAttribute('position', '0 0.5 0');
                tempsDebut = 0;
                tempsFin = 0;
                inside = false;
            }
        });
    }
});

AFRAME.registerComponent('xbutton_reset', {
    schema: {
        trace: { type: 'boolean', default: false },
    },
    init: function () {
        var console = this.data.trace;
        var trace = document.querySelector('#txtlog');

        this.el.addEventListener("xbuttondown", function (event) {
            var cam = document.getElementById('cam');
            cam.setAttribute('position', '0 0.5 0');
            tempsDebut = 0;
            tempsFin = 0;
            inside = false;
            // if (console) {
                var trace = document.querySelector('#txtlog');
                trace.setAttribute('value', "xbutton pressed");
            // }
        });

    }
});

