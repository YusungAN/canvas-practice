import { Axis } from "./axis.js";
import { Bezier } from "./bezier.js";
import { showPos } from "./helpline.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 1;
        this.y2 = 3;
        this.x3 = 2;
        this.y3 = 0;

        this.xExp = math.simplify(`${this.x1}(1 - t)^2 + 2*${this.x2}t(1 - t)+${this.x3}t^2`);
        this.yExp = math.simplify(`${this.y1}(1 - t)^2 + 2*${this.y2}t(1 - t)+${this.y3}t^2`);
        this.helpline = false;

        this.printExp();

        document
            .getElementById("x1")
            .addEventListener("change", () =>
                this.changeValue("x1", document.getElementById("x1").value)
            );
        document
            .getElementById("x2")
            .addEventListener("change", () =>
                this.changeValue("x2", document.getElementById("x2").value)
            );
        document
            .getElementById("x3")
            .addEventListener("change", () =>
                this.changeValue("x3", document.getElementById("x3").value)
            );
        document
            .getElementById("y1")
            .addEventListener("change", () =>
                this.changeValue("y1", document.getElementById("y1").value)
            );
        document
            .getElementById("y2")
            .addEventListener("change", () =>
                this.changeValue("y2", document.getElementById("y2").value)
            );
        document
            .getElementById("y3")
            .addEventListener("change", () =>
                this.changeValue("y3", document.getElementById("y3").value)
            );
        document.getElementById("linecheck").addEventListener("change", () => {
            this.helpline = document.getElementById("linecheck").checked;
            this.updated = true;
        });

        this.axis = new Axis(this.stageWidth, this.stageHeight);
        this.center = { x: this.stageWidth / 2, y: this.stageHeight / 2 };
        this.bezier = new Bezier(
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.x3,
            this.y3
        );

        this.updated = true;

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
        if (this.updated)
            this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.axis.draw(this.ctx, this.stageWidth, this.stageHeight);
        this.bezier.draw(this.ctx, this.center, this.updated);
        showPos(
            this.ctx,
            this.center,
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.x3,
            this.y3,
            this.helpline
        );
        this.printExp();
        this.updated = false;
    }

    printExp() {
        if (this.updated) {
            document.getElementById("xexp").innerHTML = `<img src=http://latex.codecogs.com/svg.latex?x=${this.xExp.toString().replace(/ /gi, "").replace(/\*/gi, "")}>`;
            document.getElementById("yexp").innerHTML = `<img src=http://latex.codecogs.com/svg.latex?y=${this.yExp.toString().replace(/ /gi, "").replace(/\*/gi, "")}>`;
        }
    }

    changeValue(s, value) {
        const val = Number(value);
        switch (s) {
            case "x1":
                this.bezier.x1 = val;
                this.x1 = val;
                break;
            case "x2":
                this.bezier.x2 = val;
                this.x2 = val;
                break;
            case "x3":
                this.bezier.x3 = val;
                this.x3 = val;
                break;
            case "y1":
                this.bezier.y1 = val;
                this.y1 = val;
                break;
            case "y2":
                this.bezier.y2 = val;
                this.y2 = val;
                break;
            case "y3":
                this.bezier.y3 = val;
                this.y3 = val;
                break;
        }
        this.updated = true;
        this.xExp = math.simplify(`${this.x1}(1 - t)^2 + 2*${this.x2}t(1 - t)+${this.x3}t^2`);
        this.yExp = math.simplify(`${this.y1}(1 - t)^2 + 2*${this.y2}t(1 - t)+${this.y3}t^2`);
    }
}

window.onload = () => {
    new App();
};
