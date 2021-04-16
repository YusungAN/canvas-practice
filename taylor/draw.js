class Graph {
    constructor(f) {
        this.f = math.parse(f);
    }

    draw(ctx, stageWidth, stageHeight, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        try {
            ctx.moveTo(
                0,
                this.f.evaluate({
                    x: CanvasToPos(0, 0, stageWidth, stageHeight).x,
                })
            );
            for (let i = 0; i <= stageWidth; i += 1) {
                const point = this.f.evaluate({
                    x: CanvasToPos(i, 0, stageWidth, stageHeight).x,
                });
                ctx.lineTo(i, PosToCanvas(i, point, stageWidth, stageHeight).y);
                ctx.moveTo(i, PosToCanvas(i, point, stageWidth, stageHeight).y);
            }
            ctx.stroke();
            ctx.closePath();
        } catch (e) {
            console.log(e);
        }
    }
}

function PosToCanvas(x, y, stageWidth, stageHeight) {
    return { x: stageWidth / 2 + x * 70, y: stageHeight / 2 - y * 70 };
}

function CanvasToPos(x, y, stageWidth, stageHeight) {
    return { x: x / 70 - stageWidth / 140, y: stageHeight / 2 - y / 140 };
}

function drawAxis(ctx, stageWidth, stageHeight) {
    const axisXPos = { x: 0, y: stageHeight / 2 };
    const axisYPos = { x: stageWidth / 2, y: 0 };

    ctx.strokeStyle = "#CAC9C8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(axisYPos.x, axisYPos.y);
    ctx.lineTo(axisYPos.x, stageHeight);
    ctx.stroke();
    ctx.moveTo(axisXPos.x, axisXPos.y);
    ctx.lineTo(stageWidth, axisXPos.y);
    ctx.stroke();
    ctx.closePath();
}

export { drawAxis, Graph };
