var myInterpreter;

$(function(){
	$(window).resize(function(){
	  draw();
	});
});

soundManager.setup({
	// where to find flash audio SWFs, as needed
	url: 'js/soundmanager/swf',
	// optional: prefer HTML5 over Flash for MP3/MP4
	preferFlash: false,
	// multiShot: true,
	// multiShotEvents: true,
	onready: function() {				
		// Interaction sound variables	
		// background sound variable
		rightSound = soundManager.createSound({ id:'right', url:'sounds/coins.mp3',volume: 20 });
		wrongSound = soundManager.createSound({ id:'wrong', url:'sounds/quiz_wrong.mp3',volume: 20 });
	}
});
	 
function generateCode(){
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	document.getElementById("generatedCodeDiv").innerHTML = code;
}	 

function highlightBlock(id) {
  workspace.highlightBlock(id);
}

function runAll() {
	player = {
		x: 0,
		y: 0
	  };
	  draw();
	Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
	try {
	  eval(code);
	} catch (e) {
	  console.log(e);
	  alert(e);
	}
}

function reset(){
	player = {
		x: 0,
		y: 0
	  };
	  draw();
}

function run() {
  player = {
	x: 0,
	y: 0
  };
  draw();
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  
  var running = false;

  //workspace.traceOn(true);
  workspace.highlightBlock(null);

  var lastBlockToHighlight = null;
  
  myInterpreter = new Interpreter(code, (interpreter, scope) => {
	  var wrapper;
	 console.log("scope:",scope); 
	interpreter.setProperty(
	  scope, 'highlightBlock',
	  interpreter.createNativeFunction(id => {
		id = id ? id.toString() : '';
		running = false;
		workspace.highlightBlock(lastBlockToHighlight);
		lastBlockToHighlight = id;
	  })
	);
	wrapper = function(id) {
		moveRight();
    };
	interpreter.setProperty(scope, 'moveRight',interpreter.createNativeFunction(wrapper));
	
	wrapper = function(id) {
		moveLeft();
    };
	interpreter.setProperty(scope, 'moveLeft',interpreter.createNativeFunction(wrapper));
	
	wrapper = function(id) {
		moveTop();
    };
	interpreter.setProperty(scope, 'moveTop',interpreter.createNativeFunction(wrapper));
	
	wrapper = function(id) {
		moveBottom();
    };
	interpreter.setProperty(scope, 'moveBottom',interpreter.createNativeFunction(wrapper));
    
	interpreter.setProperty(
	  scope, 'print',
	  interpreter.createNativeFunction(val => {
		val = val ? val.toString() : '';
		console.log(val);
	  })
	);
  });

  nextStep();
	/*
  var intervalId = setInterval(() => {
	running = true;
	while (running) {
	  console.log("myInterpreter1.step():");
	  if (!myInterpreter1.step()) {
		workspace.highlightBlock(lastBlockToHighlight);
		clearInterval(intervalId);
		return;
	  }else{
		running = false;
	  }
	}
  }, 500);
  */
}

function nextStep() {
	var status = myInterpreter.step();
	console.log("status:"+status);
  if (status) {
    setTimeout(nextStep, 5);
  }
}

function moveRight(){
  if(canMove(player.x+1, player.y)){
	player.x++;
	draw();
	correct();
  }else{
	incorrect();
  }
}
function moveLeft(){
	if(canMove(player.x-1, player.y)){
		player.x--;draw();correct();
	}else{
		incorrect();
	}
}
function moveTop(){
	if(canMove(player.x, player.y-1)){
		player.y--;
		draw();
		correct();
	  }else{
		incorrect();
	  }
}
function moveBottom(){
	if(canMove(player.x, player.y+1)){
		player.y++;
		draw();
		correct();
	  }else{
		incorrect();
	  }
}

function incorrect(){
	console.log("incorrect");
	soundManager.play("wrong");
	myInterpreter = null;
	alert("Oops! Incorrect code. Try again")
}
function correct(){
	console.log("correct");
	if(board[player.y][player.x] == -1){
		soundManager.play("right");
		myInterpreter = null;
		alert("Congratulations! You have reached your goal.");
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
var player = {
	x: 0,
	y: 0
};

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
	ctx.fillStyle="white";
	//Loop through the board array drawing the walls and the goal
	for(var y = 0; y < board.length; y++){
		for(var x = 0; x < board[y].length; x++){
			//Draw a wall
			if(board[y][x] === 1){
				ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
			}
			//Draw the goal
			else if(board[y][x] === -1){
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.strokeStyle = "gold";
				ctx.moveTo(x*blockSize, y*blockSize);
				ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
				ctx.moveTo(x*blockSize, (y+1)*blockSize);
				ctx.lineTo((x+1)*blockSize, y*blockSize);
				ctx.stroke();
			}
		}
	}
	//Draw the player
	ctx.beginPath();
	var half = blockSize/2;
	ctx.fillStyle = "#FE5C57";
	ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
	ctx.fill();
}

//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
	return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

/*
$(document).keyup(function(e){
	if((e.which == 38) && canMove(player.x, player.y-1))//Up arrow
		player.y--;
	else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
		player.y++;
	else if((e.which == 37) && canMove(player.x-1, player.y))
		player.x--;
	else if((e.which == 39) && canMove(player.x+1, player.y))
		player.x++;
	draw();
	e.preventDefault();
});
*/