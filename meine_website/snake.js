const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let game;
let speed = 200; // Скорость движения змейки

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let d;
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);

        if (i == 0) {
            ctx.fillStyle = 'black'; // Глазки
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 4, snake[i].y + box / 4, 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(snake[i].x + (3 * box) / 4, snake[i].y + box / 4, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI); // Дизайн яблока
    ctx.fill();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').textContent = score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeX >= canvas.width ||
        snakeY < 0 || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        document.getElementById('final-score').textContent = score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        document.getElementById('high-score-over').textContent = highScore;
        document.getElementById('high-score').textContent = highScore;
        document.getElementById('game-over').classList.remove('hidden');
        return;
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('high-score').textContent = highScore;
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    d = '';
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    document.getElementById('game-over').classList.add('hidden');
    game = setInterval(draw, speed);
}

document.getElementById('restart-button').addEventListener('click', () => {
    clearInterval(game);
    startGame();
});

document.getElementById('restart-game-over').addEventListener('click', () => {
    clearInterval(game);
    startGame();
});

startGame();





