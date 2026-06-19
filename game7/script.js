// ===== Game Configuration =====
const GAME_CONFIG = {
    viewportWidth: 500,
    viewportHeight: 350,
    worldWidth: 500,
    worldHeight: 3000,
    playerSize: 50,
    platformWidth: 80,
    platformHeight: 15,
    playerSpeed: 8,
    jumpForce: 11,
    gravityStrength: 0.45,
    maxScore: 10000
};

// ===== Game State =====
let gameState = {
    score: 0,
    level: 1,
    isPaused: false,
    isGameOver: false,
    currentNumber: 0,
    playerX: GAME_CONFIG.worldWidth / 2 - GAME_CONFIG.playerSize / 2,
    playerY: GAME_CONFIG.worldHeight - 70 - GAME_CONFIG.playerSize,
    playerVelocityY: 0,
    playerVelocityX: 0,
    platforms: [],
    currentPlatformIndex: -1,
    maxLevelReached: 1,
    pressedKeys: {},
    isGrounded: true,
    cameraY: 0,
    previousPlayerY: GAME_CONFIG.worldHeight - 70 - GAME_CONFIG.playerSize
};

// ===== DOM Elements =====
const gameArena = document.getElementById('gameArena');
const playerElement = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const numberDisplay = document.getElementById('numberDisplay');
const multipleOfDisplay = document.getElementById('multipleOf');
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreDisplay = document.getElementById('finalScore');
const maxLevelDisplay = document.getElementById('maxLevel');
const pauseBtn = document.getElementById('pauseBtn');

// ===== Sound Effects (using Web Audio API) =====
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playCorrectSound() {
    playSound(523.25, 0.1);
    setTimeout(() => playSound(659.25, 0.1), 100);
    setTimeout(() => playSound(783.99, 0.2), 200);
}

function playWrongSound() {
    playSound(200, 0.3, 'square');
    setTimeout(() => playSound(150, 0.3, 'square'), 150);
}

function playGameOverSound() {
    playSound(400, 0.2);
    setTimeout(() => playSound(300, 0.3), 200);
    setTimeout(() => playSound(200, 0.5), 500);
}

function playJumpSound() {
    playSound(800, 0.08);
}

function playPointSound() {
    playSound(1000, 0.05);
    setTimeout(() => playSound(1200, 0.1), 50);
}

// ===== Initialization =====
function initializeGame() {
    gameState = {
        score: 0,
        level: 1,
        isPaused: false,
        isGameOver: false,
        currentNumber: 0,
        playerX: GAME_CONFIG.worldWidth / 2 - GAME_CONFIG.playerSize / 2,
        playerY: GAME_CONFIG.worldHeight - 70 - GAME_CONFIG.playerSize,
        playerVelocityY: 0,
        playerVelocityX: 0,
        platforms: [],
        currentPlatformIndex: -1,
        maxLevelReached: 1,
        pressedKeys: {},
        isGrounded: true,
        cameraY: GAME_CONFIG.worldHeight - GAME_CONFIG.viewportHeight,
        previousPlayerY: GAME_CONFIG.worldHeight - 70 - GAME_CONFIG.playerSize
    };
    
    selectNewNumber();
    generatePlatforms();
    updateUI();
    startGameLoop();
}

function selectNewNumber() {
    gameState.currentNumber = Math.floor(Math.random() * 12) + 1;
    numberDisplay.textContent = gameState.currentNumber;
    multipleOfDisplay.textContent = gameState.currentNumber;
    numberDisplay.style.animation = 'none';
    setTimeout(() => {
        numberDisplay.style.animation = 'pulse 2s infinite';
    }, 10);
}

