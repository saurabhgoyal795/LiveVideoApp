function render_JumbleTemplate(i,obj){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Jumble_Slide" slideType="SlideType_Jumble_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="timerDiv" style="z-index:-1; position: absolute; width: 100%; height: 100%; left: 0px; bottom: 0px; background: rgba(0,0,0,.2);display:none; "></div>'
				+'<div class="sectionInnerContainer">'
					+'<div style="width: 100%;">'
						+'<div class="QuestionText" style="padding: 70px 0px 0px 0px; color: #49C9AF !important; font-size: 24px;">'+obj.data.heading+'</div>'
						+'<div class="notificationTipBox" style="position: absolute; right: 55px; top: 10px; padding: 5px; width: 220px; text-transform: uppercase; font-size: 17px; background: #7f7f7f; border-radius: 4px;line-height: 1.2em!important;display: none;">'
							+'<span style="color: #fff;">Tip</span> '
							+'<img style="position: absolute; right: -25px; transform: rotate3d(0, 0, 0, 180deg); width: 50px; z-index: -1; top: 5px;" src="img/call-out 300px.png" />'
						+'</div>'
						+'<div class="monsterBarNotificationImage" style="position: absolute; right: 0px; top: 25px; width: 40px; height: 61px; background: url(\'img/jelly-monster-2-small - rotate-15-anti.png\'); background-size: cover; background-repeat: no-repeat;display: none;">'
						+'</div>'
						+'<div id="jumbleCorrectDiv" style="width: 100%;font-size: 20px;margin: 30px 16px 0px 16px;text-align: left;display:none;"></div>'
						+'<div style="width: 100%; font-size: 20px; margin-top: 30px;">'
							+'<li class="animatedListClass" style=""></li>'
							+'<ul id="jumbleTarget" style="width: 710px; min-height: 114px; background: #eee; border: 2px solid #F8CE46; border-radius: 4px;"></ul>'
							+'<ul id="jumbleSource" style="margin-top: 50px; border: 2px solid #F8CE46; width: 710px; min-height: 100px; border-radius: 4px;"> </ul>'
						+'</div>'
					+'</div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
			 var SlideType_Jumble_Slide_AnswerText = obj.data.answer;
			 var SlideType_Jumble_Slide_options = obj.data.options;
			 var SlideType_Jumble_Slide_Typing_Language = "0";
			 var SlideType_Jumble_Slide_slideNumber = slideCount;
			var SlideType_Data = obj.data;
			 lessonFunctionCallVar[slideCount] = new SlideType_Jumble_Slide_Function("slide"+(i + 2),SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_options,SlideType_Data);
			 slideCount++;
}


