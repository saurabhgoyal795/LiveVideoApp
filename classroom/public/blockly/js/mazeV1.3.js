var mazeCharacter;
var mazeDestination;
var mazeBlock;
var mazeBlockArray = [];
var mazeBlockCordinated = {};
function resetMaze(){
	player = {
		x: 0,
		y: 0
	  };
	  draw();
}

function moveRight(){
	if(gameType == "maze"){
	  if(canMove(player.x+1, player.y)){
		player.x++;
		draw();
		correctMaze();
	  }else{
		incorrectMaze();
	  }
	}else if(gameType == "jewel"){
		if(canMoveJewel(player.x+1, player.y)){
			player.x++;
			drawJewel();
			correctMaze();
		  }else{
			incorrectMaze();
		  }
	}
}
function moveLeft(){
	if(gameType == "maze"){
		if(canMove(player.x-1, player.y)){
			player.x--;
			draw();
			correctMaze();
		}else{
			incorrectMaze();
		}
	}else if(gameType == "jewel"){
		if(canMoveJewel(player.x-1, player.y)){
			player.x--;
			drawJewel();
			correctMaze();
		}else{
			incorrectMaze();
		}
	}
}
function moveTop(){
	if(gameType == "maze"){
		if(canMove(player.x, player.y-1)){
			player.y--;
			draw();
			correctMaze();
		  }else{
			incorrectMaze();
		  }
	}else if(gameType == "jewel"){
		if(canMoveJewel(player.x, player.y-1)){
			player.y--;
			drawJewel();
			correctMaze();
		  }else{
			incorrectMaze();
		  }
	}
}
function moveBottom(){
	if(gameType == "maze"){
		if(canMove(player.x, player.y+1)){
			player.y++;
			draw();
			correctMaze();
		  }else{
			incorrectMaze();
		  }
	}else if(gameType == "jewel"){
		if(canMoveJewel(player.x, player.y+1)){
			player.y++;
			drawJewel();
			correctMaze();
		  }else{
			incorrectMaze();
		  }
	}
}

function incorrectMaze(){
	console.log("incorrect");
	soundManager.play("wrong");
	myInterpreter = null;
	syncCodeToFS("F");
	showAlert("Oops! Incorrect code. Try again")
}
function correctMaze(){
	console.log("correct");
	if(gameType == "maze"){
		if(board[player.y][player.x] == -1){
			soundManager.play("right");
			myInterpreter = null;
			syncCodeToFS("T");
			showAlert("Congratulations! You have reached your goal.");
		}
	}else if(gameType == "jewel"){
		if(jewelCollected >= totalJewel){
			soundManager.play("right");
			myInterpreter = null;
			syncCodeToFS("T");
			showAlert("Congratulations! You have reached your goal.");
		}
	}
}

//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
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
function draw(){
	var canvas = $('#GameBoardCanvas');
	if(canvas.width() > window.innerHeight){
		$('#GameBoardCanvas').css("width",(window.innerHeight - 150));
		$('#GameBoardCanvas').css("height",(window.innerHeight - 150));
	}
	canvas.attr("width",canvas.width());
	canvas.attr("height",canvas.width());
	var width = canvas.width();
	var blockSize = width/board.length;
	console.log("width:"+width+"/board.length:"+board.length+"/blockSize:"+blockSize);
	var ctx = canvas[0].getContext('2d');
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, width);
	//ctx.fillStyle="white";
	//Loop through the board array drawing the walls and the goal
	for(var y = 0; y < board.length; y++){
		for(var x = 0; x < board[y].length; x++){
			//Draw a wall
			ctx.globalAlpha = 1;
			if(board[y][x] === 1){
				ctx.globalAlpha = 1;
				//ctx.fillStyle="white";
				//ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
				if(mazeBlockArray.length == 1){
					ctx.drawImage(mazeBlockArray[0],x*blockSize,y*blockSize,blockSize*1.1,blockSize*1.1);
				}else{
					var max = mazeBlockArray.length-1;
					var min = 0;
					var random = Math.floor(Math.random() * (max - min + 1)) + min;
					if(mazeBlockCordinated[x+""+y] != undefined){
						random = mazeBlockCordinated[x+""+y];
					}else{
						mazeBlockCordinated[x+""+y] = random;
					}
					ctx.drawImage(mazeBlockArray[random],x*blockSize,y*blockSize,blockSize*1.1,blockSize*1.1);
				}
				
			}
			else if(board[y][x] === 0){
				//ctx.fillStyle="#A788AE";
				//ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
			}
			//Draw the goal
			else if(board[y][x] === -1){
				/*
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.strokeStyle = "gold";
				ctx.moveTo(x*blockSize, y*blockSize);
				ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
				ctx.moveTo(x*blockSize, (y+1)*blockSize);
				ctx.lineTo((x+1)*blockSize, y*blockSize);
				ctx.stroke();
				*/
				ctx.drawImage(mazeDestination,x*blockSize,y*blockSize,blockSize,blockSize);	
				//drawImage(ctx,x,y,blockSize,'/image/maze_saturn.png');
				
			}
		}
	}
	/*
	//Draw the player
	ctx.beginPath();
	var half = blockSize/2;
	ctx.fillStyle = "#FE5C57";
	ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
	ctx.fill();
	*/
	ctx.globalAlpha = 1;
	ctx.drawImage(mazeCharacter,player.x*blockSize,player.y*blockSize,blockSize,blockSize);
}

function drawImage(ctx,x,y,blockSize,src){
	var img = new Image();
	img.src = src;
	img.onload = function(){
		ctx.drawImage(img,x*blockSize,y*blockSize,blockSize,blockSize);	
	}
}

//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
	return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}