function render_DropdownTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Missing_Word" slideType="SlideType_Missing_Word" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 10px 0px; color: #FE5C57;">'
						+'<span class="titleText" style="font-size: 30px; color: #FE5C57;text-transform: capitalize!important;">'+obj.data.heading+'</span>'
					+'</div>'
					+'<div class="SlideType_Missing_Word_QuestionText" style="width: 100%; font-size: 24px;margin-bottom:20px;">'
						+'<span class="questionPart1Text">'+obj.data.text_1+'</span> <span> ______ </span>'
						+'<span class="questionPart2Text">'+obj.data.text_2+'</span>'
					+'</div>'
					+'<div id="SlideType_Missing_Word_select_choice" class="SlideType_Missing_Word_select_choice_UnChecked" style="margin-bottom:20px;"></div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
			var SlideType_Missing_Word_options = obj.data.options;
			 var SlideType_Missing_Word_Answer = obj.data.correctIndex;
			 lessonFunctionCallVar[slideCount] = new SlideType_Missing_Word_Function("slide"+(i + 2),SlideType_Missing_Word_options,SlideType_Missing_Word_Answer);
			 slideCount++;
}

function SlideType_Missing_Word_Function(sectionId,SlideType_Missing_Word_options,SlideType_Missing_Word_Answer){
	
	this.checkSlideType_Missing_Word_Answer = checkSlideType_Missing_Word_Answer;
	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").html("");	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_UnChecked");
	//console.log("SlideType_Missing_Word_options",SlideType_Missing_Word_options);
	var correctText = SlideType_Missing_Word_options[SlideType_Missing_Word_Answer-1][0];
	console.log("SlideType_Missing_Word_options",SlideType_Missing_Word_options)
	shuffleArray(SlideType_Missing_Word_options);
	console.log("SlideType_Missing_Word_options after",SlideType_Missing_Word_options)
	for(var i=0;i<SlideType_Missing_Word_options.length;i++){
		if(SlideType_Missing_Word_options[i][0] == correctText){
			SlideType_Missing_Word_Answer = "option"+(i+1);
			break;
		}
	}
	console.log("SlideType_Missing_Word_Answer:"+SlideType_Missing_Word_Answer);
	for(var i=0;i<SlideType_Missing_Word_options.length;i++){
		var text = SlideType_Missing_Word_options[i][0];
		//console.log("text:"+text);
		   var html = '<div class="SlideType_Missing_Word_Div SlideType_Missing_Word_Div_UnChecked option'+(i+1)+'" tipText=\"'+SlideType_Missing_Word_options[i][1]+'\" answerClass=\"option"'+(i+1)+'\" >'+
				        '<table style="width:100%;height:100%;">'+
				         '<tr>'+
				          '<td class="SlideType_Missing_Word_ImageTD"><div class="SlideType_Missing_Word_Image_Circle SlideType_Missing_Word_Image_Circle_UnChecked"></div></td>'+
				          '<td class="SlideType_Missing_Word_TextTD SlideType_Missing_Word_TextTD_UnChecked"><div class="SlideType_Missing_Word_Text SlideType_Missing_Word_Text_UnChecked">'+text+'</div></td>'+
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
	
	$("#"+sectionId+" .SlideType_Missing_Word_Div").click(function(){
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
			
			if(isInitialTest == "true"){
				$("#bottomBarButton").click();
				setTimeout(function(){
					bottomBarButtonClicked();
				},800);
			}
		}
	});
	
	function checkSlideType_Missing_Word_Answer(){
		
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
				$("#bottomBarButton").attr("onclick","Reveal.navigateNext()");
				$("#"+sectionId+" #SlideType_Missing_Word_Listen_QuestionText").removeClass("animated pulse");
				playCorrectSound();
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));{
						$("#"+sectionId).addClass("CorrectAnswer");
						$("#"+sectionId).removeClass("WrongAnswer");
					}
					
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					showAwardCoin();
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
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
					$("#"+sectionId+" .SlideType_Missing_Word_Text_InCorrect").removeClass("SlideType_Missing_Word_Text_InCorrect");
					$("#"+sectionId+" .SlideType_Missing_Word_Div_InCorrect").addClass("SlideType_Missing_Word_Div_UnChecked").removeClass("SlideType_Missing_Word_Div_InCorrect");
					$("#"+sectionId+" .SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_UnChecked").removeClass("SlideType_Missing_Word_Image_Circle_Checked");
				},1000);
				
				$("#"+sectionId+" .SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_UnChecked").removeClass("SlideType_Missing_Word_TextTD_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
				$("#"+sectionId).addClass("WrongAnswer");
		
		}
	
	}
	
}