function resetFreeHandDrawing(){
	canvas2[0].width = canvas2[0].width;
    moveToInitial();
}

function updatePenSize(size){
	console.log("size:"+size);
	penSize = size;
}

function updatePenColor(color){
	console.log("color:"+color);
	strokeStyle = color;
}