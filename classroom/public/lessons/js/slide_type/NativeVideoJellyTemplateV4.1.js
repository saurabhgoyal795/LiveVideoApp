function render_NativeVideoJellyTemplate(i,obj){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Jelly" slideType="SlideType_Jelly" slideNumber="'+(i + 2)+'" data-autoslide="" data-background="#fff">'
				+'<div class="sectionInnerContainer" style="overflow-y:auto;padding-top: 0px!important;">'
					+'<div id="videoContainer" style="padding-top: 0px !important;margin: auto;display:none;"></div>'
					+'<div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;margin-top:32px;"></div>'
				+'</div>';
				
			html += '</section>'+
			
		$(".slides").append(html);
	
		 var SlideType_Jelly_Data = obj.data;
		 lessonFunctionCallVar[slideCount] = new SlideType_NativeVideoJellyTemplate_Function("slide"+(i + 2),SlideType_Jelly_Data);
		 slideCount++;
}

function SlideType_NativeVideoJellyTemplate_Function(sectionId,SlideType_Jelly_Data){
	//console.log("sectionId:"+sectionId,SlideType_Jelly_Data);
	//console.log("SlideType_Jelly_Data.videoType:"+SlideType_Jelly_Data.videoType);
	if(SlideType_Jelly_Data.teacherTip == undefined){
		SlideType_Jelly_Data.teacherTip = "";
	}
	if(SlideType_Jelly_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Jelly_Data.teacherTip+"</div>";
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%; text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
		
	}
	var texts = SlideType_Jelly_Data.texts;
	var ratio = 1;
	if(SlideType_Jelly_Data.slideType != undefined && SlideType_Jelly_Data.slideType == "image"){
		if(SlideType_Jelly_Data.ratio != undefined){
				ratio = SlideType_Jelly_Data.ratio	
			}
			//console.log("ratio:"+ratio);
			var width = 940;
			if(window.innerWidth > 500){
				width = width*.45;
				if(texts.length == 0){
					width = 940;
				}
			}
			var height = width/ratio;
			$("#"+sectionId+" #videoContainer").html('<img src="'+SlideType_Jelly_Data.image+'" style="width:'+width+'px;height:'+height+'px;max-width:100vw;" />');	
			$("#"+sectionId+" #videoContainer").css("display","");
	}else{
		if(SlideType_Jelly_Data.video != undefined ){
			$("#"+sectionId+" #videoContainer").css("display","");	
		}
		if(SlideType_Jelly_Data.videoType != undefined && SlideType_Jelly_Data.videoType == "youtube"){
			var endTime = SlideType_Jelly_Data.endTime;
			if(SlideType_Jelly_Data.ratio != undefined){
				ratio = SlideType_Jelly_Data.ratio	
			}
			//console.log("ratio:"+ratio);
			var width = 940;
			var maxHeight = "";
			if(window.innerWidth > 500){
				var maxHeight = "442px";
				width = width*.45;
				if(texts.length == 0){
					width = 940;
				}
			}
			var height = width/ratio;
			$("#"+sectionId+" #videoContainer").html('<iframe style="width:'+width+'px;height:'+height+'px;max-width:100vw;max-height:'+maxHeight+'!important;" src="https://www.youtube.com/embed/'+SlideType_Jelly_Data.video+'" playsinline >');	
		}else{
			if(SlideType_Jelly_Data.ratio != undefined){
				ratio = SlideType_Jelly_Data.ratio	
			}
			var width = window.innerWidth;
			var maxHeight = "";
			if(window.innerWidth > 500){
				var maxHeight = "442px";
				width = width*.45;
				if(texts.length == 0){
					width = 940;
				}
			}
			var height = width/ratio;
			$("#"+sectionId+" #videoContainer").html('<video onended="try{window.webkit.messageHandlers.iOS.postMessage({method: \'webkitDidFinishPlayingVideo\'});}catch(err){}" style="background:#000;width:'+width+'px;height:'+height+'px;max-width:100vw;max-height:'+maxHeight+'!important;" playsinline  controls><source src="https://storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/'+SlideType_Jelly_Data.video+'" type="video/mp4"></video>');
		}
	}
	
	var html = "";
	//console.log("texts",texts);
	if(texts.length == 0){
		$("#"+sectionId+" .translationTextDiv").css("display","none");
		$("#"+sectionId+" #videoContainer").addClass("videoContainerFullWidth");
	}
	for(var i=0;i<texts.length;i++){
		//html += '<tr class="" wordTip="'+texts[i][0]+'" mainword="'+texts[i][2]+'" nativeword="'+texts[i][0]+'" ><td><div class="jellySlideSoundIcon"><img src="img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord" style="text-align:center;">'+texts[i][0]+'</td><td>=</td><td style="text-align:center;">'+texts[i][2]+'</td><td><div tip="'+replaceVariableInString(texts[i][2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';	
		html += '<tr class="" wordTip="'+texts[i][0]+'" mainword="'+texts[i][2]+'" nativeword="'+texts[i][0]+'" ><td><div class="jellySlideSoundIcon" onclick="playAudio(\''+texts[i][0]+'\',"english");"><img src="img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord" style="text-align:center;">'+texts[i][0]+'</td><td>=</td><td style="text-align:center;">'+texts[i][2]+'</td></tr>';	
		TTSWordsArray.push(texts[i][0]);
	}
	
	$("#"+sectionId+" .translationTextDiv").append("<table style='margin:auto;width:80%;margin-top: 32px;'>"+html+"</table>");
	
}