function render_LearningTypingTemplate(i,obj){
var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_LearningTypingTemplate" slideType="SlideType_LearningTypingTemplate" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="timerDiv" style=" z-index:-1;position: absolute; width: 100%; height: 100%; left: 0px; bottom: 0px; background: rgba(0,0,0,.2);display:none; "></div>'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 20px 0px;">'
						+'<span class="titleText" style="font-size: 30px; color: #FE5C57;"></span>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<div class="SlideType_Transaltion_Box_Question" style="width: 100%; padding: 16px; font-size: 30px;"></div>'
						+'<div id="listenableCorrectDiv" style="width: 100%;font-size: 20px;margin: 30px 16px 0px 16px;text-align: left;display:none;"></div>'
						+'<div class="SlideType_Transaltion_Box_InputBoxOuterDiv" style="width: 100%; height: 90px; border-radius: 20px; border: none;">'
							+'<input id="SlideType_Transaltion_Box_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;" type="text">'
						+'</div>'
					+'</div>'
				+'</div>';
			html += '</section>';
			$(".slides").append(html);
			var SlideType_Data = obj.data;
		   lessonFunctionCallVar[slideCount] = new SlideType_Transaltion_Box_Function("slide"+(i + 2),SlideType_Data);
		   slideCount++;
		   
}

