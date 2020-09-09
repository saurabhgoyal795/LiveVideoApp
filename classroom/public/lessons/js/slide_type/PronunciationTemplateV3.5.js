function render_PronunciationTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_PronunciationTemplate" slideType="SlideType_PronunciationTemplate" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="timerDiv" style=" z-index:-1;position: absolute; width: 100%; height: 100%; left: 0px; bottom: 0px; background: rgba(0,0,0,.2);display:none; "></div>'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 20px 0px;">'
						+'<div id="title" style="padding: 0px 0px;width: 90%;margin: auto;font-size:20px;"></div>'
					+'</div>'
					+'<div id="options" class="pronunciationOptionContainer" style="width: 100%;"></div>'
				+'</div>';
				        
			html += '</section>';
			$(".slides").append(html);
			
			var SlideType_Data = obj.data;
			 lessonFunctionCallVar[slideCount] = new SlideType_PronunciationTemplate_Function("slide"+(i + 2),SlideType_Data);
			 slideCount++;
}

function SlideType_PronunciationTemplate_Function(sectionId,SlideType_Data){
	
	this.checkSlideType_Choose_2_without_Top_Photo_Answer = checkSlideType_Choose_2_without_Top_Photo_Answer;
	
	console.log("sectionId:"+sectionId,SlideType_Data.heading);
	SlideType_Data.heading = SlideType_Data.heading.replace("<left>","<span style='color:#FE5C57'>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</left>","</span> '");
	SlideType_Data.heading = SlideType_Data.heading.replace("<right>","'<span>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</right>","</span>");
	$("#"+sectionId+" #title").html(SlideType_Data.heading);
	
	var slideCoin = equivalent_positive_coins;
	if(SlideType_Data.slideCoin != undefined && SlideType_Data.slideCoin > 0){
		slideCoin = SlideType_Data.slideCoin;
	}
	
	var correctIndex = SlideType_Data.correctIndex;
	
	var options = SlideType_Data.options;

	var timerOnCal  = 0;
	for(var i=0;i<options.length;i++){
		timerOnCal+= options[i][0].replace(" ","").length;
	}
	$("#lengthCalculator").html(SlideType_Data.heading);
	timerOnCal += $("#lengthCalculator").text().replace(" ","").length;
	$("#"+sectionId).attr("timerOn",Math.max(7, parseInt(parseInt(timerOnCal)/10))*autoTimerMultiple);
	
	if(SlideType_Data.teacherTip == undefined){
		SlideType_Data.teacherTip = "";
	}
	if(SlideType_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Data.teacherTip+"</div>";
		for(var i=0;i<options.length;i++){
			if(i+1 == correctIndex){
				html += "<div>CORRECT ANSWER: Option"+(i+1)+"</div>";
				break;
			}
		}
		/*
		for(var i=0;i<options.length;i++){
			html += "<div>TIP "+(i+1)+": "+options[i][1]+"</div>";
		}
		*/
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%;text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}

	var SlideType_Choose_2_without_Top_Photo_Answer = "";
	var html = "";
	console.log("texts",options);
	for(var i=0;i<options.length;i++){
		var isCorrect = false;
		if(i+1 == correctIndex){
			isCorrect = true;
			SlideType_Choose_2_without_Top_Photo_Answer = "option"+(i+1);
		}
		html += '<div isCorrect="'+isCorrect+'" onclick="if($(this).attr(\'isEnable\') == \'false\'){return;}$(this).find(\'audio\')[0].play();" audioFile="'+options[i][0]+'" class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option'+(i+1)+'" style="height:auto!important;max-height: initial!important;">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked">'
										//+'<div class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"><div style="height: 100px; background: rgba(255,255,255,.5); margin-bottom: 10px;text-align: center;"><img src="img/ic_volume_up_black_24dp_2x.png" style="margin:auto;width: 40px;margin-top: 30px;"/></div><div style="font-size:24px;padding: 4px;">Option'+(i+1)+'</div></div><audio style="display:none;"><source src="https://storage.cloud.google.com/he_web_assets/downloadable_lessons/'+courseId+'/audios/'+options[i][0]+'"></source></audio></td>'
										+'<div class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"><div style="height: 100px; background: rgba(255,255,255,.5); margin-bottom: 10px;text-align: center;"><img src="img/ic_volume_up_black_24dp_2x.png" style="margin:auto;width: 40px;margin-top: 30px;"/></div><div style="font-size:24px;padding: 4px;">Option'+(i+1)+'</div></div><audio style="display:none;" onended="try{window.webkit.messageHandlers.iOS.postMessage({method: \'webkitDidFinishPlayingAudio\'});}catch(err){}"><source src="https://storage.helloenglish.com/English-App/PronunciationFiles/hindi/'+options[i][0]+'"></source></audio></td>'
										
								+'</tr>'
							+'</table>'
						+'</div>';	
	}
	
	$("#"+sectionId+" #options").append(html);
	if(isTouchEvent()){
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").on('touchend', function(event) {
			if($(this).attr("isEnable") == "false"){
				return;
			}
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				playTapSound();
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").addClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text").removeClass("SlideType_Choose_2_without_Top_Photo_Text_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Text_UnChecked");
				
				$(this).addClass("SlideType_Choose_2_without_Top_Photo_Div_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Text").addClass("SlideType_Choose_2_without_Top_Photo_Text_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Text_UnChecked");
				if(timerOn){
					postMessage_checkAnswer();
				}
				/*
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
				*/
			}
		});
	}else{
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").click(function(){
			if($(this).attr("isEnable") == "false"){
				return;
			}
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				playTapSound();
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").addClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text").removeClass("SlideType_Choose_2_without_Top_Photo_Text_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Text_UnChecked");
				
				$(this).addClass("SlideType_Choose_2_without_Top_Photo_Div_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Text").addClass("SlideType_Choose_2_without_Top_Photo_Text_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Text_UnChecked");
				if(timerOn){
					postMessage_checkAnswer();
				}
				/*
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
				*/
			}
		});
	}
	
	
	function disableOptions(){
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").each(function(){
			$(this).attr("isEnable","false");
			$(this).css("opacity",".5");
		});
	}
	
	function showCorrectAnswer(){
		console.log("showCorrectAnswer()");
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").each(function(){
			if($(this).hasClass(SlideType_Choose_2_without_Top_Photo_Answer)){
				$(this).addClass("SlideType_Choose_2_without_Top_Photo_Div_Correct").removeClass("SlideType_Choose_2_without_Top_Photo_Div_Checked");
			}
		});
	}	
		
	function checkSlideType_Choose_2_without_Top_Photo_Answer(){
		console.log("SlideType_Choose_2_without_Top_Photo_Answer:"+SlideType_Choose_2_without_Top_Photo_Answer);
		console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_without_Top_Photo_Answer));
		console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked"));
		console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").attr("isCorrect"));
		var answerResponse = $("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").attr("audioFile");
		$("#"+sectionId).attr("isPlayedOnce","true");
		if(timerOn){
			postMessage_cancelTimer();
			if($("#"+sectionId).attr("fastestFinger") != undefined){
				$("#"+sectionId+" .fastestFingerContainer").slideDown();  
			}	
		}
		if($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_without_Top_Photo_Answer)){
				console.log("correct");
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Div_Correct").removeClass("SlideType_Choose_2_without_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Correct").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_TextTD_Checked").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_Correct").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Text").removeClass("SlideType_Choose_2_without_Top_Photo_Text_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				
				$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").removeClass("animated pulse");
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
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
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
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");	
					//correctFlag=1;
				}
				disableOptions();
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
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
			console.log("incorrect");
				var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Div_InCorrect").removeClass("SlideType_Choose_2_without_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_without_Top_Photo_Text_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_TextTD_Checked").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_InCorrect");
				setTimeout(function(){
					if(isWebinar){
					}else{
						$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_without_Top_Photo_Text_InCorrect");
						$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_InCorrect").addClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_InCorrect");
						$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked");
					}
				},1000);
				
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
				$("#"+sectionId).addClass("WrongAnswer");	
				if(correctFlag == 1){
					//userAnswerArray.push(2);
				}
				correctFlag=0;
				if(isWebinar){
					disableOptions();
					showCorrectAnswer();
				}
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
	}	
	
}