'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('rain');
var ctx = canvas.getContext('2d');

Array.prototype.choose = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Drop = function Drop() {
    _classCallCheck(this, Drop);

    this.length = getRandomInt(5, 100);
    this.currentPosition = {
        x: getRandomInt(0, window.innerWidth),
        y: -this.length - getRandomInt(0, 200)
    };
    this.color = ["lightblue", "#67C5DE", "#6196cc"].choose();
    this.width = getRandomInt(1, 3);
    this.speed = getRandomInt(1, 4);
    this.accelerateRate = 0.02;
};

var Rain = {
    config: {
        CANVAS_SIZE: {
            X: 1500,
            Y: 1500
        },
        NEW_DROPS_NUMBER: 25
        //DELETE_HEIGHT: 1000,
    },
    drops: [],
    createDrop: function createDrop() {
        //console.log('new~');
        var drop = new Drop();
        this.drops.push(drop);
    },
    createDrops: function createDrops() {
        var _this = this;

        [].concat(_toConsumableArray(Array(this.config.NEW_DROPS_NUMBER))).forEach(function () {
            return _this.createDrop();
        });
        //console.log('drops.length : ' + this.drops.length)
    },
    update: function update() {
        var _this2 = this;

        //console.log(this.drops);
        this.drops.map(function (drop) {
            return _this2.updateDrop(drop);
        });
    },
    drawDrop: function drawDrop(drop) {
        //console.log(drop);
        ctx.fillStyle = drop.color;
        ctx.fillRect(drop.currentPosition.x, drop.currentPosition.y, drop.width, drop.length);
    },
    updateDrop: function updateDrop(drop) {

        drop.speed += drop.accelerateRate;
        drop.currentPosition.y += drop.speed; // * (1 + acc)
    },
    redraw: function redraw() {
        var _this3 = this;

        this.drops = this.drops.filter(function (d) {
            return d.currentPosition.y < window.innerHeight; //this.config.DELETE_HEIGHT
        });
        this.drops.map(function (drop) {
            return _this3.drawDrop(drop);
        });
    },
    start: function start() {
        var _this4 = this;

        this.createDrops();
        window.setInterval(function () {
            return _this4.createDrops();
        }, 1000);
        this.loop();
    },
    loop: function loop() {
        var _this5 = this;

        ctx.clearRect(0, 0, this.config.CANVAS_SIZE.X, this.config.CANVAS_SIZE.Y);
        ctx.save();
        this.update();
        this.redraw();
        ctx.restore();
        window.requestAnimationFrame(function () {
            return _this5.loop();
        });
    }
};

Rain.start();