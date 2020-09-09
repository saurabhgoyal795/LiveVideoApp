function drawBackground(){
	
	strokeStyle = "#eeeeee";
	for (var count2 = 0; count2 < 3; count2++) {
	  for (var count = 0; count < 5; count++) {
		moveForward(50);
		turnRight(144);
	  }
	  penUp();
	  moveForward(150);
	  penDown();
	  turnRight(120);
	}
	turnLeft(90);
	penUp();
	moveForward(100);
	penDown();
	//moveForward(50);
	strokeStyle = "red";
	moveToInitial();
}