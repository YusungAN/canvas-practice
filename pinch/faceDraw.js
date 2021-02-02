function earDraw(ctx, stageWidth, stageHeight) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(stageWidth / 2 - 115, stageHeight / 2 - 160, 60, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(stageWidth / 2 + 115, stageHeight / 2 - 160, 60, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#d8a454';
    ctx.beginPath();
    ctx.arc(stageWidth / 2 - 115, stageHeight / 2 - 160, 48, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(stageWidth / 2 + 115, stageHeight / 2 - 160, 48, 0, 2 * Math.PI);
    ctx.fill();
}

function faceDraw(ctx, stageWidth, stageHeight) {
    // eyebrow
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(stageWidth / 2 - 125, stageHeight / 2 - 80, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(stageWidth / 2 - 125, stageHeight / 2 - 90, 70, 20);
    ctx.arc(stageWidth / 2 - 55, stageHeight / 2 - 80, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.arc(stageWidth / 2 + 55, stageHeight / 2 - 80, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(stageWidth / 2 + 55, stageHeight / 2 - 90, 70, 20);
    ctx.arc(stageWidth / 2 + 125, stageHeight / 2 - 80, 10, 0, 2 * Math.PI);
    ctx.fill();

    //eye
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(stageWidth / 2 - 90, stageHeight / 2 - 30, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(stageWidth / 2 + 90, stageHeight / 2 - 30, 15, 0, 2 * Math.PI);
    ctx.fill();

    //nose
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(stageWidth / 2 - 25, stageHeight / 2 + 70, 37, 0, 2 * Math.PI);
    ctx.arc(stageWidth / 2 + 25, stageHeight / 2 + 70, 37, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(stageWidth / 2 - 23, stageHeight / 2 + 70, 27, 0, 2 * Math.PI);
    ctx.arc(stageWidth / 2 + 23, stageHeight / 2 + 70, 27, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(stageWidth / 2, stageHeight / 2 + 40, 17, 0, 2 * Math.PI);
    ctx.fill();
}

export {
    earDraw,
    faceDraw
}