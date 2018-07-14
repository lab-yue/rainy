const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

Array.prototype.choose = function () {
    return this[Math.floor(Math.random() * this.length)]
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Drop {
    constructor() {
        this.length = getRandomInt(5, 100);
        this.currentPosition = {
            x: getRandomInt(0, window.innerWidth),
            y: -this.length - getRandomInt(0, 200)
        };
        this.color = ["lightblue", "#67C5DE", "#6196cc"].choose();
        this.width = getRandomInt(1, 3);
        this.speed = getRandomInt(1, 4);
        this.accelerateRate = 0.02;
    }
}

const Rain = {
    config: {
        CANVAS_SIZE: {
            X: 1500,
            Y: 1500
        },
        NEW_DROPS_NUMBER: 25,
        //DELETE_HEIGHT: 1000,
    },
    drops: [],
    createDrop() {
        //console.log('new~');
        const drop = new Drop();
        this.drops.push(drop)
    },
    createDrops() {
        [...Array(this.config.NEW_DROPS_NUMBER)].forEach(() => this.createDrop());
        //console.log('drops.length : ' + this.drops.length)
    }, update() {
        //console.log(this.drops);
        this.drops.map(drop => this.updateDrop(drop));
    }, drawDrop(drop) {
        //console.log(drop);
        ctx.fillStyle = drop.color;
        ctx.fillRect(drop.currentPosition.x, drop.currentPosition.y, drop.width, drop.length);
    }, updateDrop(drop) {

        drop.speed += drop.accelerateRate;
        drop.currentPosition.y += drop.speed// * (1 + acc)
    },
    redraw() {
        this.drops = this.drops.filter(d => {
            return d.currentPosition.y < window.innerHeight//this.config.DELETE_HEIGHT
        });
        this.drops.map(drop => this.drawDrop(drop));
    },
    start() {
        this.createDrops();
        window.setInterval(() => this.createDrops(), 1000);
        this.loop();
    }, loop() {
        ctx.clearRect(0, 0, this.config.CANVAS_SIZE.X, this.config.CANVAS_SIZE.Y);
        ctx.save();
        this.update();
        this.redraw();
        ctx.restore();
        window.requestAnimationFrame(() => this.loop());
    }
};

Rain.start();
