//var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],viewportwidth=w.innerWidth||e.clientWidth||g.clientWidth,viewportheight=w.innerHeight||e.clientHeight||g.clientHeight;
var dataArray;
var isPlayble = false;
var isEmbed = true;
var isInLessonTest = false;
var isInitialTest = false;
var loginScreen = false;
var courseId = "courseplan029";
var lessonNumber = 1;
var course_language = "english";
var gameCoin = 0;
var equivalent_positive_coins = 1;
coinFeedbackArray = ["Very Good!","Well Done!","Good Job!","Awesome!"];
var viewportwidth;
var viewportheight;
var correctFlag = 1;
var isAdmin = getUrlParam("isAdmin",false);
var isAdminPreview = getUrlParam("isAdminPreview",false);
var timerOn = getUrlParam("timerOn",false);
var autoTimerMultiple = parseInt(getUrlParam("autoTimerMultiple",1));
var isWebinar = getUrlParam("isWebinar",false);
var isquizBuilder = getUrlParam("quizBuilder",false);
var webinarId = getUrlParam("sessionId","");
var webinar_user_name = getUrlParam("name","");
var webinar_user_email = getUrlParam("email","");
var webinar_user_employeeId = getUrlParam("empId","");
var webinar_user_organization = getUrlParam("org","");
var webinar_user_phone = getUrlParam("phone","");
var webinar_user_grade = getUrlParam("grade","");
var webinar_user_section = getUrlParam("section","");
var webinar_user_badge = getUrlParam("badge","");
var isBasicLesson = getUrlParam("isBasicLesson","");
var orientationChanged = getUrlParam("orientation","false");

var firebaseConfig = {
    apiKey: "AIzaSyAsqQLjg5DSmv_j0nDI6RBhyFAzZbHdznw",
    authDomain: "hello-english-app-269406.firebaseapp.com",
    databaseURL: "https://hello-english-app-269406.firebaseio.com",
    projectId: "hello-english-app-269406",
    storageBucket: "hello-english-app-269406.appspot.com",
    messagingSenderId: "194812903325",
    appId: "1:194812903325:web:e6456950b0b80ff5a9b974",
    measurementId: "G-ENFS9M67KD"
  };
var defaultProject = firebase.initializeApp(firebaseConfig);
//var analytics = firebase.analytics();
if(window.localStorage != null){
	
}
//firebase.firestore().enablePersistence();
var db = defaultProject.firestore();

if ( window.addEventListener ) {
    window.addEventListener('message', handleMessage, false);
} else if ( window.attachEvent ) { // ie8
    window.attachEvent('onmessage', handleMessage);
}

function handleMessage(e) {
    // Reference to element for data display
    //var el = document.getElementById('display');
    // Check origin
    //if ( e.origin === 'http://www.example.com' ) {
	if(true){
        // Retrieve data sent in postMessage
        //el.innerHTML = e.data;
		console.log(e.data);
        // Send reply to source of message
        //e.source.postMessage('Message received', e.origin);
		var data = e.data;
		if(data.indexOf("slide") > -1){
			postMessage_LoadSlide(data.split("=")[1]);
		}
		
		if(data.indexOf("checkAnswer") > -1 || data.indexOf("showAnswer") > -1){
			postMessage_checkAnswer();
		}
		if(data.indexOf("nextSlide") > -1){
			postMessage_NextSlide();
		}
		if(data.indexOf("showLeaderboard") > -1){
			postMessage_showLeaderboard();
		}
		if(data.indexOf("startTimer") > -1){
			var time = data.split("=")[1];
			postMessage_startTimer(time);
		}
		if(data.indexOf("showAwardBadge") > -1){
			var userData = data.split("=")[1];
			postMessage_showAwardBadge(userData);
		}
		
    }
}

var webinarAnswerDurationTimer;
var webinarAnswerDuration = 0;

function getCurrentSlideNumber(){
	return parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1;
}

function getSlideCount(){
	var countSlide = 0;
	$("#outerSlides section").each(function(){
		countSlide++;
	})
	countSlide--;
	return countSlide;
}
function postMessage_showAwardBadge(userData){
	userData = userData.split("#");
	console.log("postMessage_showAwardBadge:"+userData);
	$(".badgeUserName").text("For "+userData[1]);
	$("#badgeContianer").css("display","");
	$(".badgeIcon").attr("src","/image/"+userData[0]+".png");
	$("#badgeContianer").addClass("animated animate__zoomInDown");
	setTimeout(function(){
		$("#badgeContianer").removeClass("animate__zoomInDown").addClass("animated animate__zoomOutDown");
		setTimeout(function(){
			$("#badgeContianer").css("display","none");
			$("#badgeContianer").removeClass("animated animate__zoomOutDown");
			if(userData[2] == webinar_user_email || userData[2] == webinar_user_phone){
				//$("#badgeIconsDiv").append('<img src="/image/'+userData[0]+'.png" style="width:30px;height:30px;margin-left:2px;" />')
				if(localStorage["webinar_badge_"+webinarId] == undefined){
					localStorage["webinar_badge_"+webinarId] = userData[0];
				}else{
					localStorage["webinar_badge_"+webinarId] = localStorage["webinar_badge_"+webinarId]+","+userData[0];
				}
			}
		},1000);
	},3000);
	soundManager.play('pounce_end_30');
}
function loadLastSlide(){
	var countSlide = 0;
	$("#outerSlides section").each(function(){
		countSlide++;
	})
	countSlide--;
	Reveal.slide(countSlide);
	return countSlide;
}

function postMessage_NextSlide(){
	Reveal.next();
	updateSlideCounterDiv(parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1);
	try{
		clearInterval(webinarAnswerDurationTimer);
	}catch(err){}
	webinarAnswerDuration = 0;
	webinarAnswerDurationTimer = setInterval(function(){
		webinarAnswerDuration += 50;
	},50);
}

function postMessage_LoadSlide(index){
	//console.log("LoadSlide:"+index);
	updateSlideCounterDiv(index);
	
	if(index == parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1 ){
		return;
	}
	try{
		clearInterval(webinarAnswerDurationTimer);
	}catch(err){}
	webinarAnswerDuration = 0;
	webinarAnswerDurationTimer = setInterval(function(){
		webinarAnswerDuration += 50;
	},50);
	Reveal.slide(index);
	
}
function postMessage_checkAnswer(){
	if(isTouchEvent()){
		$("#bottomBarButton").trigger('touchend');
	}else{
		$("#bottomBarButton").click();
	}
	
	console.log("webinarAnswerDuration:"+webinarAnswerDuration);
	clearInterval(webinarAnswerDurationTimer);
	try{
		Android.AnswerTime(webinarAnswerDuration);
	}catch(err){}
}

function postMessage_showLeaderboard(){
	$("#leaderBoard").html("");
	var responseData = {
					webinarId : webinarId
				};
	var getLeaderBoardDataById = firebase.app().functions("asia-east2").httpsCallable('getLeaderBoardDataById');
				getLeaderBoardDataById(responseData).then(function(result) {
					console.log("getLeaderBoardDataById:",result);
					var data = result.data.success;
					//data = data.sort( (a,b) => a.coins > b.coins );
					var html = '<div style="max-height:150px;overflow-y:auto;">';
					html += '<div style="font-size:16px;font-weight:bold;text-align:center;">Leaderboard</div>';
					for(var i=data.length-1;i>=0;i--){
						if(data[i].name == undefined){
							data[i].name = data[i].email;
						}
						html += '<div class="leaderBoardDiv" style="display:inline-block;text-align:center;margin: 8px;">';
						html += '<div style="position:relative;"><img src="/classroom/lessons/img/badge.png" style="width: 30px;display: inline-block;"/><div style="font-size:14px;margin-top: -28px;color:#FE5C57;left: 10px;top: 6px;">'+(data.length-i)+'</div></div>';
						html += '<div style="text-align: center;display: block;margin-top: 18px;"><div class="name" style="font-size: 14px;">'+data[i].name+'</div></div>';
						html += '</div>';
					}
					html += "</div>";
					$("#leaderBoard").html(html);
				}).catch(function(error) {
				  console.log(error);
				});
}

function getWonCoins(){
	return gameCoin;
}
function getCoinPerSlide(){
	return equivalent_positive_coins;
}

function getCurrentDateTime(){
	var d = new Date,
	dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
	return dformat;
}

