import { Ball } from "./ball.js";
import { Block } from "./block.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.isDrag = false;
        this.prevX = 0;
        this.prevY = 0;
        this.curX = 0;
        this.curY = 0;

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 10);
        this.block = new Block(400, 15, 300, 450);

        document.addEventListener("pointerdown", this.onDown.bind(this), false);
        document.addEventListener("pointermove", this.onMove.bind(this), false);
        document.addEventListener("pointerup", this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }

    onDown(e) {
        let cX = e.clientX;
        let cY = e.clientY;

        if (this.cursorInBlock(this.block, e.clientX, e.clientY)) {
            this.isDrag = true;
            this.prevX = cX;
            this.prevY = cY;
        }
    }

    onMove(e) {
        const cX = e.clientX;
        const cY = e.clientY;
        if (this.isDrag) {
            this.block.x += cX - this.prevX;
            this.block.y += cY - this.prevY;
            this.block.maxX = this.block.width + this.block.x;
            this.block.maxY = this.block.height + this.block.y;
            this.prevX = cX;
            this.prevY = cY;
            this.blockBounceWithWindow();
        }
    }

    onUp() {
        this.isDrag = false;
    }

    cursorInBlock(block, x, y) {
        if (x >= block.x && x <= block.maxX && y >= block.y && y <= block.maxY)
            return true;
        else return false;
    }

    blockBounceWithWindow() {
        if (this.block.x < this.ball.radius * 2) {
            this.block.x = this.ball.radius * 2 + 5;
        } else if (this.block.maxX > this.stageWidth - (this.ball.radius * 2)) {
            this.block.x = this.stageWidth - (this.ball.radius * 2) - 5 - this.block.width;
        } else if (this.block.y < this.ball.radius * 2) {
            this.block.y = this.ball.radius * 2 + 5;
        } else if (this.block.y > this.stageHeight - this.ball.radius * 2) {
            this.block.y = this.stageHeight - this.ball.radius * 2 - 5;
        }
    }
}

window.onload = () => {
    new App();
};
