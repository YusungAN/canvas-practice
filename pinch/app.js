import { Circle } from "./circle.js";
import { earDraw, faceDraw } from "./faceDraw.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.isDragging = false;
        this.curPos = { x: 0, y: 0 };
        this.prevPos = { x: 0, y: 0 };
        this.dXsum = 0;
        this.dYsum = 0;
        this.startClock;
        this.endClock;

        this.image = new Image();
        this.image.src = './assets/angry.png';

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.circle = new Circle(200, "#d8a454");
        this.outerCircle = new Circle(212, 'black');

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
        this.ctx.font = "30px Arial";
        this.ctx.fillText("오른쪽 볼을 잡고 땡겨보세요!", 15, 50);
        earDraw(this.ctx, this.stageWidth, this.stageHeight);
        this.outerCircle.draw(
            this.ctx,
            this.stageWidth,
            this.stageHeight,
            this.dXsum,
            this.dYsum,
            this.isDragging
        );
        this.circle.draw(
            this.ctx,
            this.stageWidth,
            this.stageHeight,
            this.dXsum,
            this.dYsum,
            this.isDragging
        );
        faceDraw(this.ctx, this.stageWidth, this.stageHeight);
        if (this.endClock - this.startClock > 3000) this.loadImage();
    }

    onDown(e) {
        const cX = e.clientX;
        const cY = e.clientY;

        this.isDragging = true;
        this.prevPos.x = cX;
        this.prevPos.y = cY;

        this.startClock = new Date();
    }

    onMove(e) {
        if (this.isDragging) {
            const cX = e.clientX;
            const cY = e.clientY;

            this.curPos.x = cX;
            this.curPos.y = cY;

            const dx = this.curPos.x - this.prevPos.x;
            const dy = this.curPos.y - this.prevPos.y;

            this.dXsum += dx * 0.5;
            if (this.dXsum < 0) this.dXsum = 0;
            if (this.dXsum > 70) this.dXsum = 70;

            this.dYsum += dy * 0.5;
            if (this.dYsum < -60) this.dYsum = -60;
            if (this.dYsum > 50) this.dYsum = 50;

            this.prevPos.x = cX;
            this.prevPos.y = cY;
            this.endClock = new Date();
        }
    }

    onUp(e) {
        this.isDragging = false;
        this.dXsum = 0;
        this.dYsum = 0;
        this.startClock = undefined;
        this.endClock = undefined;
    }

    loadImage() {
        this.ctx.drawImage(this.image, this.stageWidth / 2 - 300, this.stageHeight / 2 - 300);
    }
}

window.onload = () => {
    new App();
};
