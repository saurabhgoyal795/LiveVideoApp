function render_TipTemplate(i,obj){
	
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Tip_Slide" slideType="SlideType_Tip_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="SlideType_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">'
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
		 lessonFunctionCallVar[slideCount] = new SlideType_Tip_Slide_Function("slide"+(i + 2),SlideType_Data);
		 slideCount++;
			
}

function SlideType_Tip_Slide_Function(sectionId,SlideType_Data){
	
	for(var i=0;i<SlideType_Data.length;i++){
		html = '<div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
						'<span class="SlideType_Tip_Slide_beforeText">'+SlideType_Data[i][0]+' </span>'+
						'<span> '+SlideType_Data[i][1]+' </span>'+
						'<span class="SlideType_Tip_Slide_afterText">'+SlideType_Data[i][2]+'</span>'+
					'</div>';
		$("#"+sectionId+" .SlideType_Tip_Slide_tipText").append(html)
	}
	
}