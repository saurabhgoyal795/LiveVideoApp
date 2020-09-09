function render_TableTemplate(i,obj){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Special_Slide" slideType="SlideType_Special_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="SlideType_Special_Slide_Inner_Container" style="height: 400px; width: 800px; position: absolute; left: 80px; top: 40px;">'
					+'</div>'
				+'</div>';
				
			html += '</section>';
			
			$(".slides").append(html);
			
			var SlideType_Special_Slide_Data = obj.data;
			lessonFunctionCallVar[slideCount] = new SlideType_Special_Slide_Function("slide"+(i + 2), SlideType_Special_Slide_Data);
			slideCount++;
}

function SlideType_Special_Slide_Function(sectionId,SlideType_Special_Slide_Data){
	if(SlideType_Special_Slide_Data.teacherTip == undefined){
		SlideType_Special_Slide_Data.teacherTip = "";
	}
	if(SlideType_Special_Slide_Data.teacherTip != undefined){
		var html = "<div style='color:#FE5C57;margin-bottom:10px;'>TEACHING NOTES</div><div>COMMENT: "+SlideType_Special_Slide_Data.teacherTip+"</div>";
		$("#"+sectionId).append('<div class="notes" style="position: absolute; bottom: 0px; color: #fff; font-size: 20px; width: 100%; text-align: right; ">'
			+'<div class="toggleteacherNotes" onclick="toggleteacherNotes(this)" style="">Show Notes</div>'
			+'<div class="notesContent" style=" color: #fff; background: rgba(0,0,0,.75); width: 100%; text-align: center; padding: 8px 0px; max-height: 220px; overflow-y: auto; ">'+html+'</div>'
		+'</div>');
		
	}
	var dataString = SlideType_Special_Slide_Data;
	console.log("SlideType_Special_Slide_Data",SlideType_Special_Slide_Data);
	for(var a=0;a<dataString.length;a++){
		var headings = dataString[a].headings; 
		for(var b=0;b<headings.length;b++){
			var text = headings[b].text;
			var isListenable = "false";
			var background = headings[b].background;;
			var typefaceStyle = headings[b].typefaceStyle;;
			var textColor = headings[b].textColor;
			$("#"+sectionId+" .SlideType_Special_Slide_Inner_Container").append("" +
						"<div style='font-size:20px;margin-bottom:10px;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"' class='title'>"+text+"</div>" +
						"");
		}
		
					
		var rowData = dataString[a].rows;
		var data = "";
		data = "<table style='margin-bottom:30px;  font-size: 25px;margin: auto;'>";
		for(var i=0;i<rowData.length;i++){
			var columnData = rowData[i].cells;
			if(i%2==0){
				data += "<tr style='background:#fad76a;'>";
			}else{
				data += "<tr style='background:#F8CE46;'>";
			}
			for(var j=0;j<columnData.length;j++){
				var isListenable = columnData[j].isListenable;
				var background = columnData[j].background;
				var typefaceStyle = columnData[j].typefaceStyle;
				var text = columnData[j].text;
				
				var width = "50%";
				if(columnData.length == 1){
					width = "100%";
				}else if(columnData.length == 2){
					width = "50%";
				}if(columnData.length == 3){
					width = "32%";
				}if(columnData.length == 4){
					width = "25%";
				}
				
				var cursor = '';
				try{
					if(isListenable != undefined && isListenable.toLowerCase() == "true"){
						cursor = "pointer";
					}
				}catch(err){}
				
				try{
					if(typefaceStyle != undefined && typefaceStyle.toLowerCase().indexOf("bold")){
						data += "<td onclick='playTTS()' style='width: "+width+";cursor:"+cursor+";text-align: center;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"'>"+text+"</td>";
					}else{
						data += "<td onclick='playTTS()' style='width: "+width+";cursor:"+cursor+";text-align: center;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"'><b>"+text+"</b></td>";
					}
				}catch(err){
					data += "<td onclick='playTTS()' style='width: "+width+";cursor:"+cursor+";text-align: center;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"'><b>"+text+"</b></td>";
				}
				
			}
			data += "</tr>";
		}	
		data += "</table>";
		$("#"+sectionId+" .SlideType_Special_Slide_Inner_Container").append(data);		
	}
	/*
	for(var a=0;a<3;a++){
		
		if(dataString[2*a]!="" && dataString[2*a]!=null){
			var headingData = dataString[2*a].split("^^^");
			for(var i=0;i<headingData.length;i++){
				var temp = headingData[i].split("^~^");
				var isListenable = "false";
				var background = "";
				var typefaceStyle = "";
				var textColor = "";
				var text = "";
				for(var j=0;j<temp.length;j++){
					if(temp[j].indexOf("isListenable") > -1){
						isListenable = temp[j].split(":")[1];
					}
				}
				for(var j=0;j<temp.length;j++){
					if(temp[j].indexOf("background") > -1){
						background = temp[j].split(":")[1];
					}
				}
				for(var j=0;j<temp.length;j++){
					if(temp[j].indexOf("typefaceStyle") > -1){
						typefaceStyle = temp[j].split(":")[1];
					}
				}
				for(var k=0;k<dataString.length;k++){
					if(dataString[k].indexOf("textColor") > -1){
						textColor = textColor[k].split(":")[1];
						break;
					}
				}
				for(var j=0;j<temp.length;j++){
					if(temp[j].indexOf("text") > -1 && temp[j].indexOf("isTextHtml") < 0 && temp[j].indexOf("textSize") < 0&& temp[j].indexOf("textColor") < 0){
						text = temp[j].split(":")[1];
					}
				}
				$("#"+sectionId+" .SlideType_Special_Slide_Inner_Container").append("" +
					"<div style='font-size:20px;margin-bottom:10px;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"' class='title'>"+text+"</div>" +
					"");
			}
		}
		
		if(dataString[2*a+1]!="" && dataString[2*a+1]!=null){
			var rowData = dataString[2*a+1].split("~~~");
			var data = "";
			data = "<table style='margin-bottom:30px;  font-size: 25px;margin: auto;'>";
			for(var i=0;i<rowData.length;i++){
				var columnData = rowData[i].split("~^~");
				if(i%2==0){
					data += "<tr style='background:#fad76a;'>";
				}else{
					data += "<tr style='background:#F8CE46;'>";
				}
				for(var j=0;j<columnData.length;j++){
					var isListenable = "false";
					var background = "";
					var typefaceStyle = "";
					var textColor = "";
					var text = "";
					var dataStr = columnData[j].split("~^^~");
					for(var k=0;k<dataStr.length;k++){
						if(dataStr[k].indexOf("isListenable") > -1){
							isListenable = dataStr[k].split(":")[1];
							break;
						}
					}
					for(var k=0;k<dataStr.length;k++){
						if(dataStr[k].indexOf("background") > -1){
							background = dataStr[k].split(":")[1];
							break;
						}
					}
					for(var k=0;k<dataStr.length;k++){
						if(dataStr[k].indexOf("typefaceStyle") > -1){
							typefaceStyle = dataStr[k].split(":")[1];
							break;
						}
					}
					for(var k=0;k<dataStr.length;k++){
						if(dataStr[k].indexOf("textColor") > -1){
							textColor = textColor[k].split(":")[1];
							break;
						}
					}
					for(var k=0;k<dataStr.length;k++){
						if(dataStr[k].indexOf("text") > -1 && dataStr[k].indexOf("isTextHtml") < 0 && dataStr[k].indexOf("textSize") < 0&& dataStr[k].indexOf("textColor") < 0){
							text = dataStr[k].split(":")[1];
							break;
						}
					}
					var width = "50%";
					if(columnData.length == 1){
						width = "100%";
					}else if(columnData.length == 2){
						width = "50%";
					}if(columnData.length == 3){
						width = "32%";
					}if(columnData.length == 4){
						width = "25%";
					}
					
					var cursor = '';
					if(isListenable.toLowerCase() == "true"){
						cursor = "pointer";
					}
					if(text.charAt(0) == "'" && text.charAt(text.length-1) == "'"){
						text = text.substr(1,text.length-2);
					}
					if(typefaceStyle.toLowerCase().indexOf("bold")){
						data += "<td onclick='playTTS()' style='width: "+width+";cursor:"+cursor+";text-align: center;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"'>"+text+"</td>";
					}else{
						data += "<td onclick='playTTS()' style='width: "+width+";cursor:"+cursor+";text-align: center;' textColor='"+textColor+"' isListenable='"+isListenable+"' background='"+background+"' typefaceStyle='"+typefaceStyle+"'><b>"+text+"</b></td>";
					}
					
					
				}
				data += "</tr>";
			}
			data += "</table>";
			$("#"+sectionId+" .SlideType_Special_Slide_Inner_Container").append(data);
			
		}
	}
	*/
	
	$("#"+sectionId+" .SlideType_Special_Slide_Inner_Container table td").click(function(){
		if($(this).attr("islistenable").toLowerCase() == "true"){
			playAudio($(this).text(),course_language);
		}
	});
	
}