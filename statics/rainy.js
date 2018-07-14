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
            x: getRandomInt(0, 2000),
            y: -this.length - getRandomInt(0, 200)
        };
        this.color = ["lightblue", "#67C5DE", "#6196cc"].choose();
        this.width = getRandomInt(1, 3);
        this.speed = getRandomInt(1, 3);
        this.accelerateRate = 0.02;
    }
}

const Rain = {
    state: {
        isFocus: true
    },
    config: {
        CANVAS_SIZE: {
            X: 3000,
            Y: 2000
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
    },
    updateDrop(drop) {

        drop.speed += drop.accelerateRate;
        drop.currentPosition.y += drop.speed
    },
    updateDrops() {
        //console.log(this.drops);
        this.drops.map(drop => this.updateDrop(drop));
    },
    drawDrop(drop) {
        //console.log(drop);
        ctx.fillStyle = drop.color;
        ctx.fillRect(drop.currentPosition.x, drop.currentPosition.y, drop.width, drop.length);
    },
    drawDrops() {
        this.drops = this.drops.filter(d => {
            return d.currentPosition.y < 2000;//window.innerHeight//this.config.DELETE_HEIGHT
        });
        this.drops.map(drop => this.drawDrop(drop));
    },
    start() {
        this.createDrops();
        window.setInterval(() => {
            if (this.state.isFocus) {
                this.createDrops()
            }
        }, 1000);
        this.loop();
        window.onfocus = () => {
            //console.log('started');
            this.state.isFocus = true;
            this.loop();
        };
        window.onblur = () => {
            this.state.isFocus = false
        }
    },
    loop() {
        if (this.state.isFocus) {
            ctx.clearRect(0, 0, 2000, 2000);
            ctx.save();
            this.updateDrops();
            this.drawDrops();
            ctx.restore();
            window.requestAnimationFrame(() => this.loop());
        }
        //else {
        //console.log('stoped')
        //}
    }
};

Rain.start();