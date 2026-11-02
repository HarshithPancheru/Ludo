class Dice {
    //initialization
    constructor() {
        this.size = document.getElementById("dice1").height;

        //Original coordinates position of the dice 
        this.diceXYZ = [...this.DICEXYZ];
        this.pointsXYZ = [...this.POINTSXYZ]
        this.origin = [...this.ORIGIN];

        this.nearPoint = 1000;

        //x y z angles
        this.angleX = 0;
        this.angleY = 0;
        this.angleZ = 0;

        //animation speed
        this.x_speed = 0.01;
        this.y_speed = 0.01;
        this.z_speed = 0.01;

        //default colors
        this.dice_color = 'rgba(150,0,0,0.8)';
        this.points_color = 'white';
        this.axes = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

    }

    reset() {
        this.diceXYZ = [...this.DICEXYZ];
        this.pointsXYZ = [...this.POINTSXYZ]
        this.origin = [...this.ORIGIN];
        this.angleX = 0;
        this.angleY = 0;
        this.angleZ = 0;
        this.x_speed = 0.01;
        this.y_speed = 0.01;
        this.z_speed = 0.01;
        this.axes = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }

    //original dice coordinates
    get DICEXYZ() {
        //Original position of the points

        // a = half length of the sides of the dice
        var a = this.size / 3;
        this.a = a;
        return [
            [-a, a, -a], [a, a, -a], [a, -a, -a], [-a, -a, -a],
            [-a, a, a], [a, a, a], [a, -a, a], [-a, -a, a]
        ];
    }

    //grouping coordinates of the dice as faces 
    get diceFace() {

        let map = [[], [], [], [], [], [], [], []];
        let points = [...this.pointsXYZ];

        //projecting 3d diagram into 2d
        for (var i = 0; i < 8; i++) {
            //Faces
            map[i][0] = this.diceXYZ[i][0] * this.nearPoint / (this.origin[2] + this.diceXYZ[i][2] + this.nearPoint); // x=x/(z*tan(a/2)
            map[i][1] = this.diceXYZ[i][1] * this.nearPoint / (this.origin[2] + this.diceXYZ[i][2] + this.nearPoint); // y=y/(z*tan(a/2)
        }
        points = points.map(function (face) {
            let dots = [];
            for (let i = 0; i < face.length; i++) {
                let points = [];
                for (let j = 0; j < face[i].length; j++) {
                    points.push([face[i][j][0] * dice.nearPoint / (dice.origin[2] + face[i][j][2] + dice.nearPoint), face[i][j][1] * dice.nearPoint / (dice.origin[2] + face[i][j][2] + dice.nearPoint)]);
                }
                dots.push(points);
            }
            return dots;
        })


        //changing the coordinate system (origin) of the dice to screen's coordinate system
        for (var i = 0; i < 8; i++)
            map[i] = [this.origin[0] + map[i][0], this.origin[1] + map[i][1]];

        points = points.map(function (face) {
            let dots = [];
            let origin = dice.ORIGIN;
            for (let i = 0; i < face.length; i++) {
                let points = [];
                for (let j = 0; j < face[i].length; j++) {
                    points.push([face[i][j][0] + origin[0], face[i][j][1] + origin[1], face[i][j][2]]);
                }
                dots.push(points);
            }
            return dots;
        })

        let face3d = [
            [this.diceXYZ[0], this.diceXYZ[1], this.diceXYZ[2], this.diceXYZ[3]],
            [this.diceXYZ[4], this.diceXYZ[5], this.diceXYZ[6], this.diceXYZ[7]],
            [this.diceXYZ[0], this.diceXYZ[1], this.diceXYZ[5], this.diceXYZ[4]],
            [this.diceXYZ[3], this.diceXYZ[2], this.diceXYZ[6], this.diceXYZ[7]],
            [this.diceXYZ[1], this.diceXYZ[2], this.diceXYZ[6], this.diceXYZ[5]],
            [this.diceXYZ[0], this.diceXYZ[3], this.diceXYZ[7], this.diceXYZ[4]]
        ]

        let max_list = [];
        //finding the face which is before the screen 
        for (let i = 0; i < 6; i++) {
            var max = face3d[i][0][2];
            for (var j = 1; j < 4; j++) {
                if (max < face3d[i][j][2])
                    max = face3d[i][j][2];
            }
            max_list.push(max);
        }

        let face = [
            [map[0], map[1], map[2], map[3]],
            [map[4], map[5], map[6], map[7]],
            [map[0], map[1], map[5], map[4]],
            [map[3], map[2], map[6], map[7]],
            [map[1], map[2], map[6], map[5]],
            [map[0], map[3], map[7], map[4]]
        ]

        //sorting faces with respect to z coordinate
        for (let i = 0; i < 6; i++) {
            let key = max_list[i];
            let keyFace = [...face[i]];
            let keyPoint = [...points[i]];
            let j = i - 1;
            while (j > -1 && key > max_list[j]) {
                max_list[j + 1] = max_list[j];
                face[j + 1] = face[j];
                points[j + 1] = points[j];
                j--;
            }
            max_list[j + 1] = key;
            face[j + 1] = [...keyFace];
            points[j + 1] = [...keyPoint];
        }
        return [face, points];
    }

    //origins of dice coordinate in terms of screen's origins
    get ORIGIN() {
        return [this.size / 2, this.size / 2, this.a];
    }

    //default Dots position in 3D
    get POINTSXYZ() {
        let a = this.size / 3;
        let points = [
            [[0, 0, -a]],
            [[0, 0, a], [-a / 2.5, -a / 2.5, a], [a / 2.5, a / 2.5, a]],
            [[-a / 2.5, a, -a / 2.5], [a / 2.5, a, a / 2.5]],
            [[-a / 2.5, -a, -a / 2.5], [a / 2.5, -a, -a / 2.5], [-a / 2.5, -a, a / 2.5], [a / 2.5, -a, a / 2.5]],
            [[a, -a / 2.5, -a / 2], [a, a / 2.5, -a / 2], [a, -a / 2.5, a / 2], [a, a / 2.5, a / 2], [a, -a / 2.5, 0], [a, a / 2.5, 0]],
            [[-a, 0, 0], [-a, -a / 2, -a / 2], [-a, a / 2, -a / 2], [-a, -a / 2, a / 2], [-a, a / 2, a / 2]]
        ];

        //bezierPoints = [[p1,p2,c1,c2,c3,c4],...]
        //p1 -> start point
        //p2 -> end point
        //c1 to c4 -> control points 1 to 4
        var bezierPoints = [[], [], [], [], [], []];
        for (let i = 0; i < points.length; i++)
            for (let j = 0; j < points[i].length; j++) {
                var cx = points[i][j][0];
                var cy = points[i][j][1];
                var cz = points[i][j][2];
                a = this.a / 5;
                if (cz == this.a || cz == -this.a)
                    bezierPoints[i][j] = [[cx - a, cy, cz], [cx + a, cy, cz], [cx - a, cy - 1.33 * a, cz], [cx + a, cy - 1.33 * a, cz], [cx - a, cy + 1.33 * a, cz], [cx + a, cy + 1.33 * a, cz]];
                else if (cy == this.a || cy == -this.a)
                    bezierPoints[i][j] = [[cx - a, cy, cz], [cx + a, cy, cz], [cx - a, cy, cz + 1.33 * a], [cx + a, cy, cz + 1.33 * a], [cx - a, cy, cz - 1.33 * a], [cx + a, cy, cz - 1.33 * a]];
                else
                    bezierPoints[i][j] = [[cx, cy - a, cz], [cx, cy + a, cz], [cx, cy - a, cz + 1.33 * a], [cx, cy + a, cz + 1.33 * a], [cx, cy - a, cz - 1.33 * a], [cx, cy + a, cz - 1.33 * a]];


            }

        return bezierPoints;
    }

    //rotating dice coordinates
    rotate(angleX = 0, angleY = 0, angleZ = 0) {
        const a = this.a;
        //angleX -> rotation along X-axis
        //angleY -> rotation along Y-axis
        //angleZ -> rotation along Z-axis
        //angles should be in radians


        this.angleX = angleX//(this.angleX + angleX) % (2 * Math.PI);
        this.angleY = angleY//(this.angleY + angleY) % (2 * Math.PI);
        this.angleZ = angleZ//(this.angleZ + angleZ) % (2 * Math.PI); 



        // xbox.innerHTML = Math.round(this.angleX*180/Math.PI);
        // ybox.innerHTML = Math.round(this.angleY*180/Math.PI);
        // zbox.innerHTML = Math.round(this.angleZ*180/Math.PI);



        let pointsXYZ = this.POINTSXYZ;
        let diceXYZ = this.DICEXYZ;

        // let pointsXYZ = this.pointsXYZ;
        // let diceXYZ = this.diceXYZ;

        const cosX = Math.cos(this.angleX);
        const sinX = Math.sin(this.angleX);
        const cosY = Math.cos(this.angleY);
        const sinY = Math.sin(this.angleY);
        const cosZ = Math.cos(this.angleZ);
        const sinZ = Math.sin(this.angleZ);

        //rotation matrices
        const onX = [[1, 0, 0], [0, cosX, -sinX], [0, sinX, cosX]];
        const onY = [[cosY, 0, sinY], [0, 1, 0], [-sinY, 0, cosY]];
        const onZ = [[cosZ, -sinZ, 0], [sinZ, cosZ, 0], [0, 0, 1]];


        //matrix multiplication of each rotation matrices  
        //Rotational_Matrix -> onZ*onY*onX
        let yz = [[], [], []];
        let xyz = [[], [], []];
        let axes = [[], [], []];
        let new_dice = [[], [], [], [], [], [], [], []];
        let new_points = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum += onZ[i][k] * onY[k][j];
                }
                yz[i][j] = sum;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum += yz[i][k] * onX[k][j];
                }
                xyz[i][j] = sum;
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum += xyz[i][k] * this.axes[k][j];
                }
                axes[i][j] = sum;
            }
        }

        this.axes = [...axes];
        xyz = axes;

        //rotating dice vertices
        for (let i = 0; i < 8; i++) {
            //faces
            for (let j = 0; j < 3; j++) {
                //row
                let sum = 0;
                for (let k = 0; k < 3; k++)
                    //column
                    sum += xyz[j][k] * diceXYZ[i][k];
                new_dice[i][j] = sum;
            }
        }
        this.diceXYZ = [...new_dice];

        //rotating dots
        for (let i = 0; i < 6; i++) {
            //each faces
            let face = [];
            for (let j = 0; j < pointsXYZ[i].length; j++) {
                //each dots
                let dot = [];
                for (let k = 0; k < 6; k++) {
                    //points
                    let point = [];
                    for (let l = 0; l < 3; l++) {
                        let sum = 0;
                        for (let m = 0; m < 3; m++)
                            sum += xyz[l][m] * pointsXYZ[i][j][k][m];
                        point.push(sum);
                    }
                    dot.push(point);
                }
                face.push(dot);
            }
            new_points.push(face);
        }
        this.pointsXYZ = [...new_points];
    }

    get context() {
        if (player == RED)
            return document.getElementById("dice1").getContext("2d");
        else if (player == GREEN)
            return document.getElementById("dice2").getContext("2d");
        else if (player == BLUE)
            return document.getElementById("dice3").getContext("2d");
        else
            return document.getElementById("dice4").getContext("2d");
    }

    //drawing dice and it's dots
    drawDice() {
        const ctx = this.context;
        ctx.clearRect(0, 0, this.size, this.size);
        const face = this.diceFace[0];
        let points = this.diceFace[1];
        ctx.lineWidth = 1;


        //drawing dice
        for (var i = 0; i < face.length; i++) {
            ctx.fillStyle = this.dice_color;
            ctx.strokeStyle = this.dice_color;
            ctx.beginPath();
            ctx.moveTo(face[i][3][0], face[i][3][1]);
            for (var j = 0; j < face[i].length; j++)
                ctx.lineTo(face[i][j][0], face[i][j][1]);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            //drawing dots
            ctx.fillStyle = this.points_color;
            ctx.strokeStyle = this.points_color;
            for (let j = 0; j < points[i].length; j++) {
                var a = this.a / 5;
                ctx.beginPath();
                ctx.moveTo(points[i][j][0][0], points[i][j][0][1]);
                ctx.bezierCurveTo(points[i][j][2][0], points[i][j][2][1], points[i][j][3][0], points[i][j][3][1], points[i][j][1][0], points[i][j][1][1]);
                ctx.moveTo(points[i][j][0][0], points[i][j][0][1]);
                ctx.bezierCurveTo(points[i][j][4][0], points[i][j][4][1], points[i][j][5][0], points[i][j][5][1], points[i][j][1][0], points[i][j][1][1]);
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    //animating the rotation
    animate(time, duration = 2000) {
        previousTime = time;
        function rotateAndAnimate(time) {
            let timePassed = time - previousTime;
            dice.rotate(-1 / 7, 1 / 7, 1 / 7);
            dice.drawDice();
            if (timePassed < duration)
                requestAnimationFrame(rotateAndAnimate);
            else {
                dice.reset();
                if (dice_value == 2) {
                    dice.rotate(Math.PI * 3 / 2);
                }
                else if (dice_value == 3) {
                    dice.rotate(Math.PI);
                }
                else if (dice_value == 4) {
                    dice.rotate(Math.PI / 2);
                }
                else if (dice_value == 5) {
                    dice.rotate(0, Math.PI * 3 / 2);
                }
                else if (dice_value == 6) {
                    dice.rotate(Math.PI * 3 / 2, Math.PI / 2, Math.PI / 2);
                }
                dice.drawDice();

                //rolling stopped, update states of the game
                rolled();
            }

        }
        requestAnimationFrame(rotateAndAnimate);
    }
}

//getting canvas objects
const can = document.getElementById("board");
const ctx = can.getContext("2d");
const r_dice = document.getElementById("dice1").getContext("2d");
const g_dice = document.getElementById("dice2").getContext("2d");
const b_dice = document.getElementById("dice3").getContext("2d");
const y_dice = document.getElementById("dice4").getContext("2d");

//calculate height and width of each cell
const tx = Math.floor(can.width / 17);
const dx = document.getElementById("dice1").width;
const dy = document.getElementById("dice1").height;

/* Defining position of the cells in canvas
 *
 * red_tiles    -> cells near red coin's home
 * green_tiles  -> cells near green coin's home
 * yellow_tiles -> cells near yellow coin's home
 * blue_tiles   -> cells near blue coin's home
 * 
 * red_home     -> starting cells for red coins
 * green_home   -> starting cells for green coins
 * yellow_home  -> starting cells for yellow coins
 * blue_home    -> starting cells for blue coins
 * 
 * safeHouse    -> cells where coins can not be killed
*/
const red_tiles = [[tx * 2, tx * 7], [tx * 3, tx * 7], [tx * 4, tx * 7], [tx * 5, tx * 7], [tx * 6, tx * 7], [tx * 7, tx * 6], [tx * 7, tx * 5], [tx * 7, tx * 4], [tx * 7, tx * 3], [tx * 7, tx * 2], [tx * 7, tx * 1], [tx * 8, tx * 1], [tx * 9, tx * 1], [tx * 2, tx * 8], [tx * 3, tx * 8], [tx * 4, tx * 8], [tx * 5, tx * 8], [tx * 6, tx * 8], [tx * 7, tx * 8]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const green_tiles = [[tx * 9, tx * 2], [tx * 9, tx * 3], [tx * 9, tx * 4], [tx * 9, tx * 5], [tx * 9, tx * 6], [tx * 10, tx * 7], [tx * 11, tx * 7], [tx * 12, tx * 7], [tx * 13, tx * 7], [tx * 14, tx * 7], [tx * 15, tx * 7], [tx * 15, tx * 8], [tx * 15, tx * 9], [tx * 8, tx * 2], [tx * 8, tx * 3], [tx * 8, tx * 4], [tx * 8, tx * 5], [tx * 8, tx * 6], [tx * 8, tx * 7]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const yellow_tiles = [[tx * 14, tx * 9], [tx * 13, tx * 9], [tx * 12, tx * 9], [tx * 11, tx * 9], [tx * 10, tx * 9], [tx * 9, tx * 10], [tx * 9, tx * 11], [tx * 9, tx * 12], [tx * 9, tx * 13], [tx * 9, tx * 14], [tx * 9, tx * 15], [tx * 8, tx * 15], [tx * 7, tx * 15], [tx * 14, tx * 8], [tx * 13, tx * 8], [tx * 12, tx * 8], [tx * 11, tx * 8], [tx * 10, tx * 8], [tx * 9, tx * 8]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const blue_tiles = [[tx * 7, tx * 14], [tx * 7, tx * 13], [tx * 7, tx * 12], [tx * 7, tx * 11], [tx * 7, tx * 10], [tx * 6, tx * 9], [tx * 5, tx * 9], [tx * 4, tx * 9], [tx * 3, tx * 9], [tx * 2, tx * 9], [tx * 1, tx * 9], [tx * 1, tx * 8], [tx * 1, tx * 7], [tx * 8, tx * 14], [tx * 8, tx * 13], [tx * 8, tx * 12], [tx * 8, tx * 11], [tx * 8, tx * 10], [tx * 8, tx * 9]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });

const red_home = [[tx * 5 / 2, tx * 5 / 2], [tx * 9 / 2, tx * 5 / 2], [tx * 9 / 2, tx * 9 / 2], [tx * 5 / 2, tx * 9 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const green_home = [[tx * 23 / 2, tx * 5 / 2], [tx * 27 / 2, tx * 5 / 2], [tx * 27 / 2, tx * 9 / 2], [tx * 23 / 2, tx * 9 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const yellow_home = [[tx * 23 / 2, tx * 23 / 2], [tx * 27 / 2, tx * 23 / 2], [tx * 27 / 2, tx * 27 / 2], [tx * 23 / 2, tx * 27 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });
const blue_home = [[tx * 5 / 2, tx * 23 / 2], [tx * 9 / 2, tx * 23 / 2], [tx * 9 / 2, tx * 27 / 2], [tx * 5 / 2, tx * 27 / 2]].map(function (x) { return [Math.floor(x[0]), Math.floor(x[1])]; });

const safeHouse = [red_tiles[0], red_tiles[8], green_tiles[0], green_tiles[8], yellow_tiles[0], yellow_tiles[8], blue_tiles[0], blue_tiles[8]];



const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const YELLOW = "yellow";

//Click event listners for board and diece
can.addEventListener("click", (event) => move(event));
document.getElementById("dice1").addEventListener("click", () => {
    if (player == RED) {
        dice_value = Math.floor(Math.random() * 6 + 1);
        animateDiceROll(dice_value);
    }
});
document.getElementById("dice2").addEventListener("click", () => {
    if (player == GREEN) {
        dice_value = 1//Math.floor(Math.random() * 6 + 1);
        animateDiceROll(dice_value);
    }
});
document.getElementById("dice3").addEventListener("click", () => {
    if (player == BLUE) {
        dice_value = Math.floor(Math.random() * 6 + 1);
        animateDiceROll(dice_value);
    }
});
document.getElementById("dice4").addEventListener("click", () => {
    if (player == YELLOW) {
        dice_value = Math.floor(Math.random() * 6 + 1);
        animateDiceROll(dice_value);
    }
});


const dice = new Dice();

/* Initializing 
 * red_coin, green_coin, yellow_coin, blue_coin -> arrays containing position of each coins in the board (in pixels)
 * rcp, gcp, bcp, ycp                           -> arrays containing position of each coins in the board (in number of steps moved from its initial position)
 * 
*/
let red_coin = [...red_home].map(function (x) { x.push(1); return x });
let rcp = [0, 0, 0, 0];
let green_coin = [...green_home].map(function (x) { x.push(1); return x });
let gcp = [0, 0, 0, 0];
let yellow_coin = [...yellow_home].map(function (x) { x.push(1); return x });
let ycp = [0, 0, 0, 0];
let blue_coin = [...blue_home].map(function (x) { x.push(1); return x });
let bcp = [0, 0, 0, 0];
let dice_value = Math.floor(Math.random() * 6 + 1);
let roll = true; //specifies whether dice can be rolled
let count_6 = 0; //number of times '6' occured contineously


//Modified
let player = BLUE//GREEN //BLUE;
// bcp[0] = 9; //<-to be removed
// blue_coin[0] = [105, 315, 1]; //<-to be removed
// gcp[0] = 34; //<-to be removed
// green_coin[0] = [140, 315, 1]; //<-to be removed
var ccoin = [[...bcp], [...blue_coin]];//[[...gcp], [...green_coin]]//[[...bcp], [...blue_coin]]; //Changed Coins (It contains the list of coins whose positions are changed in the session and used to undo the changes)


let animating = false;
let previousTime = 0; //time variable for dice animation purpose


let safeTokens = [[], [], [], [], [], [], [], []];


dice.rotate();
setup();

function drawbc(can) {
    const min_pad = can.width * 3 / 40;
    const max_pad = can.width * (1 - 3 / 40);
    const r = can.width * 3 / 40;
    const ctx = can.getContext('2d');
    ctx.fillStyle = '#7070ff';

    ctx.beginPath();
    ctx.moveTo(max_pad, min_pad);
    ctx.arcTo(min_pad, min_pad, min_pad, max_pad, r);
    ctx.arcTo(min_pad, max_pad, max_pad, max_pad, r);
    ctx.arcTo(max_pad, max_pad, max_pad, min_pad, r);
    ctx.arcTo(max_pad, min_pad, min_pad, min_pad, r);
    ctx.closePath();
    ctx.fill();
}


//Animations and Graphics
function setup() {
    //Board Setup
    drawBoard();

    //Draw tokens in the bases
    for (var j = 0; j < 4; j++) {
        draw_token(red_coin[j], RED);
        draw_token(green_coin[j], GREEN);
        draw_token(yellow_coin[j], YELLOW);
        draw_token(blue_coin[j], BLUE);
    }

    //Fill dice background
    drawbc(document.getElementById("diceBack1"));
    drawbc(document.getElementById("diceBack2"));
    drawbc(document.getElementById("diceBack3"));
    drawbc(document.getElementById("diceBack4"));

    //Display Dice
    dice.drawDice();
}

function drawBoard() {
    let x, y;

    //Clear the canvas 
    ctx.clearRect(0, 0, can.width, can.height);

    //Colouring cells from home to finish
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


    //Home rectangles and circles
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

function draw_token(coordinates, color, scale) {
    //token base circle


    if (scale == undefined)
        scale = coordinates[2];
    scale = 1 + (scale - 1) * 0.3;
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
    try {
        var grd = ctx.createLinearGradient(x, y, x, y + tx);
    }
    catch (Exception) {
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

function animateDiceROll(dice_value) {
    if (roll && !animating)
        requestAnimationFrame(dice.animate);
}

function showDice() {
    const size = document.getElementById("dice1").width;
    document.getElementById("dice1").getContext("2d").clearRect(0, 0, size, size);
    document.getElementById("dice2").getContext("2d").clearRect(0, 0, size, size);
    document.getElementById("dice3").getContext("2d").clearRect(0, 0, size, size);
    document.getElementById("dice4").getContext("2d").clearRect(0, 0, size, size);
    dice.drawDice();
}

//prints 3 color tokens
function sortAndPrintRemaining(coin1, coin2, coin3, color1, color2, color3) {
    let coins = [[...coin1], [...coin2], [...coin3]];

    //Bubble sorting
    for (let l = 0; l < 3; l++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 3 - j; k++) {
                if (coins[l][k][1] > coins[l][k + 1][1]) {
                    let temp = [...coins[l][k + 1]];
                    coins[l][k + 1] = coins[l][k];
                    coins[l][k] = temp;
                }
            }
        }
    }


    //used as indices
    let a, b, c;
    a = b = c = 0;


    //draw coins in the ascending order of Y coordinate
    //Don't try to understand following code. Trust me it works!!
    while (a < 4 || b < 4 || c < 4) {
        if (a < 4 && b < 4 && c < 4) {
            if (coins[0][a][1] < coins[1][b][1]) {
                if (coins[0][a][1] < coins[2][c][1]) {
                    draw_token(coins[0][a], color1);
                    a++;
                }
                else if (c < 4) {
                    draw_token(coins[2][c], color3);
                    c++;
                }
            }
            else {
                if (coins[1][b][1] < coins[2][c][1]) {
                    draw_token(coins[1][b], color2);
                    b++;
                }
                else {
                    draw_token(coins[2][c], color3);
                    c++;
                }
            }
        }

        else if (a < 4 && b < 4) {
            if (coins[0][a][1] < coins[1][b][1]) {
                draw_token(coins[0][a], color1);
                a++;
            }
            else {
                draw_token(coins[1][b], color2);
                b++;
            }
        }

        else if (a < 4 && c < 4) {
            if (coins[0][a][1] < coins[2][c][1]) {
                draw_token(coins[0][a], color1);
                a++;
            }
            else {
                draw_token(coins[2][c], color3);
                c++;
            }
        }

        else if (b < 4 && c < 4) {
            if (coins[1][b][1] < coins[2][c][1]) {
                draw_token(coins[1][b], color2);
                b++;
            }
            else {
                draw_token(coins[2][c], color3);
                c++;
            }
        }

        else if (a < 4) {
            while (a < 4) {
                draw_token(coins[0][a], color1);
                a++;
            }
        }

        else if (b < 4) {
            while (b < 4) {
                draw_token(coins[1][b], color2);
                b++;
            }
        }

        else {
            while (c < 4) {
                draw_token(coins[2][c], color3);
                c++;
            }
        }

    }
}

//prints currently moving coin
function sortAndPrint(coin1, coin2, coin3, pcoin, playerToMove, scale) {
    let coins = [[...coin1], [...coin2], [...coin3]];
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 2 - j; k++) {
            if (coins[k][1] > coins[k + 1][1]) {
                let temp = [...coins[k + 1]];
                coins[k + 1] = coins[k];
                coins[k] = temp;
            }
        }
    }

    let flag = false;
    for (let i = 0; i < 3; i++) {
        if (pcoin[1] < coins[i][1]) {
            flag = true;
            draw_token(pcoin, playerToMove, scale);
            while (i < 3) {
                draw_token(coins[i], playerToMove);
                i++;
            }
        }
        else
            draw_token(coins[i], playerToMove);
    }

    if (!flag)
        draw_token(pcoin, playerToMove, scale);

}

function rolled() {
    roll = false;
    if (player == BLUE) {
        for (var i = 0; i < bcp.length; i++)
            if ((ccoin[0][i] > 0 && ccoin[0][i] + dice_value < 58) || (ccoin[0][i] == 0 && dice_value == 6))
                return;

        player = GREEN;
        ccoin = [[...gcp], [...green_coin]];

    }
    else if (player == GREEN) {
        for (var i = 0; i < gcp.length; i++)
            if ((ccoin[0][i] > 0 && ccoin[0][i] + dice_value < 58) || (ccoin[0][i] == 0 && dice_value == 6))
                return;


        player = BLUE;
        ccoin = [[...bcp], [...blue_coin]];

    }
    roll = true;
    setTimeout(showDice,1000);
    count_6 = 0;
}

function checkForSafeHouseTokens(coin, n) {
    let tempList = [];
    let flag = false;
    let i;
    for (i = 0; i < safeHouse.length; i++) {
        if (coin[0] == safeHouse[i][0] && coin[1] == safeHouse[i][1]) {
            safeTokens[i].push((player == BLUE) ? blue_coin[n] : green_coin[n]);
            flag = true;
            break;
        }
    }

    if (flag) {
        let count = safeTokens[i].length + 1;
        for (let j = 0; j < safeTokens[i].length; j++) {
            safeTokens[i][j][2] = 1 / count;
            if (i % 4 > 0 && i % 4 < 3) {
                safeTokens[i][j][0] = safeHouse[i][0] + tx / j;
            }
        }
    }
    return flag;
}

function checkForKill(coin) {
    let flag = false;
    let coins = [[], [], []];

    let ccoin = player == BLUE ? blue_coin : green_coin;
    let counter = 1;
    for (let i = 0; i < ccoin.length; i++) {
        if (coin[0] == ccoin[i][0] && coin[1] == ccoin[i][1])
            counter++;
    }
    if (counter > 1) {
        drawHomies(counter, coin, player);
        return flag;
    }





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
                blue_coin[i] = [...blue_home[i]];
                bcp[i] = 0;
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
                    const pcp = ccoin[0][i]; //pcp -> selected coin's previous position
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
    var scale = 1;
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
        scale = 2 * Math.sin((step + 1) / 20 * Math.PI);
        step++;

        //from home cell to starting point
        if (end == 1 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
            step = 0;
            scale = 1;
            while ((pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) && step < 5) {
                var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                if (difference > 0)
                    if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor / 2);
                    else
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                else
                    if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor / 2);
                    else
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

                step++;
            }
        }

        //diagonal motion
        else if (pcoin[0] != ncoin[0] && pcoin[1] != ncoin[1]) {
            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        }

        //horizontal motion
        else if (pcoin[1] != ncoin[1])
            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);
        
        //vertical motion
        else if (pcoin[0] != ncoin[0])
            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor * scale + 1);

        //update ncoin to next position
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
            scale = 1;


        //Board Setup
        drawBoard();

        sortAndPrintRemaining(red_coin, green_coin, yellow_coin, RED, GREEN, YELLOW);

        if (i == 0)
            sortAndPrint(window.ccoin[1][1], window.ccoin[1][2], window.ccoin[1][3], pcoin, playerToMove, scale);
        else if (i == 1)
            sortAndPrint(window.ccoin[1][0], window.ccoin[1][2], window.ccoin[1][3], pcoin, playerToMove, scale);
        else if (i == 2)
            sortAndPrint(window.ccoin[1][1], window.ccoin[1][0], window.ccoin[1][3], pcoin, playerToMove, scale);
        else
            sortAndPrint(window.ccoin[1][1], window.ccoin[1][2], window.ccoin[1][0], pcoin, playerToMove, scale);



        if (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])
            requestAnimationFrame(animateBlue);
        else {
            roll = true;

            if (!checkForSafeHouseTokens(ccoin[1][i], i) && checkForKill(ccoin[1][i])) {
                count_6 = 0;
                bcp = [...ccoin[0]];
                blue_coin = [...ccoin[1]];
            }
            else if (dice_value == 6 && count_6 < 2) {
                count_6 += 1;
                showDice();
            }
            else if (dice_value == 6) {
                count_6 = 0;
                animateReMove(BLUE, [0, 1, 2, 3], ccoin[0], bcp);
                player = GREEN;
            }
            else {
                player = GREEN;
                count_6 = 0;

                bcp = [...ccoin[0]];
                blue_coin = [...ccoin[1]];
                ccoin = [[...gcp], [...green_coin]];
                showDice();
            }
            animating = false;
        }

    }

    function animateGreen() {
        scale = 2 * Math.sin((step + 1) / 20 * Math.PI);
        step++;
        if (end == 1 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
            step = 0;
            scale = 1;
            while ((pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) && step < 5) {
                var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                if (difference > 0)
                    if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor / 2);
                    else
                        pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                else
                    if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor / 2);
                    else
                        pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);
                step++;
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
            scale = 1;



        //Board Setup
        drawBoard();

        //Draw tokens in the bases
        sortAndPrintRemaining(red_coin, blue_coin, yellow_coin, RED, BLUE, YELLOW);


        //draw_token(pcoin,playerToMove, scale);
        // if (i == 0)
        sortAndPrint(window.ccoin[1][1], window.ccoin[1][2], window.ccoin[1][3], pcoin, playerToMove, scale);

        // else if (i == 1)
        //     sortAndPrint(window.ccoin[1][0], window.ccoin[1][2], window.ccoin[1][3], pcoin, playerToMove, scale);

        // else if (i == 2)
        //     sortAndPrint(window.ccoin[1][1], window.ccoin[1][0], window.ccoin[1][3], pcoin, playerToMove, scale);

        // else
        //     sortAndPrint(window.ccoin[1][1], window.ccoin[1][0], window.ccoin[1][0], pcoin, playerToMove, scale);


        if (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])
            requestAnimationFrame(animateGreen);
        else {
            roll = true;

            if (!checkForSafeHouseTokens(ccoin[1][i], i) && checkForKill(ccoin[1][i])) {
                count_6 = 0;
                gcp = [...ccoin[0]];
                green_coin = [...ccoin[1]];
            }
            else if (dice_value == 6 && count_6 < 2) {
                count_6 += 1;
                showDice();
            }
            else if (dice_value == 6) {
                count_6 = 0;
                animateReMove(GREEN, [0, 1, 2, 3], ccoin[0], gcp);
                player = BLUE;
            }
            else {
                player = BLUE;
                count_6 = 0;

                gcp = [...ccoin[0]];
                green_coin = [...ccoin[1]];
                ccoin = [[...bcp], [...blue_coin]];
                showDice();
            }
            animating = false;
        }

    }

}

