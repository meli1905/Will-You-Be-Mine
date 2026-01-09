
window.onload = function() {
    alert('Welcome to the secret page! Press Start if you are ready');
    initGame();
};

const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const startButton = document.getElementById('startButton');
const livesDisplay = document.getElementById('livesDisplay');

let lives = 3;
let jumping = false;
let gameStarted = false;

function initGame() {
    lives = 3;
    updateLivesDisplay();
    startButton.addEventListener('click', startGame);
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    startButton.style.display = 'none';
    obstacle.style.animation = 'obstacleMove 2s infinite linear';
    document.addEventListener('keydown', handleJump);
    checkCollision();
}

function handleJump(event) {
    if (event.code === 'Space') {
        jump();
    }
}

function jump() {
    if (jumping || !gameStarted) return;
    dino.classList.add('jump');
    jumping = true;
    setTimeout(() => {
        dino.classList.remove('jump');
        jumping = false;
    }, 300);
}

function checkCollision() {
    const checkInterval = setInterval(() => {
        if (!gameStarted) {
            clearInterval(checkInterval);
            return;
        }

        const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

        if (obstacleLeft < 40 && obstacleLeft > 0 && dinoTop <= 60) {
            loseLife();
        }
    }, 10);
}

function loseLife() {
    lives -= 1;
    updateLivesDisplay();

    if (lives <= 0) {
        alert('Game Over!');
        resetGame();
    } else {
        // Temporary invincibility or some feedback to player
    }
}

function updateLivesDisplay() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

function resetGame() {
    gameStarted = false;
    obstacle.style.animation = 'none';
    startButton.style.display = 'block';
    initGame(); // Re-initialize the game
}



