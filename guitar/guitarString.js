export class GuitarString {
    constructor(y, strokeX, note) {
        this.y = y;
        this.strokeX = strokeX;
        this.dy = 0;
        this.note = new Audio(`./sounds/${note}.mp3`);
    }

    draw(ctx, stageWidth, isDrag) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, this.y);
        if (!isDrag) {
            const v = Math.abs(this.dy);
            if (this.dy > 1) this.dy -= v*0.1;
            else if (this.dy < 1) this.dy += v*0.1;
        }
        ctx.bezierCurveTo(
            this.strokeX - 10,
            this.y - this.dy,
            this.strokeX + 10,
            this.y - this.dy,
            stageWidth,
            this.y
        );
        ctx.stroke();
    }

    sound() {
        this.note.play();
        if(this.note.currentTime > 0) // INVALID_STATE_ERR를 피하기 위한 꼼수 
            this.note.currentTime = 0;
    }
}