// ===== Platform Generation =====
function generatePlatforms() {
    gameState.platforms = [];
    gameState.currentPlatformIndex = -1;
    
    // Add starting platform
    gameState.platforms.push({
        x: GAME_CONFIG.worldWidth / 2 - GAME_CONFIG.platformWidth / 2,
        y: GAME_CONFIG.worldHeight - 70,
        value: 0,
        isCorrect: true,
        isStartPlatform: true
    });
    
    // Generate platforms with correct multiples
    let platformY = GAME_CONFIG.worldHeight - 140;
    
    for (let i = 0; i < 25; i++) {
        const correctMultiple = gameState.currentNumber * (i + 2);
        
        // Generate a wrong multiple
        let wrongMultiple;
        do {
            wrongMultiple = Math.floor(Math.random() * (correctMultiple + 50)) + 1;
        } while (wrongMultiple % gameState.currentNumber === 0 && wrongMultiple !== correctMultiple);
        
        // Randomly decide which side is correct (left or right)
        if (Math.random() > 0.5) {
            gameState.platforms.push({
                x: GAME_CONFIG.worldWidth / 2 - GAME_CONFIG.platformWidth - 40,
                y: platformY,
                value: correctMultiple,
                isCorrect: true,
                pairIndex: i
            });
            gameState.platforms.push({
                x: GAME_CONFIG.worldWidth / 2 + 40,
                y: platformY,
                value: wrongMultiple,
                isCorrect: false,
                pairIndex: i
            });
        } else {
            gameState.platforms.push({
                x: GAME_CONFIG.worldWidth / 2 - GAME_CONFIG.platformWidth - 40,
                y: platformY,
                value: wrongMultiple,
                isCorrect: false,
                pairIndex: i
            });
            gameState.platforms.push({
                x: GAME_CONFIG.worldWidth / 2 + 40,
                y: platformY,
                value: correctMultiple,
                isCorrect: true,
                pairIndex: i
            });
        }
        
        platformY -= 75;
    }
    
    displayVisiblePlatforms();
}

function displayVisiblePlatforms() {
    // Clear previous platforms
    const platformElements = document.querySelectorAll('.platform');
    platformElements.forEach(p => p.remove());
    
    // Calculate which platforms should be visible
    const viewTop = gameState.cameraY;
    const viewBottom = gameState.cameraY + GAME_CONFIG.viewportHeight;
    
    gameState.platforms.forEach((platform, index) => {
        if (platform.y >= viewTop - 50 && platform.y <= viewBottom + 50) {
            createPlatformElement(platform, index);
        }
    });
}

function createPlatformElement(platform, index) {
    const platformDiv = document.createElement('div');
    platformDiv.className = 'platform';
    
    if (platform.isStartPlatform) {
        platformDiv.textContent = '⭐ START';
    } else {
        platformDiv.textContent = platform.value;
    }
    
    // Calculate screen position from world position
    const screenY = platform.y - gameState.cameraY;
    
    platformDiv.style.left = platform.x + 'px';
    platformDiv.style.top = screenY + 'px';
    platformDiv.dataset.index = index;
    platformDiv.dataset.correct = platform.isCorrect;
    platformDiv.dataset.worldY = platform.y;
    
    platformDiv.addEventListener('click', () => handlePlatformClick(index, platform.isCorrect));
    
    gameArena.appendChild(platformDiv);
}

