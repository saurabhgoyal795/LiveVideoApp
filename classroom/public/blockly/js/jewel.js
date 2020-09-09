var jewelCharacter;
var jewelDestination;
var jewelBlock;
var totalJewel = 0;
var jewelCollected = 0;
var jewelCollectedPositions = {};
function resetJewel(){
	jewelCollected = 0;
	jewelCollectedPositions = {};
	player = {
		x: 0,
		y: 0
	  };
	  drawJewel();
}

function collect(){
	if(jewelCollectedPositions[player.y+player.x] == undefined){
		if(boardJewel[player.y][player.x] == -1){
			jewelCollectedPositions[player.y+player.x] = "true";
			jewelCollected++;
			drawJewel();
			correctMaze();
		}else{
			incorrectMaze();
		  }
	}else{
		incorrectMaze();
	  }
}

function incorrectJewel(){
	console.log("incorrect");
	soundManager.play("wrong");
	myInterpreter = null;
	syncCodeToFS("F");
	showAlert("Oops! Incorrect code. Try again")
}
function correctJewel(){
	console.log("correct");
	if(board[player.y][player.x] == -1){
		soundManager.play("right");
		myInterpreter = null;
		syncCodeToFS("T");
		showAlert("Congratulations! You have reached your goal.");
	}
}

//The game board 1 = walls, 0 = free space, and -1 = the goal
var boardJewel = [
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
	[ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
	[ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
	[ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
	[ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
	[ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
	[ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
	[-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];

//Draw the game board
function drawJewel(){
	var canvas = $('#GameBoardCanvas');
	if(canvas.width() > window.innerHeight){
		$('#GameBoardCanvas').css("width",(window.innerHeight - 150));
		$('#GameBoardCanvas').css("height",(window.innerHeight - 150));
	}
	canvas.attr("width",canvas.width());
	canvas.attr("height",canvas.width());
	var width = canvas.width();
	var blockSize = width/boardJewel.length;
	console.log("width:"+width+"/board.length:"+boardJewel.length+"/blockSize:"+blockSize);
	var ctx = canvas[0].getContext('2d');
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, width);
	//ctx.fillStyle="white";
	//Loop through the board array drawing the walls and the goal
	for(var y = 0; y < boardJewel.length; y++){
		for(var x = 0; x < boardJewel[y].length; x++){
			//Draw a wall
			ctx.globalAlpha = 1;
			if(boardJewel[y][x] === 1){
				ctx.globalAlpha = .7;
				//ctx.fillStyle="white";
				//ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);

				ctx.drawImage(jewelBlock,x*blockSize,y*blockSize,blockSize*1.1,blockSize*1.1);

			}
			else if(boardJewel[y][x] === 0){
				//ctx.fillStyle="#A788AE";
				//ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
			}
			//Draw the goal
			else if(boardJewel[y][x] === -1 && jewelCollectedPositions[y+x] == undefined){
				ctx.drawImage(jewelDestination,x*blockSize,y*blockSize,blockSize,blockSize);

			}
		}
	}
	ctx.drawImage(jewelCharacter,player.x*blockSize,player.y*blockSize,blockSize,blockSize);

}

//Check to see if the new space is inside the board and not a wall
function canMoveJewel(x, y){
	return (y>=0) && (y<boardJewel.length) && (x >= 0) && (x < boardJewel[y].length) && (boardJewel[y][x] != 1);
}