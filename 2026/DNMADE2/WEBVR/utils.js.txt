// FREQUENCY
// syntax : <a-scene frequency="delay: 500"></a-scene>
AFRAME.registerComponent('frequency', {
    schema: {
        delay: { type: 'number', default: 1000}
    },
    init: function () {
        this.tick = AFRAME.utils.throttleTick(this.tick, this.data.delay, this);
    },
    tick: function (time, delta) {
        console.log("TIME " + delta);
    }
});
