const { createCanvas } = require('canvas');
const fs = require('fs');

function drawSquircle(ctx, width, height) {
    const canvas = createCanvas(width, height);
    ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    const n = 3.3;
    const rx = width / 2;
    const ry = height / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const step = 0.01;

    for (let theta = 0; theta <= 2 * Math.PI; theta += step) {
        const x = Math.pow(Math.abs(Math.cos(theta)), 2 / n) * rx * Math.sign(Math.cos(theta)) + centerX;
        const y = Math.pow(Math.abs(Math.sin(theta)), 2 / n) * ry * Math.sign(Math.sin(theta)) + centerY;
        if (theta === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = '#3498db';
    ctx.fill();

    return canvas;
}

const width = 400;
const height = 400;

const canvas = drawSquircle(null, width, height);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./squircle.png', buffer);
console.log('Squircle image saved as squircle_no_border.png');
