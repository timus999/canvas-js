
let canvas = document.getElementById('canvas')

let ctx = canvas.getContext('2d');


var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

canvas.height = windowHeight;
canvas.width = windowWidth;


function randomRange(min, max){
    return Math.random() * (max - min) + min;
}


class Circle{
    constructor(xpos, ypos, radius, color, text){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.dx = randomRange(-1, 5);
        this.dy = randomRange(-1, 5);
    }

    draw(context){
        context.beginPath();
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;


        context.fillStyle = this.color;
        context.fill();
        context.closePath();

        context.fillStyle = 'black'
        context.font = '18px serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.text, this.xpos, this.ypos);


    }

    update(context){

        if ( this.xpos + this.radius > canvas.width || this.xpos - this.radius < 0){
            this.dx = -this.dx;
            this.color = `hsl(${Math.random() * 360}, 50%, 75%)`; 
        
        }

        if ( this.ypos + this.radius > canvas.height || this.ypos - this.radius < 0){
            this.dy = -this.dy;
            this.color = `hsl(${Math.random() * 360}, 80%, 90%)`; 
        }

        this.xpos += this.dx;
        this.ypos += this.dy;
        this.draw(context);
    }
}


let circles = [];
let count = 1;
for(let i = 0; i < 10; i++){
    let radius = 50;
    let rand_x = randomRange(radius, canvas.width - radius);
    let rand_y = randomRange(radius, canvas.height - radius);
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`; 
    let my_circle = new Circle(rand_x, rand_y, radius, color, count);
    circles.push(my_circle);
    count++;
}

function animate(){
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    circles.forEach(circle => circle.update(ctx));

    requestAnimationFrame(animate);
}

animate();