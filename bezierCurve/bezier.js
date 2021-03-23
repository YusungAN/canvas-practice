export class Bezier {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    draw(ctx, center, updated) {
        if (updated) {
            ctx.strokeStyle = "#ff5733";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(center.x + this.x1*70, center.y - this.y1*70);
            for (let i = 0; i <= 1.01; i += 0.02) {
                const point = this.internal_divided_point(i);
                ctx.lineTo(center.x + point.x * 70, center.y - point.y * 70);
                ctx.moveTo(center.x + point.x * 70, center.y - point.y * 70);
            }
            ctx.stroke();          
            ctx.closePath();
        }
    }

    eraseTrash(ctx) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x + this.x1, center.y - this.y1);
        ctx.stroke();
    }

    internal_divided_point(t) {
        return {
            x:
                this.x1 * (1 - t) * (1 - t) +
                this.x2 * t * (1 - t) * 2 +
                this.x3 * t * t,
            y:
                this.y1 * (1 - t) * (1 - t) +
                this.y2 * t * (1 - t) * 2 +
                this.y3 * t * t,
        };
        //손으로 계산함..
    }
}
