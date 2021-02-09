export class Star {
    constructor(stageWidth, stageHeight) {
        this.color = ["#feffde", "#fffffa", "#d9fbff", "#fcfcc7"];
        this.colorIndex = this.getRandomInt(0, 4);
        this.x = this.getRandomInt(10, stageWidth);
        this.y = this.getRandomInt(10, stageHeight);
        this.radius = this.getRandomInt(4, 8);
    }

    draw(ctx) {
        ctx.fillStyle = this.color[this.colorIndex];
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color[this.colorIndex];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
