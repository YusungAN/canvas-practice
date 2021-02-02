export class Circle {
    constructor(radius, color) {
        this.radius = radius;
        this.dXsum = 0;
        this.dYsum = 0;
        this.color = color;
    }

    draw(ctx, stageWidth, stageHeight, dXsum, dYsum, isDragging) {
        
        if (isDragging) {
            this.dXsum = dXsum;
            this.dYsum = dYsum;
        }
        if (!isDragging && this.dXsum > 3) {
            this.dXsum -= 8;
        }
        if (!isDragging) {
            if (this.dYsum > 0) this.dYsum -= 8;
            else this.dYsum += 8;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(stageWidth / 2, stageHeight / 2, this.radius, 0, 2 * Math.PI);

        ctx.moveTo(
            stageWidth / 2 - (Math.cos(Math.PI / 6) * this.radius),
            stageHeight / 2 - (Math.sin(Math.PI / 6) * this.radius)
        );
        ctx.arcTo(
            stageWidth / 2,
            stageHeight / 2 - (this.radius / Math.sin(Math.PI / 6)),
            stageWidth / 2 + Math.cos(Math.PI / 6) * this.radius,
            stageHeight / 2 - Math.sin(Math.PI / 6) * this.radius,
            this.radius
        );

        ctx.moveTo(
            stageWidth / 2 + (Math.cos(Math.PI / 6) * this.radius),
            stageHeight / 2 - (Math.sin(Math.PI / 6) * this.radius)
        );
        ctx.arcTo(
            stageWidth / 2 + (((1 + Math.sin(Math.PI / 6)) * this.radius) / Math.cos(Math.PI / 6)),
            stageHeight / 2 + this.radius + this.dYsum,
            stageWidth / 2,
            stageHeight / 2 + this.radius,
            this.radius * (100 / (100 + this.dXsum))
        );
        ctx.lineTo(
            stageWidth / 2,
            stageHeight / 2 + this.radius,
        );

        ctx.moveTo(
            stageWidth / 2,
            stageHeight / 2 + this.radius,
        );
        ctx.arcTo(
            stageWidth / 2 - (((1 + Math.sin(Math.PI / 6)) * this.radius) / Math.cos(Math.PI / 6)),
            stageHeight / 2 + this.radius,
            stageWidth / 2 - Math.cos(Math.PI / 6) * this.radius,
            stageHeight / 2 - Math.sin(Math.PI / 6) * this.radius,
            this.radius
        );

        ctx.fill();
    }
}
