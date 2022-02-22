AFRAME.registerComponent('change-model-color', {
    schema: {
        trace: { type: 'boolean', default: false },
        newcolor: { type: 'string', default: 'white' },
    },
    init: function () {
        //console.log(this.el);
    },
    tick: function () {

        // if (this.data.trace) {
        //     var trace = document.querySelector('#txtlog');
        //     var newvalue = 'x = ' + player.pos.x.toFixed(2) + ", z = " + player.pos.z.toFixed(2);
        //     trace.setAttribute('value', newvalue);
        // }
    }
});

AFRAME.registerComponent('modify-objcolor', {
    schema: {
        log: { type: 'boolean', default: false },
        objname: { type: 'string', default: "Cube"},
        newcolor: { type: 'string', default: "none"},
    },
    init: function () {
        // Wait for event
        this.el.addEventListener('objcolor', () => {
            let obj = this.el.getObject3D('mesh');
            let objname = this.data.objname;
            let newcolor = this.data.newcolor;
            if (newcolor == 'none') { newcolor = randomColor();}
            obj.traverse(node => {
                if (node.name.indexOf(objname) !== -1) {
                    node.material.color.set(newcolor);
                    if (this.data.log) console.log("newcolor = " + newcolor);
                }
            });
        });

        function randomColor(){
            return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
        }
    }

});