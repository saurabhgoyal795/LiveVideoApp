var count = 0;
var runCode = false;
var codeEditor;
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

var taskId = getUrlParam("taskId","");

$(function(){

	if(getUrlParam("header","") == "none"){
		$(".header").hide();
	}
	$(window).resize(function(){
		if(window.innerHeight <= 700){
			//$("##blocklyDivContainer").css("height","")
		}
	});

	startAnswerDuration();

	fetchLessonDataFromFirestore(taskId);

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
				gameObject = querySnapshot.data();//$.parseJSON(querySnapshot.data().json);
				initiate();
				setTimeout(function(){
					listener();
				},1000);
			});
}

function initiate(){
	$(".instructionsPanelWrapper").html(gameObject.instructionsHtml);
	console.log("gameObject.initialCode:"+gameObject.initialCode);
	gameObject.initialCode = gameObject.initialCode.replace(/\\n/g, "\n");
	$("#editor").text(gameObject.initialCode);
	//gameObject.initialCode = "print abhinav";
	initiateEditor();
	CodeMirrorEditor.getDoc().setValue(gameObject.initialCode);
//	codeEditor = CodeMirror.fromTextArea($("#editor")[0],{
//        lineNumbers: true
//    });
//	codeEditor.getDoc().setValue(gameObject.initialCode);
}

function checkAnswer(){
	var output = $("#console").text();
	eval(gameObject.regexToCompareWith);
	console.log("truth_value:"+truth_value);
	if(truth_value){
		showAlert(gameObject.successMessage);
	}else{
		showAlert(gameObject.errorMessage);
	}
}

function showAlert(text){
	$("#showAlertScreen").show();
	$("#alertDiv").text(text);
}

function generateCode(){
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	document.getElementById("generatedCodeDiv").innerHTML = code;
	return code;
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
			AnswerResponse : CodeMirrorEditor.getDoc().getValue(),
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
