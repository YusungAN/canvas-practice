import { drawAxis, Graph } from "./draw.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        this.targetFunction = new Graph("sin(x)");
        this.targetFunctiontemp = new Graph("sin(x)");
        this.talyor = new Graph("x-(1/6)*x^3");
        this.xToCalc = 0;
        this.degree = 3;
        this.coefficient = new Array();

        this.updated = true;

        document
            .getElementById("submit")
            .addEventListener("click", this.changeFunction.bind(this));
        this.changeFunction();

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

        drawAxis(this.ctx, this.stageWidth, this.stageHeight);
        this.targetFunction.draw(
            this.ctx,
            this.stageWidth,
            this.stageHeight,
            "#ff5733"
        );
        this.talyor.draw(this.ctx, this.stageWidth, this.stageHeight, "#217EF7");
    }

    changeFunction() {
        const calcFactorial = (x) => {
            if (x === 0) return 1;
            let res = 1;
            for (let i = x; i >= 1; i--) {
                res *= i;
            }
            return res;
        };

        this.updated = true;
        this.coefficient = new Array();
        try {
            const exp = document.getElementById("exp").value;
            this.targetFunction.f = math.parse(exp);
            this.targetFunctiontemp.f = math.parse(exp);
            this.degree = Number(document.getElementById("deg").value);
            this.xToCalc = Number(document.getElementById("x").value);
            
            this.coefficient.push(this.targetFunctiontemp.f.evaluate({x: this.xToCalc}));
            for (let i = 1; i <= this.degree; i++) {
                const exp = math.derivative(this.targetFunctiontemp.f, "x");
                this.coefficient.push(
                    exp.evaluate({ x: this.xToCalc }) / calcFactorial(i)
                );
                this.targetFunctiontemp.f = exp;
            }
            let talyortemp = "";
            for (let i in this.coefficient) {
                const ii = Number(i);
                if (ii > 0) talyortemp += "+";
                talyortemp += `(${this.coefficient[ii]})*(x-${this.xToCalc})^(${ii})`;
            }
            this.talyor.f = math.parse(talyortemp);
        } catch (e) {
            console.log(e);
            document.getElementById("alert").innerHTML =
                "식이 유효하지 않습니다.";
        }
    }
}

window.onload = () => {
    new App();
};
