const can = document.getElementById("board");
const ctx = can.getContext("2d");
const r_dice = document.getElementById("dice1").getContext("2d");
const g_dice = document.getElementById("dice2").getContext("2d");
const b_dice = document.getElementById("dice3").getContext("2d");
const y_dice = document.getElementById("dice4").getContext("2d");
const tx = can.width / 17;
const ty = can.height / 17;
const dx = document.getElementById("dice1").width;
const dy = document.getElementById("dice1").height;
const red_tiles = [[tx * 2, ty * 7], [tx * 3, ty * 7], [tx * 4, ty * 7], [tx * 5, ty * 7], [tx * 6, ty * 7], [tx * 7, ty * 6], [tx * 7, ty * 5], [tx * 7, ty * 4], [tx * 7, ty * 3], [tx * 7, ty * 2], [tx * 7, ty * 1], [tx * 8, ty * 1], [tx * 9, ty * 1], [tx * 2, ty * 8], [tx * 3, ty * 8], [tx * 4, ty * 8], [tx * 5, ty * 8], [tx * 6, ty * 8], [tx * 7, ty * 8]];
const green_tiles = [[tx * 9, ty * 2], [tx * 9, ty * 3], [tx * 9, ty * 4], [tx * 9, ty * 5], [tx * 9, ty * 6], [tx * 10, ty * 7], [tx * 11, ty * 7], [tx * 12, ty * 7], [tx * 13, ty * 7], [tx * 14, ty * 7], [tx * 15, ty * 7], [tx * 15, ty * 8], [tx * 15, ty * 9], [tx * 8, ty * 2], [tx * 8, ty * 3], [tx * 8, ty * 4], [tx * 8, ty * 5], [tx * 8, ty * 6], [tx * 8, ty * 7]];
const yellow_tiles = [[tx * 14, ty * 9], [tx * 13, ty * 9], [tx * 12, ty * 9], [tx * 11, ty * 9], [tx * 10, ty * 9], [tx * 9, ty * 10], [tx * 9, ty * 11], [tx * 9, ty * 12], [tx * 9, ty * 13], [tx * 9, ty * 14], [tx * 9, ty * 15], [tx * 8, ty * 15], [tx * 7, ty * 15], [tx * 14, ty * 8], [tx * 13, ty * 8], [tx * 12, ty * 8], [tx * 11, ty * 8], [tx * 10, ty * 8], [tx * 9, ty * 8]];
const blue_tiles = [[tx * 7, ty * 14], [tx * 7, ty * 13], [tx * 7, ty * 12], [tx * 7, ty * 11], [tx * 7, ty * 10], [tx * 6, ty * 9], [tx * 5, ty * 9], [tx * 4, ty * 9], [tx * 3, ty * 9], [tx * 2, ty * 9], [tx * 1, ty * 9], [tx * 1, ty * 8], [tx * 1, ty * 7], [tx * 8, ty * 14], [tx * 8, ty * 13], [tx * 8, ty * 12], [tx * 8, ty * 11], [tx * 8, ty * 10], [tx * 8, ty * 9]];
const red_home = [[tx * 5 / 2, ty * 5 / 2], [tx * 9 / 2, ty * 5 / 2], [tx * 9 / 2, ty * 9 / 2], [tx * 5 / 2, ty * 9 / 2]];
const green_home = [[tx * 23 / 2, ty * 5 / 2], [tx * 27 / 2, ty * 5 / 2], [tx * 27 / 2, ty * 9 / 2], [tx * 23 / 2, ty * 9 / 2]];
const yellow_home = [[tx * 23 / 2, ty * 23 / 2], [tx * 27 / 2, ty * 23 / 2], [tx * 27 / 2, ty * 27 / 2], [tx * 23 / 2, ty * 27 / 2]];
const blue_home = [[tx * 5 / 2, ty * 23 / 2], [tx * 9 / 2, ty * 23 / 2], [tx * 9 / 2, ty * 27 / 2], [tx * 5 / 2, ty * 27 / 2]];
can.addEventListener("click", function (event) { move(event); });
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


//Initializations
var red_coin = red_home;
var rcp = [0, 0, 0, 0];
var green_coin = green_home;
var gcp = [0, 0, 0, 0];
var yellow_coin = yellow_home;
var ycp = [0, 0, 0, 0];
var blue_coin = blue_home;
var bcp = [0, 0, 0, 0];
var player = BLUE;
var roll = true;
var dice_value = Math.floor(Math.random() * 6 + 1);
var count_6 = 0;

