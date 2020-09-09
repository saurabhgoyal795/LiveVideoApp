function render_MultipleCorrectTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_MultipleCorrectTemplate" slideType="SlideType_MultipleCorrectTemplate" slideNumber="'+(i + 2)+'" data-background="#fff">'
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
			 lessonFunctionCallVar[slideCount] = new SlideType_MultipleCorrectTemplate_Function("slide"+(i + 2),SlideType_Data,(i + 2));
			 slideCount++;
}

function SlideType_MultipleCorrectTemplate_Function(sectionId,SlideType_Data,slideNumber){
	
	this.checkSlideType_Choose_Multiple_Answer = checkSlideType_Choose_Multiple_Answer;
	var isCheckAutomatic = false;
	//console.log("sectionId:"+sectionId,SlideType_Data.heading);
	SlideType_Data.heading = SlideType_Data.heading.replace("<left>","<span style='color:#FE5C57'>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</left>","</span> ");
	SlideType_Data.heading = SlideType_Data.heading.replace("<right>"," <span style='color:#FE5C57'>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</right>","</span>");
	$("#"+sectionId+" #title").html(SlideType_Data.heading);
	
	var slideCoin = equivalent_positive_coins;
	console.log("slideCoin:"+slideCoin);
	if(SlideType_Data.slideCoin != undefined && SlideType_Data.slideCoin > 0){
		slideCoin = SlideType_Data.slideCoin;
	}
	
	var correctIndex = SlideType_Data.correctIndex;
	console.log("correctIndex",correctIndex);
	var options = SlideType_Data.options;
	//var correctText = options[correctIndex-1][0];
	//shuffleArray(options);
	//var correctData = options[correctIndex-1];
	//correctIndex = (parseInt(slideNumber*slideNumber+1.5*slideNumber)%options.length)+1;
	//console.log("correctIndex SlideType_LearningTextOptionsTemplate_Function:"+correctIndex+"/slideNumber:"+slideNumber+"/correctText:"+correctText);
	/*
	var optionTemp = [];
	for(var i=0;i<options.length;i++){
		if(options[i][0] != correctText){
			optionTemp.push(options[i]);
		}
	}
	optionTemp.splice(correctIndex-1, 0, correctData);
	options = optionTemp;
	*/
	var timerOnCal  = 0;
	for(var i=0;i<options.length;i++){
		/*
		if(options[i][0] == correctText){
			correctIndex = i+1;
		}
		*/
		timerOnCal+= options[i][0].replace(" ","").length;
	}
	$("#lengthCalculator").html(SlideType_Data.heading);
	//console.log("SlideType_Data.heading:"+SlideType_Data.heading.length+"/"+$("#lengthCalculator").text().length);
	timerOnCal += $("#lengthCalculator").text().replace(" ","").length;
	$("#"+sectionId).attr("timerOn",Math.max(7, parseInt(parseInt(timerOnCal)/10))*2*autoTimerMultiple);

	if(SlideType_Data.teacherTip == undefined){
		SlideType_Data.teacherTip = "";
	}
	if(SlideType_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Data.teacherTip+"</div>";
		html += "<div>CORRECT ANSWER: ";
		for(var i=0;i<options.length;i++){
			var isFound = false;
			for(var k=0;k<correctIndex.length;k++){
				console.log("correctIndex[k]:"+correctIndex[k]);
				if(correctIndex[k] == i+1){
					isFound = true;
					break;
				}
			}
			if(isFound){
				html += options[i][0]+" || ";
			}
		}
		html += "</div>";
		for(var i=0;i<options.length;i++){
			html += "<div>TIP "+(i+1)+": "+options[i][1]+"</div>";
		}
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%;text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}

	var SlideType_Choose_Multiple_Answer = "";
	var html = "";
	//console.log("texts",options);
	for(var i=0;i<options.length;i++){
		var isCorrect = false;
		for(var k=0;k<correctIndex.length;k++){
			if(correctIndex[k] == i+1){
				isCorrect = true;
				SlideType_Choose_Multiple_Answer = "option"+(i+1);
				break;
			}
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
		html += '<div isCorrect="'+isCorrect+'" tipText="'+options[i][1]+'" class="SlideType_Choose_Multiple_Div SlideType_Choose_Multiple_Div_UnChecked option'+(i+1)+'">'
							+'<div style=" position: absolute; height: 100%; left: 0px; top: 0px; font-size: 10px; width: 100%; "><div class="resultDiv" style="position: absolute;width: 0%;height: 100%;left: 0px;top: 0px;background: rgba(0,0,0,.1);font-size: 10px;text-align: right;"></div><div class="participantCount" style=" position: absolute; float: right; text-align: right; width: 100%; top: 8px; right: 8px; "></div></div>'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_Multiple_Image_Circle SlideType_Choose_Multiple_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_Multiple_TextTD SlideType_Choose_Multiple_TextTD_UnChecked">'
										+'<div style="font-size:'+fontsize+';" class="SlideType_Choose_Multiple_Text SlideType_Choose_Multiple_Text_UnChecked">'+options[i][0]+'</div></td>'
								+'</tr>'
							+'</table>'
						+'</div>';	
	}
	
	$("#"+sectionId+" #options").append(html);
	if(isTouchEvent()){
		$("#"+sectionId+" .SlideType_Choose_Multiple_Div").on('touchend', function(event) {
				console.log("SlideType_Choose_Multiple_Div on touch");
			 
				if($(this).attr("isEnable") == "false"){
					return;
				}
				if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
					$("#disableBottomBarButton").css("display","none");
					$("#bottomBarButton").addClass("checkButtonAnimation");
					playTapSound();
					
					if($(this).hasClass("SlideType_Choose_Multiple_Div_Checked")){
						$(this).removeClass("animated tada_slow");
						$(this).addClass("SlideType_Choose_Multiple_Div_UnChecked").removeClass("SlideType_Choose_Multiple_Div_Checked");
						$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_UnChecked").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");
						$(this).find(".SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_UnChecked").removeClass("SlideType_Choose_Multiple_TextTD_Checked");
						$(this).find(".SlideType_Choose_Multiple_Text").removeClass("SlideType_Choose_Multiple_Text_Checked").addClass("SlideType_Choose_Multiple_Text_UnChecked");					
					}else{
						$(this).addClass("SlideType_Choose_Multiple_Div_Checked").removeClass("SlideType_Choose_Multiple_Div_UnChecked");
						$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_Checked").removeClass("SlideType_Choose_Multiple_Image_Circle_UnChecked");
						$(this).find(".SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_Checked").removeClass("SlideType_Choose_Multiple_TextTD_UnChecked");
						$(this).find(".SlideType_Choose_Multiple_Text").addClass("SlideType_Choose_Multiple_Text_Checked").removeClass("SlideType_Choose_Multiple_Text_UnChecked");										
						
					}
					
					if(timerOn){
						isCheckAutomatic = true;
						postMessage_checkAnswer();
					}
				}
		 });
	}else{
		$("#"+sectionId+" .SlideType_Choose_Multiple_Div").click(function(){
			if($(this).attr("isEnable") == "false"){
				return;
			}
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				playTapSound();
				/*
				$("#"+sectionId+" .SlideType_Choose_Multiple_Div").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Choose_Multiple_Div").addClass("SlideType_Choose_Multiple_Div_UnChecked").removeClass("SlideType_Choose_Multiple_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_UnChecked").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_UnChecked").removeClass("SlideType_Choose_Multiple_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Choose_Multiple_Text").removeClass("SlideType_Choose_Multiple_Text_Checked").addClass("SlideType_Choose_Multiple_Text_UnChecked");
				*/
				if($(this).hasClass("SlideType_Choose_Multiple_Div_Checked")){
					$(this).removeClass("animated tada_slow");
					$(this).addClass("SlideType_Choose_Multiple_Div_UnChecked").removeClass("SlideType_Choose_Multiple_Div_Checked");
					$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_UnChecked").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");
					$(this).find(".SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_UnChecked").removeClass("SlideType_Choose_Multiple_TextTD_Checked");
					$(this).find(".SlideType_Choose_Multiple_Text").removeClass("SlideType_Choose_Multiple_Text_Checked").addClass("SlideType_Choose_Multiple_Text_UnChecked");					
				}else{
					$(this).addClass("SlideType_Choose_Multiple_Div_Checked").removeClass("SlideType_Choose_Multiple_Div_UnChecked");
					$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_Checked").removeClass("SlideType_Choose_Multiple_Image_Circle_UnChecked");
					$(this).find(".SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_Checked").removeClass("SlideType_Choose_Multiple_TextTD_UnChecked");
					$(this).find(".SlideType_Choose_Multiple_Text").addClass("SlideType_Choose_Multiple_Text_Checked").removeClass("SlideType_Choose_Multiple_Text_UnChecked");										
					
				}
				
				if(timerOn){
					isCheckAutomatic = true;
					postMessage_checkAnswer();
				}
			}
		});
	}
	
	
	function disableOptions(){
		console.log("disableOptions");
		$("#"+sectionId+" .SlideType_Choose_Multiple_Div").each(function(){
			$(this).attr("isEnable","false");
			$(this).css("opacity",".5");
		});
	}
	
	function showCorrectAnswer(){
		console.log("showCorrectAnswer()");
		$("#"+sectionId+" .SlideType_Choose_Multiple_Div").each(function(){
			if($(this).attr("isCorrect") == "true"){
				$(this).addClass("SlideType_Choose_Multiple_Div_Correct").removeClass("SlideType_Choose_Multiple_Div_Checked");
			}
		});
	}
	
	function checkSlideType_Choose_Multiple_Answer(){
		//console.log("SlideType_Choose_Multiple_Answer:"+SlideType_Choose_Multiple_Answer);
		//console.log($("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").hasClass(SlideType_Choose_Multiple_Answer));
		//console.log($("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked"));
		//console.log($("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").attr("isCorrect"));
		var answerResponse = "";
		$("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").each(function(){
			answerResponse += $(this).find(".SlideType_Choose_Multiple_Text").text()+"##";
		});
		if(answerResponse.indexOf("##") > -1){
			answerResponse = answerResponse.substr(0,answerResponse.length-2);
		}
		//var answerResponse = $("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked .SlideType_Choose_Multiple_Text").text();
		$("#"+sectionId).attr("isPlayedOnce","true");
		
		var isAllCorrect = true;
		var totalCorrect = 0;
		var totalInCorrect = 0;
		$("#"+sectionId+" .SlideType_Choose_Multiple_Div").each(function(){
			
			if($(this).hasClass("SlideType_Choose_Multiple_Div_Checked") && $(this).attr("iscorrect") == "true"){
				console.log("each if");
				totalCorrect++;
			}else if(!$(this).hasClass("SlideType_Choose_Multiple_Div_Checked") && $(this).attr("iscorrect") == "true"){
				console.log("each else1");
				isAllCorrect = false;
				totalInCorrect++;
			}else if($(this).hasClass("SlideType_Choose_Multiple_Div_Checked") && $(this).attr("iscorrect") != "true"){
				console.log("each else2");
				isAllCorrect = false;
				totalInCorrect++;
			}
		});
		console.log("isAllCorrect:"+isAllCorrect);
		if(timerOn){
			if($("#"+sectionId).attr("fastestFinger") != undefined){
				$("#"+sectionId+" .fastestFingerContainer").slideDown();  
			}
		}
		if(isCheckAutomatic){
			isCheckAutomatic = false;
			if(timerOn && isAllCorrect){
				postMessage_cancelTimer();
			}else if(timerOn && !isAllCorrect){
				return;
			}
		}
		
		if(isAllCorrect){
			//var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").attr("tipText"));
			$("#bottomBarButton").attr("isDisable","true");
			setTimeout(function(){
				$("#bottomBarButton").attr("isDisable","false");
				//showTipPopup(text);
			},500);
			$("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").each(function(){
				$(this).addClass("SlideType_Choose_Multiple_Div_Correct").removeClass("SlideType_Choose_Multiple_Div_Checked");
				$(this).find(".SlideType_Choose_Multiple_Image_Circle_Checked").addClass("SlideType_Choose_Multiple_Image_Circle_Correct").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");
				$(this).find(".SlideType_Choose_Multiple_TextTD_Checked").addClass("SlideType_Choose_Multiple_TextTD_Correct").removeClass("SlideType_Choose_Multiple_TextTD_Checked");
			});
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
			playCorrectSound();
			
			if(correctFlag==1){
				if(!$("#"+sectionId).hasClass("WrongAnswer"));
				$("#"+sectionId).addClass("CorrectAnswer");
				console.log("gameCoin:"+gameCoin+"/totalCorrect:"+totalCorrect+"/totalInCorrect:"+totalInCorrect);
				if(timerOn){
					var totalTime = parseInt($("#"+sectionId).attr("timerOn"))*1000;
					console.log("totalTime:"+totalTime+"/timeElapsed:"+timeElapsed+"/slideCoin:"+slideCoin);
					slideCoin = Math.max(0,(totalCorrect - totalInCorrect)/totalCorrect)*slideCoin;
					slideCoin = parseInt(((totalTime-timeElapsed)*slideCoin)/totalTime);
					gameCoin = gameCoin + slideCoin;
				}else{
					slideCoin = Math.max(0,(totalCorrect - totalInCorrect)/totalCorrect);
					gameCoin=gameCoin+slideCoin;
				}
				gameCoin = Math.ceil(gameCoin);
				slideCoin = Math.ceil(slideCoin);
				//userAnswerArray.push(1);
				if(slideCoin > 0){
					showAwardCoin(slideCoin);
				}
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
		}else{
			//var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").attr("tipText"));
			$("#bottomBarButton").attr("isDisable","true");
			setTimeout(function(){
				$("#bottomBarButton").attr("isDisable","false");
				//showTipPopup(text);
			},500);
			
			$("#"+sectionId+" .SlideType_Choose_Multiple_Div_Checked").each(function(){
				if($(this).attr("iscorrect") == "true"){
					
				}else{
					$(this).addClass("SlideType_Choose_Multiple_Div_InCorrect").removeClass("SlideType_Choose_Multiple_Div_Checked");
					$(this).find(".SlideType_Choose_Multiple_Text_Checked").addClass("SlideType_Choose_Multiple_Text_UnChecked").removeClass("SlideType_Choose_Multiple_Text_Checked");
					$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_UnChecked").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");
					$(this).find(".SlideType_Choose_Multiple_TextTD_Checked").addClass("SlideType_Choose_Multiple_TextTD_UnChecked").removeClass("SlideType_Choose_Multiple_TextTD_Checked");	
				}
				
			});
			if(isWebinar){
				if(timerOn){
					var totalTime = parseInt($("#"+sectionId).attr("timerOn"))*1000;
					console.log("totalTime:"+totalTime+"/timeElapsed:"+timeElapsed+"/slideCoin:"+slideCoin);
					slideCoin = Math.max(0,(totalCorrect - totalInCorrect)/totalCorrect)*slideCoin;
					slideCoin = parseInt(((totalTime-timeElapsed)*slideCoin)/totalTime);
					gameCoin = gameCoin + slideCoin;
				}else{
					slideCoin = Math.max(0,(totalCorrect - totalInCorrect)/totalCorrect);
					gameCoin=gameCoin+slideCoin;
				}
				gameCoin = Math.ceil(gameCoin);
				slideCoin = Math.ceil(slideCoin);
				if(slideCoin > 0){
					showAwardCoin(slideCoin);
				}
			}
			
			setTimeout(function(){
				if(isWebinar){
				}else{
					$("#"+sectionId+" .SlideType_Choose_Multiple_Div").each(function(){
						if($(this).attr("iscorrect") == "true"){
							$(this).addClass("SlideType_Choose_Multiple_Div_UnChecked").removeClass("SlideType_Choose_Multiple_Div_Checked");
							$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_UnChecked").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");
							$(this).find(".SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_UnChecked").removeClass("SlideType_Choose_Multiple_TextTD_Checked");
							$(this).find(".SlideType_Choose_Multiple_Text").removeClass("SlideType_Choose_Multiple_Text_Checked").addClass("SlideType_Choose_Multiple_Text_UnChecked");					
						}else{
							$(this).removeClass("SlideType_Choose_Multiple_Div_Checked").addClass("SlideType_Choose_Multiple_Div_UnChecked");
							$(this).find(".SlideType_Choose_Multiple_Text_InCorrect").removeClass("SlideType_Choose_Multiple_Text_InCorrect");
							$(this).addClass("SlideType_Choose_Multiple_Div_UnChecked").removeClass("SlideType_Choose_Multiple_Div_InCorrect");
							$(this).find(".SlideType_Choose_Multiple_Image_Circle").addClass("SlideType_Choose_Multiple_Image_Circle_UnChecked").removeClass("SlideType_Choose_Multiple_Image_Circle_Checked");	
						}						
					});
				}
			},1000);
			//$("#"+sectionId+" .SlideType_Choose_Multiple_TextTD").addClass("SlideType_Choose_Multiple_TextTD_UnChecked").removeClass("SlideType_Choose_Multiple_TextTD_Checked");
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