function animateReMove(playerToMove, coins, starts, ends, killed = false) {
    var ncoin, pcoin;
    var k = 0;
    var factor = tx / 8;
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
            k++;
            if (start == end) {
                animateBlueOuter();
                return;
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

            pcoin = [...ncoin]
            setTimeout(animateBlue, 200);
        }
        else {
            if (!killed) {
                player = GREEN;
                ccoin = [[...gcp], [...green_coin]];
            }
            showDice();
        }

        function animateBlue() {
            animating = true;
            if (start == 0 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
                step = 0;
                scale = 1;
                while ((pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) && step < 5) {
                    var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                    if (difference > 0)
                        if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor / 3);
                        else
                            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                    else
                        if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor / 3);
                        else
                            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

                    step++;
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

                if (start == 0)
                    x = [...pcoin];
            }

            //Board Setup
            drawBoard();

            //Draw tokens in the bases
            for (var j = 0; j < 4; j++) {
                draw_token(red_coin[j], RED);
                draw_token(green_coin[j], GREEN);
                draw_token(yellow_coin[j], YELLOW);
            }

            draw_token(pcoin, playerToMove);

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
                if (!killed)
                    window.ccoin[1][i] = [...ncoin];
                animating = false;
                animateBlueOuter();
            }

        }

    }

    function animateGreenOuter() {
        const i = coins[k];
        var start = starts[k];
        const end = ends[k];

        if (k < coins.length) {
            k++;
            if (start == end) {
                animateGreenOuter();
                return;
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

            pcoin = [...ncoin]
            setTimeout(animateGreen, 200);
        }
        else {

            if (!killed) {
                player = BLUE;
                ccoin = [[...bcp], [...blue_coin]];
            }
            showDice();
        }

        function animateGreen() {
            animating = true;
            if (start == 0 && (pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0])) {
                step = 0;
                scale = 1;
                while ((pcoin[1] != ncoin[1] || pcoin[0] != ncoin[0]) && step < 5) {
                    var difference = (pcoin[0] - x[0]) / (ncoin[0] - x[0]) - (pcoin[1] - x[1]) / (ncoin[1] - x[1]);
                    if (difference > 0)
                        if ((ncoin[1] > pcoin[1] + factor && pcoin[1] < pcoin[1] + factor) || (ncoin[1] < pcoin[1] - factor && pcoin[1] > pcoin[1] - factor))
                            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1) * Math.floor(factor / 3);
                        else
                            pcoin[1] += ((ncoin[1] - pcoin[1] > 0) ? 1 : -1);
                    else
                        if ((ncoin[0] > pcoin[0] + factor && pcoin[0] < pcoin[0] + factor) || (ncoin[0] < pcoin[0] - factor && pcoin[0] > pcoin[0] - factor))
                            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1) * Math.floor(factor / 3);
                        else
                            pcoin[0] += ((ncoin[0] - pcoin[0] > 0) ? 1 : -1);

                    step++;
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
            drawBoard();

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
                if (!killed)
                    window.ccoin[1][i] = [...ncoin];
                animating = false;
                animateGreenOuter();
            }
        }
    }
}