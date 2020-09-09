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

function resetDrawing(){
	canvas2[0].width = canvas2[0].width;
    moveToInitial();
}

function penUp(){
	isPenDown = false;
}
function penDown(){
	isPenDown = true;
}

function moveForward(dis){
	var context = ctx;
	console.log("runCode:"+runCode);
	if(runCode){
		context = ctx2;
	}
	var angle = rotation * Math.PI / 180;
	
	//console.log("moveTo: x="+player.x+"/y="+player.y);
	var moveTo_x = player.x;
	var moveTo_y = player.y;
	
	context.beginPath();
	context.moveTo(moveTo_x, moveTo_y);
	
	player.x = dis*Math.sin(angle) + moveTo_x;
	player.y = dis*Math.cos(angle) + moveTo_y;
	//console.log("moveForward: player.x="+player.x+"/player.y="+player.y+"/angle="+angle+"/rotation="+rotation);
	context.strokeStyle = strokeStyle;
	context.lineWidth = penSize;
	context.lineTo(player.x,player.y);
	if(isPenDown){
		context.stroke();
	}
	count++;
}
function moveBackward(dis){
	//console.log("moveBackward: player.x="+player.x+"/player.y="+player.y);
}
function turnRight(deg){
	rotation += deg;
	//console.log("turnRight:"+rotation);
}
function turnLeft(deg){
	rotation -= deg;
	//console.log("turnLeft:"+rotation);
}

function checkDrawingAnswer(){
	console.log("checkDrawingAnswer()");
	$("#loadingScreen").show();
	var incorrectCount = 0;
	setTimeout(function(){
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
					incorrectCount++;
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
					incorrectCount++;
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
		$("#loadingScreen").hide();
		console.log("incorrectCount:"+incorrectCount)
		if(isCorrect){
		//if(incorrectCount < 10){
			soundManager.play("right");
			syncCodeToFS("T");
			showAlert("Congratulations! You have reached your goal.");
		}else{
			soundManager.play("wrong");
			syncCodeToFS("F");
			showAlert("Oops! Incorrect code. Try again")
		}
	},500);
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}