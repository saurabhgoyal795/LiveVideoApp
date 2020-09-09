function render_DropdownTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Missing_Word" slideType="SlideType_Missing_Word" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="timerDiv" style="z-index:-1; position: absolute; width: 100%; height: 100%; left: 0px; bottom: 0px; background: rgba(0,0,0,.2);display:none; "></div>'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 10px 0px; color: #FE5C57;">'
						+'<span class="titleText" style="font-size: 24px; color: #FE5C57;text-transform: capitalize!important;">'+obj.data.heading+'</span>'
					+'</div>'
					+'<div class="SlideType_Missing_Word_QuestionText" style="width: 100%; font-size: 20px;margin-bottom:20px;">'
						+'<span class="questionPart1Text">'+obj.data.text_1+'</span> <span> ______ </span>'
						+'<span class="questionPart2Text">'+obj.data.text_2+'</span>'
					+'</div>'
					+'<div id="SlideType_Missing_Word_select_choice" class="SlideType_Missing_Word_select_choice_UnChecked" style="margin-bottom:20px;"></div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
			var SlideType_Missing_Word_options = obj.data.options;
			 var SlideType_Missing_Word_Answer = obj.data.correctIndex;
			 var SlideType_Data = obj.data;
			 lessonFunctionCallVar[slideCount] = new SlideType_Missing_Word_Function("slide"+(i + 2),SlideType_Missing_Word_options,SlideType_Missing_Word_Answer,SlideType_Data,(i + 2));
			 slideCount++;
}

