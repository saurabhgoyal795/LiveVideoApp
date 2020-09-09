function render_NativeVideoJellyTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Jelly" slideType="SlideType_Jelly" slideNumber="'+(i + 2)+'" data-autoslide="" data-background="#fff">'
				+'<div class="sectionInnerContainer" style="overflow-y:auto;">'
					+'<div id="videoContainer" style="padding-top: 16px !important;margin: auto;"></div>'
					+'<div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;margin-top:32px;"></div>'
				+'</div>';
				
			html += '</section>'+
			
		$(".slides").append(html);
	
		 var SlideType_Jelly_Data = obj.data;
		 lessonFunctionCallVar[slideCount] = new SlideType_NativeVideoJellyTemplate_Function("slide"+(i + 2),SlideType_Jelly_Data);
		 slideCount++;
}

function SlideType_NativeVideoJellyTemplate_Function(sectionId,SlideType_Jelly_Data){
	console.log("sectionId:"+sectionId,SlideType_Jelly_Data);
	if(SlideType_Jelly_Data.videoType == "youtube"){
		var endTime = SlideType_Jelly_Data.endTime;
		var ratio = SlideType_Jelly_Data.ratio;
		console.log("ratio:"+ratio);
		var width = 940;
		var height = width/ratio;
		$("#"+sectionId+" #videoContainer").html('<iframe style="width:'+width+'px;height:'+height+'px;max-width:100vw;height:58vw;" src="https://www.youtube.com/embed/'+SlideType_Jelly_Data.video+'">');	
	}
	var texts = SlideType_Jelly_Data.texts;
	var html = "";
	console.log("texts",texts);
	for(var i=0;i<texts.length;i++){
		//html += '<tr class="" wordTip="'+texts[i][0]+'" mainword="'+texts[i][2]+'" nativeword="'+texts[i][0]+'" ><td><div class="jellySlideSoundIcon"><img src="img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord" style="text-align:center;">'+texts[i][0]+'</td><td>=</td><td style="text-align:center;">'+texts[i][2]+'</td><td><div tip="'+replaceVariableInString(texts[i][2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';	
		html += '<tr class="" wordTip="'+texts[i][0]+'" mainword="'+texts[i][2]+'" nativeword="'+texts[i][0]+'" ><td><div class="jellySlideSoundIcon" onclick="playAudio(\''+texts[i][0]+'\',"english");"><img src="img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord" style="text-align:center;">'+texts[i][0]+'</td><td>=</td><td style="text-align:center;">'+texts[i][2]+'</td></tr>';	
		TTSWordsArray.push(texts[i][0]);
	}
	
	$("#"+sectionId+" .translationTextDiv").append("<table style='margin:auto;width:80%;'>"+html+"</table>");
	
}