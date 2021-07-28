import { spacePressed, angle, ctx } from "./main.js";

// player image
const covid = new Image();
covid.src = './media/covicho.png';

export default class Bird{
    constructor(canvas){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 128;
        this.originalHeight = 128;
        this.width = this.originalWidth /5;
        this.height = this.originalHeight /5  ;
        this.weight = 1;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    update(){
        let curve = Math.sin(angle) * 5;
        if(this.y > this.canvas.height - (this.height * 3) + curve){
            this.y = this.canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        }else{
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }

        // check for bird top
        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        }

        // push up the bird when space is pressed
        // and position is up to height X 3
        if(spacePressed && this.y > this.height * 3) this.flap();
    }

    draw(){
        ctx.drawImage(covid, 0, 0, this.originalWidth, this.originalHeight, this.x - 10, this.y - 10, this.width * 1.8, this.height * 1.8);
    }

    flap(){
        this.vy -=2;
    }
}