// ===== Player Movement & Jumping =====
document.addEventListener('keydown', (e) => {
    gameState.pressedKeys[e.key] = true;
    
    // Jump on Space or W
    if ((e.key === ' ' || e.key === 'w' || e.key === 'W') && gameState.isGrounded && !gameState.isPaused && !gameState.isGameOver) {
        performJump();
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    gameState.pressedKeys[e.key] = false;
});

function performJump() {
    playJumpSound();
    gameState.playerVelocityY = -GAME_CONFIG.jumpForce;
    gameState.isGrounded = false;
}

function updatePlayerPosition() {
    if (gameState.isPaused || gameState.isGameOver) return;
    
    // Store previous Y for collision detection
    gameState.previousPlayerY = gameState.playerY;
    
    // Horizontal movement - set velocity directly based on input
    if (gameState.pressedKeys['ArrowLeft'] || gameState.pressedKeys['a'] || gameState.pressedKeys['A']) {
        gameState.playerVelocityX = -GAME_CONFIG.playerSpeed;
    } else if (gameState.pressedKeys['ArrowRight'] || gameState.pressedKeys['d'] || gameState.pressedKeys['D']) {
        gameState.playerVelocityX = GAME_CONFIG.playerSpeed;
    } else {
        // No input - apply friction
        gameState.playerVelocityX *= 0.9;
        // Stop completely if very slow
        if (Math.abs(gameState.playerVelocityX) < 0.1) {
            gameState.playerVelocityX = 0;
        }
    }
    
    // Apply gravity
    gameState.playerVelocityY += GAME_CONFIG.gravityStrength;
    
    // Limit falling speed
    if (gameState.playerVelocityY > 10) {
        gameState.playerVelocityY = 10;
    }
    
    // Update position
    gameState.playerX += gameState.playerVelocityX;
    gameState.playerY += gameState.playerVelocityY;
    
    // Horizontal boundaries
    if (gameState.playerX < 0) gameState.playerX = 0;
    if (gameState.playerX + GAME_CONFIG.playerSize > GAME_CONFIG.worldWidth) {
        gameState.playerX = GAME_CONFIG.worldWidth - GAME_CONFIG.playerSize;
    }
    
    // Check if player fell below world
    if (gameState.playerY > GAME_CONFIG.worldHeight) {
        endGame();
        return;
    }
    
    // Reset grounded state only if not on a platform
    let wasGrounded = gameState.isGrounded;
    gameState.isGrounded = false;
    
    // Platform collision
    checkPlatformCollision();
    
    // Update camera to follow player
    updateCamera();
    
    // Update player display
    const screenY = gameState.playerY - gameState.cameraY;
    playerElement.style.left = gameState.playerX + 'px';
    playerElement.style.top = screenY + 'px';
    
    // Update visible platforms
    displayVisiblePlatforms();
}

function updateCamera() {
    // Camera should follow player, keeping player in lower-middle area of screen
    const targetCameraY = gameState.playerY - (GAME_CONFIG.viewportHeight * 0.55);
    
    // Smooth camera movement
    gameState.cameraY += (targetCameraY - gameState.cameraY) * 0.08;
    
    // Clamp camera to world bounds
    if (gameState.cameraY < 0) gameState.cameraY = 0;
    if (gameState.cameraY > GAME_CONFIG.worldHeight - GAME_CONFIG.viewportHeight) {
        gameState.cameraY = GAME_CONFIG.worldHeight - GAME_CONFIG.viewportHeight;
    }
}

function checkPlatformCollision() {
    const playerBottom = gameState.playerY + GAME_CONFIG.playerSize;
    const playerTop = gameState.playerY;
    const playerLeft = gameState.playerX;
    const playerRight = gameState.playerX + GAME_CONFIG.playerSize;
    const previousBottom = gameState.previousPlayerY + GAME_CONFIG.playerSize;
    
    // Check all platforms for collision
    for (let i = 0; i < gameState.platforms.length; i++) {
        const platform = gameState.platforms[i];
        
        const platformBottom = platform.y + GAME_CONFIG.platformHeight;
        const platformTop = platform.y;
        const platformLeft = platform.x;
        const platformRight = platform.x + GAME_CONFIG.platformWidth;
        
        // Check horizontal overlap
        const horizontalOverlap = playerRight > platformLeft && playerLeft < platformRight;
        
        // Check if player crossed the platform top from above (more robust)
        // Previous bottom was above platform top, current bottom is at or below platform top
        const crossedFromAbove = previousBottom <= platformTop && playerBottom >= platformTop;
        const isFalling = gameState.playerVelocityY > 0;
        
        // Check collision - only from above
        if (horizontalOverlap && crossedFromAbove && isFalling) {
            // Place player on platform
            gameState.playerY = platformTop - GAME_CONFIG.playerSize;
            gameState.playerVelocityY = 0;
            gameState.playerVelocityX = 0;  // Completely reset horizontal velocity
            gameState.isGrounded = true;
            
            if (platform.isCorrect) {
                handleCorrectPlatform(i, platform);
            } else {
                handleWrongPlatform();
            }
            
            // Exit loop after handling collision
            return;
        }
    }
}

function handleCorrectPlatform(index, platform) {
    playCorrectSound();
    playPointSound();
    
    // Handle start platform differently
    if (platform.isStartPlatform) {
        gameState.currentPlatformIndex = -1;
        gameState.isGrounded = true;
        gameState.playerVelocityY = 0;
        return;
    }
    
    // On first jump from start platform, accept any correct platform
    if (gameState.currentPlatformIndex === -1) {
        // First platform - no sequence check needed
        gameState.currentPlatformIndex = index;
    } else {
        // Check if this is the next platform in sequence
        const currentPair = gameState.platforms[gameState.currentPlatformIndex]?.pairIndex ?? -1;
        
        // Only die if landing on wrong pair (wrong row) or if isCorrect is false
        if (platform.pairIndex <= currentPair) {
            // Going backwards or same row - die
            handleWrongPlatform();
            return;
        }
        
        gameState.currentPlatformIndex = index;
    }
    
    gameState.level++;
    gameState.score += 100 + (gameState.level * 10);
    gameState.maxLevelReached = Math.max(gameState.maxLevelReached, gameState.level);
    
    // Keep player grounded so they can jump again
    gameState.isGrounded = true;
    gameState.playerVelocityY = 0;
    
    // Check if won
    if (gameState.level >= 25) {
        winGame();
    }
    
    updateUI();
}

function handleWrongPlatform() {
    playWrongSound();
    playerElement.classList.add('shake');
    setTimeout(() => playerElement.classList.remove('shake'), 300);
    
    endGame();
}

function handlePlatformClick(index, isCorrect) {
    if (gameState.isPaused || gameState.isGameOver) return;
    
    // Make platform clickable as well
    if (isCorrect) {
        handleCorrectPlatform(index);
    } else {
        handleWrongPlatform();
    }
}

// ===== Game State Management =====
function updateUI() {
    scoreDisplay.textContent = gameState.score;
    levelDisplay.textContent = gameState.level;
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    pauseBtn.textContent = gameState.isPaused ? '▶ Fortsetzen' : '⏸ Pause';
    
    if (gameState.isPaused) {
        pauseBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        pauseBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }
}

function endGame() {
    gameState.isGameOver = true;
    playGameOverSound();
    
    setTimeout(() => {
        finalScoreDisplay.textContent = gameState.score;
        maxLevelDisplay.textContent = gameState.maxLevelReached;
        gameOverModal.style.display = 'flex';
    }, 500);
}

function winGame() {
    gameState.isGameOver = true;
    gameState.score += 1000;
    updateUI();
    
    alert('🎉 Glückwunsch! Du hast alle Level geschafft! 🎉\nDeine Punkte: ' + gameState.score);
    
    endGame();
}

function restartGame() {
    gameOverModal.style.display = 'none';
    initializeGame();
}

// ===== Game Loop =====
let gameLoopId;

function startGameLoop() {
    const fps = 60;
    const frameTime = 1000 / fps;
    let lastTime = Date.now();
    
    gameLoopId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= frameTime) {
            updatePlayerPosition();
            lastTime = currentTime;
        }
    }, 16);
}

// ===== Responsive Controls =====
document.addEventListener('DOMContentLoaded', () => {
    const gameArenaRect = gameArena.getBoundingClientRect();
    
    gameArena.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const touchX = touch.clientX - gameArenaRect.left;
        
        if (touchX < GAME_CONFIG.viewportWidth / 2) {
            gameState.pressedKeys['ArrowLeft'] = true;
            gameState.pressedKeys['ArrowRight'] = false;
        } else {
            gameState.pressedKeys['ArrowRight'] = true;
            gameState.pressedKeys['ArrowLeft'] = false;
        }
    });
    
    gameArena.addEventListener('touchend', () => {
        gameState.pressedKeys['ArrowLeft'] = false;
        gameState.pressedKeys['ArrowRight'] = false;
    });
    
    // Tap to jump on mobile
    gameArena.addEventListener('click', () => {
        if (gameState.isGrounded && !gameState.isPaused && !gameState.isGameOver) {
            performJump();
        }
    });
    
    initializeGame();
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
