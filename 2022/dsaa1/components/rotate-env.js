AFRAME.registerComponent('rotate-env', {
    schema: {
        trace: {
            type: 'boolean',
            default: false
        },
        trigger: {
            type: 'number',
            default: 1
        },
        max: {
            type: 'number',
            default: 45
        },
    },
    tick: function () {
        let rotate = {
            x: 0,
            z: 0
        };
        rotate.x = player.pos.z * this.data.max / this.data.trigger;
        rotate.z = player.pos.x * this.data.max / this.data.trigger;
        this.el.setAttribute('rotation', rotate.x + " 0 " + rotate.z);
        console.log(rotate.x + "\n" + rotate.z);

        if (this.data.trace) {
            var log = document.querySelector('#txtlog');
            log.setAttribute('value', 'rx = ' + rotate.x.toFixed(2) + ", rz = " + rotate.z.toFixed(2));
        }
    }
});