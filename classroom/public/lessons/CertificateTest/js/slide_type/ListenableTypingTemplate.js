function render_ListenableTypingTemplate(i,obj){
	var html = "" ;
		html += '<section id="slide'+(i+2)+'" class="SlideType_ListenableTranslation" slideType="SlideType_ListenableTranslation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
						+'<table style="width: 100%;height: 100%;">'
							+'<tr>'
								+'<td>'
									+'<div class="SlideType_ListenableTranslation_Question" style="width: 100%;padding: 16px; font-size: 24px;text-align: center;">'+obj.data.heading+'</div>'
									+'<div id="SlideType_ListenableTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">'
										+'<img onclick="$(this).next()[0].play()" style="margin-top: 15px;width: 24px;" src="img/soundIconWhite_2.png">';
								 html += '<audio style="display:none;"><source src="https://storage.cloud.google.com/he_web_assets/downloadable_lessons/'+courseId+'/audios/'+obj.data.audioFileName+'"></source></audio>';
							html +='</div>'
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
		   lessonFunctionCallVar[slideCount] = new SlideType_ListenableTranslation_Function("slide"+(i + 2),SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect);
		   slideCount++;
}

function SlideType_ListenableTranslation_Function(sectionId,SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect){
	
	this.checkSlideType_ListenableTranslation_Answer = checkSlideType_ListenableTranslation_Answer;
	
	var CorrectTip = SlideType_ListenableTranslation_Tip_On_Correct;
	var InCorrectTip = SlideType_ListenableTranslation_Tip_On_InCorrect;
	//SlideType_ListenableTranslation_Answer = replaceVariableInString(SlideType_ListenableTranslation_Answer);
	
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
		});
		
	});

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
		var tts = "";
		for(var i=0;i<multipleAnswer.length;i++){
			multipleAnswer[i] = removeSpecialCharacter(multipleAnswer[i]).trim();
			console.log("mutipleanswer:"+removeSpecialCharacter($("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val()).toLowerCase().trim()+"/"+removeSpecialCharacter(multipleAnswer[i]).toLowerCase().trim());
			if( removeSpecialCharacter($("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val()).toLowerCase().trim() == removeSpecialCharacter(multipleAnswer[i]).toLowerCase().trim()) {
				answerFlag = 1;
				tts = $("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val().trim();
			}
		}
			if( answerFlag==1 ){
				playAudio(tts, course_language);
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#49C9AF");
				$("#"+sectionId+" .SlideType_ListenableTranslation_InputBoxOuterDiv").addClass("animated tada");
				$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").attr("readonly","true").blur();
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"))
						$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					showAwardCoin();
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"))
						$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_ListenableTranslation_InputBoxOuterDiv").removeClass("animated tada");
				},1100);
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
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
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val(SlideType_ListenableTranslation_Answer[0]);
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#49C9AF");
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").attr("readonly","true");
						$("#disableBottomBarButton").css("display","block");
						$("#bottomBarButton").removeClass("checkButtonAnimation");
						setTimeout(function(){
							$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val("");
							$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").css("background","#eee");
							$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").removeAttr("readonly");
							$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").focus();
							$("#disableBottomBarButton").css("display","none");
							
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
							$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
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