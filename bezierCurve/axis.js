export class Axis {
    constructor(stageWidth, stageHeight) {
        this.axisXPos = {x: 0, y: stageHeight / 2};
        this.axisYPos = {x: stageWidth / 2, y: 0}
    }

    draw(ctx, stageWidth, stageHeight) {
        ctx.strokeStyle = '#CAC9C8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.axisYPos.x, this.axisYPos.y);
        ctx.lineTo(this.axisYPos.x, stageHeight);
        ctx.stroke();
        ctx.moveTo(this.axisXPos.x, this.axisXPos.y);
        ctx.lineTo(stageWidth, this.axisXPos.y);
        ctx.stroke();
        ctx.closePath();
    }
}