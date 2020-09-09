function render_TipTemplate(i,obj){
	
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Tip_Slide" slideType="SlideType_Tip_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer"  style="position:relative;overflow-y:scroll;">'
					+'<div class="SlideType_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9;overflow:hidden;margin: auto;">'
						+'<div class="titleText" style="padding: 30px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">'
						+'</div>'
						+'<div class="SlideType_Tip_Slide_tipText" style="width: 100%; font-size: 30px;"></div>'
					+'</div>'
					+'<div style="position: absolute; left: 10px; bottom: -15px;display: none;">'
						+'<img style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0, 1, 0, 180deg); width: 60px; z-index: -1;" src="img/tip-tail-f9f9f9.png" /> '
						+'<img style="width: 70px;" alt="" src="img/jelly-monster-2-small - rotate-15.png">'
					+'</div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
		 var SlideType_Data = obj.data.tips;
		 var Slide_Data = obj.data;
		 lessonFunctionCallVar[slideCount] = new SlideType_Tip_Slide_Function("slide"+(i + 2),SlideType_Data,Slide_Data);
		 slideCount++;
			
}

function SlideType_Tip_Slide_Function(sectionId,SlideType_Data,Slide_Data){
	if(Slide_Data.teacherTip == undefined){
		Slide_Data.teacherTip = "";
	}
	if(Slide_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+Slide_Data.teacherTip+"</div>";

		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style="color: #fff; background: rgba(0,0,0,.75); width: 100%;text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
	}
	
	for(var i=0;i<SlideType_Data.length;i++){
		//console.log("SlideType_Data[i][0]:"+SlideType_Data[i][0]);
		var bathPath = "https://storage.googleapis.com/hello-quiz-user-uploads/";
		if(SlideType_Data[i][0] != null){
			SlideType_Data[i][0] = SlideType_Data[i][0].replace(/src='/g,"src='"+bathPath);
			SlideType_Data[i][0] = SlideType_Data[i][0].replace(/src="/g,'src="'+bathPath);
		}
		if(SlideType_Data[i][1] != null){
			SlideType_Data[i][1] = SlideType_Data[i][1].replace(/src='/g,"src='"+bathPath);
			SlideType_Data[i][1] = SlideType_Data[i][1].replace(/src="/g,'src="'+bathPath);
		}
		if(SlideType_Data[i][2] != null){
			SlideType_Data[i][2] = SlideType_Data[i][2].replace(/src='/g,"src='"+bathPath);
			SlideType_Data[i][2] = SlideType_Data[i][2].replace(/src="/g,'src="'+bathPath);
		}
		
		html = '<div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;margin-bottom: 32px;">'+
						'<span class="SlideType_Tip_Slide_beforeText">'+SlideType_Data[i][0].replace(/\n/gi,"<br>")+' </span>'+
						'<span> '+SlideType_Data[i][1].replace(/\n/gi,"<br>")+' </span>'+
						'<span class="SlideType_Tip_Slide_afterText">'+SlideType_Data[i][2].replace(/\n/gi,"<br>")+'</span>'+
					'</div>';
		$("#"+sectionId+" .SlideType_Tip_Slide_tipText").append(html)
	}
	
}