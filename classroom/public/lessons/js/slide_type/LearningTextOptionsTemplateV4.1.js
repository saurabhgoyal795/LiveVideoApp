function render_LearningTextOptionsTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_LearningTextOptionsTemplate" slideType="SlideType_LearningTextOptionsTemplate" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="timerDiv" style=" z-index:-1;position: absolute; width: 100%; height: 100%; left: 0px; bottom: 0px; background: rgba(0,0,0,.2);display:none; "></div>'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 20px 0px;font-size:20px;">'
						+'<div id="title" style="padding: 0px 0px;width: 90%;margin: auto;"></div>'
					+'</div>'
					+'<div id="options" style="width: 100%;"></div>'
				+'</div>';
				        
			html += '</section>';
			$(".slides").append(html);
			
			var SlideType_Data = obj.data;
			 lessonFunctionCallVar[slideCount] = new SlideType_LearningTextOptionsTemplate_Function("slide"+(i + 2),SlideType_Data,(i + 2));
			 slideCount++;
}

function SlideType_LearningTextOptionsTemplate_Function(sectionId,SlideType_Data,slideNumber){
	
	this.checkSlideType_Choose_2_without_Top_Photo_Answer = checkSlideType_Choose_2_without_Top_Photo_Answer;
	
	//console.log("sectionId:"+sectionId,SlideType_Data.heading);
	SlideType_Data.heading = SlideType_Data.heading.replace("<left>","<span style='color:#FE5C57'>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</left>","</span> ");
	SlideType_Data.heading = SlideType_Data.heading.replace("<right>"," <span style='color:#FE5C57'>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</right>","</span>");
	$("#"+sectionId+" #title").html(SlideType_Data.heading);
	
	var slideCoin = equivalent_positive_coins;
	if(SlideType_Data.slideCoin != undefined && SlideType_Data.slideCoin > 0){
		slideCoin = SlideType_Data.slideCoin;
	}
	var correctIndex = SlideType_Data.correctIndex;
	var options = SlideType_Data.options;
	var correctText = options[correctIndex-1][0];
	//shuffleArray(options);
	var correctData = options[correctIndex-1];
	correctIndex = (parseInt(slideNumber*slideNumber+1.5*slideNumber)%options.length)+1;
	//console.log("correctIndex SlideType_LearningTextOptionsTemplate_Function:"+correctIndex+"/slideNumber:"+slideNumber+"/correctText:"+correctText);
	var optionTemp = [];
	for(var i=0;i<options.length;i++){
		if(options[i][0] != correctText){
			optionTemp.push(options[i]);
		}
	}
	optionTemp.splice(correctIndex-1, 0, correctData);
	//console.log("correctIndex SlideType_LearningTextOptionsTemplate_Function optionTemp",optionTemp);
	options = optionTemp;
	
	var timerOnCal  = 0;
	for(var i=0;i<options.length;i++){
		if(options[i][0] == correctText){
			correctIndex = i+1;
		}
		timerOnCal+= options[i][0].replace(" ","").length;
	}
	$("#lengthCalculator").html(SlideType_Data.heading);
	//console.log("SlideType_Data.heading:"+SlideType_Data.heading.length+"/"+$("#lengthCalculator").text().length);
	timerOnCal += $("#lengthCalculator").text().replace(" ","").length;
	$("#"+sectionId).attr("timerOn",parseInt(parseInt(timerOnCal)/10)*autoTimerMultiple);
	//$("#"+sectionId).attr("timerOn",parseInt(parseInt(timerOnCal)/10)3*2*autoTimerMultiple);
	//$("#"+sectionId).attr("timerOn",parseInt(parseInt(timerOnCal)*3)*autoTimerMultiple);

	if(SlideType_Data.teacherTip == undefined){
		SlideType_Data.teacherTip = "";
	}
	if(SlideType_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Data.teacherTip+"</div>";
		for(var i=0;i<options.length;i++){
			if(i+1 == correctIndex){
				html += "<div>CORRECT ANSWER: "+options[i][0]+"</div>";
				break;
			}
		}
		for(var i=0;i<options.length;i++){
			html += "<div>TIP "+(i+1)+": "+options[i][1]+"</div>";
		}
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%;text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}

	var SlideType_Choose_2_without_Top_Photo_Answer = "";
	var html = "";
	//console.log("texts",options);
	for(var i=0;i<options.length;i++){
		var isCorrect = false;
		if(i+1 == correctIndex){
			isCorrect = true;
			SlideType_Choose_2_without_Top_Photo_Answer = "option"+(i+1);
		}
		var fontsize = "24px";
		if(options[i][0].split(" ").length > 35){
			fontsize = "14px";
		}else if(options[i][0].split(" ").length > 25){
			fontsize = "16px";
		}else if(options[i][0].split(" ").length > 12){
			fontsize = "20px";
		}
		while(options[i][1].indexOf('\"') > -1){
			options[i][1] = options[i][1].replace('\"',"\'");
		}
		html += '<div isCorrect="'+isCorrect+'" tipText="'+options[i][1]+'" class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option'+(i+1)+'">'
							+'<div style=" position: absolute; height: 100%; left: 0px; top: 0px; font-size: 10px; width: 100%; "><div class="resultDiv" style="position: absolute;width: 0%;height: 100%;left: 0px;top: 0px;background: rgba(0,0,0,.1);font-size: 10px;text-align: right;"></div><div class="participantCount" style=" position: absolute; float: right; text-align: right; width: 100%; top: 8px; right: 8px; "></div></div>'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked">'
										+'<div style="font-size:'+fontsize+';" class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked">'+options[i][0]+'</div></td>'
								+'</tr>'
							+'</table>'
						+'</div>';	
	}
	
	$("#"+sectionId+" #options").append(html);
	if(isTouchEvent()){
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").on('touchend', function(event) {
				console.log("SlideType_Choose_2_without_Top_Photo_Div on touch");
			 
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
		console.log("disableOptions");
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
		//console.log("SlideType_Choose_2_without_Top_Photo_Answer:"+SlideType_Choose_2_without_Top_Photo_Answer);
		//console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_without_Top_Photo_Answer));
		//console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked"));
		//console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").attr("isCorrect"));
		
		var answerResponse = $("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked .SlideType_Choose_2_without_Top_Photo_Text").text();
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
				if(isWebinar){
					$("#bottomBarButton").attr("onclick","");
				}else{
					if(isTouchEvent()){
						$("#bottomBarButton").attr("ontouchend","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
					}else{
						$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
					}
				}
				$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").removeClass("animated pulse");
				playCorrectSound();
				
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
					$("#"+sectionId).addClass("CorrectAnswer");
					console.log("gameCoin:"+gameCoin);
					if(timerOn){
						var totalTime = parseInt($("#"+sectionId).attr("timerOn"))*1000;
						console.log("totalTime:"+totalTime+"/timeElapsed:"+timeElapsed+"/slideCoin:"+slideCoin);
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