function SlideType_Missing_Word_Function(sectionId,SlideType_Missing_Word_options,SlideType_Missing_Word_Answer,SlideType_Data,slideNumber){
	
	this.checkSlideType_Missing_Word_Answer = checkSlideType_Missing_Word_Answer;
	
	var slideCoin = equivalent_positive_coins;
	if(SlideType_Data.slideCoin != undefined && SlideType_Data.slideCoin > 0){
		slideCoin = SlideType_Data.slideCoin;
	}
	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").html("");	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_UnChecked");
	//console.log("SlideType_Missing_Word_options",SlideType_Missing_Word_options);
	var correctText = SlideType_Missing_Word_options[SlideType_Missing_Word_Answer-1][0];
	
	//console.log("SlideType_Missing_Word_options",SlideType_Missing_Word_options)
	//shuffleArray(SlideType_Missing_Word_options);
	
	var correctData = SlideType_Missing_Word_options[SlideType_Missing_Word_Answer-1];
	SlideType_Missing_Word_Answer = (parseInt(slideNumber*slideNumber+1.5*slideNumber)%SlideType_Missing_Word_options.length)+1;
	//console.log("correctIndex SlideType_Missing_Word_Function:"+SlideType_Missing_Word_Answer+"/slideNumber:"+slideNumber+"/correctText:"+correctText);
	var optionTemp = [];
	for(var i=0;i<SlideType_Missing_Word_options.length;i++){
		if(SlideType_Missing_Word_options[i][0] != correctText){
			optionTemp.push(SlideType_Missing_Word_options[i]);
		}
	}
	optionTemp.splice(SlideType_Missing_Word_Answer-1, 0, correctData);
	//console.log("correctIndex SlideType_Missing_Word_Function optionTemp",optionTemp);
	SlideType_Missing_Word_options = optionTemp;
	
	//console.log("SlideType_Missing_Word_options after",SlideType_Missing_Word_options)
	var timerOnCal  = 0;
	for(var i=0;i<SlideType_Missing_Word_options.length;i++){
		if(SlideType_Missing_Word_options[i][0] == correctText){
			SlideType_Missing_Word_Answer = "option"+(i+1);
		}
		timerOnCal+= SlideType_Missing_Word_options[i][0].replace(" ","").length;
	}

	timerOnCal += SlideType_Data.text_1.replace(" ","").length + SlideType_Data.text_2.replace(" ","").length;
	$("#"+sectionId).attr("timerOn",Math.max(7, parseInt(parseInt(timerOnCal)/10))*autoTimerMultiple);

	if(SlideType_Data.teacherTip == undefined){
		SlideType_Data.teacherTip = "";
	}
	if(SlideType_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Data.teacherTip+"</div>";
		for(var i=0;i<SlideType_Missing_Word_options.length;i++){
			if(SlideType_Missing_Word_options[i][0] == correctText){
				html += "<div>CORRECT ANSWER: "+SlideType_Missing_Word_options[i][0]+"</div>";
				break;
			}
		}
		for(var i=0;i<SlideType_Missing_Word_options.length;i++){
			html += "<div>TIP "+(i+1)+": "+SlideType_Missing_Word_options[i][1]+"</div>";
		}
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%; text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}

	//console.log("SlideType_Missing_Word_Answer:"+SlideType_Missing_Word_Answer);
	for(var i=0;i<SlideType_Missing_Word_options.length;i++){
		var text = SlideType_Missing_Word_options[i][0];
		//console.log("text:"+text);
			var fontsize = "24px!important";
			if(text.length > 35){
				fontsize = "14px!important";
			}else if(text.length > 25){
				fontsize = "16px!important";
			}else if(text.length > 15){
				fontsize = "20px!important";
			}
			while(SlideType_Missing_Word_options[i][1].indexOf('\"') > -1){
				SlideType_Missing_Word_options[i][1] = SlideType_Missing_Word_options[i][1].replace('\"',"\'");
			}
		   var html = '<div class="SlideType_Missing_Word_Div SlideType_Missing_Word_Div_UnChecked option'+(i+1)+'" tipText=\"'+SlideType_Missing_Word_options[i][1]+'\" answerClass=\"option"'+(i+1)+'\" >'+
						'<div style=" position: absolute; height: 100%; left: 0px; top: 0px; font-size: 10px; width: 100%; "><div class="resultDiv" style="position: absolute;width: 0%;height: 100%;left: 0px;top: 0px;background: rgba(0,0,0,.1);font-size: 10px;text-align: right;"></div><div class="participantCount" style=" position: absolute; float: right; text-align: right; width: 100%; top: 8px; right: 8px; "></div></div>'+
				        '<table style="width:100%;height:100%;">'+
				         '<tr>'+
				          '<td class="SlideType_Missing_Word_ImageTD"><div class="SlideType_Missing_Word_Image_Circle SlideType_Missing_Word_Image_Circle_UnChecked"></div></td>'+
				          '<td class="SlideType_Missing_Word_TextTD SlideType_Missing_Word_TextTD_UnChecked"><div style="font-size:'+fontsize+';" class="SlideType_Missing_Word_Text SlideType_Missing_Word_Text_UnChecked">'+text+'</div></td>'+
				         '</tr>'+
				        '</table>'+
				       '</div>';
		   $("#"+sectionId+" #SlideType_Missing_Word_select_choice").append(html);
	}
	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").change(function(){
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").addClass("checkButtonAnimation");
		playAudio($(this).val(), course_language);
	});
	if(isTouchEvent()){
		$("#"+sectionId+" .SlideType_Missing_Word_Div").on('touchend', function(event) {
			if($(this).attr("isEnable") == "false"){
				return;
			}
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				playTapSound();
				$("#"+sectionId+" .SlideType_Missing_Word_Div").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Missing_Word_Div").addClass("SlideType_Missing_Word_Div_UnChecked").removeClass("SlideType_Missing_Word_Div_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_UnChecked").removeClass("SlideType_Missing_Word_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_UnChecked").removeClass("SlideType_Missing_Word_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_Text").removeClass("SlideType_Missing_Word_Text_Checked").addClass("SlideType_Missing_Word_Text_UnChecked");
				
				$(this).addClass("SlideType_Missing_Word_Div_Checked").removeClass("SlideType_Missing_Word_Div_UnChecked");
				$(this).find(".SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_Checked").removeClass("SlideType_Missing_Word_Image_Circle_UnChecked");
				$(this).find(".SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_Checked").removeClass("SlideType_Missing_Word_TextTD_UnChecked");
				$(this).find(".SlideType_Missing_Word_Text").addClass("SlideType_Missing_Word_Text_Checked").removeClass("SlideType_Missing_Word_Text_UnChecked");
				if(timerOn){
					postMessage_checkAnswer();
				}
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
	}else{
		$("#"+sectionId+" .SlideType_Missing_Word_Div").click(function(){
			if($(this).attr("isEnable") == "false"){
				return;
			}
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				playTapSound();
				$("#"+sectionId+" .SlideType_Missing_Word_Div").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Missing_Word_Div").addClass("SlideType_Missing_Word_Div_UnChecked").removeClass("SlideType_Missing_Word_Div_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_UnChecked").removeClass("SlideType_Missing_Word_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_UnChecked").removeClass("SlideType_Missing_Word_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_Text").removeClass("SlideType_Missing_Word_Text_Checked").addClass("SlideType_Missing_Word_Text_UnChecked");
				
				$(this).addClass("SlideType_Missing_Word_Div_Checked").removeClass("SlideType_Missing_Word_Div_UnChecked");
				$(this).find(".SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_Checked").removeClass("SlideType_Missing_Word_Image_Circle_UnChecked");
				$(this).find(".SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_Checked").removeClass("SlideType_Missing_Word_TextTD_UnChecked");
				$(this).find(".SlideType_Missing_Word_Text").addClass("SlideType_Missing_Word_Text_Checked").removeClass("SlideType_Missing_Word_Text_UnChecked");
				if(timerOn){
					postMessage_checkAnswer();
				}
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
	}
	
	function disableOptions(){
		console.log("disableOptions");
		$("#"+sectionId+" .SlideType_Missing_Word_Div").each(function(){
			$(this).attr("isEnable","false");
			$(this).css("opacity",".5");
		});
	}
	
	function showCorrectAnswer(){
		console.log("showCorrectAnswer()");
		$("#"+sectionId+" .SlideType_Missing_Word_Div").each(function(){
			if($(this).hasClass(SlideType_Missing_Word_Answer)){
				$(this).addClass("SlideType_Missing_Word_Div_Correct").removeClass("SlideType_Missing_Word_Div_Checked");
			}
		});
	}
	
	function checkSlideType_Missing_Word_Answer(){
		
		$("#"+sectionId).attr("isPlayedOnce","true");
		if(timerOn){
			postMessage_cancelTimer();
			if($("#"+sectionId).attr("fastestFinger") != undefined){
				$("#"+sectionId+" .fastestFingerContainer").slideDown();  
			}
		}
		var answerResponse = $("#"+sectionId+" .SlideType_Missing_Word_Div_Checked .SlideType_Missing_Word_Text").text();
		if($("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").hasClass(SlideType_Missing_Word_Answer)){
				if($("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").attr("tipText")!=""){
					var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").attr("tipText"));
					setTimeout(function(){
						showTipPopup(text);
					},500);
				}
				$("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").addClass("SlideType_Missing_Word_Div_Correct SlideType_Missing_Word_Div_Animation_Duration_1s animated tada").removeClass("SlideType_Missing_Word_Div_Checked");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Missing_Word_Div_Correct").removeClass("SlideType_Missing_Word_Div_Animation_Duration_1s animated tada").addClass("SlideType_Missing_Word_Div_UnChecked");
				},1000);
				$("#"+sectionId+" .SlideType_Missing_Word_Image_Circle_Checked").addClass("SlideType_Missing_Word_Image_Circle_Correct").removeClass("SlideType_Missing_Word_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_TextTD_Checked").addClass("SlideType_Missing_Word_TextTD_Correct").removeClass("SlideType_Missing_Word_TextTD_Checked");
				$(this).find(".SlideType_Missing_Word_Text").removeClass("SlideType_Missing_Word_Text_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				if(isWebinar){
					$("#bottomBarButton").attr("onclick","");
				}else{
					if(isTouchEvent()){
						$("#bottomBarButton").attr("ontouchend","Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
					}else{
						$("#bottomBarButton").attr("onclick","Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
					}
				}
				$("#"+sectionId+" #SlideType_Missing_Word_Listen_QuestionText").removeClass("animated pulse");
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));{
						$("#"+sectionId).addClass("CorrectAnswer");
						$("#"+sectionId).removeClass("WrongAnswer");
					}
					
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
				if($("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").attr("tipText")!=""){
					var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").attr("tipText"));
					setTimeout(function(){
						showTipPopup(text);
					},500);
				}
				$("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").addClass("SlideType_Missing_Word_Div_InCorrect SlideType_Missing_Word_Div_Animation_Duration_1s animated shake").removeClass("SlideType_Missing_Word_Div_Checked");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Missing_Word_Div_InCorrect").removeClass("SlideType_Missing_Word_with_Image_ImageDiv_InCorrect SlideType_Missing_Word_Div_Animation_Duration_1s animated shake").addClass("SlideType_Missing_Word_Div_UnChecked");
				},1000);
				$("#"+sectionId+" .SlideType_Missing_Word_Text_Checked").addClass("SlideType_Missing_Word_Text_InCorrect").removeClass("SlideType_Missing_Word_Text_Checked");
				$("#"+sectionId+" .SlideType_Missing_Word_TextTD_Checked").addClass("SlideType_Missing_Word_TextTD_InCorrect");
				setTimeout(function(){
					if(isWebinar){
					}else{
						$("#"+sectionId+" .SlideType_Missing_Word_Text_InCorrect").removeClass("SlideType_Missing_Word_Text_InCorrect");
						$("#"+sectionId+" .SlideType_Missing_Word_Div_InCorrect").addClass("SlideType_Missing_Word_Div_UnChecked").removeClass("SlideType_Missing_Word_Div_InCorrect");
						$("#"+sectionId+" .SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_UnChecked").removeClass("SlideType_Missing_Word_Image_Circle_Checked");
					}
				},1000);
				
				$("#"+sectionId+" .SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_UnChecked").removeClass("SlideType_Missing_Word_TextTD_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
				$("#"+sectionId).addClass("WrongAnswer");
				correctFlag=0;
				console.log("isWebinar:"+isWebinar);
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