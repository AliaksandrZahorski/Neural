var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(400, 400);
ctx.stroke();

const MIN = 0;
const MAX = 400;
const POINTS = 100;
const LEARNING_RATE = 1;

const random = (min, max) => Math.random() * (max - min) + min;
const range = Array(POINTS).fill(null);

let weights = {
  x: random(-1, 1),
  y: random(-1, 1)
};

const points = range.map(_ => {
  const x = random(MIN, MAX);
  const y = random(MIN, MAX);
  return { x, y, answer: x > y ? 1 : -1 };
});

const perceptron = (point, weights) => {
  const sum = point.x * weights.x + point.y * weights.y;
  return sum > 0 ? 1 : -1;
};

const err = (answer, guess) => answer - guess;

points.map(p => {
  const circle = new Path2D();
  circle.arc(p.x, p.y, 6, 0, 2 * Math.PI);
  //   const pc = p.answer;
  const pc = perceptron(p, weights);
  ctx.fillStyle = pc > 0 ? "rgb(200, 0, 0)" : "rgb(0, 200, 0)";
  ctx.fill(circle);
});

const train = (learningData, weights) => {
  const error = err(learningData.answer, perceptron(learningData, weights));
  const newWeights = {};
  newWeights.x = weights.x + error * learningData.x * LEARNING_RATE;
  newWeights.y = weights.y + error * learningData.y * LEARNING_RATE;
  return newWeights;
};

weights = train(points[0], weights);

points.forEach(d => {
  weights = train(d, weights);
});

points.map(p => {
  const circle = new Path2D();
  circle.arc(p.x, p.y, 3, 0, 2 * Math.PI);
  //   const pc = p.answer;
  const pc = perceptron(p, weights);
  ctx.fillStyle = pc > 0 ? "rgb(200, 0, 0)" : "rgb(0, 200, 0)";
  ctx.fill(circle);
});

// console.log('guess', perceptron(learningData[0], weights), weights);
