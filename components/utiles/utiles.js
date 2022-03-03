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

// MODIFY-OBJCOLOR
AFRAME.registerComponent('modify-objcolor', {
    schema: {
        log: {
            type: 'boolean',
            default: false
        },
        objname: {
            type: 'string',
            default: "Cube"
        },
        newcolor: {
            type: 'string',
            default: "random"
        },
    },
    init: function () {
        // Wait for event
        this.el.addEventListener('objcolor', () => {
            let obj = this.el.getObject3D('mesh');
            let objname = this.data.objname;
            let newcolor = this.data.newcolor;
            if (newcolor == 'random') {
                newcolor = randomColor();
            }
            obj.traverse(node => {
                if (node.name.indexOf(objname) !== -1) {
                    node.material.color.set(newcolor);
                    if (this.data.log) console.log("newcolor = " + newcolor);
                }
            });
        });

        function randomColor() {
            return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
        }
    }

});
