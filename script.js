var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(400, 400);
ctx.stroke();

const MIN = 0;
const MAX = 400;
const POINTS = 100;
const LEARNING_RATE = 0.1;

const learningData = [
    {
        x: 100,
        y: 200,
        answer: -1
    },
    {
        x: 100,
        y: 10,
        answer: 1
    },
    {
        x: 300,
        y: 350,
        answer: -1
    },
    {
        x: 200,
        y: 100,
        answer: 1
    },

]

const random = (min, max) => Math.random() * (max - min) + min;
const range = Array(POINTS).fill(null);

let weights = {
    x: random(-1, 1),
    y: random(-1, 1)
  };

const point = range.map(_ => ({
  x: random(MIN, MAX),
  y: random(MIN, MAX)
}));

const perceptron = (point, weights) => {
    const sum = point.x * weights.x + point.y * weights.y;
    return sum > 0 ? 1 : -1;
}

const err = (answer, guess) => answer - guess;

learningData.map(p => {
    const circle = new Path2D();
    circle.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fill(circle);
});

const currentEerror = err(learningData[0].answer, perceptron(learningData[0], weights))

console.log('guess', perceptron(learningData[0], weights), weights);
console.log('err', currentEerror);

const train = (learningData, weights) => {
    const error = err(learningData.answer, perceptron(learningData, weights));
    const newWeights = {};
    newWeights.x = weights.x + error * learningData.x * LEARNING_RATE;
    newWeights.y = weights.y + error * learningData.y * LEARNING_RATE;
    return newWeights;
}

//weights = train(learningData[0], weights)

learningData.forEach(d => {
    weights = train(d, weights);
    console.log(weights);
})


// console.log('guess', perceptron(learningData[0], weights), weights);

point.map(p => {
    const circle = new Path2D();
    circle.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    const pc = perceptron(p, weights);
    ctx.fillStyle = pc > 0 ? "rgb(200, 0, 0)" : "rgb(0, 200, 0)";
    ctx.fill(circle);
});
