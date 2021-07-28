import { bird, gameSpeed, ctx } from "./main.js";

const particlesArray = [];

class Particle {
    constructor(){
        this.x = bird.x;
        this.y = bird.y;
        this.size = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
    }

    update(){
        this.x -= gameSpeed;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = 'rgba(150,150,150,0.3)';
        ctx.beginPath();
        ctx.arc(this.x - 3, this.y + bird.height/2, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    // add new particle at first position of array
    particlesArray.unshift(new Particle);
    // update and draw all array
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    //if more than 200, remove 20
    if(particlesArray.length > 200){
        for(let i = 0; i < 20; i++){
            particlesArray.pop(particlesArray[i]);
        }
    }
}

export { handleParticles }