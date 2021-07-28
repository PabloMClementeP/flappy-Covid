import Bird from "./bird.js";
import { clearObstaclesArray, handleObstacles, obstaclesArray } from "./obstacles.js";
import { handleParticles } from "./particles.js";

//DOM variables
const $btnPlay = document.getElementById("btnPlay");
const $score = document.querySelector(".score");
const $Bestscore = document.querySelector(".bestScore");
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

let spacePressed = false,
    angle = 0,
    hue = 0,
    frame = 0,
    score = 0,
    gameSpeed = 2,
    bestScore;

let bird = new Bird(canvas, ctx);

$btnPlay.disabled = true;
$btnPlay.style.visibility = 'hidden';


$score.textContent = 'Score: ' + score;

// get local storage bestScore
localStorage.getItem("best") ? bestScore = localStorage.getItem("best") : bestScore = 0;

$Bestscore.textContent = "Best Score: " + bestScore; 

// save data if best score
function saveScore(){
    localStorage.setItem("best", score);
    bestScore = score;
    $Bestscore.textContent = "Best Score: " + bestScore; 
}

/************************************/
/*       Background parallax        */
/************************************/
const background = new Image();
background.src = './media/lab-background.png';
const BG = {
    x1 : 0,
    x2 : canvas.width,
    y : 0,
    width: canvas.width,
    height : canvas.height
}

function handleBackground(){
    if (BG.x1 <= -BG.width ) BG.x1 = BG.width - gameSpeed;
    else BG.x1 -= gameSpeed;
    
    if (BG.x2 <= -BG.width ) BG.x2 = BG.width - gameSpeed;
    else BG.x2 -= gameSpeed;

    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}


/************************************/
/*           Loop function          */
/************************************/
function animate(){
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleBackground();
    handleObstacles();
    handleParticles();
       
    bird.update();
    bird.draw();


    handleCollisions();
    if(handleCollisions()) return;

    requestAnimationFrame(animate);
    angle += 0.15;
    hue++;
    frame++;
}

animate();


/************************************/
/*       Listeners for flaps        */
/************************************/

window.addEventListener("keydown", e=>{
    if(e.code === 'Space') spacePressed = true;
});

window.addEventListener("keyup", e=>{
    if(e.code === 'Space') spacePressed = false;
});

document.addEventListener("mousedown", e=>{
    if(e.buttons === 1) spacePressed = true;
});

document.addEventListener("mouseup", e=>{
    spacePressed = false;
});

document.addEventListener("touchstart", e=>{
    spacePressed = true;
});

document.addEventListener("touchend", e=>{
    spacePressed = false;
});

// crashing image
const bang = new Image();
bang.src = './media/bang.png';

/************************************/
/*       Handle Collisions          */
/************************************/

function handleCollisions(){
    for(let i = 0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
           bird.x + bird.width > obstaclesArray[i].x &&
           ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
           (bird.y > canvas.height - obstaclesArray[i].bottom && bird.y + bird.height < canvas.height))){
                // collision detected
                ctx.drawImage(bang, bird.x - bird.width/2, bird.y - bird.height/2 , 50, 50);
                
                // game over message
                ctx.font = "40px Georgia"; 
                ctx.fillStyle = "white";
                ctx.strokeText('Game Over, your score is ' + score, 100, canvas.height/2 - 10);
                ctx.fillText('Game Over, your score is ' + score, 100, canvas.height/2 - 10);

                $btnPlay.disabled = false;
                $btnPlay.style.visibility = 'visible';

                // if the best score - save it
                if(bestScore < score) saveScore();

                return true;        
           }
    }
}

// add 1 to score and show in DOM
// called in obstacles.js
function scorePlus(){
    score++;
    $score.textContent = 'Score: ' + score;
}

// reset all game variables and hide play btn
$btnPlay.addEventListener("click", ()=>{
    spacePressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;
    gameSpeed = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearObstaclesArray();
    bird = new Bird(canvas, ctx);

    $btnPlay.disabled = true;
    $btnPlay.style.visibility = 'hidden';

    animate();
});



export { spacePressed, angle, bird, gameSpeed,canvas, ctx, hue, frame, scorePlus }
