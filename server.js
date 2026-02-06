const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // بۆ نیشاندانا فایلێن HTML

let currentMultiplier = 1.00;
let crashPoint = 0;

function startNewRound() {
    currentMultiplier = 1.00;
    crashPoint = (Math.random() * 5 + 1.1).toFixed(2);
    console.log(`Round Started! Crash at: ${crashPoint}`);

    let timer = setInterval(() => {
        currentMultiplier += 0.01;
        
        // فرێكرنا ژمارێ بۆ هەمی یاریزانان ب یەک جار
        io.emit('multiplierUpdate', currentMultiplier.toFixed(2));

        if (currentMultiplier >= crashPoint) {
            io.emit('crash', currentMultiplier.toFixed(2));
            clearInterval(timer);
            console.log("BOOM!");
            
            // پشتی 3 چرکێن دی، یارییەکا نوو دەستپێ بکە
            setTimeout(startNewRound, 3000);
        }
    }, 100);
}

startNewRound();

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});