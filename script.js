const MIN = 0;
const MAX = 400;
const POINTS = 100;

const range = Array(POINTS).fill(null);

const random = (min, max) => Math.random() * (max - min) + min;

const point = range.map(_ => ({
  x: random(MIN, MAX),
  y: random(MIN, MAX)
}));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(400, 400);
ctx.stroke();

point.map(p => {
    const circle = new Path2D();
    circle.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fill(circle);
});