function SlideType_Transaltion_Box_Function(sectionId,SlideType_Data){
	
	this.checkSlideType_Transaltion_Box_Answer = checkSlideType_Transaltion_Box_Answer;
	var isCheckAutomatic = false;
	var correctAnswer = SlideType_Data.correctTranslations[0];
	var SlideType_Transaltion_Box_Answer = SlideType_Data.correctTranslations;
	console.log("SlideType_Transaltion_Box_Answer:"+SlideType_Transaltion_Box_Answer);
	var timerOnCal  = 0;
	//timerOnCal += correctAnswer.split(" ").length;
	timerOnCal += correctAnswer.length;
	//$("#"+sectionId).attr("timerOn",parseInt(parseInt(timerOnCal)*3));
	//$("#"+sectionId).attr("timerOn",Math.max(15, parseInt(parseInt(timerOnCal)*3))*autoTimerMultiple);
	$("#"+sectionId).attr("timerOn",parseInt(parseInt(timerOnCal)*3)*autoTimerMultiple);
	
	var slideCoin = equivalent_positive_coins;
	if(SlideType_Data.slideCoin != undefined && SlideType_Data.slideCoin > 0){
		slideCoin = SlideType_Data.slideCoin;
	}
	if(SlideType_Data.teacherTip == undefined){
		SlideType_Data.teacherTip = "";
	}
	if(SlideType_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Data.teacherTip+"</div>";
		html += "<div>CORRECT ANSWER: "+SlideType_Data.correctTranslations+"</div>";
		html += "<div>CORRECT TIP: "+SlideType_Data.tips[0]+"</div>";
		html += "<div>INCORRECT TIP: "+SlideType_Data.tips[1]+"</div>";
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%; text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}
	
	$(function(){
		
		$("#"+sectionId+" .titleText").html("Translate");
		$("#"+sectionId+" .SlideType_Transaltion_Box_Question").html(SlideType_Data.textToBeTranslated);
		
		updateInputVariable();
		
		$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").keyup(function(e) {
//			if (e.keyCode == 13) {
//				checkSlideType_Transaltion_Box_Answer();
//			}
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
			$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
			$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Transaltion_Box_Answer()");
			if(timerOn){
				isCheckAutomatic = true;
				checkSlideType_Transaltion_Box_Answer();
			}
		});
		
	});
	
	function disableOptions(){
		$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true");
		$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("opacity",".5");
	}
	
	function showCorrectAnswer(){
		console.log("showCorrectAnswer:"+correctAnswer);
		$("#"+sectionId+" #listenableCorrectDiv").css("display","");
		$("#"+sectionId+" #listenableCorrectDiv").text("Correct answer: "+correctAnswer);
	}

	function checkSlideType_Transaltion_Box_Answer(){
		if(isInLessonTest == "true" || isInitialTest == "true"){
			$("#bottomBarButton").css("visibility","hidden");
		}
		var multipleAnswer = SlideType_Data.correctTranslations;
		var answerFlag = 0;
		var answerResponse = $("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val();
		$("#"+sectionId).attr("isPlayedOnce","true");
		if(timerOn){
			if($("#"+sectionId).attr("fastestFinger") != undefined){
				$("#"+sectionId+" .fastestFingerContainer").slideDown();  
			}	
		}	
		var tts = "";
		for(var i=0;i<multipleAnswer.length;i++){
			multipleAnswer[i] = removeSpecialCharacter(multipleAnswer[i]).toLowerCase().trim();
			console.log("checkAnswer:"+removeSpecialCharacter(answerResponse).toLowerCase().trim()+"/"+multipleAnswer[i]);
			if( ( removeSpecialCharacter(answerResponse).toLowerCase().trim() == multipleAnswer[i] ) ){
				answerFlag = 1;
				tts = $("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val().trim();
			}
		}
		if(isCheckAutomatic){
			isCheckAutomatic = false;
			if(timerOn && answerFlag == 1){
				postMessage_cancelTimer();
			}else if(timerOn && answerFlag == 0){
				return;
			}
		}
			if( answerFlag==1 ){
				playAudio(tts, course_language);
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#49C9AF");
				$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").addClass("animated tada");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true").blur();
				playCorrectSound();
				if(isWebinar){
					$("#bottomBarButton").attr("onclick","");
				}else{
					if(isTouchEvent()){
						$("#bottomBarButton").attr("ontouchend","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					}else{
						$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					}
				}
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"))
						$("#"+sectionId).addClass("CorrectAnswer");
					if(timerOn){
						var totalTime = parseInt($("#"+sectionId).attr("timerOn"))*1000;
						slideCoin = parseInt(((totalTime-timeElapsed)*slideCoin)/totalTime);
						gameCoin = gameCoin + slideCoin;
					}else{
						gameCoin=gameCoin+slideCoin;
					}
					//userAnswerArray.push(1);
					showAwardCoin(slideCoin);
				}else{
					//correctFlag=1;
					if(!$("#"+sectionId).hasClass("CorrectAnswer"))
						$("#"+sectionId).addClass("WrongAnswer");
				}
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").removeClass("animated tada");
				},1100);
				disableOptions();
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
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
						isCorrect : "T",
						LessonID : courseId,
						SlideID : parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1,
						AnswerTime : webinarAnswerDuration,
						AnswerResponse : answerResponse,
						CreatedAt : getCurrentDateTime()
					};
					var saveLiveAppQuizResponse = firebase.functions().httpsCallable('saveLiveAppQuizResponse2');
					saveLiveAppQuizResponse(responseData).then(function(result) {
						console.log("saveLiveAppQuizResponse:",result);
					  var sanitizedMessage = result.data.text;
					}).catch(function(error) {
					  console.log(error);
					});
				}
			}else{
				$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").addClass("animated shake");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#FE5C57");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true");
				setTimeout(function(){
					$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#F8CE46");
					$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").removeClass("animated shake");
					$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val("");
					$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").blur();
					setTimeout(function(){
						$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val(replaceVariableInString(SlideType_Transaltion_Box_Answer[0].trim()));
						$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#49C9AF");
						$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true");
						$("#disableBottomBarButton").css("display","block");
						$("#bottomBarButton").removeClass("checkButtonAnimation");
						setTimeout(function(){
							$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val("");
							$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","");
							$("#disableBottomBarButton").css("display","none");
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
							if(isWebinar){
								$("#bottomBarButton").attr("onclick","");
								disableOptions();
								showCorrectAnswer();
							}else{
								$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").removeAttr("readonly");
								$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").focus();
								if(isTouchEvent()){
									$("#bottomBarButton").attr("ontouchend","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
								}else{
									$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
								}
							}
						},2000);
					},10);
				},1000);
				
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"))
					$("#"+sectionId).addClass("WrongAnswer");
				if(correctFlag==1){
					//userAnswerArray.push(2);
				}
				correctFlag=0;
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
						isCorrect : "F",
						LessonID : courseId,
						SlideID : parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1,
						AnswerTime : webinarAnswerDuration,
						AnswerResponse : answerResponse,
						CreatedAt : getCurrentDateTime()
					};
					var saveLiveAppQuizResponse = firebase.functions().httpsCallable('saveLiveAppQuizResponse2');
					saveLiveAppQuizResponse(responseData).then(function(result) {
						console.log("saveLiveAppQuizResponse:",result);
					  var sanitizedMessage = result.data.text;
					}).catch(function(error) {
					  console.log(error);
					});
				}
			}
			
			if(isInitialTest == "true"){
				setTimeout(function(){
					$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
					$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					bottomBarButtonClicked();
				},800);
			}
		
	}
	
}