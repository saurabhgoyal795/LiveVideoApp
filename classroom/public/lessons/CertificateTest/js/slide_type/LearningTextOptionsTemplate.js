function render_LearningTextOptionsTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_LearningTextOptionsTemplate" slideType="SlideType_LearningTextOptionsTemplate" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 60px 0px;">'
						+'<div id="title" style="padding: 0px 0px;width: 90%;margin: auto;"></div>'
					+'</div>'
					+'<div id="options" style="width: 100%;"></div>'
				+'</div>';
				        
			html += '</section>';
			$(".slides").append(html);
			
			var SlideType_Data = obj.data;
			 lessonFunctionCallVar[slideCount] = new SlideType_LearningTextOptionsTemplate_Function("slide"+(i + 2),SlideType_Data);
			 slideCount++;
}

function SlideType_LearningTextOptionsTemplate_Function(sectionId,SlideType_Data){
	
	this.checkSlideType_Choose_2_without_Top_Photo_Answer = checkSlideType_Choose_2_without_Top_Photo_Answer;
	
	//console.log("sectionId:"+sectionId,SlideType_Data.heading);
	SlideType_Data.heading = SlideType_Data.heading.replace("<left>","<span style='color:#FE5C57'>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</left>","</span> ");
	SlideType_Data.heading = SlideType_Data.heading.replace("<right>"," <span>");
	SlideType_Data.heading = SlideType_Data.heading.replace("</right>","</span>");
	$("#"+sectionId+" #title").html(SlideType_Data.heading);
	var correctIndex = SlideType_Data.correctIndex;
	
	var options = SlideType_Data.options;
	var correctText = options[correctIndex-1][0];
	shuffleArray(options);
	for(var i=0;i<options.length;i++){
		if(options[i][0] == correctText){
			correctIndex = i+1;
			break;
		}
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
		var fontsize = "30px";
		if(options[i][0].split(" ").length > 20){
			fontsize = "14px";
		}else if(options[i][0].split(" ").length > 12){
			fontsize = "20px";
		}
		html += '<div isCorrect="'+isCorrect+'" tipText="'+options[i][1]+'" class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option'+(i+1)+'">'
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
	
	$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").click(function(){
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
	
	
	function checkSlideType_Choose_2_without_Top_Photo_Answer(){
		console.log("SlideType_Choose_2_without_Top_Photo_Answer:"+SlideType_Choose_2_without_Top_Photo_Answer);
		console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_without_Top_Photo_Answer));
		console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked"));
		console.log($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").attr("isCorrect"));
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
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").removeClass("animated pulse");
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
					$("#"+sectionId).addClass("CorrectAnswer");
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
					$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_without_Top_Photo_Text_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_InCorrect").addClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked");
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
		}
	}
}