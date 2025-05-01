let gameStarted = false;
let gameInterval;
let levelTime = 30; // Level time in seconds
let currentTime = levelTime;
let gameOver = false;

// Canvas setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-game');
const timeDisplay = document.getElementById('time');
const gameOverScreen = document.getElementById('game-over');
const nextLevelButton = document.getElementById('next-level');

let car = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 60,
    speed: 5,
    dx: 0,  // horizontal speed
};

// Draw the car
function drawCar() {
    ctx.fillStyle = '#FF0000'; // Red color
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Clear the canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update car position
function updateCar() {
    if (car.x + car.dx > 0 && car.x + car.dx + car.width < canvas.width) {
        car.x += car.dx;
    }
}

// Draw timer
function drawTimer() {
    timeDisplay.innerHTML = currentTime;
}

// Timer countdown
function countdown() {
    if (currentTime <= 0) {
        gameOverScreen.style.display = 'block';
        clearInterval(gameInterval);
    } else {
        currentTime--;
    }
}

// Handle key events
function moveCar(e) {
    if (e.key === "ArrowLeft") {
        car.dx = -car.speed;
    } else if (e.key === "ArrowRight") {
        car.dx = car.speed;
    }
}

// Stop car movement on key release
function stopCarMovement(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        car.dx = 0;
    }
}

// Start game
startButton.addEventListener('click', () => {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    gameStarted = true;
    gameOver = false;
    currentTime = levelTime;
    gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    setInterval(countdown, 1000); // 1 second countdown
});

// Game loop
function gameLoop() {
    clear();
    drawCar();
    updateCar();
    drawTimer();
}

// Restart level
nextLevelButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    currentTime = levelTime;
    gameInterval = setInterval(gameLoop, 1000 / 60);
});

// Key event listeners
document.addEventListener('keydown', moveCar);
document.addEventListener('keyup', stopCarMovement);