// Get the canvas element
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Sample data to visualize (e.g., monthly sales)
const data = [30, 45, 10, 50, 80, 60, 90, 70, 100, 120, 150, 200];

// Set graph properties
const padding = 50;
const graphWidth = canvas.width - 2 * padding;
const graphHeight = canvas.height - 2 * padding;
const maxDataValue = Math.max(...data);
const minDataValue = Math.min(...data);
const dataRange = maxDataValue - minDataValue;
const yScale = graphHeight / dataRange;
const xScale = graphWidth / (data.length - 1);

// Function to draw the axes
function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

// Function to draw the labels
function drawLabels() {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Draw x-axis labels
    data.forEach((_, i) => {
        const x = padding + i * xScale;
        ctx.fillText(`M${i + 1}`, x, canvas.height - padding + 20);
    });

    // Draw y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = minDataValue + i * dataRange / 5;
        const y = canvas.height - padding - i * graphHeight / 5;
        ctx.fillText(value.toFixed(0), padding - 30, y + 5);
    }
}

// Function to plot the data
function plotData() {
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - (data[0] - minDataValue) * yScale);

    data.forEach((point, i) => {
        const x = padding + i * xScale;
        const y = canvas.height - padding - (point - minDataValue) * yScale;
        ctx.lineTo(x, y);
    });

    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();
}

// Function to draw data points
function drawDataPoints() {
    ctx.fillStyle = 'red';
    data.forEach((point, i) => {
        const x = padding + i * xScale;
        const y = canvas.height - padding - (point - minDataValue) * yScale;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    });
}

// Draw the graph
function drawGraph() {
    drawAxes();
    drawLabels();
    plotData();
    drawDataPoints();
}

drawGraph();
