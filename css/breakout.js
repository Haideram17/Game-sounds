var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 100, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillstyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballColour = "0095DD";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;


var rightPressed = false;
var leftPressed = false;
 
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(r=0; r<brickRowCount; r++) {
bricks[c] [r] = { x: 0, y: 0, status: 1};
}
}


//Draw the ball
function drawBall() {
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.beginPath();
ctx.arc(x, y, 10, 0, Math.PI*2);
ctx.fillStyle = ballColour;
ctx.fill();
ctx.closePath();
}



//Function to draw paddle
function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

// Draw bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');

var lives = 3;

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {brick[c][r] = {x:0,y: 0, status; 1};}
}

//Draw bricks
function drawbricks() {
	for(c=0; c<brickColumnCount; c++) {
		for (r=0; r<brickRowCount; r++) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks [c][r].y = brickyY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillstyle = "0095DD"
			ctx.fill();
			ctx.closePath();
		}
	}
}


		

function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawball();
		
		drawPaddle();
		
		drawscore();
		
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
			dx = -dx;
		}
		
		if(y +dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}
		
		if(rightPressed && paddleX < canvas.width-paddleWidth){
			paddleX += 7;
		}
		else if(leftPressed && paddleX > 0){
			paddleX -= 7;
		}
		
		x += dx;
		y +=dy;
}
setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyUp", keyUpHandler,false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keycode == 37) {
		leftPressed = true;
	}
}


function keyUpHandler(e) {
	if(e.keyCode == 39) {
	    rightPressed = false;
	}
	else if(e.keyCode == 37) {
	leftPressed = false;
	}
}

function collisionDetection () {
	for(c=0; c<brickRowCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) { 
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
				dy = -dy;
				b.status = 0;
				score++;
				SCORE_SOUND.play();
				if(score == brickRowCount*brickColumnCount) {
					alert ("YOU WIN, CONGRATULATIONS!");
					document.location.reload();
				}
			}
		}
	}		
	
}
	
else {
	GAMEOVER_SOUND.play();
	alert("GAME OVER");
	document.location.reload();
	}
}


	

