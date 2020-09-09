function render_JumbleTemplate(i,obj){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Jumble_Slide" slideType="SlideType_Jumble_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="width: 100%;">'
						+'<div class="QuestionText" style="padding: 70px 0px 0px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">'+obj.data.heading+'</div>'
						+'<div class="notificationTipBox" style="position: absolute; right: 55px; top: 10px; padding: 5px; width: 220px; text-transform: uppercase; font-size: 17px; background: #7f7f7f; border-radius: 4px;line-height: 1.2em!important;display: none;">'
							+'<span style="color: #fff;">Tip</span> '
							+'<img style="position: absolute; right: -25px; transform: rotate3d(0, 0, 0, 180deg); width: 50px; z-index: -1; top: 5px;" src="img/call-out 300px.png" />'
						+'</div>'
						+'<div class="monsterBarNotificationImage" style="position: absolute; right: 0px; top: 25px; width: 40px; height: 61px; background: url(\'img/jelly-monster-2-small - rotate-15-anti.png\'); background-size: cover; background-repeat: no-repeat;display: none;">'
						+'</div>'
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
			 lessonFunctionCallVar[slideCount] = new SlideType_Jumble_Slide_Function("slide"+(i + 2),SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_options);
			 slideCount++;
}


function SlideType_Jumble_Slide_Function(sectionId,SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_options){
	
	this.checkSlideType_Jumble_Slide_Answer = checkSlideType_Jumble_Slide_Answer;
	this.SlideType_Jumble_Slide_checkListClass = SlideType_Jumble_Slide_checkListClass;
	
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
		
		$("#"+sectionId+" #jumbleSource").html("");
		for(var i=0;i<dataOptions.length;i++){
			TTSWordsArray.push(dataOptions[i]);
			if(dataOptions[i]!=""){
				console.log("jelly:"+replaceVariable(dataOptions[i]).toLowerCase()+"/"+dataOptions[i]+"/"+firstCorrectWord.toLowerCase());
				if(dataOptions[i].toLowerCase() == firstCorrectWord.toLowerCase()){
					$("#"+sectionId+" #jumbleSource").append("" +
							'<li onclick="lessonFunctionCallVar['+SlideType_Jumble_Slide_slideNumber+'].SlideType_Jumble_Slide_checkListClass(this)" class="answerListClass animated pulse" style="animation-iteration-count:infinite;">'+replaceVariable(dataOptions[i])+'</li>'+		
							"");
				}else{
					$("#"+sectionId+" #jumbleSource").append("" +
					'<li onclick="lessonFunctionCallVar['+SlideType_Jumble_Slide_slideNumber+'].SlideType_Jumble_Slide_checkListClass(this)" class="answerListClass">'+replaceVariable(dataOptions[i])+'</li>'+		
					"");
				}
			}
			
		}
		
		$("#"+sectionId+"  .monsterBarNotificationImage").click(function(){
			if($("#"+sectionId+"  .notificationTipBox").hasClass("notificationBarHide")){
				$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarHide").addClass("notificationBarShow");
			}else{
				$("#"+sectionId+"  .notificationTipBox").removeClass("notificationBarShow").addClass("notificationBarHide");
			}
			
		});
		
	});

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
		
		//SlideType_Jumble_Slide_AnswerText = removeSpecialCharacter(SlideType_Jumble_Slide_AnswerText);
		userAnswer = removeSpecialCharacter(userAnswer);
		if(answerFlag==1){
			$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
			$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
			$("#"+sectionId+" #jumbleTarget").css("background","#49C9AF");
			playCorrectSound();
			
			if(incorrectCountInJumbleSlide < 3){
				if(!$("#"+sectionId).hasClass("WrongAnswer"));
				$("#"+sectionId).addClass("CorrectAnswer");
				gameCoin=gameCoin+equivalent_positive_coins;
				//userAnswerArray.push(1);
				showAwardCoin();
			}
			incorrectCountInJumbleSlide = 0;
			if(isInitialTest == "true"){
//				$("#bottomBarButton").css("visibility","hidden");
//				$("#bottomBarButton").click();
				setTimeout(function(){
					$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
					$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					bottomBarButtonClicked();
				},800);
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
			  if(incorrectCountInJumbleSlide >= 3){
				  incorrectCountInJumbleSlide = 0;
				  correctFlag=0;
				  //userAnswerArray.push(2);
				  $("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				  $("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				  if(isInitialTest == "true"){
					$("#bottomBarButton").css("visibility","hidden");
					setTimeout(function(){
						bottomBarButtonClicked();
					},1500);
				 }
			  }
			  setTimeout(function(){
				  SlideType_Jumble_Slide_AnimateWrongWordbackToSource();
			  },1000);
		}
		
	}
	
	function SlideType_Jumble_Slide_AnimateWrongWordbackToSource(){
		var wordCount = 0;
		var answerArray = SlideType_Jumble_Slide_AnswerText.split(" ");
		$("#"+sectionId+" #jumbleTarget li").each(function(){
			if(answerArray[wordCount].toLowerCase() != $(this).text().toLowerCase()){
				for(var i=wordCount;i<answerArray.length;i++){
						$("#"+sectionId+" #jumbleTarget li:eq("+i+")").click();
						$("#"+sectionId+" #jumbleTarget li:eq("+i+")").remove();
				}
			}else{
				wordCount++;
			}
		});
	}

	function SlideType_Jumble_Slide_checkListClass(this1){

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