setup();

//Fill dice background
fill_dice(BLUE);
fill_dice(GREEN);
fill_dice(RED);
fill_dice(YELLOW);

//Display Dice
show_dice();





//Animations and Graphics
function setup() {
    //clear Board
    ctx.clearRect(0, 0, can.width, can.height);

    //Board Setup
    board();

    //Draw tokens in the bases
    for (var j = 0; j < 4; j++) {
        draw_token(red_coin[j], RED);
        draw_token(green_coin[j], GREEN);
        draw_token(yellow_coin[j], YELLOW);
        draw_token(blue_coin[j], BLUE);
    }
}

function board() {

    //Path to home row
    ctx.fillStyle = RED;
    ctx.fillRect(tx * 2, ty * 8, tx * 5, ty);
    ctx.fillRect(tx * 2, ty * 7, tx, ty);
    ctx.fillRect(tx * 3, ty * 9, tx, ty);
    star(tx * 3, tx * 9);

    ctx.fillStyle = GREEN;
    ctx.fillRect(tx * 8, ty * 2, tx, ty * 5);
    ctx.fillRect(tx * 9, ty * 2, tx, ty);
    ctx.fillRect(tx * 7, ty * 3, tx, ty);
    star(tx * 7, ty * 3);

    ctx.fillStyle = YELLOW;
    ctx.fillRect(tx * 10, ty * 8, tx * 5, ty);
    ctx.fillRect(tx * 14, ty * 9, tx, ty);
    ctx.fillRect(tx * 13, ty * 7, tx, ty);
    star(tx * 13, ty * 7);

    ctx.fillStyle = BLUE;
    ctx.fillRect(tx * 8, ty * 10, tx, ty * 5);
    ctx.fillRect(tx * 7, ty * 14, tx, ty);
    ctx.fillRect(tx * 9, ty * 13, tx, ty);
    star(tx * 9, ty * 13);


    //Horizontal and vertical lines
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = tx / 20;
    ctx.rect(tx, ty, tx * 15, ty * 15);
    ctx.stroke();
    ctx.closePath();
    for (x = 2 * tx, y = 2 * ty; x < tx * 16, y < ty * 16; x += tx, y += ty) {
        ctx.beginPath();
        ctx.moveTo(x, ty);
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
    ctx.fillRect(tx, ty, tx * 6, ty * 6);
    ctx.strokeRect(tx, ty, tx * 6, ty * 6);
    ctx.clearRect(tx * 2, ty * 2, tx * 4, ty * 4);
    ctx.strokeRect(tx * 2, ty * 2, tx * 4, ty * 4);
    ctx.moveTo(tx * 3, ty * 3);
    ctx.arc(tx * 3, ty * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, ty * 3);
    ctx.arc(tx * 5, ty * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 3, ty * 5)
    ctx.arc(tx * 3, ty * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, ty * 5);
    ctx.arc(tx * 5, ty * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 7, ty * 7);
    ctx.lineTo(tx * 7, ty * 10);
    ctx.lineTo(tx * 17 / 2, ty * 17 / 2);
    ctx.lineTo(tx * 7, ty * 7);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = GREEN;
    ctx.fillRect(tx * 10, ty, tx * 6, ty * 6);
    ctx.strokeRect(tx * 10, ty, tx * 6, ty * 6);
    ctx.clearRect(tx * 11, ty * 2, tx * 4, ty * 4);
    ctx.strokeRect(tx * 11, ty * 2, tx * 4, ty * 4);
    ctx.moveTo(tx * 12, ty * 3);
    ctx.arc(tx * 12, ty * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, ty * 3);
    ctx.arc(tx * 14, ty * 3, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 12, ty * 5)
    ctx.arc(tx * 12, ty * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, ty * 5);
    ctx.arc(tx * 14, ty * 5, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 10, ty * 7);
    ctx.lineTo(tx * 7, ty * 7);
    ctx.lineTo(tx * 17 / 2, ty * 17 / 2);
    ctx.lineTo(tx * 10, ty * 7);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = YELLOW;
    ctx.fillRect(tx * 10, ty * 10, tx * 6, ty * 6);
    ctx.strokeRect(tx * 10, ty * 10, tx * 6, ty * 6);
    ctx.clearRect(tx * 11, ty * 11, tx * 4, ty * 4);
    ctx.strokeRect(tx * 11, ty * 11, tx * 4, ty * 4);
    ctx.moveTo(tx * 12, ty * 12);
    ctx.arc(tx * 12, ty * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, ty * 12);
    ctx.arc(tx * 14, ty * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 12, ty * 14)
    ctx.arc(tx * 12, ty * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 14, ty * 14);
    ctx.arc(tx * 14, ty * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 10, ty * 7);
    ctx.lineTo(tx * 10, ty * 10);
    ctx.lineTo(tx * 17 / 2, ty * 17 / 2);
    ctx.lineTo(tx * 10, ty * 7);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = BLUE;
    ctx.fillRect(tx, ty * 10, tx * 6, ty * 6);
    ctx.strokeRect(tx, ty * 10, tx * 6, ty * 6);
    ctx.clearRect(tx * 2, ty * 11, tx * 4, ty * 4);
    ctx.strokeRect(tx * 2, ty * 11, tx * 4, ty * 4);
    ctx.moveTo(tx * 3, ty * 12);
    ctx.arc(tx * 3, ty * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, ty * 12);
    ctx.arc(tx * 5, ty * 12, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 3, ty * 14)
    ctx.arc(tx * 3, ty * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.moveTo(tx * 5, ty * 14);
    ctx.arc(tx * 5, ty * 14, tx / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(tx * 7, ty * 10);
    ctx.lineTo(tx * 10, ty * 10);
    ctx.lineTo(tx * 17 / 2, ty * 17 / 2);
    ctx.lineTo(tx * 7, ty * 10);
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

function draw_token(coordinates, color) {

    //token base circle
    
    var x = coordinates[0];
    var y = coordinates[1];
    ctx.fillStyle = color;
    ctx.strokeStyle = "brown";
    ctx.beginPath();
    ctx.lineWidth = tx / 10;
    ctx.arc(x + tx / 2, y + ty / 2, tx * 4 / 11, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();

    //token outline and white fill
    ctx.beginPath();
    ctx.strokeStyle = "black";
    var grd = ctx.createLinearGradient(x, y, x, y + ty);
    grd.addColorStop(0.1, "white");
    grd.addColorStop(1, "black");
    ctx.fillStyle = grd;
    ctx.lineWidth = tx / 30;
    ctx.setLineDash([1, 0]);
    ctx.moveTo(x + tx / 2, y + tx * 25 / 40);
    ctx.bezierCurveTo(x + tx * 2, y - tx, x - tx, y - tx, x + tx / 2, y + tx * 25 / 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //token circle
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x + tx / 2, y - tx / 10, tx / 4, 0, Math.PI * 2, true);
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
    // var dice;
    // if (player == RED)
    //     dice = r_dice;
    // else if (player == GREEN)
    //     dice = g_dice;
    // else if (player == YELLOW)
    //     dice = y_dice;
    // else
    //     dice = b_dice;
    // dice.beginPath()
    // dice.fillStyle = "white";
    // dice.moveTo(12, 24);
    // dice.lineTo(16, 50);
    // dice.lineTo(34, 60);
    // dice.lineTo(60, 50);
    // dice.lineTo(60, 18);
    // dice.lineTo(40, 10);
    // dice.lineTo(12, 24);
    // dice.lineTo(34, 32);
    // dice.lineTo(60, 18);
    // dice.moveTo(34, 32);
    // dice.lineTo(34, 60);
    // dice.closePath();
    // dice.fill();
    // dice.stroke();

    show_dice();


}

function animateMove(coin, i, start, end) {
    setup();
}





//Logic
function rolled() {

    if (roll) {

        dice_value = Math.floor(Math.random() * 6 + 1);
        animateDiceROll();
        roll = false;
        if (player == BLUE) {
            show_dice();
            for (var i = 0; i < bcp.length; i++) {
                if (bcp[i] != 0 && bcp[i] + dice_value < 58)
                    return;
            }

            if (dice_value != 6) {
                roll = true;
                fill_dice(player);
                player = GREEN;
                show_dice();
            }
        }
        else if (player == GREEN) {
            for (var i = 0; i < gcp.length; i++) {
                if (gcp[i] != 0 && gcp[i] + dice_value < 58)
                    return;

            }
            if (dice_value != 6) {
                roll = true;
                fill_dice(player);
                player = BLUE;
                show_dice();
            }
        }
    }
}

function checkForKill(i) {
    if (player == BLUE) {
        if (blue_coin[i] == green_coin[0]) {
            animateMove(GREEN, 0, green_coin[0], green_home[0]);
            green_coin[0] = green_home[0];
        }
        else if (blue_coin[i] == green_coin[1]) {
            animateMove(GREEN, 1, green_coin[1], green_home[1]);
            green_coin[1] = green_home[1];
        }
        else if (blue_coin[i] == green_coin[2]) {
            animateMove(GREEN, 2, green_coin[2], green_home[2]);
            green_coin[2] = green_home[2];
        }
        else if (blue_coin[i] == green_coin[3]) {
            animateMove(GREEN, 3, green_coin[3], green_home[3]);
            green_coin[3] = green_home[3];
        }
    }

    else if (player == GREEN) {
        if (green_coin[i] == blue_coin[0]) {
            animateMove(BLUE, 0, blue_coin[0], blue_home[0]);
            blue_coin[0] = blue_home[0];
        }
        else if (green_coin[i] == blue_coin[1]) {
            animateMove(BLUE, 1, blue_coin[1], blue_home[1]);
            blue_coin[1] = blue_home[1];
        }
        else if (green_coin[i] == blue_coin[2]) {
            animateMove(BLUE, 2, blue_coin[2], blue_home[2]);
            blue_coin[2] = blue_home[2];
        }
        else if (green_coin[i] == blue_coin[3]) {
            animateMove(BLUE, 3, blue_coin[3], blue_home[3]);
            blue_coin[3] = blue_home[3];
        }
    }
}

function move(event) {

    if (!roll) {
        var x = event.offsetLeft;
        var y = event.offsetTop;
        if (player == BLUE) {

            for (var i = 0; i < blue_coin.length; i++) {
                if (x >= blue_coin[i][0] && x <= blue_coin[i][0] + 40 && y >= blue_coin[i][1] - ty / 2 && y <= blue_coin[i][1] + ty / 2) {
                    if (bcp[i] == 0 && dice_value == 6)
                        bcp[i] = 1;
                    else if (bcp[i] != 0 && bcp[i] + dice_value < 59)
                        bcp[i] += dice_value;

                    if (bcp[i] < 14)
                        blue_coin[i] = blue_tiles[bcp[i] - 1];
                    else if (bcp[i] < 27)
                        blue_coin[i] = red_tiles[bcp[i] - 14];
                    else if (bcp[i] < 40)
                        blue_coin[i] = green_tiles[bcp[i] - 27];
                    else if (bcp[i] < 52)
                        blue_coin[i] = yellow_tiles[bcp[i] - 40];
                    else
                        blue_coin[i] = blue_tiles[bcp[i] + 13 - 52];

                    animateMove(player, coin = i, begining = bcp[i] - dice_value, end = bcp[i]);

                    if (checkForKill(i))
                        count_6 = 0;
                    else if (dice_value == 6 && count_6 < 3)
                        count_6 += 1;
                    else {
                        fill_dice(player);

                        player = GREEN;
                        show_dice();
                        count_6 = 0;
                    }
                    roll = true;
                    return;
                }
            }
        }

        else if (player == GREEN) {
            for (var i = 0; i < green_coin.length; i++) {
                if (x >= green_coin[i][0] && x <= green_coin[i][0] + 40 && y >= green_coin[i][1] - ty / 2 && y <= green_coin[i][1] + ty / 2) {
                    if (gcp[i] == 0 && dice_value == 6)
                        gcp[i] = 1;
                    else if (gcp[i] != 0 && gcp[i] + dice_value < 59)
                        gcp[i] += dice_value;

                    var start = green_coin[i];
                    if (gcp[i] < 14)
                        green_coin[i] = green_tiles[gcp[i] - 1];
                    else if (gcp[i] < 27)
                        green_coin[i] = yellow_tiles[gcp[i] - 14];
                    else if (gcp[i] < 40)
                        green_coin[i] = blue_tiles[gcp[i] - 27];
                    else if (gcp[i] < 52)
                        green_coin[i] = red_tiles[gcp[i] - 40];
                    else
                        green_coin[i] = green_tiles[gcp[i] + 13 - 52];

                    animateMove(player, i, start, green_coin[i]);
                    if (checkForKill(i))
                        count_6 = 0;
                    else if (dice_value == 6 && count_6 < 3)
                        count_6 += 1;
                    else {
                        fill_dice();
                        player = BLUE;
                        show_dice();
                        count_6 = 0;
                    }
                    roll = true;
                    return;
                }
            }
        }
    }


}