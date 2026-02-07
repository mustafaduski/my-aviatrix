const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');

let multiplier = 1.00;
let isPlaying = false;
let planeX = 50;
let planeY = 300;
let crashPoint = 0;

// وێنەی فڕۆکەکە
const planeImg = new Image();
planeImg.src = 'plane.png';

function startGame() {
    multiplier = 1.00;
    planeX = 50;
    planeY = 300;
    isPlaying = true;
    crashPoint = (Math.random() * 5 + 1.2).toFixed(2); // کاتی تەقینەوە بە هەڕەمەکی
    startBtn.style.display = 'none';
    statusDisplay.innerText = "فڕۆکەکە لە ئاسمانە! کەی دێیتە خوارەوە؟";
    update();
}

function update() {
    if (!isPlaying) return;

    // زیاترکردنی خاڵەکان
    multiplier += 0.01;
    scoreDisplay.innerText = `خاڵ: ${multiplier.toFixed(2)}x`;

    // جوڵەی فڕۆکە بەرەو سەرەوە
    if (planeX < 300) planeX += 1;
    if (planeY > 50) planeY -= 0.8;

    // کێشانی شاشەکە
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(planeImg, planeX, planeY, 60, 50);

    // ئەگەر فڕۆکەکە تەقییەوە
    if (multiplier >= crashPoint) {
        isPlaying = false;
        statusDisplay.innerText = "تەقینەوە! (Crash)";
        statusDisplay.style.color = "#ff5d5d";
        startBtn.style.display = 'inline-block';
        startBtn.innerText = "دووبارە هەوڵبدەرەوە";
    } else {
        requestAnimationFrame(update);
    }
}

startBtn.addEventListener('click', startGame);
