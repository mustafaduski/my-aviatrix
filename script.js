let flySound = new Audio('fly.mp3');
let boomSound = new Audio('boom.mp3');

// کاتێ یاری دەستپێ دکەت دەنگێ فڕینێ لێ بدە
flySound.loop = true; // با بەردەوام بیت
flySound.play();let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let multiplierDisplay = document.getElementById("multiplier");
let statusDisplay = document.getElementById("status");
let cashoutBtn = document.getElementById("cashoutBtn");
let balanceDisplay = document.getElementById("balance");

let currentMultiplier = 1.00;
let crashPoint = (Math.random() * 5 + 1.2); 
let isGameOver = false;
let isPlaying = false;
let balance = 100.00;

// ١. بارکرنا وێنێ فڕۆکێ
let planeImg = new Image();
planeImg.src = 'plane.png'; 

let planeX = 50;
let planeY = 250;

// ٢. فەنکشنا کێشانێ (Drawing)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // کێشانا هێلا پاش فڕۆکێ
    ctx.beginPath();
    ctx.strokeStyle = "rgba(78, 204, 163, 0.4)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(50, 250);
    ctx.lineTo(planeX, planeY);
    ctx.stroke();
    ctx.setLineDash([]);

    // کێشانا وێنێ فڕۆکێ
    ctx.drawImage(planeImg, planeX - 25, planeY - 25, 50, 50);
}

// ٣. لۆپا سەرەکی یا یاریێ
let gameLoop = setInterval(() => {
    if (!isGameOver) {
        currentMultiplier += 0.01;
        multiplierDisplay.innerText = currentMultiplier.toFixed(2) + "x";

        if (planeX < 550) planeX += 1.2;
        if (planeY > 50) planeY -= 0.6;

        draw();

        if (currentMultiplier >= crashPoint) {
            endGame("💥 BOOM! فڕۆکە تەقی!", "red");
        }
    }
}, 30);

// سیستەمێ Cash Out و Bet
cashoutBtn.addEventListener("click", () => {
    if (!isPlaying && !isGameOver) {
        let bet = 10; // ب شێوەیەکێ سادە ١٠ دۆلار
        if (balance >= bet) {
            balance -= bet;
            balanceDisplay.innerText = balance.toFixed(2);
            isPlaying = true;
            cashoutBtn.innerText = "CASH OUT";
        }
    } else if (isPlaying && !isGameOver) {
        let win = 10 * currentMultiplier;
        balance += win;
        balanceDisplay.innerText = balance.toFixed(2);
        endGame(`✅ تە قازانج کر: $${win.toFixed(2)}`, "gold");
    }
});

function endGame(message, color) {
    isGameOver = true;
    clearInterval(gameLoop);
    statusDisplay.innerText = message;
    statusDisplay.style.color = color;
    cashoutBtn.disabled = true;
}