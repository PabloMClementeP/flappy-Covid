import { bird, canvas, ctx, frame, gameSpeed, scorePlus } from "./main.js";

let obstaclesArray = [];

class Obstacle{
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 20;
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.x = canvas.width;
        this.width = 80;
        this.color = 'brown'
        this.counted = false;
    }

    draw(){
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x, 0, this.width, this.top);
        ctx.strokeRect(this.x, canvas.height - this.bottom, this.width, this.bottom);

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    update(){
        this.x -= gameSpeed;
        if(!this.counted && this.x < bird.x){
            scorePlus();
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(){
    if(frame % 100 === 0){
        obstaclesArray.unshift(new Obstacle);
    }

    for(let i=0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }

    if(obstaclesArray.length > 20){
        obstaclesArray.pop(obstaclesArray[0]);
    }
}

function clearObstaclesArray(){
    obstaclesArray = [];
}

export { handleObstacles, obstaclesArray, clearObstaclesArray }