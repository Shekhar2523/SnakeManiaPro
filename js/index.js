// game constants and Variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13 , y:15}
]
food = {x: 6 ,y: 7};
// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    // if you bump into yourself
    for(let i = 1;i < snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x>18 || snakeArr[0].y>18 || snakeArr[0].x<=0 ||snakeArr[0].y<=0){
        return true;
    }
}

function gameEngine(){
    // part 1: Updating the snake array
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        inputDir = {x: 0,y: 0};
        alert("Game over press any key to play again");
        snakeArr = [{x: 13 , y:15}];
        musicSound.play();
        score =0;
    }

    // IF you have eaten the food , increment the score and recognize the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: "+ score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 17;
        food = {x: Math.round(a+(b-a)* Math.random()),y: Math.round(a+(b-a)* Math.random())}
    }

    // Move the snake 
    for(let i=snakeArr.length -2;i >=0 ;i--){
        snakeArr[i+1] = {...snakeArr[i]}; // ... create new object 
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
    // part 2: display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic starts here 
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x: 0,y:1} // Start the game
    moveSound.play();
    musicSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;                
    } 
})
