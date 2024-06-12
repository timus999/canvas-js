let canvas = document.getElementById('graphCanvas');
let ctx = canvas.getContext('2d');

canvas.height = 800;
canvas.width = 1000;

let data = [200, 100, 50, 150, 300, 250, 100, 60];

let padding = 50;  // Increased padding for better spacing
let graphWidth = canvas.width - 2 * padding;
let graphHeight = canvas.height - 2 * padding;

let maxDataValue = Math.max(...data);
let minDataValue = Math.min(...data);
let dataRange = maxDataValue - minDataValue;

let yScale = graphHeight / dataRange;
let xScale = graphWidth / (data.length - 1);

// Function to draw the axes
function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Function to plot the data
function plotData() {
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - (data[0] - minDataValue) * yScale);
    
    data.forEach((point, i) => {
        let x = padding + i * xScale;
        let y = canvas.height - padding - (point - minDataValue) * yScale;
        ctx.lineTo(x, y);
    });

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Function to draw data points
function drawDataPoints() {
    ctx.fillStyle = 'red';

    data.forEach((point, i) => {
        let x = padding + i * xScale;
        let y = canvas.height - padding - (point - minDataValue) * yScale;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    });
}

// Function to draw labels
function drawLabels() {
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Draw x-axis labels
    data.forEach((_, i) => {
        let x = padding + i * xScale;
        ctx.fillText(`P${i + 1}`, x, canvas.height - padding + 20);
    });

    // Draw y-axis labels
    for (let i = 0; i <= 5; i++) {
        let value = minDataValue + i * dataRange / 5;
        let y = canvas.height - padding - i * graphHeight / 5;
        ctx.fillText(value.toFixed(0), padding - 30, y + 5);
    }
}

// Draw the graph
function drawGraph() {
    drawAxes();
    drawLabels();
    plotData();
    drawDataPoints();
}

drawGraph();
