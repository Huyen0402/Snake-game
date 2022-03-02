// Khai báo các hằng số
const width = 20;
const height = 20;
const UP = -width;
const DOWN = width;
const LEFT = -1;
const RIGHT = 1;


// Khai báo biến cho giao diện 
let scoreDisplay = document.getElementById('score');
let table = document.getElementById('table');
let upBtn = document.getElementById('up');
let downBtn = document.getElementById('down');
let leftBtn = document.getElementById('left');
let rightBtn = document.getElementById('right');
let newGameBtn = document.getElementById('newGame');
let gameOverBtn = document.getElementById('over');
let bottonBtn = document.getElementsByClassName("button");
// Biến trò chơi
let elementsOfTable = width*height;
let preyId;
let snake;
let score;
let currentDirecton; 

let interval = 500;
let runSnake;


// Các hàm của game 
const appearPrey = function() {
    // Hiện đồ ăn

    // Xóa đồ ăn cũ 
    document.getElementById(preyId).classList.remove("prey");

    // Random vị trí đồ ăn
    preyId = Math.floor(Math.random() * elementsOfTable);

    // Không để đồ ăn trùng vị trí rắn
    while(snake.includes(preyId)){
        preyId = Math.floor(Math.random() * elementsOfTable);
    }

    // hiện đồ ăn 
    idOfPrey = document.getElementById(preyId);
    idOfPrey.classList.add("prey");

    console.log("Prey Appear: " + preyId);
}

const displaySnake = function(){ // vẽ rắn

    // Tìm và xóa toàn bộ con rắn cũ trên HTML
    Array.from(document.querySelectorAll('div.snake')).forEach((el) => el.classList.remove('snake'));

    // Hiện con rắn mới
    snake.forEach(snakeId => {
      document.getElementById(snakeId).classList.add("snake");  
    })

    console.log("Display Snake: " + snake);
}

const displayScore = function() {
    scoreDisplay.innerHTML = score;
}


const createTable = function() { // vẽ bảng
    // newGameBtn.style.display = 'none';

    // xóa màn chơi cũ
    while (table.firstChild){
        table.removeChild(table.lastChild);
    }

    // vẽ bảng mới
    for (let i=0; i < width*height; i++){  
        let square = document.createElement('div');
        square.className = 'square';
        square.id = i;

        table.appendChild(square);
        // square.innerHTML = i;
    }
    console.log('Start');
}

// movement
const updateSnake = function() {  // cập nhật vị trí rắn *
    let headIndex = snake.length - 1;
    let head = snake[headIndex];

    if((head < width) && (currentDirecton == UP)){
        head = head + width*(height-1);
    }else if((head >= (elementsOfTable - width)) && (currentDirecton == DOWN)){
        head = head - width*(height-1);
    }else if((head % width == 0) && (currentDirecton == LEFT)){
        head = head + width - 1;
    }else if(((head + 1) % width == 0) && (currentDirecton == RIGHT)){
        head = head - width + 1;
    }else{
        head = head + currentDirecton;
    }

    if(snake.includes(head)){
        gameOver();
    }
    
    snake.push(head);
    if (head == preyId) {
        eat();
    } else {
        snake.shift();
    }
}

const run = function(){
    updateSnake();
    displaySnake();
}

const up = function(){  // xét cho rắn di chuyển lên

    if (currentDirecton != DOWN) {
        currentDirecton = UP;
        

        console.log("Snake location " + snake);
    } else {
        console.log("Can't move");
    }
}

upBtn.onclick = function() {
    up();
}

const down = function(){
    if (currentDirecton != UP) {
        currentDirecton = DOWN;
        

        console.log("Snake location " + snake);
    } else {
        console.log("Can't move");
    }
}

downBtn.onclick = function() {
    down();
}

const left = function(){
    if (currentDirecton != RIGHT) {
        currentDirecton = LEFT;
        

        console.log("Snake location " + snake);
    } else {
        console.log("Can't move");
    }
}

leftBtn.onclick = function() {
    left();
}

const right= function(){
    if (currentDirecton != LEFT) {  
        currentDirecton = RIGHT;
        

        console.log("Snake location " + snake);
    } else {
        console.log("Can't move");
    }
}

rightBtn.onclick = function() {
    right();
}

const eat = function() {
    score += 1;
    displayScore();
    appearPrey();

    console.log('Eaten');
}

const newGame = function(){
    reset();
    
    newGameBtn.style.display = "none";

    createTable();
    displaySnake();
    appearPrey();
    displayScore();

    runSnake = setInterval(run, interval);
}

newGameBtn.onclick = function() {
    newGame();
}

const reset = function(){
    preyId = 0;
    snake = [0, 1, 2];
    score = 0;
    currentDirecton = RIGHT;
}

const gameOver = function(){
    clearInterval(runSnake);

    newGameBtn.style.display = "none";
    gameOver.style.display = "block";

}