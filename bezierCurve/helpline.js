function showPos(ctx, center, x1, y1, x2, y2, x3, y3, checked) {
    if (checked) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.font = "15px serif";
        ctx.beginPath();
        ctx.fillText(
            `(${x1}, ${y1})`,
            center.x + x1 * 70 - 40,
            center.y - y1 * 70
        );
        ctx.fillText(
            `(${x2}, ${y2})`,
            center.x + x2 * 70,
            center.y - y2 * 70 - 10
        );
        ctx.fillText(
            `(${x3}, ${y3})`,
            center.x + x3 * 70 + 10,
            center.y - y3 * 70
        );
        ctx.moveTo(center.x + x1 * 70, center.y - y1 * 70);
        ctx.lineTo(center.x + x2 * 70, center.y - y2 * 70);
        ctx.moveTo(center.x + x2 * 70, center.y - y2 * 70);
        ctx.lineTo(center.x + x3 * 70, center.y - y3 * 70);
        ctx.stroke();
        ctx.closePath();
        ctx.arc(center.x + x1 * 70, center.y - y1 * 70, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.arc(center.x + x2 * 70, center.y - y2 * 70, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.arc(center.x + x3 * 70, center.y - y3 * 70, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

export { showPos };
