const readline = require('readline'); // بۆ هندێ تو بشێی ل سەر تەرمیناڵێ نامەی بنویسی

// 1. دیارکرنا خالەکا هەرەمەکی
let crashPoint = (Math.random() * 5 + 1).toFixed(2);
let currentMultiplier = 1.00;
let isGameOver = false;

console.log("--- بخێر بێی بۆ یارییا Aviatrix ---");
console.log("فڕۆکە دەست ب فڕینێ کر! (بۆ 'Cash Out' کلیک ل Enter بکە)");

// 2. دروستکرنا ڕێكەکێ دا یاریزان کلیکێ بکەت
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ئەگەر یاریزان Enter داگرت
rl.on('line', () => {
    if (!isGameOver) {
        console.log(`✅ پیرۆزە! تە Cash Out کر ل سەر: ${currentMultiplier.toFixed(2)}x`);
        isGameOver = true;
        process.exit(); // یاری تمام بوو
    }
});

// 3. لۆپا یاریێ (Game Loop)
let gameLoop = setInterval(() => {
    currentMultiplier += 0.05; // خێراییێ پتر لێ دکەین
    
    process.stdout.write(`\rMultiplier: ${currentMultiplier.toFixed(2)}x `);

    if (currentMultiplier >= crashPoint) {
        console.log(`\n💥 BOOM! فڕۆکە تەقی ل: ${currentMultiplier.toFixed(2)}x`);
        console.log("تە خسرەت کر! جارەکا دی هەول بدە.");
        isGameOver = true;
        clearInterval(gameLoop);
        process.exit();
    }
}, 100);