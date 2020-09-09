function render_ListenableTypingTemplate(i,obj){
	var html = "" ;
		html += '<section id="slide'+(i+2)+'" class="SlideType_ListenableTranslation" slideType="SlideType_ListenableTranslation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="timerDiv" style=" z-index:-1;position: absolute; width: 100%; height: 100%; left: 0px; bottom: 0px; background: rgba(0,0,0,.2);display:none; "></div>'
				+'<div class="sectionInnerContainer">'
						+'<table style="width: 100%;height: 100%;">'
							+'<tr>'
								+'<td>'
									+'<div class="SlideType_ListenableTranslation_Question" style="width: 100%;padding: 16px; font-size: 20px;text-align: center;">'+obj.data.heading+'</div>'
									+'<div id="SlideType_ListenableTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">'
										+'<img onclick="$(this).next()[0].play()" style="margin-top: 15px;width: 24px;" src="img/soundIconWhite_2.png">';
								 //html += '<audio style="display:none;"><source src="https://storage.cloud.google.com/he_web_assets/downloadable_lessons/'+courseId+'/audios/'+obj.data.audioFileName+'"></source></audio>';
								 html += '<audio style="display:none;" onended="try{window.webkit.messageHandlers.iOS.postMessage({method: \'webkitDidFinishPlayingAudio\'});}catch(err){}"><source src="https://storage.helloenglish.com/English-App/PronunciationFiles/hindi/'+obj.data.audioFileName+'"></source></audio>';
								 //try{window.webkit.messageHandlers.iOS.postMessage({method: 'webkitDidFinishPlayingVideo'});}catch(err){}
							html +='</div>'
									+'<div id="listenableCorrectDiv" style="width: 100%;font-size: 20px;margin: 30px 16px 0px 16px;text-align: left;display:none;"></div>'
									+'<div class="SlideType_ListenableTranslation_InputBoxOuterDiv" style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;">'
										+'<input id="SlideType_ListenableTranslation_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 28px;background:#eee;" type="text">'
									+'</div>'
								+'</td>'
							+'</tr>'
						+'</table>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
		   var SlideType_ListenableTranslation_Audio = obj.data.audioFileName;
		   var SlideType_ListenableTranslation_IsTTS = obj.data.play_with_tts;
		   var SlideType_ListenableTranslation_Answer = obj.data.correctTranslations;
		   var SlideType_ListenableTranslation_Tip_On_Correct = obj.data.tips[0];
		   var SlideType_ListenableTranslation_Tip_On_InCorrect = obj.data.tips[1];
		   var SlideType_Data = obj.data;
		   lessonFunctionCallVar[slideCount] = new SlideType_ListenableTranslation_Function("slide"+(i + 2),SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect,SlideType_Data);
		   slideCount++;
}

