import { GuitarString } from "./guitarString.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.isDragArr = [false, false, false, false, false, false];
        this.prevPosArr = [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ];

        document.body.appendChild(this.canvas);

        this.image = new Image();
        this.image.src = './dd.png';
        this.image.addEventListener('load', this.loadImage.bind(this), false);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.guitarStringArr = [
            new GuitarString(this.stageHeight * 0.5 - 75, 0, 'e'),
            new GuitarString(this.stageHeight * 0.5 - 45, 0, 'a'),
            new GuitarString(this.stageHeight * 0.5 - 15, 0, 'd'),
            new GuitarString(this.stageHeight * 0.5 + 15, 0, 'g'),
            new GuitarString(this.stageHeight * 0.5 + 45, 0, 'b'),
            new GuitarString(this.stageHeight * 0.5 + 75, 0, 'e2'),
        ];

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

        this.loadImage();
        for (let i = 0; i < 6; i++)
            this.guitarStringArr[i].draw(
                this.ctx,
                this.stageWidth,
                this.isDrag
            );
    }

    onDown(e) {
        const cX = e.clientX;
        const cY = e.clientY;

        for (let i = 0; i < 6; i++) {
            this.prevPosArr[i].x = cX;
            this.prevPosArr[i].y = cY;
            this.isDragArr[i] = true;
        }
    }

    onMove(e) {
        const cX = e.clientX;
        const cY = e.clientY;
        const { passed, i } = this.passedString(cY);
        if (this.isDragArr[i]) {
            console.log(cY, passed, i);
            if (passed) {
                this.guitarStringArr[i].strokeX = cX;
                this.guitarStringArr[i].sound();

                if (Math.abs((this.prevPosArr[i].y - cY) * 0.5) > 25) {
                    this.guitarStringArr[i].dy = this.prevPosArr[i].y - cY >= 0 ? 25 : -25;
                    this.endDrag(i);
                    return;
                } else {
                    this.guitarStringArr[i].dy = (this.prevPosArr[i].y - cY) * 0.5;
                    for (let j = 0; j < 6; j++) {
                        this.prevPosArr[j].x = cX;
                        this.prevPosArr[j].y = cY;
                    }
                }
            }
        }
    }

    onUp(e) {
        for (let i = 0; i < 6; i++)
            this.isDragArr[i] = false;
    }

    endDrag(index) {
        this.isDragArr[index] = false;
    }

    passedString(cY) {
        for (let i = 0; i < 6; i++) {
            if (this.prevPosArr[i].y < this.guitarStringArr[i].y && cY >= this.guitarStringArr[i].y) {
                return {passed: true, i: i};
            }
            else if (this.prevPosArr[i].y > this.guitarStringArr[i].y && cY < this.guitarStringArr[i].y) {
                return {passed: true, i: i};
            }
        }
        return {passed: false, i: -1};
    }

    loadImage() {
        this.ctx.drawImage(this.image, 0, -145);
    }
}

window.onload = () => {
    new App();
};