function updateSlideCounterDiv(index){
	console.log("updateSlideCounterDiv:"+index);
	var countSlide = 0;
	$("#outerSlides section").each(function(){
		countSlide++;
	})
	countSlide--;
	$("#loadSlideDiv").text("Page:"+index+"/"+countSlide);
	console.log("index:"+index+"/"+parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber')));
}
function postMessage_endLesson(){
	var countSlide = 0;
	$("#outerSlides section").each(function(){
		countSlide++;
	});
	countSlide--;
	Reveal.slide(countSlide);
}

var warningTimer;
var slideTimeInterval;
var timeElapsed = 0;
function postMessage_startTimer(time){
	
	console.log("postMessage_startTimer:"+time);
	time = time*1000;
	timeElapsed = 0;
	var warningTime = 3000;
	clearInterval(slideTimeInterval);
	clearInterval(warningTimer);
	var bgGradient = "linear-gradient(to bottom, rgba(158,205,161,1) 0%,rgba(14,156,145,1) 100%)";
	$(".present").find(".timerDiv").css("background",bgGradient);
	if($(".present").attr("isplayedonce") == undefined){
		
	}else{
		return;
	}
	if($(".present").hasClass("SlideType_LearningTextOptionsTemplate")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present .SlideType_Choose_2_without_Top_Photo_Div").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
		
	}else if($(".present").hasClass("SlideType_MultipleCorrectTemplate")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present .SlideType_Choose_Multiple_Div").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
		
	}else if($(".present").hasClass("SlideType_Missing_Word")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present .SlideType_Missing_Word_Div").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
	}else if($(".present").hasClass("SlideType_Jumble_Slide")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present #jumbleTarget li").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
					$(".present #jumbleSource li").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
	}else if($(".present").hasClass("SlideType_PronunciationTemplate")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present .SlideType_Choose_2_without_Top_Photo_Div").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
	}else if($(".present").hasClass("SlideType_ListenableTranslation")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present #SlideType_ListenableTranslation_InputBox").attr("readonly","true");
					$(".present #SlideType_ListenableTranslation_InputBox").css("opacity",".5");
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
	}else if($(".present").hasClass("SlideType_LearningTypingTemplate")){
		var counter = time;
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			$(".present").find(".timerDiv").css("display","");
			$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			if(counter == 0){
				if(!timerOn){
					$(".present #SlideType_Transaltion_Box_InputBox").attr("readonly","true");
					$(".present #SlideType_Transaltion_Box_InputBox").css("opacity",".5");
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
	}else if($(".present").hasClass("SlideType_AeroplaneTemplate")){
		var counter = time;
		$(".present").find(".flag").css("opacity","0");
		$(".present").find(".aeroplane").css({});
		$(".present").find(".aeroplane").css("left","0px");
		
		$(".present").find(".aeroplane").addClass("upDown animationDuration1500ms infiniteIteration");
		$(".present").find(".aeroplane").animate({
			left : ($(".present").find(".sectionInnerContainer").width() - 100)+"px"
		}, time);
		slideTimeInterval = setInterval(function(){
			counter -= 10;
			//$(".present").find(".timerDiv").css("display","");
			//$(".present").find(".timerDiv").css("height",(counter*100/time)+"%");
			timeElapsed += 10;
			/*
			if((time - timeElapsed) == warningTime){
				var flag = 0;
				warningTimer = setInterval(function(){
					if(flag == 0){
						flag = 1;
						$(".present").find(".timerDiv").css("background","#FE5C57");
					}else{
						flag = 0;
						$(".present").find(".timerDiv").css("background","rgba(0,0,0,.2)");
					}
				},250,0);
			}
			*/
			if(counter == 0){
				if(!timerOn){
					$(".present .SlideType_Aeroplane_Div").each(function(){
						$(this).attr("isEnable","false");
						$(this).css("opacity",".5");
					});
				}
				clearInterval(slideTimeInterval);
				clearInterval(warningTimer);
				if(timerOn){
					postMessage_checkAnswer();
				}
			}
		},10);
		
	}
}

function postMessage_cancelTimer(){
	clearInterval(slideTimeInterval);
	$(".present").find(".timerDiv").css("display","none");
}

$(function(){
	console.log("isWebinar:"+isWebinar);
	if(isquizBuilder == "true"){
		isquizBuilder = true;
		$("#gameCoinDiv").css("display","none");
	}else{
		isquizBuilder = false;
	}
	if(isWebinar == "true"){
		isWebinar = true;
	}else{
		isWebinar = false;
		$("#loadSlideDiv").css("display","none");
	}
	if(timerOn == "true"){
		timerOn = true;
		equivalent_positive_coins = parseInt(getUrlParam("maxCoinsPerQuestion","10"));
	}else{
		timerOn = false;
		$("#loadSlideDiv").css("display","none");
	}
	if(window.location.href.indexOf("studentAsyncQuiz") > -1){
		webinarId = window.location.href.split("/")[4].split("?")[0];	
		isAdmin = true;
		isBasicLesson = "true";
	}
	viewportwidth = window.innerWidth;
	viewportheight = window.innerHeight;
	courseId = getUrlParam("courseId","");
	lessonNumber = getUrlParam("lessonNumber",0);
	
	if(isTouchEvent()){
		$(".slideLeftArrow").attr("ontouchend","disableBackSlide();Reveal.navigateLeft();");
	}else{
		$(".slideLeftArrow").attr("onclick","disableBackSlide();Reveal.navigateLeft();");
	}
	if(parseInt(getUrlParam("coinWon",0)) > 0){
		gameCoin = parseInt(getUrlParam("coinWon",0));
		$("#gameCoinDiv").text(gameCoin);
		console.log("gameCoin:"+gameCoin);
	}else{
		try{
			if (typeof(Storage) !== "undefined") {
				if (localStorage[webinarId]) {
				  $("#gameCoinDiv").text(localStorage[webinarId]);
					gameCoin = parseInt(localStorage[webinarId]);
					console.log("gameCoin:"+gameCoin);
				}
			}
		}catch(err){}
	}
	
	try{
		if(webinar_user_name == "" || webinar_user_email == "" || webinar_user_employeeId == "" || webinar_user_organization == ""
			|| webinar_user_grade == "" || webinar_user_section == "" || webinar_user_phone == ""){
			if(localStorage["webinar_name"] != undefined){	
				webinar_user_name = localStorage["webinar_name"];
			}
			if(localStorage["webinar_email"] != undefined){	
				webinar_user_email = localStorage["webinar_email"];
			}
			if(localStorage["webinar_employeeId"] != undefined){	
				webinar_user_employeeId = localStorage["webinar_employeeId"];
			}
			if(localStorage["webinar_organization"] != undefined){	
				webinar_user_organization = localStorage["webinar_organization"];
			}
			if(localStorage["webinar_phone"] != undefined){	
				webinar_user_phone = localStorage["webinar_phone"];
			}
			if(localStorage["webinar_grade"] != undefined){	
				webinar_user_grade = localStorage["webinar_grade"];
			}
			if(localStorage["webinar_section"] != undefined){	
				webinar_user_section = localStorage["webinar_section"];
			}
			if(webinar_user_email == "" && webinar_user_phone != "" && webinar_user_phone != undefined){
				webinar_user_email = webinar_user_phone;
			}
		}
	}catch(err){}
	
	try{
		if(webinar_user_badge == ""){
			webinar_user_badge = localStorage["webinar_badge_"+webinarId];
		}
		if(webinar_user_badge != "" && webinar_user_badge != undefined){
			var badges = webinar_user_badge.split(",");
			for(var i=0;i<badges.length;i++){
				if(badges[i] != ""){
					//$("#badgeIconsDiv").append('<img src="/image/'+badges[i]+'.png" style="width:30px;height:30px;margin-left:2px;" />')
				}
			}
		}
	}catch(err){}
	
	fetchLessonDataFromFirestore(courseId,lessonNumber);
	
	/*
	for (var i = 0; i < dataArray.length; i++) {
		var arr = dataArray[i];
		var slide_type = arr[3];
		var arrData = $.parseJSON("[]");
		
		for (var j = 4; j < arr.length; j++) {

			if (arr(j) != null && arr(j) instanceof String){
				arr.put(j, arr(j).replaceAll("\n", "<br>"));
				arr.put(j, arr(j).replaceAll("\"", "'"));
				arr.put(j, arr(j).replace("^n^", "<br>"));
			}

			arrData.put(j - 4, arr(j));
		}
		
		if (slide_type.equalsIgnoreCase("INPUT")) {
			
		} else if (slide_type.equalsIgnoreCase("JELLY")) {
			
		} else if (slide_type.equalsIgnoreCase("CHOOSE 4")) {
			if (arrData(17).trim().toLowerCase().contains("without")) {
			}else{
				
			}
		} else if (slide_type.equalsIgnoreCase("CHOOSE 2") || slide_type.equalsIgnoreCase("VIDEO SLIDE")) {
			if (arrData(90).trim().toLowerCase().contains("without") || arrData(90).trim().equalsIgnoreCase("no")) {
			}else{
				
			}
		} else if (slide_type.equalsIgnoreCase("MISSING WORD")) {
			
		} else if (slide_type.equalsIgnoreCase("TRANSLATION BOX")) {
		
		} else if (slide_type.equalsIgnoreCase("TIP SLIDE")) {
			
		} else if (slide_type.equalsIgnoreCase("JUMBLE")) {
			
		} else if (slide_type.equalsIgnoreCase("SUMMARY")) {
			
		} else if (slide_type.equalsIgnoreCase("DIALOG")) {
			
		} else if (slide_type.equalsIgnoreCase("SPECIAL SLIDE")) {
			
		} else if (slide_type.equalsIgnoreCase("LISTENABLE TRANSLATION")) {
			
		} else if (slide_type.equalsIgnoreCase("COMBINED TRANSLATION")) {
			
		} else if (slide_type.equalsIgnoreCase("PRONUNCIATION")) {
			
		}else if(slide_type.equalsIgnoreCase("IMAGE TIP SLIDE")){
			
		}
	}
	*/
	
});

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

function toggleteacherNotes(_this){
	console.log("toggleteacherNotes",$(_this).next().css('display'));
	if($(_this).next().css('display') == 'none'){
		$(_this).next().css('display','block');
		$(_this).text("Hide Notes");
	}else{
		$(_this).next().css('display','none');
		$(_this).text("Show Notes");
	}
}

function startFasterFingersDataListner(){
	var listner2 = db.collection("liveAppSessionQuizResponse").doc(webinarId)
				.onSnapshot(function (doc) {
					console.log("liveAppSessionQuizResponse:",doc.data());
					var data = doc.data();
					for (key in data) {
					  try {
						  var key = parseInt(key);
						  if(data[key].topScorer != undefined && data[key].topScorer.length >= 3){
							  //console.log("liveAppSessionQuizResponse:"+key,data[key].topScorer);
							  for(var i=0;i<data[key].topScorer.length;i++){
								  //console.log("liveAppSessionQuizResponse:"+data[key].topScorer[i].name+"/"+data[key].topScorer[i].email);
								  $("#slide"+(key+1)+" .fastestFingerContainer table td:eq("+i+")").find(".name").text(data[key].topScorer[i].name.split(" ")[0]);
								  //$("#slide"+(key+1)+" .fastestFingerContainer table td:eq("+i+")").find(".email").text(data[key].topScorer[i].email);
							  }
							  if($(".present").attr("isPlayedOnce") != undefined){
								$("#slide"+(key+1)+" .fastestFingerContainer").slideDown();  
							  }
							  $("#slide"+(key+1)).attr("fastestFinger","true");
						  }
						} catch (e) {
							console.log(e);
						}
					}
				});
}

function fetchLessonDataFromFirestore(courseId,lessonNumber){
	console.log("fetchLessonDataFromFirestore courseId:"+courseId);
	if(isBasicLesson == "true" || isBasicLesson == true){
		var listener = db.collection("courseJSON").doc(courseId)
			.onSnapshot(function(querySnapshot) {
				console.log("fetchLessonDataFromFirestore",querySnapshot.data());
				dataArray = $.parseJSON(querySnapshot.data().json);
				loadAllSlides();
				setTimeout(function(){
					listener();
				},500);
			});
	}else if(getUrlParam("isLessonGenerator","") == "true"){
		var listener = db.collection("createdLessonData").doc(courseId)
			.onSnapshot(function(querySnapshot) {
				console.log("fetchLessonDataFromFirestore",querySnapshot.data());
				dataArray = $.parseJSON(querySnapshot.data().json);
				loadAllSlides();
				setTimeout(function(){
					listener();
				},500);
			});
	}else{
		var listener = db.collection("courseLessonsJSON").doc(courseId).collection("lessons").doc(lessonNumber)
			.onSnapshot(function(querySnapshot) {
				console.log("fetchLessonDataFromFirestore",querySnapshot.data().json);
				dataArray = $.parseJSON(querySnapshot.data().json);
				loadAllSlides();
				setTimeout(function(){
						listener();
					},500);
			});
	}
}

function loadAllSlides(){
	//dataArray = $.parseJSON('[{ "slide": 2, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "endTime": "97000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["Intonation patterns", "-1", "Longer and shorter sounds", ""] ] } }, { "slide": 3, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "startTime": "98000", "endTime": "130000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["English", "-1", "a language", ""], ["Communication", "-1", "exchanging of information by speaking, writing, or using some other medium", ""] ] } }, { "slide": 4, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "startTime": "140000", "endTime": "182000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["Content words", "-1", "nouns, verbs, adjectives, adverbs(words that carry meaning)", ""], ["Function words", "-1", "articles and prepositions", ""] ] } }, { "slide": 5, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "startTime": "189000", "endTime": "219000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["Intonation & stress words", "-1", "through intonation we express emotions, intentions and attitudes", ""] ] } }, { "slide": 6, "template": "PronunciationTemplate", "slide_id": "", "data": { "heading": "<left>Choose the correct pronunciation of</left> speaking <right>?</right>", "correctIndex": 1, "options": [ ["speaking_c.mp3", ""], ["speaking_w.mp3", ""] ] } }, { "slide": 7, "template": "PronunciationTemplate", "slide_id": "", "data": { "heading": "<left>Choose the correct pronunciation of</left> understand <right>?</right>", "correctIndex": 1, "options": [ ["understand_c.mp3", ""], ["understand_w.mp3", ""] ] } }, { "slide": 8, "template": "PronunciationTemplate", "slide_id": "", "data": { "heading": "<left>Choose the correct pronunciation of</left> video <right>?</right>", "correctIndex": 1, "options": [ ["video_c.mp3", ""], ["video_w.mp3", ""] ] } }, { "slide": 9, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> Is English a stress-timed language? <right></right>", "correctIndex": 1, "options": [ ["Yes", ""], ["No", ""] ] } }, { "slide": 10, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> In a stress-timed language, what happens on the beat? <right></right>", "correctIndex": 1, "options": [ ["Stressed sounds", ""], ["Unstressed sounds", ""] ] } }, { "slide": 11, "slide_id": "", "template": "NativeTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> When we use stressed and unstressed sounds, what does that create? <right></right>", "correctIndex": 1, "options": [ ["Rhythm", ""], ["Intonation", ""] ] } }, { "slide": 12, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> What do we call the melody of our speech? <right></right>", "correctIndex": 1, "options": [ ["Intonation", ""], ["Rhythm", ""] ] } }, { "slide": 13, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> In the word “English,” which syllable is stressed? <right></right>", "correctIndex": 1, "options": [ ["The first: En-", ""], ["The second: -glish", ""] ] } }]');	
	//dataArray = $.parseJSON('[{ "slide": 12, "slide_id": "RETA1479707503213", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "You can", "text_2": "these points on your next purchase.", "correctIndex": 1, "options": [ ["redeem", ""], ["condemn", "The correct term to be used will be \'redeem\'. \'Redeem\' = gain or regain possession of (something) in exchange for payment. Whereas, \'condemn\' = express complete disapproval of."] ] } }, { "slide": 13, "template": "JumbleTemplate", "slide_id": "RETA1479707529922", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "You can redeem these points in your next purchase", "options": ["these points", "next purchase", "you can", "redeem", "in your"] } }, { "slide": 14, "template": "DialogTemplate", "slide_id": "RETA1479707544971", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Excuse me. Where is the fitting room?", ""], ["", "It\'s right over there, madam.", ""], ["", "They fit just right. I\'ll buy them!", ""], ["", "Great! May I please request you to go to the tills, and pay over there. ", ""], ["", "Your total comes to Rs. 3500, madam. How would you like to pay? Will that be cash or credit?", ""], ["", "Can I pay by cheque please?", ""], ["", "No, madam. I am afraid we don\'t accept cheques.", ""], ["", "All right. I will pay by cash.", ""] ] } }, { "slide": 15, "template": "DialogTemplate", "slide_id": "RETA1479707546336", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Do you have a loyalty card with us, madam?", ""], ["", "No, I don\'t. What is that?", ""], ["", "If you get a card made, you can save 10 percent on all your purchases today. We are also offering 6 months credit, with no deposit.", ""], ["", "Not today. Thanks though.", ""], ["", "No problem, madam. We always have this offer, so whenever you decide to, just let us know.", ""], ["", "Sure. ", ""], ["", "Would you like a bag?", ""], ["", "Yes, of course.", ""], ["", "All right, madam. Shall I put your receipt in the bag?", ""] ] } }, { "slide": 16, "template": "DialogTemplate", "slide_id": "RETA1479707547532", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "OK. I was looking at some of the pants, but they are all a bit too long. Do you have alteration services here?", ""], ["", "Certainly, madam. I would like to inform you that there are additional charges, rupees 50 for the alteration. ", ""], ["", "Oh, all right. And when can I get the pants?", ""], ["", "It will take one day, madam.", ""], ["", "All right. Thank you.", ""], ["", "You\'re welcome, madam. Have a nice day!<br>", ""] ] } }, { "slide": 17, "slide_id": "RETA1479707570920", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Would you pay by cash or by card?", ""], ["Would you pay by using cash or by card?", "There is no need of the word \'using\'. As to pay by the means of something already means pay using it. Here, \'Using\' is redundant."] ] } }, { "slide": 18, "template": "LearningTextOptionsTemplate", "slide_id": "RETA1479707581684", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Here\'s your bill.", ""], ["Take your bill.", "With the customer one needs to be more polite."], ["Take yours bill.", "\'Yours\' is never used before a noun. It is generally used at the end of a sentence."], ["Your bill.", "This is not the appropriate way of talking to the customer."] ] } }, { "slide": 19, "slide_id": "RETA1479707606454", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "Please give me your card so that I can", "text_2": "it.", "correctIndex": 1, "options": [ ["swipe", ""], ["wipe", "\'Swipe\' = The passing of a card through an electronic reader."] ] } }, { "slide": 20, "template": "LearningTextOptionsTemplate", "slide_id": "RETA1479707619247", "data": { "heading": "<left>Pick the appropriate response:</left>  <right></right>", "correctIndex": 1, "options": [ ["Madam, I would request you to please enter your PIN number into the machine please.", ""], ["Can you please enter your PIN into the machine?", "With the customer you need to be more polite and formal."], ["Enter your PIN into the machine.", "With the customer you need to be more polite and formal."], ["Will you enter your PIN into the machine.", "With the customer you need to be more polite and formal."] ] } }, { "slide": 21, "slide_id": "RETA1479707646392", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Madam, I would request you to please enter your PIN into the machine, please.", ""], ["Madam, I would request to you to please enter your PIN to the machine, please.", ""] ] } }, { "slide": 22, "template": "ListenableTypingTemplate", "slide_id": "RETA1479707657872", "data": { "textToBeTranslated": "receipt/ card payment/ here\'s your", "audioFileName": "receipt/ card payment/ here\'s your", "heading": "Rearrange the words to form a sentence.", "play_with_tts": "YES", "correctTranslations": ["Here\'s your card payment receipt."], "tips": ["", ""] } }, { "slide": 23, "slide_id": "RETA1479707670809", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Here\'s your card payment receipt.", ""], ["Here\'re your card payment receipt.", "Here we are talking about the payment receipt of just one card, so we will not use \'are\'. \'Here\'re\' is the contraction of \'here and are\'."] ] } }, { "slide": 24, "slide_id": "RETA1479707672054", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Please sign the copy and return it to me.", ""], ["Please signature the copy and return it to me.", "\'Signature\' cannot be used here. \'Signature\' is a handwritten (and often stylized) depiction of someone\'s name, nickname, or even a simple \'X\' or other mark that a person writes on documents as a proof of identity and intent. But when we sign, we write our name short and concise."] ] } }, { "slide": 25, "slide_id": "RETA1479707690957", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "May I please request you to go to the", "text_2": ", and pay over there.", "correctIndex": 1, "options": [ ["tills", ""], ["tiffs", "The correct term to be used will be \'tills\'. \'Tills\' = a box, case, or drawer into which the money taken from the customer is kept."] ] } }, { "slide": 26, "slide_id": "RETA1479707692221", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "I am", "text_2": "we don\'t accept cheques.", "correctIndex": 1, "options": [ ["afraid", ""], ["afraids", "The correct term to be used will be \'afraid\'. \'Afraid\' in this context is used to show a feeling of regret."], ["frightened", "The correct term to be used will be \'afraid\'. \'Afraid\' in this context is used to show a feeling of regret."] ] } }, { "slide": 27, "slide_id": "RETA1479707714453", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Do you have a loyalty card with us, madam?", ""], ["Do you have a liability card with us, madam?", "There is no such term as \'liability card\'. The correct term is \'loyalty card\' =  A swipe card issued by a supermarket or chain store to a customer, used to record credit points awarded for money spent in the store."] ] } }, { "slide": 28, "slide_id": "RETA1479707715660", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Would you like a bag?", ""], ["You would like a bag?", "In direct questions auxiliary (would) comes before the subject (you)."] ] } }, { "slide": 29, "template": "DialogTemplate", "slide_id": "RETA1479707733279", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Welcome to Shoppers Stop, sir. Are you next in the queue?", ""], ["", "Yes, I\'d like to buy this watch as a gift for my wife please.", ""], ["", "Certainly, sir. Would you like me to gift wrap it for you, sir?", ""], ["", "Yes please, that would be great.", ""], ["", "Are you sure this is the right size for your wife, sir?", ""], ["", "I\'m not sure, it\'s just a guess!", ""], ["", "In that case I can print a gift receipt so she doesn\'t see the price, but can bring it back to change the size if she needs to. Would you like me to do that, sir?", ""], ["", "Yes please, that would be amazing!", ""] ] } }, { "slide": 30, "template": "DialogTemplate", "slide_id": "RETA1479707734605", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Would you like me to put the gift receipt in the box with the watch?", ""], ["", "Yes please, that\'ll be perfect.", ""], ["", "Here you go, sir. Enjoy the rest of your day.", ""] ] } }, { "slide": 31, "slide_id": "RETA1479707743100", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the appropriate way to ask:</left>  <right></right>", "correctIndex": 1, "options": [ ["Are you next in the queue, sir?", ""], ["Are you next in the line, sir?", "\'Queue\' is correct to be used. As \'queues\' are formed when you\'re wanting to be served such as at a counter, or for admission."] ] } }, { "slide": 32, "slide_id": "RETA1479707744369", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the appropriate way to ask:</left>  <right></right>", "correctIndex": 1, "options": [ ["Would you like me to gift wrap it for you, sir?", ""], ["Do you want me to gift wrap it for you?", "You need to be more polite while talking to a customer."] ] } }, { "slide": 33, "template": "JumbleTemplate", "slide_id": "RETA1479707753260", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "Would you like me to put the gift receipt in the box with the watch?", "options": ["would you like me", "to put the gift", "with the watch?", "in the box", "receipt"] } }, { "slide": 34, "template": "JumbleTemplate", "slide_id": "RETA1479707754485", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "Would you like me to gift wrap it for you, sir?", "options": ["you like", "would", "for you, sir?", "me to", "gift wrap", "it"] } }, { "slide": 35, "template": "JumbleTemplate", "slide_id": "RETA1479707755663", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "Would you like that gift wrapped?", "options": ["you", "would", "wrapped?", "like that", "gift "] } }, { "slide": 36, "template": "DialogTemplate", "slide_id": "RETA1479707771973", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Sir, may I please request you to mind the queue.", ""], ["", "But I am in a rush.", ""], ["", "I understand, sir. But there are other customers ahead of you. I kindly urge you to please mind the queue. Thank you for your patience.", ""] ] } }, { "slide": 37, "slide_id": "RETA1479707779890", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Sir, I urge you to please mind the queue.", ""], ["Sir, I command you to please mind the queue.", "We can never \'command\' a customer. We can always \'urge\' them politely make a request to mind the queue."] ] } }, { "slide": 38, "slide_id": "RETA1479707781251", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Please wait for your turn, madam.", ""], ["Please can you wait for your turn, madam.", "This doesn\'t seem polite or formal."] ] } }]');
	console.log("dataArray",dataArray);
	render_1stSlide();
	
	var counter1 = 0;
	for (var i = 0; i < dataArray.length; i++) {
		var obj = dataArray[i];
		var slide_type = obj["template"];
		if(slide_type == "NativeVideoJellyTemplate" || slide_type == "JellyTemplate"){
			render_NativeVideoJellyTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "PronunciationTemplate"){
			render_PronunciationTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "LearningTextOptionsTemplate" || slide_type == "NativeTextOptionsTemplate"){
			render_LearningTextOptionsTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "MultipleCorrectTemplate"){
			render_MultipleCorrectTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "AeroplaneTemplate"){
			render_AeroplaneTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "TipTemplate" || slide_type == "ImageTipTemplate"){
			render_TipTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "DialogTemplate"){
			render_DialogTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "LearningTypingTemplate"){
			render_LearningTypingTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "ListenableTypingTemplate"){
			render_ListenableTypingTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "DropdownTemplate"){
			render_DropdownTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "JumbleTemplate"){
			render_JumbleTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "TableTemplate"){
			render_TableTemplate(counter1,obj);
			counter1++;
		}else if(slide_type == "TableTemplate"){
			render_TableTemplate(counter1,obj);
			counter1++;
		}else{
			render_DummyTemplate(counter1,obj);
			counter1++;
			slideCount++;
		}
	}
	if(timerOn){
		$(".slides section").each(function(){
			var html = "";
				html += '<div class="fastestFingerContainer">'
							+'<div style="text-align: center;font-size:20px;padding:0px;color:#fff;display:none;">Fastest Fingers</div>'
							+'<table><tr>'
								+'<td>'
									+'<div style="position:relative;"><img src="/classroom/lessons/img/badge.png" /><div style="font-size:14px;position:absolute;color:#FE5C57;left: 10px;top: 6px;">1</div></div>'
									+'<div style="text-align: center;display: block;"><div class="name"></div><div class="email"></div></div>'
								+'</td>'
								+'<td>'
									+'<div style="position:relative;"><img src="/classroom/lessons/img/badge.png" /><div style="font-size:14px;position:absolute;color:#FE5C57;left: 11px;top: 6px;">2</div></div>'
									+'<div style="text-align: center;display: block;"><div class="name"></div><div class="email"></div></div>'
								+'</td>'
								+'<td>'
									+'<div style="position:relative;"><img src="/classroom/lessons/img/badge.png" /><div style="font-size:14px;position:absolute;color:#FE5C57;left: 11px;top: 6px;">3</div></div>'
									+'<div style="text-align: center;display: block;"><div class="name"></div><div class="email"></div></div>'
								+'</td>'
							+'</tr></table>'
						+'<img class="closeIcon" onclick="$(this).parent().slideUp();" src="https://storage.helloenglish.com/English-Web/images/ic_clear_white_24dp_2x.png" />'
						+'</div>';
			$(this).append(html);
		});
		startFasterFingersDataListner();
	}
	
	for(var i=0;i<TTSWordsArray.length;i++){
		loadAudio(TTSWordsArray[i],i+1);
	}
	if(!isquizBuilder){
		render_SlideType_Last_Slide(dataArray.length);
	}
	
	initializeReveal();
	
	if(getUrlParam("slide","") != ""){
		Reveal.slide(getUrlParam("slide",""));
	}
	orientationChanged = "false";
	if( (getUrlParam("isAdmin","") == "true" || isquizBuilder) && getUrlParam("isAdminPreview","") == "false"){
		$(".toggleteacherNotes").addClass("toggleteacherNotesShow");
		$(".toggleteacherNotes").each(function(){
			$(this).click();
		});
	}
	if(getUrlParam("hideBottomBar","") == "true"){
		$(".bottomBar").css("display","none");
		$(".sectionInnerContainer").css("height","100vh!important");
		$(".sectionInnerContainer").addClass("sectionInnerContainerFullHeight");
		//$(".progress").css("visibility","hidden");
	}
	if(isWebinar){
		$(".hideIfWebinar").css("display","none");
		updateSlideCounterDiv(parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1);
	}
	if(getUrlParam("isPresentation","") == "true"){
		$(".bottomBar").css("display","none");
		$(".slides section").removeClass("past present future");
		$(".slides section .notes").css("display","none");
		$(".slides section .sectionInnerContainer ").css("text-align","center");
		$(".slides section").css(
				{"display": "inline-block",
				"margin-right": "16px",
				"width": "960px",
				"border": "1px solid #aaa"}
				);
		$(".slides").removeClass("slides");
		var counter = 0;
		$("#outerSlides").css("width",getSlideCount()*1200+"px").css("zoom",".4").css("height","auto").css("-moz-transform","scale(.4)").css("-moz-transform-origin","top left");
		$(".reveal").css({"display": "inline-block",
				"height" : "auto",
				"overflow-x": "scroll",
				"overflow-y": "hidden"}
				);
		$(".backgrounds").remove();
		$( "#outerSlides").sortable();
		$( "#outerSlides").disableSelection();
		$( "#outerSlides").sortable({
		  stop: function( event, ui ) {
			  console.log("sortableDivContainer stop");
		  }
		});
	}
	
}

function render_1stSlide(){
	var html = "";
	html += '<section id="slide1" class="slideType_First_Slide" slideType="slideType_First_Slide" slideNumber="1" data-background="#fff">'
				+'<div class="sectionInnerContainer">';
					if(isInLessonTest == "true"){
						html += '<table style="margin:auto;text-align:center;height:100%;">'
							+'<tr>'
								+'<td style="text-align:center;">'
									+'<div class="slideType_First_Slide_Lesson_Number" style="text-align:center;display:none;">Start Test</div>'
									+'<div style="text-align:center;"><img style="width:100px;margin-bottom:20px;" src="//storage.helloenglish.com/English-Web/images/exam_icon.png" /></div>'
									+'<div style="font-size: 20px!important;text-align:center;" class="slideType_First_Slide_LessonTitle"><%=appStringObject.getString("591")%></div>';
									if(!isWebinar){
									html +='<input style="margin-top: 10px!important;" onclick="Reveal.navigateNext();try {FbPlayableAd.onCTAClick(); } catch(err) { }"'
										+'class="greenButton startLessonButton appStringValue" type="button"'
										+'value="<%=appStringObject.getString("592") %>">';
									}
								html += '</td>'
							+'</tr>'
						+'</table>';
					}else if(isInitialTest == "true"){
						html += '<table style="margin:auto;text-align:center;height:100%;">'
							+'<tr>'
								+'<td style="text-align:center;">'
									+'<div style="font-size: 30px!important;text-align:center;" class="slideType_First_Slide_LessonTitle"><%=appStringObject.getString("357")%></div>'
									+'<input style="margin-top: 20px!important;" onclick="Reveal.navigateNext()"'
										+'class="greenButton startLessonButton appStringValue" type="button"'
										+'value="<%=appStringObject.getString("358") %>">'
								+'</td>'
							+'</tr>'
						+'</table>';
					}else{
						html += '<table style="margin:auto;text-align:center;height:100%;">'
							+'<tr>'
								+'<td style="text-align:center;">'
									+'<div style="text-align: center;margin-bottom: 10px;"><img alt="" src="https://storage.helloenglish.com/English-Web/images/favicon-96x96.png" style="width: 50px; height: 50px; cursor: pointer;"></div>'
									+'<div class="slideType_First_Slide_Lesson_Number" style="display:none;">Lesson '+lessonNumber+'</div>'
									+'<div class="slideType_First_Slide_LessonTitle" style="display:none;">Lesson Title</div>';
									if(!isWebinar){
										html+='<input onclick="Reveal.navigateNext()" class="greenButton startLessonButton appStringValue" type="button"'
											+'value="Start">';
									}
								html+='</td>'
							+'</tr>'
						+'</table>';
					}
						
				html += '</div>';
				
				slideCount++;
				
			html += '</section>'+
		
		$(".slides").append(html);
}

function render_DummyTemplate(i,obj){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Dummy_Slide" slideType="SlideType_Dummy_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer"  style="position:relative;overflow-y:auto;">'
					+'<div class="SlideType_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9;overflow:hidden;margin: auto;">'
						+'<div class="titleText" style="padding: 30px 0px; color: #49C9AF !important; font-size: 30px;">Page not supported on this version'
						+'</div>'
						+'<div class="SlideType_Tip_Slide_tipText" style="width: 100%; font-size: 30px;"></div>'
					+'</div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Last_Slide(i){
	var html = "";
		html += '<section id="slide('+(i+2)+')" class="SlideType_Last_Slide" slideType="SlideType_Special_Slide" slideNumber="'+(i+2)+'"	data-background="#fff">';
			
			html += '<div class="sectionInnerContainer" onclick="" style="overflow:auto;"><table style="width: 100%;height: 100%;border-collapse: collapse;">'
					+'<tr>'
						+'<td>'
							+'<div style="text-align: center;">'
								+'<img class="hideIfWebinar" style="width: 50px;cursor: pointer;vertical-align: middle;" onclick="window.location=\'https://helloenglish.com\'" src="https://storage.helloenglish.com/English-Web/images/hlogo.png"/>'
								+'<div class="hideIfWebinar" style="margin-top: 32px;font-family:Roboto Condensed, sans-serif;vertical-align: middle;font-size: 24px;">'
									+'Get the Hello English App<br>'
									+'Start learning English for free!'
								+'</div>'
							+'</div>'
						+'</td>'
					+'</tr>'
					+'<tr><td style="width:100%;background: rgba(248, 177, 111, .5);height: 125px;text-align:center;"><img src="/classroom/lessons/img/endslide_coins.png" style=" width: 100px; margin-left: 32px; "><div id="coinsWonCount" style="display:inline-block;font-size:30px;color:#FE5C57;margin-left: 32px;margin-right: 32px;">0 Coins Won</div></td></tr>'
					+'<tr><td id="leaderBoard"></td></tr>'
					+'<tr>'
						+'<td style="text-align: center;vertical-align: initial;margin-top: 16px;padding-top:16px;">'
							+'<img class="appleDownload hideIfWebinar" style="width: 150px;cursor: pointer;display: inline-block;margin-top: 16px;" onclick="openDownloadLink()" src="https://storage.helloenglish.com/English-Web/images/AP_download_badge.png"/>'
							+'<img class="androidDownload hideIfWebinar" style="width: 150px;cursor: pointer;display: inline-block;margin-top: 16px;margin-left: 5px;" onclick="openDownloadLink()" src="https://storage.helloenglish.com/English-Web/images/GP_download_badge.png"/>'
						+'</td>'
					+'</tr>'
				+'</table></div>';
			html += '<div class="coinStackAnimationScreen" style="position:absolute;top:0px;display:none;background: rgba(0,0,0,.5);text-align: center;margin: auto;width:100%;height:100%;z-index:2000;">'
				+'<table class="taskBlueStripTable" style="width:100%;height:100%;position:absolute;z-index:10;">'
					+'<tr>'
						+'<td>'
							+'<table class="taskBlueStrip animated" style="margin: auto;">'
								+'<tr>'
									+'<td>'
										+'<div style="width:400px;text-align:center;">'
											+'<div style="color:#FE5C57;font-size:25px;">Lesson completed</div>'
											+'<div style="color:#F8CE46;font-size:20px;margin-top:10px;"></div>'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'		
						+'</td>'
					+'</tr>'
				+'</table>'
				+'<div class="coinStackContainer" style=" position: relative; height: 100%;width:100%; max-width: 500px; margin: auto;">'
					+'<div>'
						+'<img class="coinInStack animated" style="bottom:50px;margin-left: -50px;z-index:1;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:100px;margin-left: -105px;z-index:2;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:70px;margin-left: 25px;z-index:3;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:65px;margin-left: -35px;z-index:6;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: 10px;z-index:5;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:115px;margin-left: -100px;z-index:4;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: -50px;z-index:7;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:95px;margin-left: -45px;z-index:8;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:110px;margin-left: -40px;z-index:9;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:130px;margin-left: -40px;z-index:10;" src="/classroom/lessons/img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:145px;margin-left: -50px;z-index:11;" src="/classroom/lessons/img/flat_coin.png">'
					+'</div>'
				+'</div>'
			+'</div>';
		+'</section>';
		
		$(".slides").append(html);
}


function render_slideType_Input(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="slideType_Input" slideType="slideType_Input" slideNumber="'+(i + 2)+'" data-autoslide="" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="titleText" style="padding-top: 100px !important; max-width: 790px; margin: auto;"></div>'
					+'<div class="nameInputBox">'
						+'<input id="slideType_Input_inputText" class="appStringPlaceholder" type="text" placeholder="'+document.write(getappStringObject("58"))+'">'
					+'</div>'
					+'<div class="monsterBarNotification" style="margin-top: 52px !important;">'
						+'<div class="notificationTipBox" style="position: absolute; font-size: 16px; width: 162px; line-height: normal; background: #7f7f7f; border-radius: 4px; padding: 10px; right: 190px; margin-top: 10px; color: #fff;line-height: 1.2em!important;">'
							+'<span class="notificationTipBoxText" style="color: #fff;"></span>'
							+'<img	style="width: 50px; position: absolute; right: -23px; top: 20px; z-index: -1;" src="../../../InteractiveLessons/img/call-out 300px.png">'
						+'</div>'
						+'<img class="monsterBarNotificationImage" style="width: 75px; position: absolute; transform: rotate(-20deg); right: 100px; margin-top: 60px; z-index: 1;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small.png">'
					+'</div>'
				+'</div>';
				
			     var slideType_Input_TitleText = arrData(0);
			     var variableName = arrData(112);
			     var slideType_Input_TipText = getappStringObject("68");
			     lessonFunctionCallVar[slideCount] = new slideType_Input_Function("slide"+(i+2),slideType_Input_TitleText,slideType_Input_TipText,variableName);
			     slideCount++;
			    
			html += '</section>'+
			
		$(".slides").append(html);
}


function render_SlideType_Jelly(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Jelly" slideType="SlideType_Jelly" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">';
				if(arrData(195).equalsIgnoreCase("")){
					html += '<div class="" style="width: 100%;display: inline-block;vertical-align: top!important;margin-top: 32px;height: 100%;overflow: auto;">'
							+'<div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;"></div>'
						+'</div>';
				}else{
					html += '<div class="videoContainer" style="display:inline-block;width:45%;"></div>'
					+'<div class="questionContainer" style="width: 50%;display: inline-block;vertical-align: top!important;margin-top: 32px;height: 100%;overflow: auto;">'
						+'<div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;"></div>'
					+'</div>';				
				}
					
					html += '<img src="../../../InteractiveLessons/img/yellow-arrow.png" class="yellow-arrow yellow-arrow-upward" style="display: none; position: absolute; top: 200px; left: 400px; z-index: 1000; display: none;">'
					+'<div class="monsterBarNotification" style="margin-top: 205px !important;">'
						+'<div class="notificationTipBox" class="tipText" style="position: absolute; font-size: 15px; width: 162px; line-height: normal; background: #7f7f7f; border-radius: 4px; padding: 10px; right: 190px; margin-top: 10px; color: #fff;line-height: 1.2em!important;">'
							+'<span class="notificationTipBoxText" style="color: #fff;"></span>'
							+'<img style="width: 50px; position: absolute; right: -23px; top: 20px; z-index: -1;" src="../../../InteractiveLessons/img/call-out 300px.png">'
						+'</div>'
						+'<img class="monsterBarNotificationImage" style="width: 75px; position: absolute; transform: rotate(-20deg); right: 100px; margin-top: 60px; z-index: 1;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small.png">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Jelly_TipText = getappStringObject("77");
			     var SlideType_Jelly_Video_Url = arrData(195);
			     var dataString = arrData(1)+"*&"+arrData(2)+"*&"+arrData(3)+"*&"+arrData(4)+"*&"+arrData(5)+"*&"+arrData(6)+"*&"+arrData(7)+"*&"+arrData(8)+"*&"+arrData(9)+"*&"+arrData(10)+"*&"+arrData(11)+"*&"+arrData(12)+"*&"+arrData(13)+"*&"+arrData(14)+"*&"+arrData(15);
			     lessonFunctionCallVar[slideCount] = new SlideType_Jelly_Function("slide"+(i + 2),SlideType_Jelly_TipText,dataString,SlideType_Jelly_Video_Url);
			     slideCount++;
			    
			html += '</section>';
			
		$(".slides").append(html);
}

function render_SlideType_Choose_4_without_Image(arrData){
		var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_4_without_Image" slideType="SlideType_Choose_4_without_Image" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer" style="overflow-y: auto!important;">'
					+'<div style="padding: 30px 0px;">'
						+'<div>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;">'
									+'</td>'
								+'</tr>'
							+'</table>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;">'
										+'<span class="SlideType_Choose_4_without_Image_QuestionText" style="font-size: 24px; margin-left: 50px;width:100%!important;"></span> '
										+'<span class="SlideType_Choose_4_without_Image_QuestionText_WhenHidden appStringSpan" style="display: none; font-size: 22px; margin-left: 50px;"><%=getappStringObject("84") %></span></td>'
									+'<td style="width: 50px;">'
										+'<div id="SlideType_Choose_4_without_Image_Listen_QuestionText" class="animated pulse" style="display: none; text-align: center; cursor: pointer; height: 50px; float: left; width: 50px; border-top-left-radius: 100px; border-top-right-radius: 100px; border-bottom-right-radius: 100px; border-bottom-left-radius: 100px; display: block; background: rgb(73, 201, 175);">'
											+'<img style="margin-top: 13px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
					+'<div style="width: 98%;">'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option1">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
										+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div>'
									+'</td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option2">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option3">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
										+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option4">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
				+'</div>';
				
				     var SlideType_Choose_4_without_Image_Question = "";
				     if(arrData(111).equalsIgnoreCase("")){
				     	SlideType_Choose_4_without_Image_Question = " <span style='color:#FE5C57'>"+arrData(137)+"</span> "+arrData(111)+" <span style='color:#FE5C57'>"+arrData(138)+"</span>";
				     }else{
						SlideType_Choose_4_without_Image_Question = " <span style='color:#FE5C57'>"+arrData(137)+"</span>"+arrData(111)+" <span style='color:#FE5C57'>"+arrData(138)+"</span>";
				     }
				     var SlideType_Choose_4_without_Image_option_String = arrData(18)+"*&"+arrData(22)+"*&"+arrData(19)+"*&"+arrData(23)+"*&"+arrData(20)+"*&"+arrData(24)+"*&"+arrData(21)+"*&"+arrData(25);
				     var SlideType_Choose_4_without_Image_Answer = "option"+arrData(30);
				     var SlideType_Choose_4_without_Image_Question_Type = arrData(16);
				     var SlideType_Choose_4_without_Image_Question_Display_Flag = arrData(115);
				     var SlideType_Choose_4_without_Image_Answer_Type = arrData(113);
				     //console.log(slideCount+" / SlideType_Choose_4_without_Image_Answer_Type: "+SlideType_Choose_4_without_Image_Answer_Type)
				     lessonFunctionCallVar[slideCount] = new SlideType_Choose_4_without_Image_Function("slide"+(i + 2),SlideType_Choose_4_without_Image_Question,SlideType_Choose_4_without_Image_option_String,SlideType_Choose_4_without_Image_Answer,SlideType_Choose_4_without_Image_Question_Type,SlideType_Choose_4_without_Image_Question_Display_Flag,SlideType_Choose_4_without_Image_Answer_Type);
				     slideCount++;
				     
			html += '</section>';
			
		$(".slides").append(html);
}

function render_SlideType_Choose_4_with_Image(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_4_with_Image" slideType="SlideType_Choose_4_with_Image" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 30px 0px;">'
						+'<br> <span class="SlideType_Choose_4_with_Image_QuestionText" style="font-size: 30px;"></span>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option1">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option2">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option3">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option4">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
					+'</div>'
				+'</div>';
				
				         var SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData(137)+"</span> '"+arrData(111)+"' <span style='color:#FE5C57'>"+arrData(138)+"</span>";
				         if(arrData(111).equalsIgnoreCase("")){
				         SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData(137)+"</span> "+arrData(111)+" <span style='color:#FE5C57'>"+arrData(138)+"</span>";
					     }else{
					     SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData(137)+"</span> '"+arrData(111)+"' <span style='color:#FE5C57'>"+arrData(138)+"</span>";
					     }
				         var SlideType_Choose_4_with_Image_Option_String = arrData(18)+"*&"+arrData(26)+"*&"+arrData(22)+"*&"+arrData(19)+"*&"+arrData(27)+"*&"+arrData(23)+"*&"+arrData(20)+"*&"+arrData(28)+"*&"+arrData(24)+"*&"+arrData(21)+"*&"+arrData(29)+"*&"+arrData(25);
					     var SlideType_Choose_4_with_Image_Answer = "option"+arrData(30);
					     var SlideType_Choose_4_with_Image_Question_Type = arrData(16);
					     var SlideType_Choose_4_with_Image_Question_Display_Flag = arrData(115);
					     var SlideType_Choose_4_with_Image_Answer_Type = arrData(113);
					     var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/"+userLang.split("_")[0].toLowerCase() +"/";
					     if(isB2BUser || language == "triviagame"){
					     	var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/"+language.toLowerCase() +"/";
						 }
					     lessonFunctionCallVar[slideCount] = new SlideType_Choose_4_with_Image_Function("slide"+(i + 2),SlideType_Choose_4_with_Image_QuestionText,SlideType_Choose_4_with_Image_Option_String,SlideType_Choose_4_with_Image_Answer,SlideType_Choose_4_with_Image_Question_Type,SlideType_Choose_4_with_Image_Question_Display_Flag,SlideType_Choose_4_with_Image_Answer_Type,imageFolder);
					     slideCount++;
					     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Choose_2_without_Top_Photo(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_2_without_Top_Photo" slideType="SlideType_Choose_2_without_Top_Photo" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 60px 0px;">'
						+'<div>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;">'
									+'</td>'
								+'</tr>'
							+'</table>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;"><span style="display: none;" class="SlideType_Choose_2_without_Top_Photo_title"></span> <span class="SlideType_Choose_2_without_Top_Photo_QuestionText" style="font-size: 30px; margin-left: 50px;"></span> <span class="SlideType_Choose_2_without_Top_Photo_QuestionText_WhenHidden appStringSpan"'
										+'style="display: none; font-size: 30px; margin-left: 50px;"><%=getappStringObject("78") %></span></td>'
									+'<td style="width: 50px;">'
										+'<div id="SlideType_Choose_2_without_Top_Photo_Listen_QuestionText" textToPlay="<%=arrData(80)%>"  class="animated pulse" style="display: none; text-align: center; cursor: pointer; height: 50px; float: left; width: 50px; border-top-left-radius: 100px; border-top-right-radius: 100px; border-bottom-right-radius: 100px; border-bottom-left-radius: 100px; display: block; background: rgb(73, 201, 175);"> '
										+'<img style="margin-top: 10px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<div class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option1">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked">'
										+'<div class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option2">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
				+'</div>';
				
				        var SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
				        if(arrData(80) == ("")){
							SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> "+arrData(80)+" <span style='color:#FE5C57'>"+arrData(140)+"</span>";
						 }else if(arrData(139) == ("") && arrData(140) == ("")){
							SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> "+arrData(80)+" <span style='color:#FE5C57'>"+arrData(140)+"</span>";
						 }else{
							SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
						 }
				        var SlideType_Choose_2_without_Top_Photo_option_String = +arrData(86)+"*&"+arrData(88)+"*&"+arrData(87)+"*&"+arrData(89);
				        var SlideType_Choose_2_without_Top_Photo_Answer = "option"+arrData(83);
				        var SlideType_Choose_2_without_Top_Photo_Question_Type = arrData(84);
				        var SlideType_Choose_2_without_Top_Photo_Question_Display_Flag = arrData(119);
				        var SlideType_Choose_2_without_Top_Photo_Answer_Type = arrData(118);
				        lessonFunctionCallVar[slideCount] = new SlideType_Choose_2_without_Top_Photo_Function("slide"+(i + 2),SlideType_Choose_2_without_Top_Photo_Question,SlideType_Choose_2_without_Top_Photo_option_String,SlideType_Choose_2_without_Top_Photo_Answer,SlideType_Choose_2_without_Top_Photo_Question_Type,SlideType_Choose_2_without_Top_Photo_Question_Display_Flag,SlideType_Choose_2_without_Top_Photo_Answer_Type);
				     
				        slideCount++;
				        
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Choose_2_with_Top_Photo(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_2_with_Top_Photo" slideType="SlideType_Choose_2_with_Top_Photo" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="videoContainer" style="display:inline-block;width:45%;">'
						+'<div style="display: block; margin-bottom: 10px;" class="SlideType_Choose_2_with_Top_Photo_title"></div>';
						if(slide_type == ("VIDEO SLIDE")){ 
						//arrData.put(195, "how_are_you_rhonda_2.mp4");
							if(arrData(195).indexOf("mp4") >-1 || arrData(195).indexOf("3gp") >-1){
								html += '<div style="position: relative;">'
									'<video preload="auto" onended="$(this).next().css(\'display\',\'\');" style="width: 95%; height: auto; object-fit: contain; object-position : top;" '
										'class="video" poster="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/<%=arrData(195).replace(".mp4",".jpg").replace(".3gp",".jpg") %>">'
										'<source src="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/<%=arrData(195) %>" type="video/mp4">'
									'</video>'
									'<img class="playVideo" onclick="$(this).prev().get(0).play();$(this).css(\'display\',\'none\');" src="../../../InteractiveLessons/img/ic_play_arrow_white_48dp_2x.png" style="width:50px;position:absolute;left: 50%;top: 50%;background: rgba(0,0,0,.5);border-radius: 100%;margin-left: -25px;margin-top: -25px;cursor:pointer;">'
								'</div>';
							}else{
								html += '<iframe id="SlideType_Video_Div" width="100%" height="auto"'
									+'src="https://www.youtube.com/embed/<%=arrData(195)%>?start=<%=(int)Math.floor(Double.parseDouble(arrData(191))/1000)%>&end=<%=(int)Math.ceil(Double.parseDouble(arrData(193))/1000)%>"'
									+'frameborder="0"style="border: solid 4px #37474F"></iframe>';
							}
						}else{
							html += '<img class="SlideType_Choose_2_with_Top_Photo_Image" style="height: 150px; border-radius: 20px;" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg" />';
						}
			html += '</div>'
						+'<div class="questionContainer" style="width: 50%;display: inline-block;vertical-align: top!important;margin-top: 32px;height: 100%;overflow: auto;">'
						+'<span class="SlideType_Choose_2_with_Top_Photo_QuestionText" style="font-size: 30px;"></span>'
						+'<div class="SlideType_Choose_2_with_Top_Photo_Div SlideType_Choose_2_with_Top_Photo_Div_UnChecked option1">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_with_Top_Photo_Image_Circle SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_with_Top_Photo_TextTD SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_2_with_Top_Photo_Text SlideType_Choose_2_with_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_2_with_Top_Photo_Div SlideType_Choose_2_with_Top_Photo_Div_UnChecked option2">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div	class="SlideType_Choose_2_with_Top_Photo_Image_Circle SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_with_Top_Photo_TextTD SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_2_with_Top_Photo_Text SlideType_Choose_2_with_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
				+'</div>';
				
					
				        var SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
				        if(arrData(80) == ("")){
							SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
					    }else{
					     SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
					     }
				        var SlideType_Choose_2_with_Top_Photo_Image_Name = arrData(91);
				        var SlideType_Choose_2_with_Top_Photo_option_String = arrData(86)+"*&"+arrData(88)+"*&"+arrData(87)+"*&"+arrData(89);
				        var SlideType_Choose_2_with_Top_Photo_Answer = "option"+arrData(83);
				        var SlideType_Choose_2_with_Top_Photo_Question_Type = arrData(84);
				        var SlideType_Choose_2_with_Top_Photo_Question_Display_Flag = arrData(119);
				        var SlideType_Choose_2_with_Top_Photo_Answer_Type = arrData(118);
				        var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/"+userLang.split("_")[0].toLowerCase();
					     if(isB2BUser || language.equalsIgnoreCase("triviagame")){
					     	var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/";
						 } 
						 if(slide_type == ("VIDEO SLIDE")){
							var SlideType_Choose_2_Video_Id = arrData(195);
							var SlideType_Choose_2_Video_StartTime = arrData(191);
							var SlideType_Choose_2_Video_EndTime = arrData(193);
							var SlideType_Choose_2_Video_Autoplay = arrData(190);
							lessonFunctionCallVar[slideCount] = new SlideType_Video_Slide_Function("slide"+(i + 2),SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_Video_Id,SlideType_Choose_2_Video_Autoplay,SlideType_Choose_2_Video_StartTime,SlideType_Choose_2_Video_EndTime);
						}else{
				        	lessonFunctionCallVar[slideCount] = new SlideType_Choose_2_with_Top_Photo_Function("slide"+(i + 2),SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_with_Top_Photo_Image_Name,imageFolder);
				        }
				        slideCount++;
				        
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Missing_Word(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Missing_Word" slideType="SlideType_Missing_Word" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 10px 0px; color: #FE5C57;">'
						+'<span class="titleText" style="font-size: 30px; color: #FE5C57;text-transform: capitalize!important;"></span>'
					+'</div>'
					+'<div class="SlideType_Missing_Word_QuestionText" style="width: 100%; font-size: 24px;margin-bottom:20px;">'
						+'<span class="questionPart1Text"></span> <span> ______ </span>'
						+'<span class="questionPart2Text"></span>'
					+'</div>'
					+'<div id="SlideType_Missing_Word_select_choice" class="SlideType_Missing_Word_select_choice_UnChecked" style="margin-bottom:20px;"></div>'
				+'</div>';
				
			     var SlideType_Missing_Word_Question_Part_temp = arrData(38);
			     var SlideType_Missing_Word_Question_Part1 = SlideType_Missing_Word_Question_Part_temp.split("$$$")[0];
			     var SlideType_Missing_Word_Question_Part2 = SlideType_Missing_Word_Question_Part_temp.split("$$$")[1];
			     var SlideType_Missing_Word_optionString = arrData(39)+"*&"+arrData(43)+"*&"+arrData(41)+"*&"+arrData(44)+"*&"+arrData(42)+"*&"+arrData(45)+"*&"+arrData(40)+"*&"+arrData(46);
			     var SlideType_Missing_Word_Answer = "option"+arrData(82);
			     var SlideType_Missing_Word_TitleText = arrData(37);
			     lessonFunctionCallVar[slideCount] = new SlideType_Missing_Word_Function("slide"+(i + 2),SlideType_Missing_Word_TitleText,SlideType_Missing_Word_optionString,SlideType_Missing_Word_Answer,SlideType_Missing_Word_Question_Part1,SlideType_Missing_Word_Question_Part2);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Transaltion_Box(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Transaltion_Box" slideType="SlideType_Transaltion_Box" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 80px 0px;">'
						+'<span class="titleText" style="font-size: 30px; color: #FE5C57;"></span>'
					+'</div>'
					+'<div style="width: 100%; height: 90px;">'
						+'<div class="SlideType_Transaltion_Box_Question" style="width: 300px; height: 55px; padding: 17px 0px; font-size: 30px; float: left; text-align: right;"></div>'
						+'<div id="SlideType_Transaltion_Box_Listen_Text" style="cursor: pointer; height: 50px; float: left; width: 50px; margin: 20px 20px; border-radius: 100px; background: #49C9AF;">'
							+'<img style="margin-top: 13px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png" />'
						+'</div>'
						+'<div style="height: 90px; float: left; margin: 0px 30px;">'
							+'<img style="height: 60px; margin-top: 15px;" src="../../../InteractiveLessons/img/forward-button-green-2x.png" />'
						+'</div>'
						+'<div class="SlideType_Transaltion_Box_InputBoxOuterDiv" style="width: 400px; height: 90px; float: left; border-radius: 20px; border: none;">'
							+'<input id="SlideType_Transaltion_Box_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;" type="text">'
						+'</div>'
					+'</div>'
				+'</div>';
				
			       var SlideType_Transaltion_Box_TitleText = arrData(32);
			       var SlideType_Transaltion_Box_Question = arrData(33);
			       var SlideType_Transaltion_Box_Answer = arrData(34);
			       var SlideType_Transaltion_Box_Tip_On_Correct = arrData(35);
			       var SlideType_Transaltion_Box_Tip_On_InCorrect = arrData(36);
			       var SlideType_Transaltion_Box_Typing_Language = arrData(120);
			       lessonFunctionCallVar[slideCount] = new SlideType_Transaltion_Box_Function("slide"+(i + 2),SlideType_Transaltion_Box_TitleText,SlideType_Transaltion_Box_Question,SlideType_Transaltion_Box_Answer,SlideType_Transaltion_Box_Tip_On_Correct,SlideType_Transaltion_Box_Tip_On_InCorrect,SlideType_Transaltion_Box_Typing_Language);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Tip_Slide(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Tip_Slide" slideType="SlideType_Tip_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="SlideType_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">'
						+'<div class="titleText" style="padding: 30px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">'
						+'</div>'
						+'<div class="SlideType_Tip_Slide_tipText" style="width: 100%; font-size: 30px;"></div>'
					+'</div>'
					+'<div style="position: absolute; left: 10px; bottom: -15px;display: none;">'
						+'<img style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0, 1, 0, 180deg); width: 60px; z-index: -1;" src="../../../InteractiveLessons/img/tip-tail-f9f9f9.png" /> '
						+'<img style="width: 70px;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15.png">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Tip_Slide_TipText = arrData(47)+"*&"+arrData(48)+"*&*&"+arrData(49)+"*&"+arrData(50)+"*&";
			     var SlideType_Tip_Slide_TitleText = getappStringObject("52");
			     lessonFunctionCallVar[slideCount] = new SlideType_Tip_Slide_Function("slide"+(i + 2),SlideType_Tip_Slide_TitleText,SlideType_Tip_Slide_TipText);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Jumble_Slide(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Jumble_Slide" slideType="SlideType_Jumble_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="width: 100%;">'
						+'<div class="QuestionText" style="padding: 70px 0px 0px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">'
						+'</div>'
						+'<div class="notificationTipBox" style="position: absolute; right: 55px; top: 10px; padding: 5px; width: 220px; text-transform: uppercase; font-size: 17px; background: #7f7f7f; border-radius: 4px;line-height: 1.2em!important;display: none;">'
							+'<span style="color: #fff;"><%=getappStringObject("79") %></span> '
							+'<img style="position: absolute; right: -25px; transform: rotate3d(0, 0, 0, 180deg); width: 50px; z-index: -1; top: 5px;" src="../../../InteractiveLessons/img/call-out 300px.png" />'
						+'</div>'
						+'<div class="monsterBarNotificationImage" style="position: absolute; right: 0px; top: 25px; width: 40px; height: 61px; background: url(\'../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15-anti.png\'); background-size: cover; background-repeat: no-repeat;display: none;">'
						+'</div>'
						+'<div style="width: 100%; font-size: 20px; margin-top: 30px;">'
							+'<li class="animatedListClass" style=""></li>'
							+'<ul id="jumbleTarget" style="width: 710px; min-height: 114px; background: #eee; border: 2px solid #F8CE46; border-radius: 4px;"></ul>'
							+'<ul id="jumbleSource" style="margin-top: 50px; border: 2px solid #F8CE46; width: 710px; min-height: 100px; border-radius: 4px;"> </ul>'
						+'</div>'
					+'</div>'
				+'</div>';
				
			     var SlideType_Jumble_Slide_QuestionText = arrData(52);
			     var SlideType_Jumble_Slide_AnswerText = arrData(136);
			     var SlideType_Jumble_Slide_option_String = arrData(53)+"*&"+arrData(54)+"*&"+arrData(55)+"*&"+arrData(56)+"*&"+arrData(57)+"*&"+arrData(58);
			     var SlideType_Jumble_Slide_Typing_Language = "0";
			     var SlideType_Jumble_Slide_slideNumber = slideCount;
			     lessonFunctionCallVar[slideCount] = new SlideType_Jumble_Slide_Function("slide"+(i + 2),SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_QuestionText,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_option_String,SlideType_Jumble_Slide_Typing_Language);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Listen_Box(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Listen_Box" slideType="SlideType_Listen_Box" slideNumber="'+(i + 2)+'" data-autoslide="400000" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 40px 0px;">'
						+'<span class="titleText" style="font-size: 30px;"></span>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<table id="listenTable" style="width: 600px; margin: auto; border-spacing: 0px 20px;">'
						+'</table>'
					+'</div>'
				+'</div>';
				
				 var SlideType_Listen_Box_Title_Text = getappStringObject("82");
				 var SlideType_Listen_Box_String = arrData(59)+"*&"+arrData(63)+"*&"+arrData(62)+"*&"+arrData(64)+"*&"+arrData(60)+"*&"+arrData(65)+"*&"+arrData(61)+"*&"+arrData(66);
				 lessonFunctionCallVar[slideCount] = new SlideType_Listen_Box_Function("slide"+(i + 2),SlideType_Listen_Box_String,SlideType_Listen_Box_Title_Text);
				 slideCount++;
				 
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Dialog(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Dialog" slideType="SlideType_Dialog" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div id="title_dialog" style="color: #FE5C57; font-size: 30px; padding: 5px 0px 5px 0px;"><%=arrData(67)%></div>'
					+'<div id="chatBox" style="width: 100%; height: 365px; overflow-x: hidden; overflow-y: scroll; padding-top: 20px;">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Dialog_Title_Text = arrData(67);
			     var SlideType_Dialog_String = "*&"+arrData(68)+"*&"+arrData(72)+"*&*&"+arrData(69)+"*&"+arrData(74)+"*&*&"+arrData(70)+"*&"+arrData(75)+"*&*&"+arrData(71)+"*&"+arrData(73)+"*&*&"+arrData(121)+"*&"+arrData(126)+"*&*&"+arrData(122)+"*&"+arrData(127)+"*&*&"+arrData(123)+"*&"+arrData(128)+"*&*&"+arrData(124)+"*&"+arrData(129)+"*&*&"+arrData(125)+"*&"+arrData(130);
			     lessonFunctionCallVar[slideCount] = new SlideType_Dialog_Function("slide"+(i + 2),SlideType_Dialog_String);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Special_Slide(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Special_Slide" slideType="SlideType_Special_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="SlideType_Special_Slide_Inner_Container" style="height: 400px; width: 800px; position: absolute; left: 80px; top: 40px; overflow-y: auto;">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Special_Slide_Data = arrData(145)+"*&"+arrData(142)+"*&"+arrData(146)+"*&"+arrData(143)+"*&"+arrData(147)+"*&"+arrData(144);
			     lessonFunctionCallVar[slideCount] = new SlideType_Special_Slide_Function("slide"+(i + 2), SlideType_Special_Slide_Data);
					slideCount++;
				
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_ListenableTranslation(arrData){
	var html = "" ;
		html += '<section id="slide'+(i+2)+'" class="SlideType_ListenableTranslation" slideType="SlideType_ListenableTranslation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
						+'<table style="width: 100%;height: 100%;">'
							+'<tr>'
								+'<td>'
									+'<div class="SlideType_ListenableTranslation_Question" style="width: 100%;padding: 16px; font-size: 24px;text-align: left;"><%=arrData(161)%></div>'
									+'<div id="SlideType_ListenableTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">'
										+'<img style="margin-top: 15px;width: 24px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
										if(arrData(167).equalsIgnoreCase("1") || arrData(167).equalsIgnoreCase("yes")){
											html += '<audio id="audio" style="display:none;" >'
											  +'<source id="mp3_src" src="https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text=<%=arrData(162)%>&locale=<%=locale %>" type="audio/mp3"></source>'
											+'</audio>';
										}else{
											html += '<audio id="audio" style="display:none;" >';
											 if(isB2BUser){
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.split("_")[0].toLowerCase() %>/<%=arrData(162)%>" type="audio/mp3"></source>';
											 }else{
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(162)%>" type="audio/mp3"></source>';
											 } 
											html += '</audio>';
										}
									html +='</div>'
									+'<div class="SlideType_ListenableTranslation_InputBoxOuterDiv" style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;">'
										+'<input id="SlideType_ListenableTranslation_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;background:#eee;" type="text">'
									+'</div>'
								+'</td>'
							+'</tr>'
						+'</table>'
				+'</div>';
				
					
			       var SlideType_ListenableTranslation_Audio = arrData(162);
			       var SlideType_ListenableTranslation_IsTTS = arrData(167);
			       var SlideType_ListenableTranslation_Answer = arrData(163);
			       var SlideType_ListenableTranslation_Tip_On_Correct = arrData(164);
			       var SlideType_ListenableTranslation_Tip_On_InCorrect = arrData(165);
			       var SlideType_ListenableTranslation_Typing_Language = arrData(166);
			       lessonFunctionCallVar[slideCount] = new SlideType_ListenableTranslation_Function("slide"+(i + 2),SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect,SlideType_ListenableTranslation_Typing_Language);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_CombinedTranslation(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_CombinedTranslation" slideType="SlideType_CombinedTranslation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<table style="width: 100%;height: 100%;">'
						+'<tr>'
							+'<td>'
								+'<div class="SlideType_CombinedTranslation_Question" style="width: 90%;padding: 16px; font-size: 22px;text-align: center;margin: auto;">'
										+'<span style="color:#FE5C57;"><%=arrData(169)%></span>'
										+'<span style=""><%=arrData(168)%></span>'
										+'<span style="color:#FE5C57;"><%=arrData(170)%></span>'
									+'</div>';
									if(arrData(171).equalsIgnoreCase("1") || arrData(171).equalsIgnoreCase("yes")){
										html += '<div style="width: 90%;border-radius: 20px; border: none;text-align: center;font-size: 22px;margin: 10px auto;">'
											+'<span style=""><%=arrData(173)%></span>'
										+'</div>';
									}
								if(arrData(172).equalsIgnoreCase("1") || arrData(172).equalsIgnoreCase("yes")){
									html += '<div id="SlideType_CombinedTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">';
										html += '<img style="margin-top: 15px;width: 24px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
										if(arrData(179).equalsIgnoreCase("1") || arrData(179).equalsIgnoreCase("yes")){
											html += '<audio id="audio" style="display:none;" >'
											  +'<source id="mp3_src" src="https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text=<%=arrData(174)%>&locale=<%=locale %>" type="audio/mp3"></source>'
											+'</audio>';
										}else{
											html += '<audio id="audio" style="display:none;" >';
											 if(isB2BUser){
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/<%=arrData(174)%>" type="audio/mp3"></source>';
											 }else{
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(174)%>" type="audio/mp3"></source>';
											 } 
											html += '</audio>';
										}
								html += '</div>';
								} 
								html += '<div class="SlideType_CombinedTranslation_InputBoxOuterDiv" style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;margin-top: 10px;">'
									+'<input id="SlideType_CombinedTranslation_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;background:#eee;" type="text">'
								+'</div>'
							+'</td>'
						+'</tr>'
					+'</table>'
				+'</div>';
				
			       var SlideType_CombinedTranslation_Audio = arrData(174);
			       var SlideType_CombinedTranslation_IsTTS = arrData(179);
			       var SlideType_CombinedTranslation_Answer = arrData(175);
			       var SlideType_CombinedTranslation_Tip_On_Correct = arrData(176);
			       var SlideType_CombinedTranslation_Tip_On_InCorrect = arrData(177);
			       var SlideType_CombinedTranslation_Typing_Language = arrData(178);
			       lessonFunctionCallVar[slideCount] = new SlideType_CombinedTranslation_Function("slide"+(i + 2),SlideType_CombinedTranslation_Audio,SlideType_CombinedTranslation_IsTTS,SlideType_CombinedTranslation_Answer,SlideType_CombinedTranslation_Tip_On_Correct,SlideType_CombinedTranslation_Tip_On_InCorrect,SlideType_CombinedTranslation_Typing_Language);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Pronunciation(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Pronunciation" slideType="SlideType_Pronunciation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<table style="width: 100%;height: 100%;">'
						+'<tr>'
							+'<td>'
								+'<div class="SlideType_Pronunciation_Question" style="width: 90%;padding: 16px; font-size: 22px;text-align: center;margin: auto;">'
										+'<span style="color:#FE5C57;"><%=arrData(149)%></span>'
										+'<span style="">'+document.write(arrData(148))+'</span>'
										+'<span style="color:#FE5C57;"><%=arrData(150)%></span>'
									+'</div>'
								+'<div style="width:500px;text-align: center;margin: auto; ">'
									+'<div class="SlideType_Pronunciation_ImageDiv SlideType_Pronunciation_ImageDiv_UnChecked option1" tipText="<%=arrData(153)%>">'
										+'<div class="SlideType_Pronunciation_Image_Circle SlideType_Pronunciation_Image_Circle_UnChecked"></div>'
										+'<div style="height: 200px;background: #fff;display: table-cell;border-radius: 15px 15px 0px 0px;width: 200px;">'
											+'<img class="SlideType_Pronunciation_Img_Source" src="../../../images/listen.png" style="width: 45px;">'
										+'</div>'
										+'<div class="SlideType_Pronunciation_ImageText SlideType_Pronunciation_ImageText_UnChecked" style="padding: 16px 8px;text-align: left;">Option 1</div>'
										+'<audio id="audio" style="display:none;" >';
										 if(isB2BUser){
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/<%=arrData(151)%>" type="audio/mp3"></source>';
										 }else{
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(151)%>" type="audio/mp3"></source>';
										 } 
										html += '</audio>';
									html += '</div>'
										+'<div class="SlideType_Pronunciation_ImageDiv SlideType_Pronunciation_ImageDiv_UnChecked option2"  tipText="<%=arrData(154)%>">'
										+'<div class="SlideType_Pronunciation_Image_Circle SlideType_Pronunciation_Image_Circle_UnChecked"></div>'
										+'<div style="height: 200px;background: #fff;display: table-cell;border-radius: 15px 15px 0px 0px;width: 200px;">'
											+'<img class="SlideType_Pronunciation_Img_Source" src="../../../images/listen.png" style="width: 45px;">'
										+'</div>'
										+'<div class="SlideType_Pronunciation_ImageText SlideType_Pronunciation_ImageText_UnChecked" style="padding: 16px 8px;text-align: left;">Option 2</div>'
										+'<audio id="audio" style="display:none;" >';
										if(isB2BUser){
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/<%=arrData(152)%>" type="audio/mp3"></source>';
										 }else{
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(152)%>" type="audio/mp3"></source>';
										 } 
										html += '</audio>'
									+'</div>'
								+'</div>'
							+'</td>'
						+'</tr>'
					+'</table>'
				+'</div>';
				
					console.log("PRONUNCIATION",arrData);
			       var SlideType_Pronunciation_Answer = "option"+arrData(155);
			       lessonFunctionCallVar[slideCount] = new SlideType_Pronunciation_Function("slide"+(i + 2),SlideType_Pronunciation_Answer);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_IMAGE_Tip_Slide(arrData){
	var html = "";
		html += '<section id="slide<%=(i+2)%>" class="SlideType_IMAGE_Tip_Slide" slideType="SlideType_IMAGE_Tip_Slide" slideNumber="<%=(i+2)%>"  data-background="#fff">'
				     +'<div class="sectionInnerContainer">'
				      +'<div class="SlideType_IMAGE_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">'
				       +'<div class="titleText" style="padding: 30px 0px;color:#49C9AF!important;font-size:30px;text-transform: uppercase;">'
				       +'</div>'
				       +'<div class="SlideType_IMAGE_Tip_Slide_tipText" style="width: 100%;font-size:30px;">'
				       +'</div>'
				      +'</div>'
				      +'<div style="position: absolute;left: 10px; bottom: -15px;">'
				       +'<img style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0,1,0,180deg); width: 60px; z-index: -1;display: none;" src="../img/tip-tail-f9f9f9.png" />'
				       +'<img style="width: 70px;display: none; " alt="" src="../img/jelly-monster-2-small - rotate-15.png">'
				      +'</div>'
				     +'</div>';
				     
				     var SlideType_IMAGE_Tip_Slide_TipText = arrData(180)+"*&";
				     var SlideType_IMAGE_Tip_Slide_TitleText = getappStringObject("52");
				     lessonFunctionCallVar[slideCount] = new SlideType_IMAGE_Tip_Slide_Function("slide<%=(i+2)%>",SlideType_IMAGE_Tip_Slide_TitleText,SlideType_IMAGE_Tip_Slide_TipText);
				     slideCount++;
				     
				  html += '</section>';
				  
				  $(".slides").append(html);
}

/*
function render_SlideType_Last_Slide(){
	var html = "";
		html += '<section id="slide<%=(2*i + 3)%>" class="SlideType_Last_Slide" slideType="SlideType_Special_Slide" slideNumber="<%=(i + 3)%>"	data-background="#fff">'
				'<div class="sectionInnerContainer" onclick="openDownloadLink()" style="overflow:auto;">';
			if(isEmbed){
				html += '<table style="width: 100%;height: 100%;border-collapse: collapse;background-image: url(\'https://language-practice.s3.amazonaws.com/English-App/Downloadable_Lessons_V3/lesson_images/lesson_+'+lessonNoForLink+'+.png\');background-size: cover;background-position: center;">'
					+'<tbody style="background: rgba(0,0,0,.5);"><tr>'
						+'<td>'
							+'<div style="text-align: center;">'
								+'<img style="width: 50px;cursor: pointer;vertical-align: middle;" onclick="window.location=\'https://helloenglish.com\'" src="//storage.helloenglish.com/English-Web/images/hlogo.png">'
								+'<div style="font-family: "Roboto Condensed", sans-serif;vertical-align: middle;font-size: 20px;color: #fff;margin-top: 16px;">'
									+'Get the Hello English App<br>'
									+'Start learning English for free!'
								+'</div>'
							+'</div>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align: center;vertical-align: initial;">'
						+'<img class="appleDownload" style="width: 150px;cursor: pointer;display: inline-block;margin-top: 16px;" onclick="openDownloadLink()" src="//storage.helloenglish.com/English-Web/images/AP_download_badge.png">'
						+'<div></div>'
						+'<img class="androidDownload" style="width: 150px;cursor: pointer;display: inline-block;" onclick="openDownloadLink()" src="//storage.helloenglish.com/English-Web/images/GP_download_badge.png">'
						+'</td>'
					+'</tr>'
				+'</tbody>'
				+'</table>';
			}else{
				html += '<table style="width: 100%;height: 100%;margin-bottom: 20px;">'
						+'<tr>'
							+'<td style="text-align: center;">';
								html += '<table class="endScoreTable">'
											+'<tr>'
												+'<td><%=getappStringObject("684") %> </td>'
												+'<td class="maxCoins"></td>'
											+'</tr>'
											+'<tr>'
												+'<td><%=getappStringObject("170") %> </td>'
												+'<td class="coinsWon"></td>'
											+'</tr>'
											+'<tr>'
												+'<td><%=getappStringObject("167") %></td>'
												+'<td class="lastScore"></td>'
											+'</tr>'
											+'<tr style="border-top:1px solid #F8CE46;">'
												+'<td><%=getappStringObject("171") %></td>'
												+'<td class="improvedScore"></td>'
											+'</tr>';
											
										html +='</table>';
									html +='<div class="coinsTableFeebackDiv" style="margin:20px 0px 0px;text-align:center;color:#F8CE46;font-size:20px;">'
										
									//var totalCoinsWonTemp = getappStringObject("63");
									//var totalNewCoinsWonTemp = getappStringObject("162");
										
									+'<div class="coinsTableFeebackLost" style="display:none;">'
										+'<div><%=totalCoinsWonTemp.replace("-10000","<span class=\'totalCoinsWon\'></span>") %></div>'
										+'<div><%=getappStringObject("163") %></div>'
									+'</div>'
									+'<div class="coinsTableFeebackWon" style="display:none;">'
										+'<div><%=totalNewCoinsWonTemp.replace("-10000","<span class=\'totalNewCoinsWon\'></span>") %></div>'
									+'</div>'
									+'<div class="coinsTableFeebackForTest" style="display:none;">'
										+'<div class="testPassedDiv" style="display:none;margin:0px 20px;">'
											+'<div><%=getappStringObject("595").replace("\\n", "<br>") %></div>'
											+'<div style="margin-top: 20px;"><%=String.format(getappStringObject("596"), -10000, -20000).replace("-10000","<span class=\'unlockedLessonAfterTest\'></span>").replace("-20000","<span class=\'currentLevel\'></span>") %></div>'
										+'</div>'
										+'<div class="testFailedDiv" style="display:none;margin:0px 20px;">'
											+'<div style="margin-top: 20px;"><%=String.format(getappStringObject("593"), -10000, -20000).replace("-10000","<span class=\'testQuestionCount\'></span>").replace("-20000","<span class=\'testCorrectCount\'></span>") %></div>'
										+'</div>'
									+'</div>'
									+'</div>';
									html += '<input class="greenButton nextLessonButton animated pulse" style="margin-top: 10px;width: initial!important;min-width: 280px;" type="button" value="<%=getappStringObject("54") %>">'
											+'<br>'
											+'<input class="greenButton practiceGameButton" style="margin-top: 10px;width: initial!important;min-width: 280px;" type="button" value="<%=getappStringObject("107") %>">'
											+'<br>'
											+'<input class="greenButton playAgainButton" style="margin-top: 10px;width: initial!important;min-width: 280px;" type="button" value="<%=getappStringObject("3") %>">';
											
							html += '</td>'
						+'</tr>'
					+'</table>';
				}
			
			html += '</div>'
			+'<div class="coinStackAnimationScreen" style="position:absolute;top:0px;display:none;background: rgba(0,0,0,.5);text-align: center;margin: auto;width:100%;height:100%;z-index:2000;">'
				+'<table class="taskBlueStripTable" style="width:100%;height:100%;position:absolute;z-index:10;">'
					+'<tr>'
						+'<td>'
							+'<table class="taskBlueStrip animated" style="margin: auto;">'
								+'<tr>'
									+'<td>'
										+'<div style="width:400px;text-align:center;">'
											+'<div style="color:#FE5C57;font-size:25px;"><%=getappStringObject("456") %></div>'
											+'<div style="color:#F8CE46;font-size:20px;margin-top:10px;"><%=getappStringObject("85") %></div>'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'		
						+'</td>'
					+'</tr>'
				+'</table>'				
				+'<div class="coinStackContainer" style=" position: relative; height: 100%;width:100%; max-width: 500px; margin: auto;">'
					+'<div>'
						+'<img class="coinInStack animated" style="bottom:50px;margin-left: -50px;z-index:1;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:100px;margin-left: -105px;z-index:2;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:70px;margin-left: 25px;z-index:3;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:65px;margin-left: -35px;z-index:6;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: 10px;z-index:5;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:115px;margin-left: -100px;z-index:4;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: -50px;z-index:7;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:95px;margin-left: -45px;z-index:8;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:110px;margin-left: -40px;z-index:9;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:130px;margin-left: -40px;z-index:10;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:145px;margin-left: -50px;z-index:11;" src="img/flat_coin.png">'
						
					+'</div>'
				+'</div>'
			
			+'</div>'
		
		+'</section>';
		
		$(".slides").append(html);
}
*/
