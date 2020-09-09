var workspace;
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
var penSize = 5;
var blockChangedTimer;

var isWebinar = getUrlParam("isWebinar",false);
var webinarId = getUrlParam("sessionId","");
var webinar_user_name = getUrlParam("name","");
var webinar_user_email = getUrlParam("email","");
var webinar_user_employeeId = getUrlParam("empId","");
var webinar_user_organization = getUrlParam("org","");
var webinar_user_phone = getUrlParam("phone","");
var webinar_user_grade = getUrlParam("grade","");
var webinar_user_section = getUrlParam("section","");
var webinar_user_badge = getUrlParam("badge","");
var webinarAnswerDurationTimer;
var webinarAnswerDuration = 0;

var player = {
	x: 0,
	y: 0
};
var gameObject = {};
var gameType = "";
var taskId = getUrlParam("taskId","");

$(function(){

	if(getUrlParam("header","") == "none"){
		$("#headerDiv").hide();
	}
	try {
		$(".userName").text(getUrlParam("name",""));
	} catch (e) {
		console.log(e);
	}
	$(window).resize(function(){
		if(window.innerHeight <= 700){
			//$("##blocklyDivContainer").css("height","")
		}
	});

	if(getUrlParam("liveSession","") == "true"){
		$("body").css("background-color","rgb(86, 7, 126)");
		$("body").css("background-image","url('/classroom/img/bg-7.jpg')");
	 }

	startAnswerDuration();

	canvas = $('#GameBoardCanvas');
	if(canvas.width() > window.innerHeight){
		$('#GameBoardCanvas').css("width",(window.innerHeight - 75));
		$('#GameBoardCanvas').css("height",(window.innerHeight - 75));

		$('#GameBoardCanvas1').css("width",(window.innerHeight - 75));
		$('#GameBoardCanvas1').css("height",(window.innerHeight - 75));

		$('#GameBoardCanvasBG').css("width",(window.innerHeight - 75));
		$('#GameBoardCanvasBG').css("height",(window.innerHeight - 75));
	}
	canvas.attr("width",canvas.width());
	canvas.attr("height",canvas.width());
	ctx = canvas[0].getContext('2d');
	ctx.lineWidth = penSize;

	canvas2 = $('#GameBoardCanvas1');
	canvas2.attr("width",canvas.width());
	canvas2.attr("height",canvas.width());
	ctx2 = canvas2[0].getContext('2d');
	ctx2.lineWidth = penSize;

	$("#GameBoardCanvasBG").css("width",canvas.width());
	$("#GameBoardCanvasBG").css("height",canvas.width());
	if(window.innerHeight <= 700){
		$("#GameBoardCanvasBG").css("left","0px");
		$("#GameBoardCanvas").css("left","0px");
		$("#GameBoardCanvas1").css("left","0px");
	}else{
		$("#GameBoardCanvasBG").css("margin-left",-canvas.width()/2);
		$("#GameBoardCanvas").css("margin-left",-canvas.width()/2);
		$("#GameBoardCanvas1").css("margin-left",-canvas.width()/2);
	}


	fetchLessonDataFromFirestore(taskId);
	//initiate();

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

function startAnswerDuration(){
	stopAnswerDuration();
	webinarAnswerDuration = 0;
	webinarAnswerDurationTimer = setInterval(function(){
		webinarAnswerDuration += 50;
	},50);
}
function stopAnswerDuration(){
	try{
		clearInterval(webinarAnswerDurationTimer);
	}catch(err){}
}

function fetchLessonDataFromFirestore(taskId){
	console.log("fetchLessonDataFromFirestore taskId:"+taskId);
	var listener = db_firestore.collection("courseJSON").doc(taskId)
			.onSnapshot(function(querySnapshot) {
				console.log("fetchLessonDataFromFirestore",querySnapshot.data());
				gameObject = $.parseJSON(querySnapshot.data().json);
				initiate();
				setTimeout(function(){
					listener();
				},1000);
			});
}

function initiate(){
	gameType = gameObject.game_type;
	var toolbox = gameObject.toolbox;
	if(gameType == "maze"){
		board = gameObject.board;
		//$("#gameBoardContainer").css("background","#eee");
		$("#gameBoardContainer").css("background","transparent");
		$("#GameBoardCanvasBG").css("background-image","url('/classroom/image/maze_bg.png')");
		if(gameObject.background != undefined){
			$("#GameBoardCanvasBG").css("background-image","url('/classroom/image/"+gameObject.background+".png')");
		}
		loadMazeBlocks();
		/*
		mazeBlock = new Image();
		if(gameObject.wall != undefined){
			mazeBlock.src = '/image/'+gameObject.wall+'.png';
		}else{
			mazeBlock.src = '/image/maze_block.png';
		}
		mazeBlock.onload = function(){
			mazeBlockArray.push(mazeBlock);
			mazeDestination = new Image();
			if(gameObject.destination != undefined){
				mazeDestination.src = '/image/'+gameObject.destination+'.png';
			}else{
				mazeDestination.src = '/image/maze_saturn.png';
			}
			mazeDestination.onload = function(){
				mazeCharacter = new Image();
				if(gameObject.character != undefined){
					mazeCharacter.src = '/image/'+gameObject.character+'.png';
				}else{
					mazeCharacter.src = '/image/maze_astronaut.png';
				}
				mazeCharacter.onload = function(){
					draw();
				}
			}
			//draw();
		}
		*/
	}else if(gameType == "jewel"){
		boardJewel = gameObject.board;
		for(var y = 0; y < boardJewel.length; y++){
			for(var x = 0; x < boardJewel[y].length; x++){
				if(boardJewel[y][x] === -1){
					totalJewel++;
				}
			}
		}
		$("#gameBoardContainer").css("background","transparent");
		$("#GameBoardCanvasBG").css("background-image","url('/classroom/image/maze_bg.png')");
		if(gameObject.background != undefined){
			$("#GameBoardCanvasBG").css("background-image","url('/classroom/image/"+gameObject.background+".png')");
		}
		jewelBlock = new Image();
		if(gameObject.wall != undefined){
			jewelBlock.src = '/classroom/image/'+gameObject.wall+'.png';
		}else{
			jewelBlock.src = '/classroom/image/maze_block.png';
		}
		jewelBlock.onload = function(){
			jewelDestination = new Image();
			if(gameObject.destination != undefined){
				jewelDestination.src = '/classroom/image/'+gameObject.destination+'.png';
			}else{
				jewelDestination.src = '/classroom/image/maze_saturn.png';
			}
			jewelDestination.onload = function(){
				jewelCharacter = new Image();
				if(gameObject.character != undefined){
					jewelCharacter.src = '/classroom/image/'+gameObject.character+'.png';
				}else{
					jewelCharacter.src = '/classroom/image/maze_astronaut.png';
				}
					jewelCharacter.onload = function(){
					drawJewel();
				}
			}
		}


	}else if(gameType == "drawing"){

		//$(".checkDrawingAnswer").css("display","");

		moveToInitial();
		//drawBackground();
		strokeStyle = "#eeeeee";
		eval(gameObject.default_function);
		strokeStyle = "#FE5C57";
		moveToInitial();
	}else if(gameType == "freehand_drawing"){
		strokeStyle = "#FE5C57";
		moveToInitial();
	}
	for(var i=0;i<toolbox.length;i++){
		$("#toolbox").append('<block type="'+toolbox[i]+'"></block>');
	}
	var workspaceObject = {
		 media: 'media/',
         toolbox: document.getElementById('toolbox')
		 };


	//if(window.innerWidth < 768 && getUrlParam("liveSession","") == ""){
	if(window.innerWidth < 768){
		workspaceObject = {
		 media: 'media/',
		 scrollbars: true,
		 horizontalLayout : true,
		 zoom:{controls: true,
			  wheel: true,
			  startScale: 1.0,
			  maxScale: 1,
			  minScale: 0.3,
			  scaleSpeed: 1.2},
         toolbox: document.getElementById('toolbox')
		 };

	}
	if(gameObject.block_limit != undefined){
		$("#capacityBubble").html('You have <span>'+gameObject.block_limit+'</span> blocks left.');
		$("#capacityBubble").css("display","inline-block");
		workspaceObject.maxBlocks = gameObject.block_limit;
	}
	Blockly.Scrollbar.scrollbarThickness = 10;
	workspace = Blockly.inject('blocklyDiv',workspaceObject);
		 //Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
		 //Blockly.JavaScript.addReservedWords('highlightBlock');
	//new Scrollbar(workspace, true, true, opt_class);


	workspace.addChangeListener(onBlockChange);
}

function loadMazeBlocks(){
	var block = new Image();
//	if(gameObject.wall != undefined){
//		block.src = '/image/'+gameObject.wall+'.png';
//	}else{
//		block.src = '/image/maze_block.png';
//	}
	block.src = '/classroom/image/Rock '+(mazeBlockArray.length+1)+'.png';
	block.onload = function(){
		mazeBlockArray.push(block);
		if(mazeBlockArray.length == 10){
			mazeDestination = new Image();
			if(gameObject.destination != undefined){
				mazeDestination.src = '/classroom/image/'+gameObject.destination+'.png';
			}else{
				mazeDestination.src = '/classroom/image/maze_saturn.png';
			}
			mazeDestination.onload = function(){
				mazeCharacter = new Image();
				if(gameObject.character != undefined){
					mazeCharacter.src = '/classroom/image/'+gameObject.character+'.png';
				}else{
					mazeCharacter.src = '/classroom/image/maze_astronaut.png';
				}
				mazeCharacter.onload = function(){
					draw();
				}
			}
			//draw();
		}else{
			loadMazeBlocks();
		}
	}
}

function onBlockChange(event) {
	//console.log("onBlockChange:"+event.type,event);
	$("#capacityBubble").html('You have <span>'+workspace.remainingCapacity()+'</span> blocks left.');
	if(gameObject.block_limit != undefined){
		block_limit = gameObject.block_limit;
		$("#capacityBubble").css("display","inline-block");
		if(block_limit >= workspace.getAllBlocks().length){

		}else{

		}
	}
	clearTimeout(blockChangedTimer);
	blockChangedTimer = setTimeout(function(){
		syncCodeToFS("");
	},5000);
	/*
  if (event.type == Blockly.Events.MOVE) {
		 checkAnswer();
  }
  */
}

function generateCode(){
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	document.getElementById("generatedCodeDiv").innerHTML = code;
	return code;
}

function highlightBlock(id) {
  workspace.highlightBlock(id);
}

function reset(){
	myInterpreter = null;
	if(gameType == "maze"){
		resetMaze();
	}else if(gameType == "jewel"){
		resetJewel();
	}else if(gameType == "drawing"){
		resetDrawing();
	}else if(gameType == "freehand_drawing"){
		resetFreeHandDrawing();
	}else if(gameType == "dance_party"){
		resetDanceParty();
	}
}

function run() {
  runCode = true;
    if(gameType == "maze"){
		resetMaze();
	}else if(gameType == "jewel"){
		resetJewel();
	}else if(gameType == "drawing"){
		resetDrawing();
	}else if(gameType == "freehand_drawing"){
		resetFreeHandDrawing();
	}
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(workspace);

  var running = false;

  //workspace.traceOn(true);
  //workspace.highlightBlock(null);

  var lastBlockToHighlight = null;

  myInterpreter = new Interpreter(code, (interpreter, scope) => {
	  var wrapper;
	 console.log("scope:",scope);
	 /*
	interpreter.setProperty(
	  scope, 'highlightBlock',
	  interpreter.createNativeFunction(id => {
		id = id ? id.toString() : '';
		running = false;
		workspace.highlightBlock(lastBlockToHighlight);
		lastBlockToHighlight = id;
	  })
	);
	*/

	// maze
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

	// drawing
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
	wrapper = function(val) {
		updatePenSize(arguments[0]);
    };
	interpreter.setProperty(scope, 'updatePenSize',interpreter.createNativeFunction(wrapper));
	wrapper = function(val) {
		updatePenColor(arguments[0]);
    };
	interpreter.setProperty(scope, 'updatePenColor',interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		collect();
		};
	interpreter.setProperty(scope, 'collect',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updateBackground(arguments[0]);
		};
	interpreter.setProperty(scope, 'updateBackground',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updateSound(arguments[0]);
    };
	interpreter.setProperty(scope, 'updateSound',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updateCharacter(arguments[0]);
    };
	interpreter.setProperty(scope, 'updateCharacter',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updateNewCharacter(arguments[0]);
		};
	interpreter.setProperty(scope, 'updateNewCharacter',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updateStep(arguments[0]);
    };
	interpreter.setProperty(scope, 'updateStep',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updateStepNew(arguments[0]);
		};
	interpreter.setProperty(scope, 'updateStepNew',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updatePosition(arguments[0]);
		};
	interpreter.setProperty(scope, 'updatePosition',interpreter.createNativeFunction(wrapper));

	wrapper = function(val) {
		updatePositionNew(arguments[0]);
		};
	interpreter.setProperty(scope, 'updatePositionNew',interpreter.createNativeFunction(wrapper));

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
	console.log("status:"+status);
  if (status) {
    setTimeout(nextStep, 5);
  }else{
	  if(gameType == "drawing"){
		  checkDrawingAnswer();
	  }
  }
}

function showCode(){
	$("#showCodeScreen").show();
	$("#codeDiv").text(generateCode());
}

function showAlert(text){
	$("#showAlertScreen").show();
	$("#alertDiv").text(text);
}

function syncCodeToFS(correctStatus){
	if(webinarId != ""){
		var responseData = {
			WebinarID : webinarId,
			Name: webinar_user_name,
			UserID : webinar_user_email,
			EmployeeID : webinar_user_employeeId,
			Organization : webinar_user_organization,
			Phone : webinar_user_phone,
			Grade : webinar_user_grade,
			Section : webinar_user_section,
			BatchNumber : getUrlParam("BatchNumber",""),
			isCorrect : correctStatus,
			LessonID : taskId,
			SlideID : taskId,
			AnswerTime : webinarAnswerDuration,
			AnswerResponse : generateCode(),
			gameType : gameType,
			calledFrom : "hellolearner",
			UpdatedAt : getCurrentDateTime()
		};
		console.log("responseData",responseData);
		var saveLiveAppQuizResponse = defaultProject2.functions().httpsCallable('saveLiveAppCodingResponse');
		saveLiveAppQuizResponse(responseData).then(function(result) {
			console.log("saveLiveAppQuizResponse:",result);
		  var sanitizedMessage = result.data.text;
		}).catch(function(error) {
		  console.log(error);
		});
	}
}

function getCurrentDateTime(){
	var d = new Date,
	dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
	return dformat;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return decodeURI(urlparameter);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
