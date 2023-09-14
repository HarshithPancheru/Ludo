const can = document.getElementById("board");
const ctx = can.getContext("2d");
const r_dice = document.getElementById("dice1").getContext("2d");
const g_dice = document.getElementById("dice2").getContext("2d");
const b_dice = document.getElementById("dice3").getContext("2d");
const y_dice = document.getElementById("dice4").getContext("2d");
const tx = Math.floor(can.width / 17);
const dx = document.getElementById("dice1").width;
const dy = document.getElementById("dice1").height;
const red_tiles = [[tx * 2, tx * 7], [tx * 3, tx * 7], [tx * 4, tx * 7], [tx * 5, tx * 7], [tx * 6, tx * 7], [tx * 7, tx * 6], [tx * 7, tx * 5], [tx * 7, tx * 4], [tx * 7, tx * 3], [tx * 7, tx * 2], [tx * 7, tx * 1], [tx * 8, tx * 1], [tx * 9, tx * 1], [tx * 2, tx * 8], [tx * 3, tx * 8], [tx * 4, tx * 8], [tx * 5, tx * 8], [tx * 6, tx * 8], [tx * 7, tx * 8]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const green_tiles = [[tx * 9, tx * 2], [tx * 9, tx * 3], [tx * 9, tx * 4], [tx * 9, tx * 5], [tx * 9, tx * 6], [tx * 10, tx * 7], [tx * 11, tx * 7], [tx * 12, tx * 7], [tx * 13, tx * 7], [tx * 14, tx * 7], [tx * 15, tx * 7], [tx * 15, tx * 8], [tx * 15, tx * 9], [tx * 8, tx * 2], [tx * 8, tx * 3], [tx * 8, tx * 4], [tx * 8, tx * 5], [tx * 8, tx * 6], [tx * 8, tx * 7]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const yellow_tiles = [[tx * 14, tx * 9], [tx * 13, tx * 9], [tx * 12, tx * 9], [tx * 11, tx * 9], [tx * 10, tx * 9], [tx * 9, tx * 10], [tx * 9, tx * 11], [tx * 9, tx * 12], [tx * 9, tx * 13], [tx * 9, tx * 14], [tx * 9, tx * 15], [tx * 8, tx * 15], [tx * 7, tx * 15], [tx * 14, tx * 8], [tx * 13, tx * 8], [tx * 12, tx * 8], [tx * 11, tx * 8], [tx * 10, tx * 8], [tx * 9, tx * 8]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const blue_tiles = [[tx * 7, tx * 14], [tx * 7, tx * 13], [tx * 7, tx * 12], [tx * 7, tx * 11], [tx * 7, tx * 10], [tx * 6, tx * 9], [tx * 5, tx * 9], [tx * 4, tx * 9], [tx * 3, tx * 9], [tx * 2, tx * 9], [tx * 1, tx * 9], [tx * 1, tx * 8], [tx * 1, tx * 7], [tx * 8, tx * 14], [tx * 8, tx * 13], [tx * 8, tx * 12], [tx * 8, tx * 11], [tx * 8, tx * 10], [tx * 8, tx * 9]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const red_home = [[tx * 5 / 2, tx * 5 / 2], [tx * 9 / 2, tx * 5 / 2], [tx * 9 / 2, tx * 9 / 2], [tx * 5 / 2, tx * 9 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const green_home = [[tx * 23 / 2, tx * 5 / 2], [tx * 27 / 2, tx * 5 / 2], [tx * 27 / 2, tx * 9 / 2], [tx * 23 / 2, tx * 9 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const yellow_home = [[tx * 23 / 2, tx * 23 / 2], [tx * 27 / 2, tx * 23 / 2], [tx * 27 / 2, tx * 27 / 2], [tx * 23 / 2, tx * 27 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const blue_home = [[tx * 5 / 2, tx * 23 / 2], [tx * 9 / 2, tx * 23 / 2], [tx * 9 / 2, tx * 27 / 2], [tx * 5 / 2, tx * 27 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const YELLOW = "yellow";
const diceXYZ = [
    //Back
    [{ x: 16, y: 16, z: 48 }, { x: 64, y: 16, z: 48 }, { x: 64, y: 64, z: 48 }, { x: 16, y: 64, z: 48 }],
    //Top
    [{ x: 16, y: 16, z: 0 }, { x: 64, y: 16, z: 0 }, { x: 64, y: 16, z: 48 }, { x: 16, y: 16, z: 48 }],
    //Right
    [{ x: 64, y: 16, z: 0 }, { x: 64, y: 64, z: 0 }, { x: 64, y: 64, z: 48 }, { x: 64, y: 16, z: 48 }],
    //Bottom
    [{ x: 16, y: 64, z: 0 }, { x: 64, y: 64, z: 0 }, { x: 64, y: 64, z: 48 }, { x: 16, y: 64, z: 48 }],
    //Left
    [{ x: 16, y: 16, z: 0 }, { x: 16, y: 64, z: 0 }, { x: 16, y: 64, z: 48 }, { x: 16, y: 16, z: 48 }],
    //Front
    [{ x: 16, y: 16, z: 0 }, { x: 64, y: 16, z: 0 }, { x: 64, y: 64, z: 0 }, { x: 16, y: 64, z: 0 }]

];
can.addEventListener("click", (event) => move(event));
document.getElementById("dice1").addEventListener("click", () => rolled());
document.getElementById("dice2").addEventListener("click", () => rolled());
document.getElementById("dice3").addEventListener("click", () => rolled());
document.getElementById("dice4").addEventListener("click", () => rolled());



//Initializations
var red_coin = [...red_home];
var rcp = [0, 0, 0, 0];
var green_coin = [...green_home];
var gcp = [0, 0, 0, 0];
var yellow_coin = [...yellow_home];
var ycp = [0, 0, 0, 0];
var blue_coin = [...blue_home];
var bcp = [0, 0, 0, 0];
var player = BLUE;
var roll = true;
var dice_value = Math.floor(Math.random() * 6 + 1);
var count_6 = 0;

//change();

var ccoin = [[...bcp], [...blue_coin]]; //Changed Coins (It contains the list of coins whose positions are changed in the session and used to undo the changes)
var animating = false;

temp();
setup();



function temp() {
    ccoin = [[...gcp], [...green_coin]];
    player = GREEN;
}

//Animations and Graphics
function setup() {
    //clear Board

    //Board Setup
    board();

    //Draw tokens in the bases
    for (var j = 0; j < 4; j++) {
        draw_token(red_coin[j], RED);
        draw_token(green_coin[j], GREEN);
        draw_token(yellow_coin[j], YELLOW);
        draw_token(blue_coin[j], BLUE);
    }

    //Fill dice background
    fill_dice(BLUE);
    fill_dice(GREEN);
    fill_dice(RED);
    fill_dice(YELLOW);

    //Display Dice
    show_dice();
}

function board() {

    //Clear the canvas 
    ctx.clearRect(0, 0, can.width, can.height);

    //Path to home row
    ctx.fillStyle = RED;
    ctx.fillRect(tx * 2, tx * 8, tx * 5, tx);
    ctx.fillRect(tx * 2, tx * 7, tx, tx);
    ctx.fillRect(tx * 3, tx * 9, tx, tx);
    star(tx * 3, tx * 9);

    ctx.fillStyle = GREEN;
    ctx.fillRect(tx * 8, tx * 2, tx, tx * 5);
    ctx.fillRect(tx * 9, tx * 2, tx, tx);
    ctx.fillRect(tx * 7, tx * 3, tx, tx);
    star(tx * 7, tx * 3);

    ctx.fillStyle = YELLOW;
    ctx.fillRect(tx * 10, tx * 8, tx * 5, tx);
    ctx.fillRect(tx * 14, tx * 9, tx, tx);
    ctx.fillRect(tx * 13, tx * 7, tx, tx);
    star(tx * 13, tx * 7);

    ctx.fillStyle = BLUE;
    ctx.fillRect(tx * 8, tx * 10, tx, tx * 5);
    ctx.fillRect(tx * 7, tx * 14, tx, tx);
    ctx.fillRect(tx * 9, tx * 13, tx, tx);
    star(tx * 9, tx * 13);


    //Horizontal and vertical lines
    ctx.beginPath();
    ctx.strokeStxle = "black";
    ctx.lineWidth = tx / 20;
    ctx.rect(tx, tx, tx * 15, tx * 15);
    ctx.stroke();
    ctx.closePath();
    for (x = 2 * tx, y = 2 * tx; x < tx * 16, y < tx * 16; x += tx, y += tx) {
        ctx.beginPath();
        ctx.moveTo(x, tx);
        ctx.lineTo(x, tx * 16);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(tx, y);
        ctx.lineTo(tx * 16, y);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.closePath();


    //Base rectangles and circles
    ctx.beginPath();
    ctx.fillStyle = RED;
    ctx.fillRect(tx, tx, tx * 6, tx * 6);
    ctx.strokeRect(tx, tx, tx * 6, tx * 6);
    ctx.clearRect(tx * 2, tx * 2, tx * 4, tx * 4);
    ctx.strokeRect(tx * 2, tx * 2, tx * 4, tx * 4);
    ctx.moveTo(tx * 3, tx * 3);
    ctx.arc(tx * 3, tx * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, tx * 3);
    ctx.arc(tx * 5, tx * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 3, tx * 5)
    ctx.arc(tx * 3, tx * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, tx * 5);
    ctx.arc(tx * 5, tx * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 7, tx * 7);
    ctx.lineTo(tx * 7, tx * 10);
    ctx.lineTo(tx * 17 / 2, tx * 17 / 2);
    ctx.lineTo(tx * 7, tx * 7);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = GREEN;
    ctx.fillRect(tx * 10, tx, tx * 6, tx * 6);
    ctx.strokeRect(tx * 10, tx, tx * 6, tx * 6);
    ctx.clearRect(tx * 11, tx * 2, tx * 4, tx * 4);
    ctx.strokeRect(tx * 11, tx * 2, tx * 4, tx * 4);
    ctx.moveTo(tx * 12, tx * 3);
    ctx.arc(tx * 12, tx * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, tx * 3);
    ctx.arc(tx * 14, tx * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 12, tx * 5)
    ctx.arc(tx * 12, tx * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, tx * 5);
    ctx.arc(tx * 14, tx * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 10, tx * 7);
    ctx.lineTo(tx * 7, tx * 7);
    ctx.lineTo(tx * 17 / 2, tx * 17 / 2);
    ctx.lineTo(tx * 10, tx * 7);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = YELLOW;
    ctx.fillRect(tx * 10, tx * 10, tx * 6, tx * 6);
    ctx.strokeRect(tx * 10, tx * 10, tx * 6, tx * 6);
    ctx.clearRect(tx * 11, tx * 11, tx * 4, tx * 4);
    ctx.strokeRect(tx * 11, tx * 11, tx * 4, tx * 4);
    ctx.moveTo(tx * 12, tx * 12);
    ctx.arc(tx * 12, tx * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, tx * 12);
    ctx.arc(tx * 14, tx * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 12, tx * 14)
    ctx.arc(tx * 12, tx * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, tx * 14);
    ctx.arc(tx * 14, tx * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 10, tx * 7);
    ctx.lineTo(tx * 10, tx * 10);
    ctx.lineTo(tx * 17 / 2, tx * 17 / 2);
    ctx.lineTo(tx * 10, tx * 7);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = BLUE;
    ctx.fillRect(tx, tx * 10, tx * 6, tx * 6);
    ctx.strokeRect(tx, tx * 10, tx * 6, tx * 6);
    ctx.clearRect(tx * 2, tx * 11, tx * 4, tx * 4);
    ctx.strokeRect(tx * 2, tx * 11, tx * 4, tx * 4);
    ctx.moveTo(tx * 3, tx * 12);
    ctx.arc(tx * 3, tx * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, tx * 12);
    ctx.arc(tx * 5, tx * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 3, tx * 14)
    ctx.arc(tx * 3, tx * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, tx * 14);
    ctx.arc(tx * 5, tx * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 7, tx * 10);
    ctx.lineTo(tx * 10, tx * 10);
    ctx.lineTo(tx * 17 / 2, tx * 17 / 2);
    ctx.lineTo(tx * 7, tx * 10);
    ctx.fill();
    ctx.stroke();
}

function star(x, y) {
    x += tx / 2;
    y += tx / 2;
    var r = tx * 3 / 8;
    var t = tx / 8;
    var s36 = Math.sin(Math.PI * 36 / 180);
    var s72 = Math.sin(Math.PI * 72 / 180);
    var c36 = Math.cos(Math.PI * 36 / 180);
    var c72 = Math.cos(Math.PI * 72 / 180);
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x - t * s36, y - t * c36);
    ctx.lineTo(x - r * s72, y - r * c72);
    ctx.lineTo(x - t * s72, y + t * c72);
    ctx.lineTo(x - r * s36, y + r * c36);
    ctx.lineTo(x, y + t);
    ctx.lineTo(x + r * s36, y + r * c36);
    ctx.lineTo(x + t * s72, y + t * c72);
    ctx.lineTo(x + r * s72, y - r * c72);
    ctx.lineTo(x + t * s36, y - t * c36);
    ctx.lineTo(x, y - r);
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();

}

function draw_token(coordinates, color, scale = 0) {
    //token base circle

    scale = 1 + scale * 0.3;
    var x = coordinates[0];
    var y = coordinates[1];
    ctx.fillStyle = color;
    ctx.strokeStyle = "brown";
    ctx.beginPath();
    ctx.lineWidth = tx / 10;
    ctx.arc(x + tx / 2, y + tx / 2, tx * 4 / 11, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.closePath();

    //token outline and white fill
    ctx.beginPath();
    ctx.strokeStyle = "black";
    try{
    var grd = ctx.createLinearGradient(x, y, x, y + tx);
    }
    catch (Exception){
        //nothing
        console.log("hii")
    }
    grd.addColorStop(0.1, "white");
    grd.addColorStop(1, "black");
    ctx.fillStyle = grd;
    ctx.lineWidth = tx / 30;
    ctx.setLineDash([1, 0]);
    ctx.moveTo(x + tx / 2, y + tx * 25 / 40);
    ctx.bezierCurveTo(x + tx * (1 + scale), y - tx * scale, x - tx * scale, y - tx * scale, x + tx / 2, y + tx * 25 / 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    //token circle
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x + tx / 2, y - tx / 10 * Math.pow(scale, 3), tx / 4 * scale, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}

function fill_dice(color) {
    var dice;
    if (color == RED)
        dice = r_dice;
    else if (color == GREEN)
        dice = g_dice;
    else if (color == YELLOW)
        dice = y_dice;
    else
        dice = b_dice;

    dice.fillStyle = BLUE;
    dice.beginPath();
    dice.moveTo(dx / 15, dy / 15);
    dice.arcTo(dx / 15, dy * 14 / 15, dx * 14 / 15, dy * 14 / 15, dx / 8);
    dice.arcTo(dx * 14 / 15, dy * 14 / 15, dx * 14 / 15, dy / 15, dx / 8);
    dice.arcTo(dx * 14 / 15, dy / 15, dx / 15, dy / 15, dx / 8);
    dice.arcTo(dx / 15, dy / 15, dx / 15, dy * 14 / 15, dx / 8);
    dice.closePath();
    dice.fill();
}

function show_dice() {
    var dice;
    if (player == RED)
        dice = r_dice;
    else if (player == GREEN)
        dice = g_dice;
    else if (player == YELLOW)
        dice = y_dice;
    else
        dice = b_dice;

    dice.fillStyle = "white";
    dice.beginPath();
    dice.moveTo(16, 40);
    dice.arcTo(16, 64, 64, 64, 12);
    dice.arcTo(64, 64, 64, 16, 12);
    dice.arcTo(64, 16, 16, 16, 12);
    dice.arcTo(16, 16, 16, 64, 12);
    dice.lineWidth = 2;
    dice.stroke();
    dice.fill();
    dice.beginPath();
    dice.fillStyle = "black";
    if (dice_value == 1) {
        dice.arc(40, 40, 5, 0, Math.PI * 2, true);
    }
    else if (dice_value == 2) {
        dice.arc(30, 40, 5, 0, Math.PI * 2, true);
        dice.moveTo(50, 40)
        dice.arc(50, 40, 5, 0, Math.PI * 2, true);
    }
    else if (dice_value == 3) {
        dice.arc(27, 53, 5, 0, Math.PI * 2, true);
        dice.moveTo(40, 40)
        dice.arc(40, 40, 5, 0, Math.PI * 2, true);
        dice.moveTo(53, 27)
        dice.arc(53, 27, 5, 0, Math.PI * 2, true);
    }
    else if (dice_value == 4) {
        dice.arc(30, 30, 5, 0, Math.PI * 2, true);
        dice.moveTo(50, 30);
        dice.arc(50, 30, 5, 0, Math.PI * 2, true);
        dice.moveTo(30, 50);
        dice.arc(30, 50, 5, 0, Math.PI * 2, true);
        dice.moveTo(50, 50);
        dice.arc(50, 50, 5, 0, Math.PI * 2, true);
    }
    else if (dice_value == 5) {
        dice.arc(27, 27, 5, 0, Math.PI * 2, true);
        dice.moveTo(53, 27);
        dice.arc(53, 27, 5, 0, Math.PI * 2, true);
        dice.moveTo(27, 53);
        dice.arc(27, 53, 5, 0, Math.PI * 2, true);
        dice.moveTo(53, 53);
        dice.arc(53, 53, 5, 0, Math.PI * 2, true);
        dice.moveTo(40, 40);
        dice.arc(40, 40, 5, 0, Math.PI * 2, true);
    }
    else if (dice_value == 6) {
        dice.arc(30, 25, 5, 0, Math.PI * 2, true);
        dice.moveTo(50, 25);
        dice.arc(50, 25, 5, 0, Math.PI * 2, true);
        dice.moveTo(30, 55);
        dice.arc(30, 55, 5, 0, Math.PI * 2, true);
        dice.moveTo(50, 55);
        dice.arc(50, 55, 5, 0, Math.PI * 2, true);
        dice.moveTo(30, 40);
        dice.arc(30, 40, 5, 0, Math.PI * 2, true);
        dice.moveTo(50, 40);
        dice.arc(50, 40, 5, 0, Math.PI * 2, true);

    }
    dice.fill();

}

function animateDiceROll() {

    show_dice();

}

function rolled() {

    if (roll && !animating) {

        dice_value = 6 //Math.floor(Math.random() * 6 + 1);
        animateDiceROll();
        roll = false;
        if (player == BLUE) {
            for (var i = 0; i < bcp.length; i++)
                if ((ccoin[0][i] > 0 && ccoin[0][i] + dice_value < 58) || (ccoin[0][i] == 0 && dice_value == 6))
                    return;


            fill_dice(player);
            player = GREEN;
            ccoin = [[...gcp], [...green_coin]];

        }
        else if (player == GREEN) {
            for (var i = 0; i < gcp.length; i++)
                if ((ccoin[0][i] > 0 && ccoin[0][i] + dice_value < 58) || (ccoin[0][i] == 0 && dice_value == 6))
                    return;


            fill_dice(player);
            player = BLUE;
            ccoin = [[...bcp], [...blue_coin]];

        }
        roll = true;
        show_dice();
        count_6 = 0;
    }
}

function checkForKill(coin) {
    var flag = false;
    var coins = [[], [], []];
    if (player == BLUE) {
        for (var i = 0; i < green_coin.length; i++)
            if (coin[0] == green_coin[i][0] && coin[1] == green_coin[i][1]) {
                coins[0].push(i);
                coins[1].push(gcp[i])
                coins[2].push(0);
                green_coin[i] = [...green_home[i]];
                gcp[i] = 0;
                flag = true;
            }
        if (flag)
            animateReMove(GREEN, coins[0], coins[1], coins[2], true);
    }

    else if (player == GREEN) {
        for (var i = 0; i < blue_coin.length; i++)
            if (coin[0] == blue_coin[i][0] && coin[1] == blue_coin[i][1]) {
                coins[0].push(i);
                coins[1].push(bcp[i])
                coins[2].push(0);
                flag = true;
            }
        if (flag)
            animateReMove(BLUE, coins[0], coins[1], coins[2], true);
    }
    return flag;
}

function move(event) {
    if (!roll && !animating) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (player == BLUE) {
            for (var i = 0; i < blue_coin.length; i++) {
                if (x >= ccoin[1][i][0] && x <= ccoin[1][i][0] + 40 && y >= ccoin[1][i][1] - tx / 2 && y <= ccoin[1][i][1] + tx / 2) {
                    const pcp = ccoin[0][i];
                    if (ccoin[0][i] == 0 && dice_value == 6)
                        ccoin[0][i] = 1;
                    else if (ccoin[0][i] > 0)
                        ccoin[0][i] += dice_value;
                    else
                        return;

                    if (ccoin[0][i] < 14)
                        ccoin[1][i] = [...blue_tiles[ccoin[0][i] - 1]];
                    else if (ccoin[0][i] < 27)
                        ccoin[1][i] = [...red_tiles[ccoin[0][i] - 14]];
                    else if (ccoin[0][i] < 40)
                        ccoin[1][i] = [...green_tiles[ccoin[0][i] - 27]];
                    else if (ccoin[0][i] < 52)
                        ccoin[1][i] = [...yellow_tiles[ccoin[0][i] - 40]];
                    else
                        ccoin[1][i] = [...blue_tiles[ccoin[0][i] + 13 - 52]];

                    animateMove(BLUE, i, pcp, ccoin[0][i]);
                    return;
                }
            }
        }

        else if (player == GREEN) {
            for (var i = 0; i < blue_coin.length; i++) {
                if (x >= ccoin[1][i][0] && x <= ccoin[1][i][0] + 40 && y >= ccoin[1][i][1] - tx / 2 && y <= ccoin[1][i][1] + tx / 2) {
                    const pcp = ccoin[0][i];
                    if (ccoin[0][i] == 0 && dice_value == 6)
                        ccoin[0][i] = 1;
                    else if (ccoin[0][i] > 0)
                        ccoin[0][i] += dice_value;
                    else
                        return;

                    if (ccoin[0][i] < 14)
                        ccoin[1][i] = [...green_tiles[ccoin[0][i] - 1]];
                    else if (ccoin[0][i] < 27)
                        ccoin[1][i] = [...yellow_tiles[ccoin[0][i] - 14]];
                    else if (ccoin[0][i] < 40)
                        ccoin[1][i] = [...blue_tiles[ccoin[0][i] - 27]];
                    else if (ccoin[0][i] < 52)
                        ccoin[1][i] = [...red_tiles[ccoin[0][i] - 40]];
                    else
                        ccoin[1][i] = [...green_tiles[ccoin[0][i] + 13 - 52]];

                    animateMove(GREEN, i, pcp, ccoin[0][i]);
                    return;
                }
            }
        }
    }
}

function animateMove(playerToMove, i, start, end) {
    var ncoin, pcoin, x;
    animating = true;
    var step = 0;
    const factor = Math.PI * tx / 40;
    var scale = 0;
    if (playerToMove == BLUE) {
        if (start == 0) {
            ncoin = [...blue_home[i]];
            x = [...ncoin];
        }
        else if (start < 14)
            ncoin = [...blue_tiles[start - 1.]];
        else if (start < 27)
            ncoin = [...red_tiles[start - 14]];
        else if (start < 40)
            ncoin = [...green_tiles[start - 27]];
        else if (start < 52)
            ncoin = [...yellow_tiles[start - 40]];
        else
            ncoin = [...blue_tiles[start + 13 - 52]];

        pcoin = [...ncoin];


        requestAnimationFrame(animateBlue);
    }

    else if (playerToMove == GREEN) {
        if (start == 0) {
            ncoin = [...green_home[i]];
            x = [...ncoin];
        }
        else if (start < 14)
            ncoin = [...green_tiles[start - 1]];
        else if (start < 27)
            ncoin = [...yellow_tiles[start - 14]];
        else if (start < 40)
            ncoin = [...blue_tiles[start - 27]];
        else if (start < 52)
            ncoin = [...red_tiles[start - 40]];
        else
            ncoin = [...green_tiles[start + 13 - 52]];

        pcoin = [...ncoin];


        requestAnimationFrame(animateGreen);


    }

    function animateBlue() {
        scale = Math.sin((step + 1) / 20 * Math.PI);
        if (end == 1 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
            step = 0;
            scale = 0;
            while (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) {
                var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                if (difference > 0)
                    if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor);
                    else
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                else
                    if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor);
                    else
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

                step++;
                if (step > 5)
                    break;
            }

        }
        else if (pcoin[0] != ncoin[0] && pcoin[1] != ncoin[1]) {
            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        }
        else if (pcoin[1] != ncoin[1])
            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        else if (pcoin[0] != ncoin[0])
            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        step++;

        if (pcoin[0] == ncoin[0] && pcoin[1] == ncoin[1] && start < end) {
            start += 1;

            if (start < 14)
                ncoin = [...blue_tiles[start - 1]];
            else if (start < 27)
                ncoin = [...red_tiles[start - 14]];
            else if (start < 40)
                ncoin = [...green_tiles[start - 27]];
            else if (start < 52)
                ncoin = [...yellow_tiles[start - 40]];
            else
                ncoin = [...blue_tiles[start + 13 - 52]];

            step = 0;
        }
        else if (pcoin[0] == ncoin[0] && pcoin[1] == ncoin[1])
            scale = 0;


        //Board Setup
        board();

        //Draw tokens in the bases
        for (var j = 0; j < 4; j++) {
            draw_token(red_coin[j], RED);
            draw_token(green_coin[j], GREEN);
            draw_token(yellow_coin[j], YELLOW);
        }

        draw_token(pcoin, playerToMove, scale);

        if (i == 0) {
            draw_token(window.ccoin[1][1], playerToMove);
            draw_token(window.ccoin[1][2], playerToMove);
            draw_token(window.ccoin[1][3], playerToMove);
        }
        else if (i == 1) {
            draw_token(window.ccoin[1][0], playerToMove);
            draw_token(window.ccoin[1][2], playerToMove);
            draw_token(window.ccoin[1][3], playerToMove);
        }
        else if (i == 2) {
            draw_token(window.ccoin[1][1], playerToMove);
            draw_token(window.ccoin[1][0], playerToMove);
            draw_token(window.ccoin[1][3], playerToMove);
        }
        else {
            draw_token(window.ccoin[1][1], playerToMove);
            draw_token(window.ccoin[1][2], playerToMove);
            draw_token(window.ccoin[1][0], playerToMove);
        }

        if (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])
            requestAnimationFrame(animateBlue);
        else {
            fill_dice(player);
            roll = true;

            if (checkForKill(ccoin[1][i])) {
                count_6 = 0;
                bcp = ccoin[0];
                blue_coin = [...ccoin[1]];
            }
            else if (dice_value == 6 && count_6 < 2)
                count_6 += 1;
            else if (dice_value == 6 && count_6 == 2) {
                count_6 = 0;
                animateReMove(BLUE, [0, 1, 2, 3], ccoin[0], bcp);
            }
            else {
                player = GREEN;
                count_6 = 0;

                bcp = ccoin[0];
                blue_coin = [...ccoin[1]];
                ccoin = [[...gcp], [...green_coin]];

            }
            show_dice();
            animating = false;
        }

    }

    function animateGreen() {
        scale = Math.sin((step + 1) / 20 * Math.PI);
        if (end == 1 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
            step = 0;
            scale = 0;
            while (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) {
                var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                if (difference > 0)
                    if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor);
                    else
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                else
                    if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor);
                    else
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

                step++;
                if (step > 5)
                    break;
            }

        }
        else if (pcoin[0] != ncoin[0] && pcoin[1] != ncoin[1]) {
            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        }
        else if (pcoin[1] != ncoin[1])
            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        else if (pcoin[0] != ncoin[0])
            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        step++;

        if (pcoin[0] == ncoin[0] && pcoin[1] == ncoin[1] && start < end) {
            start += 1;

            if (start < 14)
                ncoin = [...green_tiles[start - 1]];
            else if (start < 27)
                ncoin = [...yellow_tiles[start - 14]];
            else if (start < 40)
                ncoin = [...blue_tiles[start - 27]];
            else if (start < 52)
                ncoin = [...red_tiles[start - 40]];
            else
                ncoin = [...green_tiles[start + 13 - 52]];
            step = 0;
        }
        else if (pcoin[0] == ncoin[0] && pcoin[1] == ncoin[1])
            scale = 0;



        //Board Setup
        board();

        //Draw tokens in the bases
        for (var j = 0; j < 4; j++) {
            draw_token(red_coin[j], RED);
            draw_token(blue_coin[j], BLUE);
            draw_token(yellow_coin[j], YELLOW);
        }

        draw_token(pcoin, playerToMove, scale);

        if (i == 0) {
            draw_token(window.ccoin[1][1], playerToMove);
            draw_token(window.ccoin[1][2], playerToMove);
            draw_token(window.ccoin[1][3], playerToMove);
        }
        else if (i == 1) {
            draw_token(window.ccoin[1][0], playerToMove);
            draw_token(window.ccoin[1][2], playerToMove);
            draw_token(window.ccoin[1][3], playerToMove);
        }
        else if (i == 2) {
            draw_token(window.ccoin[1][1], playerToMove);
            draw_token(window.ccoin[1][0], playerToMove);
            draw_token(window.ccoin[1][3], playerToMove);
        }
        else {
            draw_token(window.ccoin[1][1], playerToMove);
            draw_token(window.ccoin[1][2], playerToMove);
            draw_token(window.ccoin[1][0], playerToMove);
        }

        if (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])
            requestAnimationFrame(animateGreen);
        else {
            roll = true;
            fill_dice(player);

            if (checkForKill(ccoin[1][i])) {
                count_6 = 0;
                gcp = ccoin[0];
                green_coin = [...ccoin[1]];
            }
            else if (dice_value == 6 && count_6 < 2)
                count_6 += 1;
            else if (dice_value == 6 && count_6 == 2) {
                count_6 = 0;
                animateReMove(GREEN, [0, 1, 2, 3], ccoin[0], gcp);
            }
            else {
                player = BLUE;
                count_6 = 0;

                gcp = ccoin[0];
                green_coin = [...ccoin[1]];
                ccoin = [[...bcp], [...blue_coin]];
            }
            show_dice();
            animating = false;
            return;
        }

    }

}

function animateReMove(playerToMove, coins, starts, ends, killed = false) {
    var ncoin, pcoin;
    var k = 0;
    var factor = tx / 5;
    var x;

    if (playerToMove == BLUE)
        animateBlueOuter();
    else if (playerToMove == GREEN)
        animateGreenOuter();

    function animateBlueOuter() {
        const i = coins[k];
        var start = starts[k];
        const end = ends[k];

        if (k < coins.length) {
            if (start == end)
                ncoin = [...blue_home[k]];
            else if (start < 14)
                ncoin = [...blue_tiles[start - 1.]];
            else if (start < 27)
                ncoin = [...red_tiles[start - 14]];
            else if (start < 40)
                ncoin = [...green_tiles[start - 27]];
            else if (start < 52)
                ncoin = [...yellow_tiles[start - 40]];
            else
                ncoin = [...blue_tiles[start + 13 - 52]];

            pcoin = [...ncoin]

            k++;
            requestAnimationFrame(animateBlue);
        }

        function animateBlue() {
            animating = true;
            if (pcoin[0] != ncoin[0] && pcoin[1] != ncoin[1]) {
                pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);
                pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
            }
            else if (pcoin[1] != ncoin[1])
                pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
            else if (pcoin[0] != ncoin[0])
                pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

            if (pcoin[0] == ncoin[0] && pcoin[1] == ncoin[1] && start > end) {
                start -= 1;
                if (start == 0)
                    ncoin = [...blue_home[i]];
                else if (start < 14)
                    ncoin = [...blue_tiles[start - 1]];
                else if (start < 27)
                    ncoin = [...red_tiles[start - 14]];
                else if (start < 40)
                    ncoin = [...green_tiles[start - 27]];
                else if (start < 52)
                    ncoin = [...yellow_tiles[start - 40]];
                else
                    ncoin = [...blue_tiles[start + 13 - 52]]
            }

            //Board Setup
            board();

            //Draw tokens in the bases

            draw_token(pcoin, playerToMove);

            for (var j = 0; j < 4; j++) {
                draw_token(red_coin[j], RED);
                draw_token(green_coin[j], GREEN);
                draw_token(yellow_coin[j], YELLOW);
            }


            if (killed) {
                if (i == 0) {
                    draw_token(blue_coin[1], playerToMove);
                    draw_token(blue_coin[2], playerToMove);
                    draw_token(blue_coin[3], playerToMove);
                }
                else if (i == 1) {
                    draw_token(blue_coin[0], playerToMove);
                    draw_token(blue_coin[2], playerToMove);
                    draw_token(blue_coin[3], playerToMove);
                }
                else if (i == 2) {
                    draw_token(blue_coin[1], playerToMove);
                    draw_token(blue_coin[0], playerToMove);
                    draw_token(blue_coin[3], playerToMove);
                }
                else {
                    draw_token(blue_coin[1], playerToMove);
                    draw_token(blue_coin[2], playerToMove);
                    draw_token(blue_coin[0], playerToMove);
                }
            }
            else {


                if (i == 0) {
                    draw_token(window.ccoin[1][1], playerToMove);
                    draw_token(window.ccoin[1][2], playerToMove);
                    draw_token(window.ccoin[1][3], playerToMove);
                }
                else if (i == 1) {
                    draw_token(window.ccoin[1][0], playerToMove);
                    draw_token(window.ccoin[1][2], playerToMove);
                    draw_token(window.ccoin[1][3], playerToMove);
                }
                else if (i == 2) {
                    draw_token(window.ccoin[1][1], playerToMove);
                    draw_token(window.ccoin[1][0], playerToMove);
                    draw_token(window.ccoin[1][3], playerToMove);
                }
                else {
                    draw_token(window.ccoin[1][1], playerToMove);
                    draw_token(window.ccoin[1][2], playerToMove);
                    draw_token(window.ccoin[1][0], playerToMove);
                }
            }


            if (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])
                requestAnimationFrame(animateBlue);
            else {
                if (killed) {
                    blue_coin[i] = [...blue_home[i]];
                    bcp[i] = 0;
                }
                else {
                    window.ccoin[1][i] = [...ncoin];
                    player = GREEN;
                    ccoin = [[...gcp], [...green_coin]];
                }
                animateBlueOuter();
                animating = false;
            }

        }

    }

    function animateGreenOuter() {
        const i = coins[k];
        var start = starts[k];
        const end = ends[k];
        if (k < coins.length) {


            if (start == end)
                ncoin = [...green_home[k]];
            else if (start < 14)
                ncoin = [...green_tiles[start - 1]];
            else if (start < 27)
                ncoin = [...yellow_tiles[start - 14]];
            else if (start < 40)
                ncoin = [...blue_tiles[start - 27]];
            else if (start < 52)
                ncoin = [...red_tiles[start - 40]];
            else
                ncoin = [...green_tiles[start + 13 - 52]];

            pcoin = [...ncoin]
            k++;
            requestAnimationFrame(animateGreen);
        }

        function animateGreen() {
            animating = true;
            if (start == 0 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
                step = 0;
                while (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) {
                    var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                    if (difference > 0)
                        if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(Math.PI * tx / 40);
                        else
                            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                    else
                        if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(Math.PI * tx / 40);
                        else
                            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

                    step++;
                    if (step > 5)
                        break;
                }

            }
            else if (pcoin[0] != ncoin[0] && pcoin[1] != ncoin[1]) {
                pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * factor;
                pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * factor;
            }
            else if (pcoin[1] != ncoin[1])
                pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * factor;
            else if (pcoin[0] != ncoin[0])
                pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * factor;

            if (pcoin[0] == ncoin[0] && pcoin[1] == ncoin[1] && start > end) {
                start -= 1;

                if (start == 0)
                    ncoin = [...green_home[i]]
                else if (start < 14)
                    ncoin = [...green_tiles[start - 1]];
                else if (start < 27)
                    ncoin = [...yellow_tiles[start - 14]];
                else if (start < 40)
                    ncoin = [...blue_tiles[start - 27]];
                else if (start < 52)
                    ncoin = [...red_tiles[start - 40]];
                else
                    ncoin = [...green_tiles[start + 13 - 52]];

                if (start == 0)
                    x = [...pcoin];
            }

            //Board Setup
            board();

            //Draw tokens in the bases
            for (var j = 0; j < 4; j++) {
                draw_token(red_coin[j], RED);
                draw_token(blue_coin[j], BLUE);
                draw_token(yellow_coin[j], YELLOW);
            }

            draw_token(pcoin, playerToMove);
            if (killed) {
                if (i == 0) {
                    draw_token(green_coin[1], playerToMove);
                    draw_token(green_coin[2], playerToMove);
                    draw_token(green_coin[3], playerToMove);
                }
                else if (i == 1) {
                    draw_token(green_coin[0], playerToMove);
                    draw_token(green_coin[2], playerToMove);
                    draw_token(green_coin[3], playerToMove);
                }
                else if (i == 2) {
                    draw_token(green_coin[1], playerToMove);
                    draw_token(green_coin[0], playerToMove);
                    draw_token(green_coin[3], playerToMove);
                }
                else {
                    draw_token(green_coin[1], playerToMove);
                    draw_token(green_coin[2], playerToMove);
                    draw_token(green_coin[0], playerToMove);
                }
            }
            else {
                if (i == 0) {
                    draw_token(window.ccoin[1][1], playerToMove);
                    draw_token(window.ccoin[1][2], playerToMove);
                    draw_token(window.ccoin[1][3], playerToMove);
                }
                else if (i == 1) {
                    draw_token(window.ccoin[1][0], playerToMove);
                    draw_token(window.ccoin[1][2], playerToMove);
                    draw_token(window.ccoin[1][3], playerToMove);
                }
                else if (i == 2) {
                    draw_token(window.ccoin[1][1], playerToMove);
                    draw_token(window.ccoin[1][0], playerToMove);
                    draw_token(window.ccoin[1][3], playerToMove);
                }
                else {
                    draw_token(window.ccoin[1][1], playerToMove);
                    draw_token(window.ccoin[1][2], playerToMove);
                    draw_token(window.ccoin[1][0], playerToMove);
                }
            }

            if (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])
                requestAnimationFrame(animateGreen);
            else {
                if (killed) {
                    green_coin[i] = [...green_home[i]];
                    gcp[i] = 0;
                }
                else {
                    player = BLUE;
                    window.ccoin[1][i] = [...ncoin];
                    ccoin = [[...bcp], [...blue_coin]];
                }
                animateGreenOuter();
                animating = false;
            }
        }
    }
}







function change() {
}