function SlideType_Jumble_Slide_Function(sectionId,SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_options,SlideType_Data){
	
	this.checkSlideType_Jumble_Slide_Answer = checkSlideType_Jumble_Slide_Answer;
	this.SlideType_Jumble_Slide_checkListClass = SlideType_Jumble_Slide_checkListClass;
	var incorrectCountInJumbleSlide = 0;
	var isCheckAutomatic = false;
	
	var slideCoin = equivalent_positive_coins;
	if(SlideType_Data.slideCoin != undefined && SlideType_Data.slideCoin > 0){
		slideCoin = SlideType_Data.slideCoin;
	}
	
	if(SlideType_Data.teacherTip == undefined){
		SlideType_Data.teacherTip = "";
	}
	if(SlideType_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Data.teacherTip+"</div>";
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%; text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}
	$(function(){
		var multipleAnswer = SlideType_Jumble_Slide_AnswerText.toLowerCase().trim().split("/");
		var answerFlag = 0;
		var firstCorrectWord = "";
		for(var i=0;i<multipleAnswer.length;i++){
			firstCorrectWord = multipleAnswer[i].split(" ")[0];
			break;
		}
		
		SlideType_Jumble_Slide_AnswerText = replaceVariable(SlideType_Jumble_Slide_AnswerText);
		$("#"+sectionId+" .answerTextDiv").text(SlideType_Jumble_Slide_AnswerText);
		
		dataOptions = SlideType_Jumble_Slide_options;//SlideType_Jumble_Slide_option_String.split("*&");

		var timerOnCal  = 0;

		$("#"+sectionId+" #jumbleSource").html("");
		timerOnCal += dataOptions.length;
		for(var i=0;i<dataOptions.length;i++){
			//timerOnCal+= dataOptions[i].replace(" ","").length;
			TTSWordsArray.push(dataOptions[i]);
			if(dataOptions[i]!=""){
				//console.log("jelly:"+replaceVariable(dataOptions[i]).toLowerCase()+"/"+dataOptions[i]+"/"+firstCorrectWord.toLowerCase());
				if(dataOptions[i].toLowerCase() == firstCorrectWord.toLowerCase()){
					if(isTouchEvent()){
						$("#"+sectionId+" #jumbleSource").append("" +
								'<li ontouchend="lessonFunctionCallVar['+SlideType_Jumble_Slide_slideNumber+'].SlideType_Jumble_Slide_checkListClass(this)" class="answerListClass animated pulse" style="animation-iteration-count:infinite;">'+replaceVariable(dataOptions[i])+'</li>'+		
								"");
					}else{
						$("#"+sectionId+" #jumbleSource").append("" +
							'<li onclick="lessonFunctionCallVar['+SlideType_Jumble_Slide_slideNumber+'].SlideType_Jumble_Slide_checkListClass(this)" class="answerListClass animated pulse" style="animation-iteration-count:infinite;">'+replaceVariable(dataOptions[i])+'</li>'+		
							"");
					}
				}else{
					if(isTouchEvent()){
						$("#"+sectionId+" #jumbleSource").append("" +
						'<li ontouchend="lessonFunctionCallVar['+SlideType_Jumble_Slide_slideNumber+'].SlideType_Jumble_Slide_checkListClass(this)" class="answerListClass">'+replaceVariable(dataOptions[i])+'</li>'+		
						"");
					}else{
						$("#"+sectionId+" #jumbleSource").append("" +
						'<li onclick="lessonFunctionCallVar['+SlideType_Jumble_Slide_slideNumber+'].SlideType_Jumble_Slide_checkListClass(this)" class="answerListClass">'+replaceVariable(dataOptions[i])+'</li>'+		
						"");
					}
				}
			}
			
		}

		$("#lengthCalculator").html(SlideType_Data.heading);
		timerOnCal += $("#lengthCalculator").text().replace(" ","").length/10;
		//timerOnCal+= SlideType_Data.heading.replace(" ","").length/10;
		//$("#"+sectionId).attr("timerOn",Math.min(15, parseInt(parseInt(timerOnCal)*2))*autoTimerMultiple);
		$("#"+sectionId).attr("timerOn",parseInt(parseInt(timerOnCal)*2*2)*autoTimerMultiple);

		$("#"+sectionId+"  .monsterBarNotificationImage").click(function(){
			if($("#"+sectionId+"  .notificationTipBox").hasClass("notificationBarHide")){
				$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarHide").addClass("notificationBarShow");
			}else{
				$("#"+sectionId+"  .notificationTipBox").removeClass("notificationBarShow").addClass("notificationBarHide");
			}
			
		});
		
	});
	
	function disableOptions(){
		$("#"+sectionId+" #jumbleTarget li").each(function(){
			$(this).attr("isEnable","false");
			$(this).css("opacity",".5");
		});
		$("#"+sectionId+" #jumbleSource li").each(function(){
			$(this).attr("isEnable","false");
			$(this).css("opacity",".5");
		});
	}
	
	function showCorrectAnswer(){
		console.log("showCorrectAnswer()");
		$("#"+sectionId+" #jumbleCorrectDiv").css("display","");
		var multipleAnswer = replaceVariableInString(SlideType_Jumble_Slide_AnswerText).toLowerCase().trim().split("/");
		$("#"+sectionId+" #jumbleCorrectDiv").text("Correct answer: "+multipleAnswer[0]);
		$("#"+sectionId+" #jumbleCorrectDiv").next().css("margin-top","0px");
	}
	

	function checkSlideType_Jumble_Slide_Answer(){
		
		var userAnswer = "";
		
		SlideType_Jumble_Slide_AnswerText = updateJumbleAnswerString(SlideType_Jumble_Slide_AnswerText);
		updateInputVariable();
		
		$("#"+sectionId+" #jumbleTarget li").each(function(){
			if($(this).children().length > 0){
				userAnswer = userAnswer + $(this).children().text().trim() + " ";
			}else{
				userAnswer = userAnswer + $(this).text().toLowerCase().trim() + " ";
			}
		});
		$("#"+sectionId).attr("isPlayedOnce","true");
		var answerResponse = userAnswer;
		
		console.log("SlideType_Jumble_Slide_AnswerText:"+SlideType_Jumble_Slide_AnswerText);
		var multipleAnswer = replaceVariableInString(SlideType_Jumble_Slide_AnswerText).toLowerCase().trim().split("/");
		var answerFlag = 0;
		
		for(var i=0;i<multipleAnswer.length;i++){
			multipleAnswer[i] = removeSpecialCharacter(multipleAnswer[i]).trim();
			console.log(multipleAnswer[i]+"/"+removeSpecialCharacter(userAnswer).toLowerCase().trim());
			if( ( removeSpecialCharacter(userAnswer).toLowerCase().trim() == multipleAnswer[i] ) ){
				answerFlag = 1;
			}
		}
		if(timerOn){
			if($("#"+sectionId).attr("fastestFinger") != undefined){
				$("#"+sectionId+" .fastestFingerContainer").slideDown();  
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
		//SlideType_Jumble_Slide_AnswerText = removeSpecialCharacter(SlideType_Jumble_Slide_AnswerText);
		userAnswer = removeSpecialCharacter(userAnswer);
		if(answerFlag==1){
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
			$("#"+sectionId+" #jumbleTarget").css("background","#49C9AF");
			playCorrectSound();
			
			if(incorrectCountInJumbleSlide < 3){
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
				if(timerOn){
					if(correctFlag == 1){
						showAwardCoin(slideCoin);
					}
				}else{
					showAwardCoin(slideCoin);
				}
			}
			disableOptions();
			incorrectCountInJumbleSlide = 0;
			if(isInitialTest == "true"){
//				$("#bottomBarButton").css("visibility","hidden");
//				$("#bottomBarButton").click();
				setTimeout(function(){
					$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
					if(isTouchEvent()){
						$("#bottomBarButton").attr("ontouchend","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					}else{
						$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					}
						bottomBarButtonClicked();
				},800);
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
			$("#"+sectionId+" #jumbleTarget").css("background","#FE5C57");
			$("#"+sectionId+" #jumbleTarget").addClass("animated shake");
			  setTimeout(function(){
				  $("#"+sectionId+" #jumbleTarget").css("background","");
				  $("#"+sectionId+" #jumbleTarget").removeClass("animated shake");
			  },1100);
			  $("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
			 
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
				$("#"+sectionId).addClass("WrongAnswer");
				playInCorrectSound();
			  incorrectCountInJumbleSlide++;
			  if(timerOn){
				  correctFlag=0;
			  }
			  if(incorrectCountInJumbleSlide >= 3){
				  incorrectCountInJumbleSlide = 0;
					correctFlag=0;  
				  //userAnswerArray.push(2);
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
				  if(isInitialTest == "true"){
					$("#bottomBarButton").css("visibility","hidden");
					setTimeout(function(){
						bottomBarButtonClicked();
					},1500);
				 }
			  }
			  
			  if(isWebinar){
					disableOptions();
					showCorrectAnswer();
			  }else{
				setTimeout(function(){
				  SlideType_Jumble_Slide_AnimateWrongWordbackToSource();
				},1000);  
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
	
	function SlideType_Jumble_Slide_AnimateWrongWordbackToSource(){
		var wordCount = 0;
		var answerArray = SlideType_Jumble_Slide_AnswerText.split(" ");
		$("#"+sectionId+" #jumbleTarget li").each(function(){
			if(answerArray[wordCount].toLowerCase() != $(this).text().toLowerCase()){
				for(var i=wordCount;i<answerArray.length;i++){
						if(isTouchEvent()){
							$("#"+sectionId+" #jumbleTarget li:eq("+i+")").trigger('touchend');
						}else{
							$("#"+sectionId+" #jumbleTarget li:eq("+i+")").click();
						}
						$("#"+sectionId+" #jumbleTarget li:eq("+i+")").remove();
				}
			}else{
				wordCount++;
			}
		});
	}

	function SlideType_Jumble_Slide_checkListClass(this1){
		if($(this1).attr("isEnable") == "false"){
			return;
		}
		$(this1).removeClass("animated");
		if($(this1).hasClass("inTarget")){
			swapTargetToSource(this1);
		}else{
			swapSourceToTarget(this1);
		}
		playAudio($(this1).text(), course_language);
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").addClass("checkButtonAnimation");
		$("#"+sectionId+"  .notificationTipBox").removeClass("notificationBarShow").addClass("notificationBarHide");
	}

	function swapSourceToTarget(this1){
		
		_this = this1;
		$(_this).addClass("inTarget");
		var html = $(_this)[0].outerHTML;
		
		$(_this).css("visibility","hidden");
		var initialTop = $(_this).position().top;
		var initialLeft = $(_this).position().left;
		var targetUlTopPosition = 0;
		var targetUlLeftPosition = 0;
		
		$("#"+sectionId+" .animatedListClass").css({"top":initialTop,"left":initialLeft,"display":"block"}).text($(_this).text());
		
		if($("#"+sectionId+" #jumbleTarget").children().length != 0){
			targetUlTopPosition = $("#"+sectionId+" #jumbleTarget li").last().position().top - initialTop +"px";
			targetUlLeftPosition = $("#"+sectionId+" #jumbleTarget li").last().position().left + $("#"+sectionId+" #jumbleTarget li").last().width() + 40 - initialLeft +"px";
		}
		else{
			targetUlTopPosition = $("#"+sectionId+" #jumbleTarget").position().top - initialTop +"px";
			targetUlLeftPosition = $("#"+sectionId+" #jumbleTarget").position().left - initialLeft + 20 +"px";
		}
		
		$("#"+sectionId+" .animatedListClass").css("-webkit-transform","translate3d("+targetUlLeftPosition+","+targetUlTopPosition+",0px )");
		$("#"+sectionId+" .animatedListClass").css("transform","translate3d("+targetUlLeftPosition+","+targetUlTopPosition+" ,0px)");
		
		$(_this).css("width",$(_this).width());
		$(_this).css("-webkit-transition-duration",".3s");
		$(_this).css("transition-duration",".3s");
		$(_this).addClass("inSourceRemoveElement");
		$(_this).css("width","0px");
		$(_this).css("background","#999!important");
		$(_this).removeClass("inTarget");
		
		setTimeout(function(){
			$(_this).remove();
			$("#"+sectionId+" #jumbleTarget").append(html);
			$("#"+sectionId+" .animatedListClass").css("display","none");
			$("#"+sectionId+" .animatedListClass").css("-webkit-transform","");
			$("#"+sectionId+" .animatedListClass").css("transform","");
			if(timerOn){
				isCheckAutomatic = true;
				checkSlideType_Jumble_Slide_Answer();
			}
		},500);
	}

	function swapTargetToSource(this1){
		
		_this = this1;
		$(_this).removeClass("inTarget");
		var html = $(_this)[0].outerHTML;
		
		$(_this).css("visibility","hidden");
		var initialTop = $(_this).position().top;
		var initialLeft = $(_this).position().left;
		var targetUlTopPosition = 0;
		var targetUlLeftPosition = 0;
		
		$("#"+sectionId+" .animatedListClass").css({"top":initialTop,"left":initialLeft,"display":"block"}).text($(_this).text());
		
		if($("#"+sectionId+" #jumbleSource").children().length != 0){
			targetUlTopPosition = $("#"+sectionId+" #jumbleSource li").last().position().top - initialTop +"px";
			targetUlLeftPosition = $("#"+sectionId+" #jumbleSource li").last().position().left + $("#"+sectionId+" #jumbleSource li").last().width() + 40 - initialLeft +"px";
		}
		else{
			targetUlTopPosition = $("#"+sectionId+" #jumbleSource").position().top - initialTop +"px";
			targetUlLeftPosition = $("#"+sectionId+" #jumbleSource").position().left - initialLeft + 20 +"px";
		}
		
		$("#"+sectionId+" .animatedListClass").css("-webkit-transform","translate3d("+targetUlLeftPosition+","+targetUlTopPosition+",0px )");
		$("#"+sectionId+" .animatedListClass").css("transform","translate3d("+targetUlLeftPosition+","+targetUlTopPosition+" ,0px)");
		
		$(_this).css("width",$(_this).width());
		$(_this).css("-webkit-transition-duration",".3s");
		$(_this).css("transition-duration",".3s");
		$(_this).addClass("inSourceRemoveElement");
		$(_this).css("width","0px");
		$(_this).css("background","#999!important");
		$(_this).removeClass("inTarget");
		
		setTimeout(function(){
			$(_this).remove();
			$("#"+sectionId+" #jumbleSource").append(html);
			$("#"+sectionId+" .animatedListClass").css("display","none");
			$("#"+sectionId+" .animatedListClass").css("-webkit-transform","");
			$("#"+sectionId+" .animatedListClass").css("transform","");
		},500);
		
	}
	
}