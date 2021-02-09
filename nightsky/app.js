import { Star } from "./star.js";
import { SString } from "./sstring.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.starArr = new Array();
        for (let i = 0; i < 60; i++) {
            this.starArr.push(
                new Star(document.body.clientWidth, document.body.clientHeight)
            );
        }

        this.stringArr = new Array();
        this.stringArrIndex = -1;
        
        this.isDragging = false;

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

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
        for (let i = 0; i < this.starArr.length; i++) {
            this.starArr[i].draw(this.ctx);
        }

        for (let i = 0; i < this.stringArr.length; i++) {
            this.stringArr[i].draw(this.ctx);
        }
    }

    onDown(e) {
        const cX = e.clientX;
        const cY = e.clientY;
        const { isIn, x, y } = this.isInStar(cX, cY);
        if (isIn) {
            this.isDragging = true;
            this.stringArr.push(new SString(x, y));
            this.stringArrIndex += 1;
        }
    }

    onMove(e) {
        if (this.isDragging) {
            const cX = e.clientX;
            const cY = e.clientY;

            this.stringArr[this.stringArrIndex].endX = cX;
            this.stringArr[this.stringArrIndex].endY = cY;
        }
    }

    onUp(e) {
        if (this.isDragging) {
            const cX = e.clientX;
            const cY = e.clientY;

            const {isIn, x, y} = this.isInStar(cX, cY);

            if (isIn) {
                this.stringArr[this.stringArrIndex].endX = x;
                this.stringArr[this.stringArrIndex].endY = y;
            } else {
                this.stringArr.pop();
                this.stringArrIndex -= 1;
            }

            this.isDragging = false;
        }
    }

    isInStar(x, y) {
        for (let i = 0; i < this.starArr.length; i++) {
            const distance = Math.sqrt(
                (x - this.starArr[i].x) * (x - this.starArr[i].x) +
                    (y - this.starArr[i].y) * (y - this.starArr[i].y)
            );
            if (distance <= this.starArr[i].radius) {
                return {
                    isIn: true,
                    x: this.starArr[i].x,
                    y: this.starArr[i].y,
                };
            }
        }
        return { isIn: false, x: NaN, y: NaN };
    }
}

window.onload = () => {
    new App();
};
