var myInterpreter;
var canvas;
var canvas2;
var ctx;
var ctx2;
var rotation = 0;
var initialPosition = [50,10];
var isPenDown = true;
var strokeStyle = "gold";
var count = 0;
var runCode = false;
var player = {
	x: 0,
	y: 0
};
$(function(){
	$(window).resize(function(){
	  //draw();
	});
	canvas = $('#GameBoardCanvas');
	if(canvas.width() > window.innerHeight){
		$('#GameBoardCanvas').css("width",(window.innerHeight - 150));
		$('#GameBoardCanvas').css("height",(window.innerHeight - 150));
		
		$('#GameBoardCanvas1').css("width",(window.innerHeight - 150));
		$('#GameBoardCanvas1').css("height",(window.innerHeight - 150));
	}
	canvas.attr("width",canvas.width());
	canvas.attr("height",canvas.width());
	ctx = canvas[0].getContext('2d');
	ctx.lineWidth = 5;
	
	canvas2 = $('#GameBoardCanvas1');
	canvas2.attr("width",canvas.width());
	canvas2.attr("height",canvas.width());
	ctx2 = canvas2[0].getContext('2d');
	ctx2.lineWidth = 5;
	
	moveToInitial();
	drawBackground();
});

function moveToInitial(){
	player.x = canvas.width()*initialPosition[0]/100;
	player.y = canvas.width()*initialPosition[1]/100;
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.moveTo(player.x, player.y);
	ctx2.beginPath();
	ctx2.moveTo(player.x, player.y);
	ctx2.lineWidth = 5;
	rotation = 0;
	isPenDown = true;
}

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

function run() {
  runCode = true;
  resetDrawing();
  
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  
  var running = false;

  //workspace.traceOn(true);
  workspace.highlightBlock(null);

  var lastBlockToHighlight = null;
  
  myInterpreter = new Interpreter(code, (interpreter, scope) => {
	  var wrapper;
	interpreter.setProperty(
	  scope, 'highlightBlock',
	  interpreter.createNativeFunction(id => {
		id = id ? id.toString() : '';
		running = false;
		workspace.highlightBlock(lastBlockToHighlight);
		lastBlockToHighlight = id;
	  })
	);
	wrapper = function(val) {
		moveForward(arguments[0]);
    };
	interpreter.setProperty(scope, 'moveForward',interpreter.createNativeFunction(wrapper));
	wrapper = function(val) {
		moveBackward(arguments[0]);
    };
	interpreter.setProperty(scope, 'moveBackward',interpreter.createNativeFunction(wrapper));
	wrapper = function(val) {
		turnRight(arguments[0]);
    };
	interpreter.setProperty(scope, 'turnRight',interpreter.createNativeFunction(wrapper));
	
	wrapper = function(val) {
		turnLeft(arguments[0]);
    };
	interpreter.setProperty(scope, 'turnLeft',interpreter.createNativeFunction(wrapper));
	
	wrapper = function(val) {
		penUp();
    };
	interpreter.setProperty(scope, 'penUp',interpreter.createNativeFunction(wrapper));
	wrapper = function(val) {
		penDown();
    };
	interpreter.setProperty(scope, 'penDown',interpreter.createNativeFunction(wrapper));
	
	interpreter.setProperty(
	  scope, 'print',
	  interpreter.createNativeFunction(val => {
		val = val ? val.toString() : '';
		console.log(val);
	  })
	);
  });

  nextStep();
}

function nextStep() {
	var status = myInterpreter.step();
	//console.log("status:"+status);
  if (status) {
    setTimeout(nextStep, 5);
  }
}

function penUp(){
	isPenDown = false;
}
function penDown(){
	isPenDown = true;
}

function moveForward(dis){
	var context = ctx;
	if(runCode){
		context = ctx2;
	}
	var angle = rotation * Math.PI / 180;
	
	console.log("moveTo: x="+player.x+"/y="+player.y);
	var moveTo_x = player.x;
	var moveTo_y = player.y;
	
	context.beginPath();
	context.moveTo(moveTo_x, moveTo_y);
	
	player.x = dis*Math.sin(angle) + moveTo_x;
	player.y = dis*Math.cos(angle) + moveTo_y;
	console.log("moveForward: player.x="+player.x+"/player.y="+player.y+"/angle="+angle+"/rotation="+rotation);
	if(count%2 == 0){
		context.strokeStyle = "gold";
	}else{
		context.strokeStyle = "red";
	}
	context.strokeStyle = strokeStyle;
	context.lineTo(player.x,player.y);
	if(isPenDown){
		context.stroke();
	}
	count++;
}
function moveBackward(dis){
	console.log("moveBackward: player.x="+player.x+"/player.y="+player.y);
}
function turnRight(deg){
	rotation += deg;
	console.log("turnRight:"+rotation);
}
function turnLeft(deg){
	rotation -= deg;
	console.log("turnLeft:"+rotation);
}

function checkAnswer(){
	var isCorrect = true;
	var pos = {x:0,y:0};
	for (var x = 0; x <= canvas.width(); x++) {
	  for (var y = 0; y <= canvas.height(); y++) {
		var p = ctx.getImageData(x, y, 1, 1).data; 
		var p2 = ctx2.getImageData(x, y, 1, 1).data; 
 		
		if((p[0] == 0) && (p[1] == 0) && (p[2] == 0) && (p[3] == 0)){
			if((p2[0] == 0) && (p2[1] == 0) && (p2[2] == 0) && (p2[3] == 0)){
			}else{
				var rgba = 'rgba(' + p[0] + ', ' + p[1] +', ' + p[2] + ', ' + (p[3] / 255) + ')';
				var rgba2 = 'rgba(' + p2[0] + ', ' + p2[1] +', ' + p2[2] + ', ' + (p2[3] / 255) + ')';
				var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
				console.log(x+","+y+"/"+hex+"/"+rgba+"/"+rgba2);
				isCorrect = false;
				pos.x = x;
				pos.y = y;
				break;
			}
		}else{
			if(p2[0] != 0 || p2[1] != 0 || p2[2] != 0){
				
			}else{
				var rgba = 'rgba(' + p[0] + ', ' + p[1] +', ' + p[2] + ', ' + (p[3] / 255) + ')';
				var rgba2 = 'rgba(' + p2[0] + ', ' + p2[1] +', ' + p2[2] + ', ' + (p2[3] / 255) + ')';
				var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
				console.log(x+","+y+"/"+hex+"/"+rgba+"/"+rgba2);
				isCorrect = false;
				break;
			}
		}
		/*
		// If transparency on the image
		if((p[0] == 0) && (p[1] == 0) && (p[2] == 0) && (p[3] == 0)){
			//coord = " (Transparent color detected, cannot be converted to HEX)";
		}else{
			var rgba = 'rgba(' + p[0] + ', ' + p[1] +', ' + p[2] + ', ' + (p[3] / 255) + ')';
			var rgba2 = 'rgba(' + p2[0] + ', ' + p2[1] +', ' + p2[2] + ', ' + (p2[3] / 255) + ')';
			var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
			console.log(x+","+y+"/"+hex+"/"+rgba+"/"+rgba2);
			
		}
		*/
	  }
	  if(!isCorrect){
		  break;
	  }
	}
	if(isCorrect){
		alert("Congratulations! You have reached your goal.");
	}else{
		alert("Oops! Incorrect code. Try again")
	}
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
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