function SlideType_ListenableTranslation_Function(sectionId,SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect,SlideType_Data){
	
	this.checkSlideType_ListenableTranslation_Answer = checkSlideType_ListenableTranslation_Answer;
	var isCheckAutomatic = false;
	var correctAnswer = SlideType_Data.correctTranslations[0];
	var CorrectTip = SlideType_ListenableTranslation_Tip_On_Correct;
	var InCorrectTip = SlideType_ListenableTranslation_Tip_On_InCorrect;
	console.log("SlideType_ListenableTranslation_Answer:"+SlideType_ListenableTranslation_Answer);
	//SlideType_ListenableTranslation_Answer = replaceVariableInString(SlideType_ListenableTranslation_Answer);
	var timerOnCal  = 0;
	//timerOnCal += SlideType_ListenableTranslation_Answer[0].split(" ").length;
	timerOnCal += SlideType_ListenableTranslation_Answer[0].length;
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
		html += "<div>CORRECT TIP: "+CorrectTip+"</div>";
		html += "<div>INCORRECT TIP: "+InCorrectTip+"</div>";
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%; text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}
	$(function(){
		
		updateInputVariable();
		
		$("#"+sectionId+" #SlideType_ListenableTranslation_Listen_Text").click(function(){
			$(this).find("#audio")[0].load();
			$(this).find("#audio")[0].play();
		});
		
		$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").keyup(function(e) {
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
			$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
			$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_ListenableTranslation_Answer()");
			if(timerOn){
				isCheckAutomatic = true;
				checkSlideType_ListenableTranslation_Answer();
			}
		});
		
	});
	
	function disableOptions(){
		$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").attr("readonly","true");
		$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("opacity",".5");
	}
	
	function showCorrectAnswer(){
		console.log("showCorrectAnswer:"+correctAnswer);
		$("#"+sectionId+" #listenableCorrectDiv").css("display","");
		$("#"+sectionId+" #listenableCorrectDiv").text("Correct answer: "+correctAnswer);
		//$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val(SlideType_ListenableTranslation_Answer[0]);
	}

	function checkSlideType_ListenableTranslation_Answer(){
		if(isInLessonTest == "true" || isInitialTest == "true"){
			$("#bottomBarButton").css("visibility","hidden");
		}
		var multipleAnswer = SlideType_ListenableTranslation_Answer;
		var answerFlag = 0;
//		if(!typeof _gaq != 'undefined'){
//			var data = "subject-"+courseId+".L-"+"Slide-"+sectionId+".variable-"+SlideType_ListenableTranslation_Question.toLowerCase()+".UserInput-"+removeSpecialCharacter($("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val());
//			var lessonNumber = window.location.href;
//			lessonNumber = lessonNumber.substr(lessonNumber.lastIndexOf("/")+1,lessonNumber.indexOf(".jsp"));
//			_gaq.push(['_trackEvent', 'InteractiveLessons_user_Input ', courseId, data]);
//		}
		var answerResponse = $("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val();
		
		$("#"+sectionId).attr("isPlayedOnce","true");
		if(timerOn){
			if($("#"+sectionId).attr("fastestFinger") != undefined){
				$("#"+sectionId+" .fastestFingerContainer").slideDown();  
			}	
		}		
		
		var tts = "";
		for(var i=0;i<multipleAnswer.length;i++){
			multipleAnswer[i] = removeSpecialCharacter(multipleAnswer[i]).trim();
			console.log("mutipleanswer:"+removeSpecialCharacter($("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val()).toLowerCase().trim()+"/"+removeSpecialCharacter(multipleAnswer[i]).toLowerCase().trim());
			if( removeSpecialCharacter($("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val()).toLowerCase().trim() == removeSpecialCharacter(multipleAnswer[i]).toLowerCase().trim()) {
				answerFlag = 1;
				tts = $("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val().trim();
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
				
				$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#49C9AF");
				$("#"+sectionId+" .SlideType_ListenableTranslation_InputBoxOuterDiv").addClass("animated tada");
				$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").attr("readonly","true").blur();
				playCorrectSound();
				if(isWebinar){
					$("#bottomBarButton").attr("onclick","");
				}else{
					if(isTouchEvent()){
						$("#bottomBarButton").attr("ontouchend","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
					}else{
						$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
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
					if(!$("#"+sectionId).hasClass("CorrectAnswer"))
						$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_ListenableTranslation_InputBoxOuterDiv").removeClass("animated tada");
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
				$("#"+sectionId+" .SlideType_ListenableTranslation_InputBoxOuterDiv").addClass("animated shake");
				$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#FE5C57");
				$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").attr("readonly","true");
				setTimeout(function(){
					$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#F8CE46");
					$("#"+sectionId+" .SlideType_ListenableTranslation_InputBoxOuterDiv").removeClass("animated shake");
					$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val("");
					$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").blur();
					setTimeout(function(){
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val(correctAnswer);
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#49C9AF");
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").attr("readonly","true");
						$("#disableBottomBarButton").css("display","block");
						$("#bottomBarButton").removeClass("checkButtonAnimation");
						
						setTimeout(function(){
							$("#disableBottomBarButton").css("display","none");
							$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val("");
							$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#eee");
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
							if(isWebinar){
								$("#bottomBarButton").attr("onclick","");
								disableOptions();
								showCorrectAnswer();
							}else{
								$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").removeAttr("readonly");
								$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").focus();
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