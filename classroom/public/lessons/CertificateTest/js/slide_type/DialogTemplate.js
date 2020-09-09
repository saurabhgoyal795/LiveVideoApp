function render_DialogTemplate(i,obj){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Dialog" slideType="SlideType_Dialog" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div id="title_dialog" style="color: #FE5C57; font-size: 30px; padding: 5px 0px 5px 0px;"></div>'
					+'<div id="chatBox" style="width: 100%; height: 365px; overflow-x: hidden; overflow-y: scroll; padding-top: 20px;">'
					+'</div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
		var SlideType_Dialog_Title_Text = obj.data.heading;
		
		 var SlideType_Dialog_Conversation = obj.data.conversations;
		 lessonFunctionCallVar[slideCount] = new SlideType_Dialog_Function("slide"+(i + 2),SlideType_Dialog_Conversation,SlideType_Dialog_Title_Text);
		 slideCount++;
}

function SlideType_Dialog_Function(sectionId,SlideType_Dialog_Conversation,SlideType_Dialog_Title_Text){
	
	$("#"+sectionId+" #title_dialog").text(SlideType_Dialog_Title_Text);
	for(var i=0;i<SlideType_Dialog_Conversation.length;i++){
			if(i%2==0){
				$("#"+sectionId+" #chatBox").append("" +
						'<div>'+
							//'<img style="width: 80px;float:right;margin-right: -20px; margin-top: 10px; " alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15-anti.png">'+
							'<div class="SlideType_Dialog_Speaker_Name" style="float:right;right:-35px;">'+SlideType_Dialog_Conversation[i][0]+'</div>'+
							'<img style="position: relative; width: 50px; float: right; z-index: -1;margin-top: 5px;" src="img/red_tail.png" />'+
							'<div class="chatList1_Box dialogText dialogNumber'+i+'" style="max-width: 60%;cursor:pointer;right: 70px; padding: 15px 35px; min-width: 100px; font-size: 25px; background: #FE5C57; border-radius: 4px; float: right; margin-right: -15px;margin-bottom: 16px;">'+SlideType_Dialog_Conversation[i][1]+'</div>'+
							'<div class="listenDialog bigIconCircle"  dialogNumber="'+i+'" style="background: #FE5C57; margin: auto; position: relative; height: 55px; width: 55px; right: 20px; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite; box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1); float: right; top: 8px;"> <img src="img/soundIconWhite_2.png" style="width:30px;margin-top: 12px;">  </div>'+
							'<div class="SlideType_Dialog_TranslationDiv" style="float: right;text-align: right;margin-right: 150px!important;">'+SlideType_Dialog_Conversation[i][2]+'</div>'+
						'</div>'+
						'<br><br>'+
				"");
			}else{
				$("#"+sectionId+" #chatBox").append("" +
						'<div>'+
							//'<img style="width: 80px;float:left;margin-left: -20px; margin-top: 10px; " alt="" src="../../../InteractiveLessons/img/monster-yellow-rotate-15-anti.png">'+
							'<div class="SlideType_Dialog_Speaker_Name" style="float:left;left:-35px;">'+SlideType_Dialog_Conversation[i][0]+'</div>'+
							'<img style="position: relative; width: 50px; float: left; z-index: -1;margin-top: 5px;" src="img/yellow_tail.png" />'+
							'<div class="chatList2_Box dialogText dialogNumber'+i+'" style="max-width: 60%;cursor:pointer;right: 70px; padding:15px 35px; min-width: 100px; font-size: 25px; background: #F8CE46; border-radius: 4px; float: left; margin-left: -15px;margin-bottom: 16px;">'+SlideType_Dialog_Conversation[i][1]+'</div>'+
							'<div class="listenDialog  bigIconCircle"  dialogNumber="'+i+'" style="background: #F8CE46; margin: auto; position: relative; height: 55px; width: 55px; left: 20px; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite; box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1); float: left; top: 8px;"> <img src="img/soundIconWhite_2.png" style="width:30px;margin-top: 12px;">  </div>'+
							'<div class="SlideType_Dialog_TranslationDiv" style="float: left;text-align: left;margin-left: 150px!important;">'+SlideType_Dialog_Conversation[i][2]+'</div>'+
						'</div>'+
						'<br><br>'+
				"");
			}
	}
	
	updateInputVariable();
	$("#"+sectionId+" .chatList1_Box").each(function(){
		TTSWordsArray.push($(this).text());
	});
	
	$("#"+sectionId+" .chatList1_Box").click(function(){
		var _this = this;
		playAudio($(this).text(),course_language);
		$(this).parent().find(".SlideType_Dialog_TranslationDiv").css("opacity","1");
		setTimeout(function(){
			$(_this).parent().find(".SlideType_Dialog_TranslationDiv").css("opacity","0");
		},5000);
	});
	
	updateInputVariable();
	$("#"+sectionId+" .chatList2_Box").each(function(){
		TTSWordsArray.push($(this).text());
	});
	
	$("#"+sectionId+" .chatList2_Box").click(function(){
		var _this = this;
		playAudio($(this).text(),course_language);
		$(this).parent().find(".SlideType_Dialog_TranslationDiv").css("opacity","1");
		setTimeout(function(){
			$(_this).parent().find(".SlideType_Dialog_TranslationDiv").css("opacity","0");
		},5000);
	});
	
	updateInputVariable();
	$("#"+sectionId+" .listenDialog").each(function(){
		TTSWordsArray.push($("#"+sectionId+" .dialogNumber"+$(this).attr("dialogNumber")).text());
	});
	
	$("#"+sectionId+" .listenDialog").click(function(){
		playAudio($("#"+sectionId+" .dialogNumber"+$(this).attr("dialogNumber")).text(),course_language);
	});
	
	
}