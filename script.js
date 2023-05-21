const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 900;

// global Settings
ctx.lineWidth = 10;

// Canvas Shadow
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowColor = 'black';


//  Gradients
const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient1.addColorStop('0.2', 'pink');
gradient1.addColorStop('0.3', 'red');
gradient1.addColorStop('0.4', 'orange');
gradient1.addColorStop('0.5', 'yellow');
gradient1.addColorStop('0.6', 'green');
gradient1.addColorStop('0.7', 'turquoise');
gradient1.addColorStop('0.8', 'violet');
// ctx.strokeStyle = gradient1;
const gradient2 = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.5, 90, canvas.width * 0.5, canvas.height * 0.5,500);
gradient2.addColorStop('0.3', 'magenta');
gradient2.addColorStop('0.6', 'turquoise');
gradient2.addColorStop('0.9', 'blue');

// Canvas Patterns
const patternImage = document.getElementById('patternImage');
const pattern1 = ctx.createPattern(patternImage, 'no-repeat');

ctx.strokeStyle = gradient2;

class Line {
    constructor(canvas){
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.history = [{x: this.x, y: this.y}];
        this.lineWidth = Math.floor(Math.random() * 50 + 1);
        this.hue = Math.floor(Math.random() * 360);
        this.maxLength = Math.floor(Math.random() * 150 + 10);
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = 7;
        this.lifeSpan = this.maxLength * 2;
        this.breakPoint = this.lifeSpan * 0.85;
        this.timer = 0;
        this.angle = 0;
        this.va = Math.random() * 0.5 - 0.25;
        this.curve = 0.1;
        this.vc = Math.random() * 0.4 - 0.2;
    }
    draw(context){
        // context.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)';
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for(let i = 0; i < this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y);
        }        
        // to draw 
        context.stroke();
    }
    update(){
        this.timer++;
        this.angle += this.va;
        this.curve += this.vc;
        if (this.timer < this.lifeSpan) {
            if (this.timer > this.breakPoint) {
                this.va *= -1.12;
            }
            this.x += Math.sin(this.angle) * this.curve;
            this.y += Math.cos(this.angle) * this.curve;
            this.history.push({x: this.x, y: this.y});   
            if (this.history.length > this.maxLength) {
                this.history.shift();
            }            
        } else if (this.history.length <= 1){
            this.reset();
        } else {
            this.history.shift();
        }
    }
    reset(){
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.history = [{x: this.x, y: this.y}];
        this.timer = 0;
        this.angle = 0;
        this.curve = 0;
        this.va = Math.random() * 0.5 - 0.25;
    }
}

const lineArray = [];
const numberOfLines = 50;
for(let i = 0; i < numberOfLines; i++){
    lineArray.push(new Line(canvas));
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw line
    lineArray.forEach(line =>{
        line.draw(ctx);
        line.update();
    });
    requestAnimationFrame(animate);
}
animate();