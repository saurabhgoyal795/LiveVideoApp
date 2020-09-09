var lessonFunctionCallVar = new Array();
var myName = "Pooja";
var myFriendName = "Neha";
var myFriendGender = "Female";
var myPhoneNumber = "98765-43210";
var myEmail = "abc@xyz.com";
var myCountryName = "India";
var profession = "teacher";
var professionNative = "teacher";
var professionArticle = "a";
var professionArticleWrong = "an";
var azure = undefined;
var isLessonParamRomanized = false;
var toLanguage = "english";
var fromLangauge = "japanese";
var slideCount=0;


function updateVariableFromDB(name,friendName,friendGender,number,email,country){
	 myName = name;
	 myFriendName = friendName;
	 myFriendGender = friendGender;
	 myPhoneNumber = number;
	 myEmail = email;
	 myCountryName = country;
}


function slideType_Input_Function(sectionId,slideType_Input_TitleText,slideType_Input_TipText,variableName){
	
	$("#"+sectionId+" .titleText").html(slideType_Input_TitleText);
	setTimeout(function(){
		if($("#"+sectionId+" .titleText").height()>60){
			$("#"+sectionId+" .monsterBarNotification").css("margin-top","");
			$("#"+sectionId+" .monsterBarNotification").addClass("monsterBarNotificationmarginTop-12px");
		}
	},100);
	$("#"+sectionId+" .notificationTipBoxText").text(slideType_Input_TipText);
	
	$("#"+sectionId+" #slideType_Input_inputText").keyup(function(e) {
		if (e.keyCode == 13) {
//			if($("#"+sectionId+" #slideType_Input_inputText").val()!=""){
//				$( "#bottomBarButton").click();
//			}
			/*
			if($("#"+sectionId+" #slideType_Input_inputText").val()!=""){
				//$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				//$( "#bottomBarButton").click();
				if(!typeof _gaq != 'undefined'){
					var data = "subject-"+courseId+".L-"+"Slide-"+sectionId+".variable-"+variableName.toLowerCase()+".UserInput-"+$("#"+sectionId+" #slideType_Input_inputText").val();
					var lessonNumber = window.location.href;
					lessonNumber = lessonNumber.substr(lessonNumber.lastIndexOf("/")+1,lessonNumber.indexOf(".jsp"));
					_gaq.push(['_trackEvent', 'InteractiveLessons_user_Input ', courseId, data]);
				}
				while(myName.toLowerCase().indexOf("my name") > -1){
					myName= myName.replace("my name", "");
				}
				while(myName.toLowerCase().indexOf("myself") > -1){
					myName= myName.replace("myself", "");
				}
				while(myName.toLowerCase().indexOf("myname") > -1){
					myName= myName.replace("myname", "");
				}
				while(myName.toLowerCase().indexOf("my name is") > -1){
					myName= myName.replace("my name is", "");
				}
				
				if(variableName.toLowerCase()=="name"){
					if(!isChar(myName)){
						doAzureTranslation(myName,fromLangauge,toLanguage,isLessonParamRomanized,"name");
					}else{
						saveLessonParameter("name",myName);	
					}
				}else if(variableName.toLowerCase()=="friendname"){
					if(!isChar(myFriendName)){
						doAzureTranslation(myFriendName,fromLangauge,toLanguage,isLessonParamRomanized,"friendName");
					}else{
						saveLessonParameter("friendName",myFriendName);	
					}
				}else if(variableName.toLowerCase()=="countryname"){
					if(!isChar(myCountryName)){
						doAzureTranslation(myCountryName,fromLangauge,toLanguage,isLessonParamRomanized,"countryName");
					}else{
						saveLessonParameter("countryName",myCountryName);	
					}
				}else if(variableName.toLowerCase()=="emailaddress"){
					if(!isChar(myEmail)){
						myEmail = myEmail;
					}
					saveLessonParameter("emailAddress",myEmail);	

				}else if(variableName.toLowerCase()=="phonenumber"){
					if(!isChar(myPhoneNumber)){
						myPhoneNumber = myPhoneNumber;
						
					}
					saveLessonParameter("phoneNumber",myPhoneNumber);
				}
				
				updateInputVariable();
			}
			*/
		}
		if($("#"+sectionId+" #slideType_Input_inputText").val()!=""){
			/*
			if(variableName.toLowerCase()=="name" || variableName.toLowerCase()=="<name>"){
				myName = $("#"+sectionId+" #slideType_Input_inputText").val();
				
			}else if(variableName.toLowerCase()=="friendname" || variableName.toLowerCase()=="<friendname>"){
				myFriendName = $("#"+sectionId+" #slideType_Input_inputText").val();
				
			}else if(variableName.toLowerCase()=="countryname" || variableName.toLowerCase()=="<countryname>"){
				myCountryName = $("#"+sectionId+" #slideType_Input_inputText").val();
				
			}else if(variableName.toLowerCase()=="emailaddress" || variableName.toLowerCase()=="<emailaddress>"){
				myEmail = $("#"+sectionId+" #slideType_Input_inputText").val();
				
			}else if(variableName.toLowerCase()=="phonenumber" || variableName.toLowerCase()=="<phonenumber>"){
				myPhoneNumber = $("#"+sectionId+" #slideType_Input_inputText").val();				
				myPhoneNumber = myPhoneNumber.substr(0, myPhoneNumber.length/2) +"-"+ myPhoneNumber.substr((myPhoneNumber.length/2), myPhoneNumber.length-1)
				
			}
			
			
			
			if(!typeof _gaq != 'undefined'){
				var data = "subject-"+courseId+".L-"+"Slide-"+sectionId+".variable-"+variableName.toLowerCase()+".UserInput-"+$("#"+sectionId+" #slideType_Input_inputText").val();
				var lessonNumber = window.location.href;
				lessonNumber = lessonNumber.substr(lessonNumber.lastIndexOf("/")+1,lessonNumber.indexOf(".jsp"));
				_gaq.push(['_trackEvent', 'InteractiveLessons_user_Input ', courseId, data]);
			}
			while(myName.toLowerCase().indexOf("my name") > -1){
				myName= myName.replace("my name", "");
			}
			while(myName.toLowerCase().indexOf("myself") > -1){
				myName= myName.replace("myself", "");
			}
			while(myName.toLowerCase().indexOf("myname") > -1){
				myName= myName.replace("myname", "");
			}
			while(myName.toLowerCase().indexOf("my name is") > -1){
				myName= myName.replace("my name is", "");
			}
			
			if(variableName.toLowerCase()=="name"){
				if(!isChar(myName)){
					doAzureTranslation(myName,fromLangauge,toLanguage,isLessonParamRomanized,"name");
				}else{
					saveLessonParameter("name",myName);	
				}
			}else if(variableName.toLowerCase()=="friendname"){
				if(!isChar(myFriendName)){
					doAzureTranslation(myFriendName,fromLangauge,toLanguage,isLessonParamRomanized,"friendName");
				}else{
					saveLessonParameter("friendName",myFriendName);	
				}
			}else if(variableName.toLowerCase()=="countryname"){
				if(!isChar(myCountryName)){
					doAzureTranslation(myCountryName,fromLangauge,toLanguage,isLessonParamRomanized,"countryName");
				}else{
					saveLessonParameter("countryName",myCountryName);	
				}
			}else if(variableName.toLowerCase()=="emailaddress"){
				if(!isChar(myEmail)){
					myEmail = myEmail;
				}
				saveLessonParameter("emailAddress",myEmail);	

			}else if(variableName.toLowerCase()=="phonenumber"){
				if(!isChar(myPhoneNumber)){
					myPhoneNumber = myPhoneNumber;
					
				}
				saveLessonParameter("phoneNumber",myPhoneNumber);
			}
			updateInputVariable();
			*/
			//$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		}else{
			$("#bottomBarButton").attr("onclick","");
		}
	});
	
	$("#"+sectionId+" #slideType_Input_inputText").click(function(){
		$("#"+sectionId+" .notificationTipBox").addClass("notificationBarHide").removeClass("notificationBarShow");
	});
	
	$("#"+sectionId+" .monsterBarNotificationImage").click(function(){
		if($("#"+sectionId+" .notificationTipBox").hasClass("notificationBarHide")){
			$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarHide").addClass("notificationBarShow");
		}else{
			$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarShow").addClass("notificationBarHide");
		}
		
	});
	
}

function saveLessonParameter(paramName,paramValue){

	if(paramName.toLowerCase()=="name"){
		myName = paramValue;
	}
	if(paramName.toLowerCase()=="friendName"){
		myFriendName = paramValue;
	}
	if(paramName.toLowerCase()=="countryName"){
		myCountryName = paramValue;
	}
	updateInputVariable();
	
	$.ajax({
		url: 'updateInteractiveLessonParameter.action',
		data: {
			parametersName:paramName,
			parametersValue:paramValue
		},
		success: function(result) {
		}	
	});
}

function SlideType_Jelly_Function(sectionId,SlideType_Jelly_TipText,dataString,SlideType_Jelly_Video_Url){
	$("#"+sectionId+" .notificationTipBoxText").text(SlideType_Jelly_TipText);
	while(dataString.indexOf('\\"') > -1){
		dataString = dataString.replace('\\"',"'");
	}
	var data = dataString.split("*&");
	var html = "";
	if(SlideType_Jelly_Video_Url != ""){
		if(SlideType_Jelly_Video_Url.indexOf("mp4") > -1){
			$("#"+sectionId+" .videoContainer").append('<div style="position: relative;"><video preload="auto" onended="$(this).next().css(\'display\',\'\');" style="width: 95%; height: auto; object-fit: contain; object-position : top;" class="video" poster="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/'+SlideType_Jelly_Video_Url.replace(".mp4",".jpg").replace(".3pg",".jpg")+'" ><source src="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/'+SlideType_Jelly_Video_Url+'" type="video/mp4"></video><img class="playVideo" onclick="$(this).prev().get(0).play();$(this).css(\'display\',\'none\');" src="../../../InteractiveLessons/img/ic_play_arrow_white_48dp_2x.png" style="width:50px;position:absolute;left: 50%;top: 50%;background: rgba(0,0,0,.5);border-radius: 100%;margin-left: -25px;margin-top: -25px;cursor:pointer;"></div>');
			//html += '<tr><td colspan="5" style="text-align: center;"><div style="position: relative;"><video preload="auto" onended="$(this).next().css(\'display\',\'\');" style="width: 200px; height: 100px; object-fit: contain; object-position : top;" class="video" ><source src="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/'+SlideType_Jelly_Video_Url+'" type="video/mp4"></video><img class="playVideo" onclick="$(this).prev().get(0).play();$(this).css(\'display\',\'none\');" src="../../../InteractiveLessons/img/ic_play_arrow_white_48dp_2x.png" style="width:50px;position:absolute;left: 50%;top: 50%;background: rgba(0,0,0,.5);border-radius: 100%;margin-left: -25px;margin-top: -25px;cursor:pointer;"></div></td></tr>';
//			$("#"+sectionId+" .video source").attr("src","//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/"+SlideType_Jelly_Video_Url);
		}else{
			$("#"+sectionId+" .videoContainer").append('<iframe id="SlideType_Video_Div"width="100%" height="100%"src="https://www.youtube.com/embed'+SlideType_Jelly_Video_Url+'/"+ frameborder="0" style="border: solid 4px #37474F"></iframe>');
			$("#"+sectionId+" .videoContainer iframe").attr("height",sectionInnerContainerHeight+"px");
			//html += '<tr><td colspan="5"><iframe id="SlideType_Video_Div"width="440" height="160"src="https://www.youtube.com/embed'+SlideType_Jelly_Video_Url+'/"+ frameborder="0" style="border: solid 4px #37474F"></iframe></td></tr>';
			//$("#"+sectionId+" .sectionInnerContainer").prepend('<iframe id="SlideType_Video_Div"width="440" height="160"src="https://www.youtube.com/embed'+SlideType_Jelly_Video_Url+'/"+ frameborder="0" style="border: solid 4px #37474F"></iframe>');
		}
	}
	$("#"+sectionId+" .translationTextDiv").html("");
	for(var i=0;i<data.length/3;i++){
		if(data[3*i]!=""){
//			html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+data[3*i+1]+'" nativeword="'+data[3*i]+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+data[3*i]+'</td><td>=</td><td>'+data[3*i+1]+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
		}
		if(data[3*i]!=""){
			if(i % 4 === 0 ){
				if( (data[3*i].indexOf("<") > -1) && (data[3*i].indexOf(">")>-1) ){
				
					if(data[3*i].toLowerCase().indexOf("<name>") > -1){
						
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myName+'" nativeword="'+myName+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myName+'</td><td>=</td><td>'+myName+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
						
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<br><br><span class="mynameClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myName+'" nativeword="'+myName+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myName+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					if(data[3*i].toLowerCase().indexOf("<friend-name>") > -1){
						
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myFriendName+'" nativeword="'+myFriendName+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myFriendName+'</td><td>=</td><td>'+myFriendName+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
						
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<br><br><span class="myfriendnameClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myFriendName+'" nativeword="'+myFriendName+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myFriendName+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					
					if(data[3*i].toLowerCase().indexOf("<country-name>") > -1){
						
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myCountryName+'" nativeword="'+myCountryName+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myCountryName+'</td><td>=</td><td>'+myCountryName+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
						
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<br><br><span class="mycountryClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myCountryName+'" nativeword="'+myCountryName+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myCountryName+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					
					if(data[3*i].toLowerCase().indexOf("<email-address>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myEmail+'" nativeword="'+myEmail+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myEmail+'</td><td>=</td><td>'+myEmail+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<br><br><span class="myemailClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myEmail+'" nativeword="'+myEmail+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myEmail+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					if(data[3*i].toLowerCase().indexOf("<phone-number>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myPhoneNumber+'" nativeword="'+myPhoneNumber+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myPhoneNumber+'</td><td>=</td><td>'+myPhoneNumber+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<br><br><span class="myphonenumberClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myPhoneNumber+'" nativeword="'+myPhoneNumber+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myPhoneNumber+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					
					
				}else{
					html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+data[3*i+1]+'" nativeword="'+data[3*i]+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+data[3*i]+'</td><td>=</td><td>'+data[3*i+1]+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//					$("#"+sectionId+" .translationTextDiv").append("" +
//						'<br><br><span class="TTSMainWord nextPopup redCandy" wordTip="'+data[3*i+2]+'" mainword="'+data[3*i+1]+'" nativeword="'+data[3*i]+'" language="'+course_language+'" style="cursor:pointer;">'+data[3*i]+' </span>'+
//						'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//					"");
				}
			}else{
				if( (data[3*i].indexOf("<") > -1) && (data[3*i].indexOf(">")>-1) ){
					if(data[3*i].toLowerCase().indexOf("<name>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myName+'" nativeword="'+myName+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myName+'</td><td>=</td><td>'+myName+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<span class="mynameClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myName+'" nativeword="'+myName+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myName+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					if(data[3*i].toLowerCase().indexOf("<friend-name>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myFriendName+'" nativeword="'+myFriendName+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myFriendName+'</td><td>=</td><td>'+myFriendName+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<span class="myfriendnameClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myFriendName+'" nativeword="'+myFriendName+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myFriendName+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					
					if(data[3*i].toLowerCase().indexOf("<country-name>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myCountryName+'" nativeword="'+myCountryName+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myCountryName+'</td><td>=</td><td>'+myCountryName+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<span class="mycountryClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myCountryName+'" nativeword="'+myCountryName+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myCountryName+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					
					if(data[3*i].toLowerCase().indexOf("<email-address>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myEmail+'" nativeword="'+myEmail+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myEmail+'</td><td>=</td><td>'+myEmail+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<span class="myemailClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myEmail+'" nativeword="'+myEmail+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myEmail+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					if(data[3*i].toLowerCase().indexOf("<phone-number>") > -1){
						html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myPhoneNumber+'" nativeword="'+myPhoneNumber+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+myPhoneNumber+'</td><td>=</td><td>'+myPhoneNumber+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//						$("#"+sectionId+" .translationTextDiv").append("" +
//								'<span class="myphonenumberClass nextPopup TTSMainWord redCandy" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+myPhoneNumber+'" nativeword="'+myPhoneNumber+'" language="'+course_language+'" style="vertical-align: middle!important;cursor:pointer;">'+myPhoneNumber+' </span>'+
//								'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//							"");
					}
					
				}else{
					html += '<tr class="" wordTip="'+replaceVariableInString(data[3*i+2])+'" mainword="'+data[3*i+1]+'" nativeword="'+data[3*i]+'" language="'+course_language+'" ><td><div class="jellySlideSoundIcon"><img src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></div></td><td class="TTSMainWord">'+data[3*i]+'</td><td>=</td><td>'+data[3*i+1]+'</td><td><div tip="'+replaceVariableInString(data[3*i+2])+'" class="jellySlidewordTipIcon">!</div></td></tr>';
//					$("#"+sectionId+" .translationTextDiv").append("" +
//						'<span class="TTSMainWord nextPopup redCandy" wordTip="'+data[3*i+2]+'" mainword="'+data[3*i+1]+'" nativeword="'+data[3*i]+'" language="'+course_language+'" style="cursor:pointer;">'+data[3*i]+' </span>'+
//						'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
//					"");
				}
			}
		
		}
	}
	
	html += '<tr><td colspan="5"><div class="listenSentence listenSentenceResponsive" style="margin-top:20px;text-align:center;">'+
		'<img src="//storage.helloenglish.com/English-Web/images/ic_volume_up_black_24dp_2x.png" style="width: 30px; margin-top: 13px;">'+
	'</div></td></tr>';
	$("#"+sectionId+" .translationTextDiv").append("<table style='width:100%;height:100%;'><tr><td><table style='margin:auto;'>"+html+"</table></td></tr></table>");
	
	$("#"+sectionId+" .translationTextDiv .jellySlidewordTipIcon").each(function(){
		if($(this).attr("tip") == undefined || $(this).attr("tip") == ""){
			$(this).css("display","none");
		}
	});
	
	$("body").click(function(){
		closepopUpHighlightDiv();
	});
	/*
	setTimeout(function(){
		$("#"+sectionId+" .yellow-arrow").css("top",($("#"+sectionId+" .TTSMainWord:eq(0)").position().top + 70));
		$("#"+sectionId+" .yellow-arrow").css("left",($("#"+sectionId+" .TTSMainWord:eq(0)").position().left +$("#"+sectionId+" .TTSMainWord:eq(0)").width()/2 - 47));
		$("#"+sectionId+" .yellow-arrow").css("display","none");
	},1000);
	*/
	updateInputVariable();
	var ttsText = "";
	$("#"+sectionId+" .TTSMainWord").each(function(){
		ttsText = ttsText + $(this).text() + " ";
	});
	TTSWordsArray.push(ttsText.trim());
	
	$("#"+sectionId+" .listenSentence").click(function(){
		var text = "";
		$("#"+sectionId+" .TTSMainWord").each(function(){
			text = text + $(this).text() + " ";
		});
		console.log(text);
		playAudio(text, course_language);
	});
	
	$("#"+sectionId+" .monsterBarNotificationImage").click(function(){
		
		if($("#"+sectionId+" .notificationTipBox").hasClass("notificationBarHide")){
			$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarHide").addClass("notificationBarShow");
		}else{
			$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarShow").addClass("notificationBarHide");
		}
		
	});
	
	updateInputVariable();
	$("#"+sectionId+" .TTSMainWord").each(function(){
		var nativeWord = $(this).text();
		TTSWordsArray.push(nativeWord);
	});
	
	$(".jellySlidewordTipIcon").click(function(){
		$(".tipPopUpDiv_Title").html("");
		$("#tipPopUpInnerDiv").css("background","#49C9AF");
		$(".tipPopUpDiv_Tip_Text").html(replaceVariableInString($(this).attr("tip")));
		clearTimeout(setTimeoutForJellySlide);
		$("#tipPopUpDiv").removeClass("tipPopUpBounceOutDown").addClass("tipPopUpBounceInUp").css("display","block");
		playTapSound();
		//setRTLForUrduInJellySlide();
	});
	
	
	$("#"+sectionId+" .TTSMainWord").parent().click(function(evt){
		var nativeWord = $(this).attr("nativeword");
		var mainWord = $(this).attr("mainword");
		var language = $(this).attr("language");
		var wordTip = $(this).attr("wordTip");
		console.log("nativeWord:"+nativeWord);
		playAudio(nativeWord,language);
		/*
		$("#"+sectionId+" .yellow-arrow").css("display","none");
		$("#"+sectionId+" .notificationTipBox").removeClass("notificationBarShow").addClass("notificationBarHide");
		var this1 = this;
		var scale = Reveal.getScale();
		$(".tipIconTD").click(function(){
			$(".tipPopUpDiv_Title").html("");
			$("#tipPopUpInnerDiv").css("background","#49C9AF");
			$(".tipPopUpDiv_Tip_Text").html(replaceVariableInString($(this1).attr("wordTip")));
			clearTimeout(setTimeoutForJellySlide);
			$("#tipPopUpDiv").removeClass("tipPopUpBounceOutDown").addClass("tipPopUpBounceInUp").css("display","block");
			playTapSound();
			setRTLForUrduInJellySlide();
		});
		clearTimeout(setTimeoutForJellySlide);
		openNextJellyPopupAfter3Sec();
		
		if($(this).hasClass("redCandy")){
			
			var nativeWord = $(this).attr("nativeword");
			var mainWord = $(this).attr("mainword");
			var language = $(this).attr("language");
			var wordTip = $(this).attr("wordTip");
			
			playAudio(nativeWord,language);
			if(wordTip=="" || wordTip=="undefined"){
				$(".tipIconTD").css("display","none");
			}else{
				$(".tipIconTD").css("display","block");
			}
			$(".EnglishWordInPopUpForFacebook").text(mainWord);
			$(".WordInPopUpForFacebook").text(nativeWord);
			$(this).text(nativeWord);
			$(this).addClass("greenUnderLineCandy").removeClass("redCandy nextPopup");
			$("#"+sectionId+" .TTSMainWord").each(function(){
				if($(this).hasClass("nextPopup")){
					$("#nextWordButtonInTranslationBox").css("display","block");
					$("#bottomBarButton").removeClass("checkButtonAnimation");
					return false;
				}else{
					$("#nextWordButtonInTranslationBox").css("display","none");
				}
			});
			if($("#nextWordButtonInTranslationBox").css("display")=="none"){
				setTimeout(function(){
					$("#bottomBarButton").addClass("checkButtonAnimation");
				},3000);
			}
			var top = $(this).position().top + 70 - 250;
			var left = $(this).position().left + $(this).width()/2 - 480;
			if(isFirefox){
				top = $(this).position().top/scale + 70 - 250;
				left = $(this).position().left/scale + $(this).width()/2 - 480;
			}
			//top = top*scale;
			//left = left*scale;
			$( "#translationPopup" ).css("top",top);
			$( "#translationPopup" ).css("left",(left-137));
			setTimeout(function(){
				$( "#translationPopup" ).css("display","block");
			},100);
			
		}else if($(this).hasClass("greenUnderLineCandy")){
			
			var nativeWord = $(this).attr("nativeword");
			var mainWord = $(this).attr("mainword");
			var language = $(this).attr("language");
			var wordTip = $(this).attr("wordTip");
			
			playAudio(nativeWord,language);
			if(wordTip=="" || wordTip=="undefined"){
				$(".tipIconTD").css("display","none");
			}else{
				$(".tipIconTD").css("display","block");
			}
			$(".EnglishWordInPopUpForFacebook").text(mainWord);
			$(".WordInPopUpForFacebook").text(nativeWord);
			$(this).text(nativeWord);
			$(this).addClass("greenUnderLineCandy").removeClass("redCandy");
			var top = $(this).position().top + 70 - 250;
			var left = $(this).position().left + $(this).width()/2 - 480;
			if(isFirefox){
				top = $(this).position().top/scale + 70 - 250;
				left = $(this).position().left/scale + $(this).width()/2 - 480;
			}
			//top = top*scale;
			//left = left*scale;
			$( "#translationPopup" ).css("top",top);
			$( "#translationPopup" ).css("left",left-137);
			$( "#translationPopup" ).css("display","block");
			
		}
		*/
		evt.preventDefault();
		evt.stopPropagation();
		
	});
	
	
}

function SlideType_Choose_4_with_Image_Function(sectionId,SlideType_Choose_4_with_Image_QuestionText,SlideType_Choose_4_with_Image_Option_String,SlideType_Choose_4_with_Image_Answer,SlideType_Choose_4_with_Image_Question_Type,SlideType_Choose_4_with_Image_Question_Display_Flag,SlideType_Choose_4_with_Image_Answer_Type,imageFolder){
	this.checkSlideType_Choose_4_with_Image_Answer = checkSlideType_Choose_4_with_Image_Answer;
	
	var dataOptions = SlideType_Choose_4_with_Image_Option_String.split("*&");
	
	var correctIndex = SlideType_Choose_4_with_Image_Answer.replace("option","");
	var arrTemp = [];
	while(arrTemp.length < 4){
		var num = getRandomNumber(1,4);
		var flag = 0;
		for(var i=0;i<arrTemp.length;i++){
			if(arrTemp[i] == num){
				flag = 1;
				break;
			}
		}
		if(flag == 0){
			arrTemp.push(num);
		}
	}
		
	for(var i=0;i<4;i++){
		var imageString=dataOptions[3*i+1];
		dataOptions[3*i]= replaceVariable(dataOptions[3*i]);
		dataOptions[3*i+1]= replaceVariable(dataOptions[3*i+1]);
		dataOptions[3*i+2]= replaceVariable(dataOptions[3*i+2]);
		
		if(correctIndex == i+1){
			SlideType_Choose_4_with_Image_Answer = "option"+arrTemp[i];
		}
		
		$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageText:eq("+(arrTemp[i]-1)+")").html(dataOptions[3*i]);
		$("#"+sectionId+" .SlideType_Choose_4_with_Image_Img_Source:eq("+(arrTemp[i]-1)+")").attr("src",imageFolder+imageString.trim().toLowerCase()+".jpg");
		if(dataOptions[3*i+2] != ""){
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv:eq("+(arrTemp[i]-1)+")").attr("tipText",dataOptions[3*i+2]);
		}
	}
	
	$("#"+sectionId+" .SlideType_Choose_4_with_Image_QuestionText").html(replaceVariable(SlideType_Choose_4_with_Image_QuestionText));
	
	if(SlideType_Choose_4_with_Image_Question_Display_Flag.toLowerCase()=="yes" || SlideType_Choose_4_with_Image_Question_Display_Flag.toLowerCase()==""){
		$("#"+sectionId+" .SlideType_Choose_4_with_Image_QuestionText").css("display","block");
	}else{
		$("#"+sectionId+" .SlideType_Choose_4_with_Image_QuestionText").css("display","none");
	}
	$("#"+sectionId+" .SlideType_Choose_4_with_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_4_with_Image_HintText").attr("hintText2"));
	
	setTimeout(function(){
		$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageText").each(function(){
			if($(this).height() > 50){
				$(this).addClass("SlideType_Choose_4_with_Image_ImageText_LineHeight");
			}
		});
	},500);
	
	updateInputVariable();
	$("#"+sectionId+" .SlideType_Choose_4_with_Image_QuestionText").each(function(){
		if(SlideType_Choose_4_with_Image_Question_Type.toLowerCase()=="listenable"){
			TTSWordsArray.push($("#"+sectionId+" .SlideType_Choose_4_with_Image_QuestionText"));
		}
	});
	
	$("#"+sectionId+" .SlideType_Choose_4_with_Image_Answer_Type table td .SlideType_Choose_4_with_Image_ImageText").each(function(){
		if(SlideType_Choose_4_with_Image_ImageText.toLowerCase()=="listenable"){
			TTSWordsArray.push( $(this).text());
		}
	});
	
	$("#"+sectionId+" .SlideType_Choose_4_with_Image_QuestionText").click(function(){
		if(SlideType_Choose_4_with_Image_Question_Type.toLowerCase()=="listenable"){
			playAudio($(this).text(), course_language);
		}else{
			playTapSound();
		}
	});
	
	
	$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv").click(function(){
		if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
			if(SlideType_Choose_4_with_Image_Answer_Type.toLowerCase()=="listenable"){
				playAudio($(this).find(".SlideType_Choose_4_with_Image_ImageText").text(), course_language);
			}else{
				playTapSound();
			}
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv").removeClass("animated tada_slow");
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv").addClass("SlideType_Choose_4_with_Image_ImageDiv_UnChecked").removeClass("SlideType_Choose_4_with_Image_ImageDiv_Checked");
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_Image_Circle").addClass("SlideType_Choose_4_with_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_4_with_Image_Image_Circle_Checked");
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageText").addClass("SlideType_Choose_4_with_Image_ImageText_UnChecked").removeClass("SlideType_Choose_4_with_Image_ImageText_Checked");
			$(this).addClass("SlideType_Choose_4_with_Image_ImageDiv_Checked").removeClass("SlideType_Choose_4_with_Image_ImageDiv_UnChecked");
			$(this).find(".SlideType_Choose_4_with_Image_Image_Circle").addClass("SlideType_Choose_4_with_Image_Image_Circle_Checked").removeClass("SlideType_Choose_4_with_Image_Image_Circle_UnChecked");
			$(this).find(".SlideType_Choose_4_with_Image_ImageText").addClass("SlideType_Choose_4_with_Image_ImageText_Checked").removeClass("SlideType_Choose_4_with_Image_ImageText_UnChecked");
			
			if(isInitialTest == "true"){
				$("#bottomBarButton").click();
				setTimeout(function(){
					bottomBarButtonClicked();
				},800);
			}
		}
	});
	
	function checkSlideType_Choose_4_with_Image_Answer(){
		if($("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Checked").hasClass(SlideType_Choose_4_with_Image_Answer)){
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Checked .SlideType_Choose_4_with_Image_Img_Source").parent().css("background","#49C9AF");
				$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Checked").addClass("SlideType_Choose_4_with_Image_ImageDiv_Correct SlideType_Choose_4_with_Image_ImageDiv_Animation_Duration_1s animated tada").removeClass("SlideType_Choose_4_with_Image_ImageDiv_Checked");
			    setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Correct").removeClass("SlideType_Choose_4_with_Image_ImageDiv_Animation_Duration_1s animated tada").addClass("SlideType_Choose_4_with_Image_ImageDiv_UnChecked");
				},1000);
			    $("#"+sectionId+" .SlideType_Choose_4_with_Image_Image_Circle_Checked").addClass("SlideType_Choose_4_with_Image_Image_Circle_Correct").removeClass("SlideType_Choose_4_with_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageText_Checked").addClass("SlideType_Choose_4_with_Image_ImageText_Correct").removeClass("SlideType_Choose_4_with_Image_ImageText_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
			
				playCorrectSound();
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"))
						$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"))
						$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				
				 
				
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
			var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Checked").attr("tipText"));
			$("#bottomBarButton").attr("isDisable","true");
			setTimeout(function(){
				$("#bottomBarButton").attr("isDisable","false");
				showTipPopup(text);
			},500);
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_Checked").addClass("SlideType_Choose_4_with_Image_ImageDiv_InCorrect SlideType_Choose_4_with_Image_ImageDiv_Animation_Duration_1s animated shake").removeClass("SlideType_Choose_4_with_Image_ImageDiv_Checked");
			setTimeout(function(){
				$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageDiv_InCorrect").removeClass("SlideType_Choose_4_with_Image_ImageDiv_InCorrect SlideType_Choose_4_with_Image_ImageDiv_Animation_Duration_1s animated shake").addClass("SlideType_Choose_4_with_Image_ImageDiv_UnChecked");
			},1000);
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_Image_Circle").addClass("SlideType_Choose_4_with_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_4_with_Image_Image_Circle_Checked");
			$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageText_Checked").addClass("SlideType_Choose_4_with_Image_ImageText_InCorrect").removeClass("SlideType_Choose_4_with_Image_ImageText_Checked");
			setTimeout(function(){
				$("#"+sectionId+" .SlideType_Choose_4_with_Image_ImageText_InCorrect").addClass("SlideType_Choose_4_with_Image_ImageText_UnChecked").removeClass("SlideType_Choose_4_with_Image_ImageText_InCorrect");
			},1000);
			$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
			$("#disableBottomBarButton").css("display","block");
			playInCorrectSound();
			if(!$("#"+sectionId).hasClass("CorrectAnswer"))
				$("#"+sectionId).addClass("WrongAnswer");
			if(correctFlag==1){
				//userAnswerArray.push(2);
			}
			correctFlag=0;
		}
	
	}

}

function SlideType_Choose_2_with_Image_Function(sectionId,SlideType_Choose_2_with_Image_QuestionText,SlideType_Choose_2_with_Image_Option_String,SlideType_Choose_2_with_Image_Answer,SlideType_Choose_2_with_Image_Question_Type,SlideType_Choose_2_with_Image_Question_Display_Flag,SlideType_Choose_2_with_Image_Answer_Type,imageFolder){
	
this.checkSlideType_Choose_2_with_Image_Answer = checkSlideType_Choose_2_with_Image_Answer;
	
	var dataOptions = SlideType_Choose_2_with_Image_Option_String.split("*&");
	
	for(var i=0;i<2;i++){
		$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageText:eq("+i+")").html(replaceVariable(dataOptions[3*i]));
		$("#"+sectionId+" .SlideType_Choose_2_with_Image_Img_Source:eq("+i+")").attr("src",imageFolder+replaceVariable(dataOptions[3*i+1].trim().toLowerCase())+".jpg");
		if(dataOptions[3*i+2] != ""){
			$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv:eq("+i+")").attr("tipText",replaceVariable(dataOptions[3*i+2]));
		}
	}
	
	$("#"+sectionId+" .SlideType_Choose_2_with_Image_QuestionText").html(replaceVariable(SlideType_Choose_2_with_Image_QuestionText));
	
	if(SlideType_Choose_2_with_Image_Question_Display_Flag.toLowerCase()=="yes" || SlideType_Choose_2_with_Image_Question_Display_Flag.toLowerCase()==""){
		$("#"+sectionId+" .SlideType_Choose_2_with_Image_QuestionText").css("display","block");
	}else{
		$("#"+sectionId+" .SlideType_Choose_2_with_Image_QuestionText").css("display","none");
	}
	
	$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv:eq(0)").addClass("animated tada_slow");
	setTimeout(function(){
		$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv:eq(1)").addClass("animated tada_slow");
		setTimeout(function(){
			$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv:eq(2)").addClass("animated tada_slow");
			setTimeout(function(){
				$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv:eq(3)").addClass("animated tada_slow");
			},100);
		},100);
	},100);
	
	updateInputVariable();
	$("#"+sectionId+" .SlideType_Choose_2_with_Image_QuestionText").each(function(){
		if(SlideType_Choose_2_with_Image_Question_Type.toLowerCase()=="listenable"){
			TTSWordsArray.push($("#"+sectionId+" .SlideType_Choose_2_with_Image_QuestionText"));
		}
	});
	
	$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv table td .SlideType_Choose_2_with_Image_ImageText").each(function(){
		if(SlideType_Choose_2_with_Image_Answer_Type.toLowerCase()=="listenable"){
			TTSWordsArray.push( $(this).text());
		}
	});
	
	$("#"+sectionId+" .SlideType_Choose_2_with_Image_QuestionText").click(function(){
		if(SlideType_Choose_2_with_Image_Question_Type.toLowerCase()=="listenable"){
			playAudio($(this).text(), course_language);
		}else{
			playTapSound();
		}
	});
	
	
	$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv").click(function(){
		if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
			if(SlideType_Choose_2_with_Image_Answer_Type.toLowerCase()=="listenable"){
				playAudio($(this).find(".SlideType_Choose_2_with_Image_ImageText").text(), course_language);
			}else{
				playTapSound();
			}
			$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv").removeClass("animated tada_slow");
			$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv").addClass("SlideType_Choose_2_with_Image_ImageDiv_UnChecked").removeClass("SlideType_Choose_2_with_Image_ImageDiv_Checked");
			$("#"+sectionId+" .SlideType_Choose_2_with_Image_Image_Circle").addClass("SlideType_Choose_2_with_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_with_Image_Image_Circle_Checked");
			$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageText").addClass("SlideType_Choose_2_with_Image_ImageText_UnChecked").removeClass("SlideType_Choose_2_with_Image_ImageText_Checked");
			$(this).addClass("SlideType_Choose_2_with_Image_ImageDiv_Checked").removeClass("SlideType_Choose_2_with_Image_ImageDiv_UnChecked");
			$(this).find(".SlideType_Choose_2_with_Image_Image_Circle").addClass("SlideType_Choose_2_with_Image_Image_Circle_Checked").removeClass("SlideType_Choose_2_with_Image_Image_Circle_UnChecked");
			$(this).find(".SlideType_Choose_2_with_Image_ImageText").addClass("SlideType_Choose_2_with_Image_ImageText_Checked").removeClass("SlideType_Choose_2_with_Image_ImageText_UnChecked");
			
			if(isInitialTest == "true"){
				$("#bottomBarButton").click();
				setTimeout(function(){
					bottomBarButtonClicked();
				},800);
			}
		}
	});
	
	function checkSlideType_Choose_2_with_Image_Answer(){
		if($("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_Checked").hasClass(SlideType_Choose_2_with_Image_Answer)){
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_Checked").addClass("SlideType_Choose_2_with_Image_ImageDiv_Correct SlideType_Choose_2_with_Image_ImageDiv_Animation_Duration_1s animated tada").removeClass("SlideType_Choose_2_with_Image_ImageDiv_Checked");
			    setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_Correct").removeClass("SlideType_Choose_2_with_Image_ImageDiv_Animation_Duration_1s animated tada").addClass("SlideType_Choose_2_with_Image_ImageDiv_UnChecked");
				},1000);
			    $("#"+sectionId+" .SlideType_Choose_2_with_Image_Image_Circle_Checked").addClass("SlideType_Choose_2_with_Image_Image_Circle_Correct").removeClass("SlideType_Choose_2_with_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageText_Checked").addClass("SlideType_Choose_2_with_Image_ImageText_Correct").removeClass("SlideType_Choose_2_with_Image_ImageText_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"))
						$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"))
						$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				
				 
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
				var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_Checked").addClass("SlideType_Choose_2_with_Image_ImageDiv_InCorrect SlideType_Choose_2_with_Image_ImageDiv_Animation_Duration_1s animated shake").removeClass("SlideType_Choose_2_with_Image_ImageDiv_Checked");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageDiv_InCorrect").removeClass("SlideType_Choose_2_with_Image_ImageDiv_InCorrect SlideType_Choose_2_with_Image_ImageDiv_Animation_Duration_1s animated shake").addClass("SlideType_Choose_2_with_Image_ImageDiv_UnChecked");
				},1000);
				$("#"+sectionId+" .SlideType_Choose_2_with_Image_Image_Circle").addClass("SlideType_Choose_2_with_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_with_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageText_Checked").addClass("SlideType_Choose_2_with_Image_ImageText_InCorrect").removeClass("SlideType_Choose_2_with_Image_ImageText_Checked");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_2_with_Image_ImageText_InCorrect").addClass("SlideType_Choose_2_with_Image_ImageText_UnChecked").removeClass("SlideType_Choose_2_with_Image_ImageText_InCorrect");
				},1000);
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"))
					$("#"+sectionId).addClass("WrongAnswer");
				if(correctFlag==1){
					//userAnswerArray.push(2);
				}
				correctFlag=0;
		}
	
	}

}


function SlideType_Transaltion_Box_Function(sectionId,SlideType_Transaltion_Box_TitleText,SlideType_Transaltion_Box_Question,SlideType_Transaltion_Box_Answer,SlideType_Transaltion_Box_Tip_On_Correct,SlideType_Transaltion_Box_Tip_On_InCorrect,SlideType_Transaltion_Box_Typing_Language){
	
	if(SlideType_Transaltion_Box_TitleText == null || SlideType_Transaltion_Box_TitleText == undefined || SlideType_Transaltion_Box_TitleText == ""){
		SlideType_Transaltion_Box_TitleText="à¤…à¤‚à¤—à¥�à¤°à¥‡à¥›à¥€ à¤®à¥‡à¤‚ à¤…à¤¨à¥�à¤µà¤¾à¤¦ à¤•à¥€à¤œà¤¿à¤¯à¥‡";
	}
	
	this.checkSlideType_Transaltion_Box_Answer = checkSlideType_Transaltion_Box_Answer;
	
	var question = replaceVariable(SlideType_Transaltion_Box_Question);
	var CorrectTip = SlideType_Transaltion_Box_Tip_On_Correct;
	var InCorrectTip = SlideType_Transaltion_Box_Tip_On_InCorrect;
	//SlideType_Transaltion_Box_Answer = replaceVariableInString(SlideType_Transaltion_Box_Answer);
	
	$(function(){
		
		$("#"+sectionId+" .titleText").html(SlideType_Transaltion_Box_TitleText);
		$("#"+sectionId+" .SlideType_Transaltion_Box_Question").html(question);
		
		updateInputVariable();
		$("#"+sectionId+" #SlideType_Transaltion_Box_Listen_Text").each(function(){
			if(courseId==18){
				if(SlideType_Transaltion_Box_Typing_Language.toLowerCase().trim()!="learning language"){
					TTSWordsArray.push(replaceVariableInString(SlideType_Transaltion_Box_Question).trim());
				}
			}else{
				if(SlideType_Transaltion_Box_Typing_Language.toLowerCase().trim()!="learning language"){
					TTSWordsArray.push(replaceVariableInString(SlideType_Transaltion_Box_Answer).split("/")[0].trim());
				}
			}
		});
		$("#"+sectionId+" #SlideType_Transaltion_Box_Listen_Text").click(function(){
			if(courseId==18){
				if(SlideType_Transaltion_Box_Typing_Language.toLowerCase().trim()!="learning language"){
					playAudio(replaceVariableInString(SlideType_Transaltion_Box_Question).trim(), course_language);
				}
			}else{
				if(SlideType_Transaltion_Box_Typing_Language.toLowerCase().trim()!="learning language"){
					playAudio(replaceVariableInString(SlideType_Transaltion_Box_Answer).split("/")[0].trim(), course_language);
				}
			}
		});
		if(SlideType_Transaltion_Box_Typing_Language.toLowerCase().trim()=="learning language" || SlideType_Transaltion_Box_Typing_Language.toLowerCase().trim()==""){
			$("#"+sectionId+" #SlideType_Transaltion_Box_Listen_Text").css("display","none");
		}else{
			$("#"+sectionId+" #SlideType_Transaltion_Box_Listen_Text").css("display","block");
		}
		
		$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").keyup(function(e) {
//			if (e.keyCode == 13) {
//				checkSlideType_Transaltion_Box_Answer();
//			}
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
			$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
			$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Transaltion_Box_Answer()");
		});
		
	});

	function checkSlideType_Transaltion_Box_Answer(){
		if(isInLessonTest == "true" || isInitialTest == "true"){
			$("#bottomBarButton").css("visibility","hidden");
		}
		var multipleAnswer = replaceVariableInString(SlideType_Transaltion_Box_Answer).toLowerCase().trim().split("/");
		var answerFlag = 0;
//		if(!typeof _gaq != 'undefined'){
//			var data = "subject-"+courseId+".L-"+"Slide-"+sectionId+".variable-"+SlideType_Transaltion_Box_Question.toLowerCase()+".UserInput-"+removeSpecialCharacter($("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val());
//			var lessonNumber = window.location.href;
//			lessonNumber = lessonNumber.substr(lessonNumber.lastIndexOf("/")+1,lessonNumber.indexOf(".jsp"));
//			_gaq.push(['_trackEvent', 'InteractiveLessons_user_Input ', courseId, data]);
//		}
		var tts = "";
		for(var i=0;i<multipleAnswer.length;i++){
			multipleAnswer[i] = removeSpecialCharacter(multipleAnswer[i]).trim();
			if( ( removeSpecialCharacter($("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val()).toLowerCase().trim() == multipleAnswer[i] ) ){
				answerFlag = 1;
				tts = $("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val().trim();
			}
		}
			if( answerFlag==1 ){
				playAudio(tts, course_language);
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#49C9AF");
				$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").addClass("animated tada");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true").blur();
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"))
						$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					//correctFlag=1;
					if(!$("#"+sectionId).hasClass("CorrectAnswer"))
						$("#"+sectionId).addClass("WrongAnswer");
				}
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").removeClass("animated tada");
				},1100);
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
			}else{
				$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").addClass("animated shake");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#FE5C57");
				$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true");
				setTimeout(function(){
					$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#F8CE46");
					$("#"+sectionId+" .SlideType_Transaltion_Box_InputBoxOuterDiv").removeClass("animated shake");
					$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val("");
					$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").blur();
					setTimeout(function(){
						$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val(replaceVariableInString(SlideType_Transaltion_Box_Answer.split("/")[0].trim()));
						$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","#49C9AF");
						$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").attr("readonly","true");
						$("#disableBottomBarButton").css("display","block");
						$("#bottomBarButton").removeClass("checkButtonAnimation");
						setTimeout(function(){
							$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").val("");
							$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").css("background","");
							$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").removeAttr("readonly");
							$("#"+sectionId+" #SlideType_Transaltion_Box_InputBox").focus();
							$("#disableBottomBarButton").css("display","none");
							if(isInitialTest == "false"){
								$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
								$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
							}
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

function SlideType_ListenableTranslation_Function(sectionId,SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect,SlideType_ListenableTranslation_Typing_Language){
	
	this.checkSlideType_ListenableTranslation_Answer = checkSlideType_ListenableTranslation_Answer;
	
	var CorrectTip = SlideType_ListenableTranslation_Tip_On_Correct;
	var InCorrectTip = SlideType_ListenableTranslation_Tip_On_InCorrect;
	//SlideType_ListenableTranslation_Answer = replaceVariableInString(SlideType_ListenableTranslation_Answer);
	
	$(function(){
		
		updateInputVariable();
//		$("#"+sectionId+" #SlideType_ListenableTranslation_Listen_Text").each(function(){
//			if(courseId==18){
//				if(SlideType_ListenableTranslation_Typing_Language.toLowerCase().trim()!="learning language"){
//					TTSWordsArray.push(replaceVariableInString(SlideType_ListenableTranslation_Question).trim());
//				}
//			}else{
//				if(SlideType_ListenableTranslation_Typing_Language.toLowerCase().trim()!="learning language"){
//					TTSWordsArray.push(replaceVariableInString(SlideType_ListenableTranslation_Answer).split("/")[0].trim());
//				}
//			}
//		});
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
		var multipleAnswer = replaceVariableInString(SlideType_ListenableTranslation_Answer).toLowerCase().trim().split("/");
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
			if( ( removeSpecialCharacter($("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val()).toLowerCase().trim() == multipleAnswer[i] ) ){
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
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
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
						$("#"+sectionId+" #SlideType_ListenableTranslation_InputBox").val(replaceVariableInString(SlideType_ListenableTranslation_Answer.split("/")[0].trim()));
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
							if(isInitialTest == "false"){
								$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
								$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
							}
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

function SlideType_CombinedTranslation_Function(sectionId,SlideType_CombinedTranslation_Audio,SlideType_CombinedTranslation_IsTTS,SlideType_CombinedTranslation_Answer,SlideType_CombinedTranslation_Tip_On_Correct,SlideType_CombinedTranslation_Tip_On_InCorrect,SlideType_CombinedTranslation_Typing_Language){
	
	this.checkSlideType_CombinedTranslation_Answer = checkSlideType_CombinedTranslation_Answer;
	
	var CorrectTip = SlideType_CombinedTranslation_Tip_On_Correct;
	var InCorrectTip = SlideType_CombinedTranslation_Tip_On_InCorrect;
	//SlideType_CombinedTranslation_Answer = replaceVariableInString(SlideType_CombinedTranslation_Answer);
	
	$(function(){
		
		updateInputVariable();
//		$("#"+sectionId+" #SlideType_CombinedTranslation_Listen_Text").each(function(){
//			if(courseId==18){
//				if(SlideType_CombinedTranslation_Typing_Language.toLowerCase().trim()!="learning language"){
//					TTSWordsArray.push(replaceVariableInString(SlideType_CombinedTranslation_Question).trim());
//				}
//			}else{
//				if(SlideType_CombinedTranslation_Typing_Language.toLowerCase().trim()!="learning language"){
//					TTSWordsArray.push(replaceVariableInString(SlideType_CombinedTranslation_Answer).split("/")[0].trim());
//				}
//			}
//		});
		$("#"+sectionId+" #SlideType_CombinedTranslation_Listen_Text").click(function(){
			$(this).find("#audio")[0].load();
			$(this).find("#audio")[0].play();
		});
		
		$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").keyup(function(e) {
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
			$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
			$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_CombinedTranslation_Answer()");
		});
		
	});

	function checkSlideType_CombinedTranslation_Answer(){
		if(isInLessonTest == "true" || isInitialTest == "true"){
			$("#bottomBarButton").css("visibility","hidden");
		}
		var multipleAnswer = replaceVariableInString(SlideType_CombinedTranslation_Answer).toLowerCase().trim().split("/");
		var answerFlag = 0;
//		if(!typeof _gaq != 'undefined'){
//			var data = "subject-"+courseId+".L-"+"Slide-"+sectionId+".variable-"+SlideType_CombinedTranslation_Question.toLowerCase()+".UserInput-"+removeSpecialCharacter($("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").val());
//			var lessonNumber = window.location.href;
//			lessonNumber = lessonNumber.substr(lessonNumber.lastIndexOf("/")+1,lessonNumber.indexOf(".jsp"));
//			_gaq.push(['_trackEvent', 'InteractiveLessons_user_Input ', courseId, data]);
//		}
		var tts = "";
		for(var i=0;i<multipleAnswer.length;i++){
			multipleAnswer[i] = removeSpecialCharacter(multipleAnswer[i]).trim();
			if( ( removeSpecialCharacter($("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").val()).toLowerCase().trim() == multipleAnswer[i] ) ){
				answerFlag = 1;
				tts = $("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").val().trim();
			}
		}
			if( answerFlag==1 ){
				if(!$("#"+sectionId).hasClass("WrongAnswer"))
				$("#"+sectionId).addClass("CorrectAnswer");
				playAudio(tts, course_language);
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").css("background","#49C9AF");
				$("#"+sectionId+" .SlideType_CombinedTranslation_InputBoxOuterDiv").addClass("animated tada");
				$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").attr("readonly","true").blur();
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
						$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
						$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_CombinedTranslation_InputBoxOuterDiv").removeClass("animated tada");
				},1100);
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
			}else{
				if(!$("#"+sectionId).hasClass("CorrectAnswer"))
				$("#"+sectionId).addClass("WrongAnswer");
				$("#"+sectionId+" .SlideType_CombinedTranslation_InputBoxOuterDiv").addClass("animated shake");
				$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").css("background","#FE5C57");
				$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").attr("readonly","true");
				setTimeout(function(){
					$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").css("background","#F8CE46");
					$("#"+sectionId+" .SlideType_CombinedTranslation_InputBoxOuterDiv").removeClass("animated shake");
					$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").val("");
					$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").blur();
					setTimeout(function(){
						$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").val(replaceVariableInString(SlideType_CombinedTranslation_Answer.split("/")[0].trim()));
						$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").css("background","#49C9AF");
						$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").attr("readonly","true");
						$("#disableBottomBarButton").css("display","block");
						$("#bottomBarButton").removeClass("checkButtonAnimation");
						setTimeout(function(){
							$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").val("");
							$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").css("background","#eee");
							$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").removeAttr("readonly");
							$("#"+sectionId+" #SlideType_CombinedTranslation_InputBox").focus();
							$("#disableBottomBarButton").css("display","none");
							if(isInitialTest == "false"){
								$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
								$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
							}
						},2000);
					},10);
				},1000);
				
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
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

function SlideType_Pronunciation_Function(sectionId,SlideType_Pronunciation_Answer){
	
	this.checkSlideType_Pronunciation_Answer = checkSlideType_Pronunciation_Answer;
		
		$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv:eq(0)").addClass("animated tada_slow");
		setTimeout(function(){
			$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv:eq(1)").addClass("animated tada_slow");
			setTimeout(function(){
				$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv:eq(2)").addClass("animated tada_slow");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv:eq(3)").addClass("animated tada_slow");
				},100);
			},100);
		},100);
		
		updateInputVariable();
		
		$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv").click(function(){
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				$(this).find("#audio")[0].load();
				$(this).find("#audio")[0].play();
				$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv").addClass("SlideType_Pronunciation_ImageDiv_UnChecked").removeClass("SlideType_Pronunciation_ImageDiv_Checked");
				$("#"+sectionId+" .SlideType_Pronunciation_Image_Circle").addClass("SlideType_Pronunciation_Image_Circle_UnChecked").removeClass("SlideType_Pronunciation_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Pronunciation_ImageText").addClass("SlideType_Pronunciation_ImageText_UnChecked").removeClass("SlideType_Pronunciation_ImageText_Checked");
				$(this).addClass("SlideType_Pronunciation_ImageDiv_Checked").removeClass("SlideType_Pronunciation_ImageDiv_UnChecked");
				$(this).find(".SlideType_Pronunciation_Image_Circle").addClass("SlideType_Pronunciation_Image_Circle_Checked").removeClass("SlideType_Pronunciation_Image_Circle_UnChecked");
				$(this).find(".SlideType_Pronunciation_ImageText").addClass("SlideType_Pronunciation_ImageText_Checked").removeClass("SlideType_Pronunciation_ImageText_UnChecked");
				
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
		
		function checkSlideType_Pronunciation_Answer(){
			if($("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_Checked").hasClass(SlideType_Pronunciation_Answer)){
					var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_Checked").attr("tipText"));
					$("#bottomBarButton").attr("isDisable","true");
					setTimeout(function(){
						$("#bottomBarButton").attr("isDisable","false");
						showTipPopup(text);
					},500);
					$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_Checked").addClass("SlideType_Pronunciation_ImageDiv_Correct SlideType_Pronunciation_ImageDiv_Animation_Duration_1s animated tada").removeClass("SlideType_Pronunciation_ImageDiv_Checked");
				    setTimeout(function(){
						$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_Correct").removeClass("SlideType_Pronunciation_ImageDiv_Animation_Duration_1s animated tada").addClass("SlideType_Pronunciation_ImageDiv_UnChecked");
					},1000);
				    $("#"+sectionId+" .SlideType_Pronunciation_Image_Circle_Checked").addClass("SlideType_Pronunciation_Image_Circle_Correct").removeClass("SlideType_Pronunciation_Image_Circle_Checked");
					$("#"+sectionId+" .SlideType_Pronunciation_ImageText_Checked").addClass("SlideType_Pronunciation_ImageText_Correct").removeClass("SlideType_Pronunciation_ImageText_Checked");
					$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
					$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
					
					playCorrectSound();
					
					if(correctFlag==1){
						if(!$("#"+sectionId).hasClass("WrongAnswer"));
						$("#"+sectionId).addClass("CorrectAnswer");
						gameCoin=gameCoin+equivalent_positive_coins;
						//userAnswerArray.push(1);
						if(isInLessonTest == "false" && isInitialTest == "false"){
							showAwardCoinInLesson();
						}
					}else{
						if(!$("#"+sectionId).hasClass("CorrectAnswer"));
						$("#"+sectionId).addClass("WrongAnswer");
						//correctFlag=1;
					}
					
					 
					//$("#bottomBarButton").removeClass("checkButtonAnimation");
			}else{
					var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_Checked").attr("tipText"));
					$("#bottomBarButton").attr("isDisable","true");
					setTimeout(function(){
						$("#bottomBarButton").attr("isDisable","false");
						showTipPopup(text);
					},500);
					$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_Checked").addClass("SlideType_Pronunciation_ImageDiv_InCorrect SlideType_Pronunciation_ImageDiv_Animation_Duration_1s animated shake").removeClass("SlideType_Pronunciation_ImageDiv_Checked");
					setTimeout(function(){
						$("#"+sectionId+" .SlideType_Pronunciation_ImageDiv_InCorrect").removeClass("SlideType_Pronunciation_ImageDiv_InCorrect SlideType_Pronunciation_ImageDiv_Animation_Duration_1s animated shake").addClass("SlideType_Pronunciation_ImageDiv_UnChecked");
					},1000);
					$("#"+sectionId+" .SlideType_Pronunciation_Image_Circle").addClass("SlideType_Pronunciation_Image_Circle_UnChecked").removeClass("SlideType_Pronunciation_Image_Circle_Checked");
					$("#"+sectionId+" .SlideType_Pronunciation_ImageText_Checked").addClass("SlideType_Pronunciation_ImageText_InCorrect").removeClass("SlideType_Pronunciation_ImageText_Checked");
					setTimeout(function(){
						$("#"+sectionId+" .SlideType_Pronunciation_ImageText_InCorrect").addClass("SlideType_Pronunciation_ImageText_UnChecked").removeClass("SlideType_Pronunciation_ImageText_InCorrect");
					},1000);
					$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
					$("#disableBottomBarButton").css("display","block");
					playInCorrectSound();
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");
					if(correctFlag==1){
						//userAnswerArray.push(2);
					}
					correctFlag=0;
			}
		
		}

	}

function SlideType_Choose_4_without_Image_Function(sectionId,SlideType_Choose_4_without_Image_Question,SlideType_Choose_4_without_Image_option_String,SlideType_Choose_4_without_Image_Answer,SlideType_Choose_4_without_Image_Question_Type,SlideType_Choose_4_without_Image_Question_Display_Flag,SlideType_Choose_4_without_Image_Answer_Type){
	
	this.checkSlideType_Choose_4_without_Image_Answer = checkSlideType_Choose_4_without_Image_Answer;
	var dataOptions = SlideType_Choose_4_without_Image_option_String.split("*&");
	
	$(function(){
		
		$("#"+sectionId).attr("Questiontype",SlideType_Choose_4_without_Image_Question_Type);
		$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").html(replaceVariable(SlideType_Choose_4_without_Image_Question));
		if(SlideType_Choose_4_without_Image_Question_Display_Flag.toLowerCase()=="yes" || SlideType_Choose_4_without_Image_Question_Display_Flag.toLowerCase()==""){
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_HintText").css("display","block");
		}else{
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText_WhenHidden").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_HintText").css("display","none");
			//$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText_WhenHidden").text("Listen to the audio and pick the correct translation");
			
		}
		var correctIndex = SlideType_Choose_4_without_Image_Answer.replace("option","");
		var arrTemp = [];
		while(arrTemp.length < 4){
			var num = getRandomNumber(1,4);
			var flag = 0;
			for(var i=0;i<arrTemp.length;i++){
				if(arrTemp[i] == num){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				arrTemp.push(num);
			}
		}
		var minFontSize = 35;
		for(var i=0;i<4;i++){
			var fontSize = "35px";
			var fontSize1=35;
			if((dataOptions[2*i]).length >=28 && (dataOptions[2*i]).length < 40){
				fontSize = "30px";
				fontSize1 = 30;
			}else if((dataOptions[2*i]).length >=40 && (dataOptions[2*i]).length < 50){
				fontSize = "25px";
				fontSize1 = 25;
			}else if((dataOptions[2*i]).length >=50 && (dataOptions[2*i]).length < 60){
				fontSize = "20px";
				fontSize1 = 20;
			}else if((dataOptions[2*i]).length >=60){
				fontSize = "15px";
				fontSize1 = 15;
			}
			if(minFontSize > fontSize1){
				minFontSize = fontSize1;
			}
			if(correctIndex == i+1){
				SlideType_Choose_4_without_Image_Answer = "option"+arrTemp[i];
			}
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text:eq("+(arrTemp[i]-1)+")").css("font-size",fontSize);
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("font-size",fontSize);
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text:eq("+(arrTemp[i]-1)+")").css("line-height","initial");
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("line-height","initial");

			$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text:eq("+(arrTemp[i]-1)+")").html( replaceVariable(dataOptions[2*i]) ).css("font-size",fontSize);
			if(dataOptions[2*i+1] != ""){
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div:eq("+(arrTemp[i]-1)+")").attr("tipText", replaceVariable(dataOptions[2*i+1]) );
			}
		}
		
		$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text").each(function(){
			$(this).css("font-size",minFontSize+"px");
		});
		
		if(SlideType_Choose_4_without_Image_Question_Type.toLowerCase()=="listenable"){
			$("#"+sectionId+" #SlideType_Choose_4_without_Image_Listen_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_4_without_Image_HintText").attr("hintText1"));
		}else{
			$("#"+sectionId+" #SlideType_Choose_4_without_Image_Listen_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_4_without_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_4_without_Image_HintText").attr("hintText2"));
		}
		
		$("#"+sectionId+" #SlideType_Choose_4_without_Image_Listen_QuestionText").each(function(){
			TTSWordsArray.push($("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").text());
		});
		
		$("#"+sectionId+" #SlideType_Choose_4_without_Image_Listen_QuestionText").click(function(){
			playAudio($("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").text(), course_language);
			$(this).removeClass("pulse animated");
		});
		
		updateInputVariable();
		$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").each(function(){
			if(SlideType_Choose_4_without_Image_Question_Type.toLowerCase()=="listenable"){
				TTSWordsArray.push($("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").text());
			}
		});
		$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div table td .SlideType_Choose_4_without_Image_Text").each(function(){
			if(SlideType_Choose_4_without_Image_Answer_Type.toLowerCase()=="listenable"){
				TTSWordsArray.push( $(this).text());
			}
		});
		$("#"+sectionId+" .SlideType_Choose_4_without_Image_QuestionText").click(function(){
			if(SlideType_Choose_4_without_Image_Question_Type.toLowerCase()=="listenable"){
				playAudio($(this).text(), course_language);
			}else{
				playTapSound();
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div").click(function(){
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				if(SlideType_Choose_4_without_Image_Answer_Type.toLowerCase()=="listenable"){
					playAudio($(this).find(".SlideType_Choose_4_without_Image_Text").text(), course_language);
				}else{
					playTapSound();
				}
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div").removeClass("animated tada_slow");
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div").addClass("SlideType_Choose_4_without_Image_Div_UnChecked").removeClass("SlideType_Choose_4_without_Image_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Image_Circle").addClass("SlideType_Choose_4_without_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_4_without_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_TextTD").addClass("SlideType_Choose_4_without_Image_TextTD_UnChecked").removeClass("SlideType_Choose_4_without_Image_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text").removeClass("SlideType_Choose_4_without_Image_Text_Checked").addClass("SlideType_Choose_4_without_Image_Text_UnChecked");
				
				$(this).addClass("SlideType_Choose_4_without_Image_Div_Checked").removeClass("SlideType_Choose_4_without_Image_Div_UnChecked");
				$(this).find(".SlideType_Choose_4_without_Image_Image_Circle").addClass("SlideType_Choose_4_without_Image_Image_Circle_Checked").removeClass("SlideType_Choose_4_without_Image_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_4_without_Image_TextTD").addClass("SlideType_Choose_4_without_Image_TextTD_Checked").removeClass("SlideType_Choose_4_without_Image_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_4_without_Image_Text").addClass("SlideType_Choose_4_without_Image_Text_Checked").removeClass("SlideType_Choose_4_without_Image_Text_UnChecked");
				
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
		
	});

	function checkSlideType_Choose_4_without_Image_Answer(){
		
		if($("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_Checked").hasClass(SlideType_Choose_4_without_Image_Answer)){
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_Checked").addClass("SlideType_Choose_4_without_Image_Div_Correct SlideType_Choose_4_without_Image_Div_Animation_Duration_1s animated tada").removeClass("SlideType_Choose_4_without_Image_Div_Checked");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_Correct").removeClass("SlideType_Choose_4_without_Image_Div_Animation_Duration_1s animated tada").addClass("SlideType_Choose_4_without_Image_Div_UnChecked");
				},1000);
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Image_Circle_Checked").addClass("SlideType_Choose_4_without_Image_Image_Circle_Correct").removeClass("SlideType_Choose_4_without_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_TextTD_Checked").addClass("SlideType_Choose_4_without_Image_TextTD_Correct").removeClass("SlideType_Choose_4_without_Image_TextTD_Checked");
				$(this).find(".SlideType_Choose_4_without_Image_Text").removeClass("SlideType_Choose_4_without_Image_Text_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				$("#"+sectionId+" #SlideType_Choose_4_without_Image_Listen_QuestionText").removeClass("animated pulse");
				playCorrectSound();
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
					$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				 
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
				var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_Checked").addClass("SlideType_Choose_4_without_Image_Div_InCorrect SlideType_Choose_4_without_Image_Div_Animation_Duration_1s animated shake").removeClass("SlideType_Choose_4_without_Image_Div_Checked");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_InCorrect").removeClass("SlideType_Choose_4_with_Image_ImageDiv_InCorrect SlideType_Choose_4_without_Image_Div_Animation_Duration_1s animated shake").addClass("SlideType_Choose_4_without_Image_Div_UnChecked");
				},1000);
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text_Checked").addClass("SlideType_Choose_4_without_Image_Text_InCorrect").removeClass("SlideType_Choose_4_without_Image_Text_Checked");
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_TextTD_Checked").addClass("SlideType_Choose_4_without_Image_TextTD_InCorrect");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_4_without_Image_Text_InCorrect").removeClass("SlideType_Choose_4_without_Image_Text_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_4_without_Image_Div_InCorrect").addClass("SlideType_Choose_4_without_Image_Div_UnChecked").removeClass("SlideType_Choose_4_without_Image_Div_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_4_without_Image_Image_Circle").addClass("SlideType_Choose_4_without_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_4_without_Image_Image_Circle_Checked");
				},1000);
				
				$("#"+sectionId+" .SlideType_Choose_4_without_Image_TextTD").addClass("SlideType_Choose_4_without_Image_TextTD_UnChecked").removeClass("SlideType_Choose_4_without_Image_TextTD_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
				$("#"+sectionId).addClass("WrongAnswer");
				if(correctFlag==1){
					//userAnswerArray.push(2);
				}
				correctFlag=0;
		
		}
		
		
	}
	
}


function SlideType_Choose_2_without_Image_Function(sectionId,SlideType_Choose_2_without_Image_Question,SlideType_Choose_2_without_Image_option_String,SlideType_Choose_2_without_Image_Answer,SlideType_Choose_2_without_Image_Question_Type,SlideType_Choose_2_without_Image_Question_Display_Flag,SlideType_Choose_2_without_Image_Answer_Type){
	
	this.checkSlideType_Choose_2_without_Image_Answer = checkSlideType_Choose_2_without_Image_Answer;
	var dataOptions = SlideType_Choose_2_without_Image_option_String.split("*&");
	
	$(function(){
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Image_QuestionText").html(replaceVariable(SlideType_Choose_2_without_Image_Question));
		if(SlideType_Choose_2_without_Image_Question_Display_Flag.toLowerCase()=="yes"){
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").css("display","block");
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").css("display","none");
		}
		
		var correctIndex = SlideType_Choose_2_without_Image_Answer.replace("option","");
		var arrTemp = [];
		while(arrTemp.length < 2){
			var num = getRandomNumber(1,2);
			var flag = 0;
			for(var i=0;i<arrTemp.length;i++){
				if(arrTemp[i] == num){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				arrTemp.push(num);
			}
		}
		
		var minFontSize = 35;
		for(var i=0;i<2;i++){
				var fontSize = "35px";
				var fontSize1=35;
				if((dataOptions[2*i]).length >=28 && (dataOptions[2*i]).length < 40){
					fontSize = "30px";
					fontSize1 = 30;
				}else if((dataOptions[2*i]).length >=40 && (dataOptions[2*i]).length < 50){
					fontSize = "25px";
					fontSize1 = 25;
				}else if((dataOptions[2*i]).length >=50 && (dataOptions[2*i]).length < 60){
					fontSize = "20px";
					fontSize1 = 20;
				}else if((dataOptions[2*i]).length >=60){
					fontSize = "15px";
					fontSize1 = 15;
				}
				if(minFontSize > fontSize1){
					minFontSize = fontSize1;
				}
				if(correctIndex == i+1){
					SlideType_Choose_2_without_Image_Answer = "option"+arrTemp[i];
				}
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text:eq("+(arrTemp[i]-1)+")").css("font-size",fontSize);
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("font-size",fontSize);
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text:eq("+(arrTemp[i]-1)+")").css("line-height","initial");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("line-height","initial");
			
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text:eq("+(arrTemp[i]-1)+")").html( replaceVariable(dataOptions[2*i]) );
			if(dataOptions[2*i+1] != ""){
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div:eq("+(arrTemp[i]-1)+")").attr("tipText", replaceVariable(dataOptions[2*i+1]) );
			}
		}
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text").each(function(){
			$(this).css("font-size",minFontSize+"px");
		});
		
		
		if(SlideType_Choose_2_without_Image_Question_Type.toLowerCase()=="listenable"){
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").attr("hintText1"));
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").attr("hintText2"));
		}
		
		updateInputVariable();
		$("#"+sectionId+" .SlideType_Choose_2_without_Image_QuestionText").each(function(){
			if(SlideType_Choose_2_without_Image_Question_Type.toLowerCase()=="listenable"){
				TTSWordsArray.push($("#"+sectionId+" .SlideType_Choose_2_without_Image_QuestionText").text());
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div table td .SlideType_Choose_2_without_Image_Text").each(function(){
			if(SlideType_Choose_2_without_Image_Answer_Type.toLowerCase()=="listenable"){
				TTSWordsArray.push( $(this).text());
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Image_QuestionText").click(function(){
			if(SlideType_Choose_2_without_Image_Question_Type.toLowerCase()=="listenable"){
				playAudio($(this).text(), course_language);
			}else{
				playTapSound();
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div").click(function(){
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				if(SlideType_Choose_2_without_Image_Answer_Type.toLowerCase()=="listenable"){
					playAudio($(this).find(".SlideType_Choose_2_without_Image_Text").text(), course_language);
				}else{
					playTapSound();
				}
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div").addClass("SlideType_Choose_2_without_Image_Div_UnChecked").removeClass("SlideType_Choose_2_without_Image_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Image_Circle").addClass("SlideType_Choose_2_without_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_TextTD").addClass("SlideType_Choose_2_without_Image_TextTD_UnChecked").removeClass("SlideType_Choose_2_without_Image_TextTD_Checked");
				
				$(this).addClass("SlideType_Choose_2_without_Image_Div_Checked").removeClass("SlideType_Choose_2_without_Image_Div_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Image_Image_Circle").addClass("SlideType_Choose_2_without_Image_Image_Circle_Checked").removeClass("SlideType_Choose_2_without_Image_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Image_TextTD").addClass("SlideType_Choose_2_without_Image_TextTD_Checked").removeClass("SlideType_Choose_2_without_Image_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Image_Text").addClass("SlideType_Choose_2_without_Image_Text_Checked").removeClass("SlideType_Choose_2_without_Image_Text_UnChecked");
				
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
		
	});

	function checkSlideType_Choose_2_without_Image_Answer(){
		
		if($("#"+sectionId+" .SlideType_Choose_2_without_Image_Div_Checked").hasClass(SlideType_Choose_2_without_Image_Answer)){
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_without_Image_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div_Checked").addClass("SlideType_Choose_2_without_Image_Div_Correct").removeClass("SlideType_Choose_2_without_Image_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Image_Circle_Checked").addClass("SlideType_Choose_2_without_Image_Image_Circle_Correct").removeClass("SlideType_Choose_2_without_Image_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_TextTD_Checked").addClass("SlideType_Choose_2_without_Image_TextTD_Correct").removeClass("SlideType_Choose_2_without_Image_TextTD_Checked");
				$(this).find(".SlideType_Choose_2_without_Image_Text").removeClass("SlideType_Choose_2_without_Image_Text_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				playCorrectSound();
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
					$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				 
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
				$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div_Checked").addClass("SlideType_Choose_2_without_Image_Div_InCorrect").removeClass("SlideType_Choose_2_without_Image_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text_Checked").addClass("SlideType_Choose_2_without_Image_Text_InCorrect").removeClass("SlideType_Choose_2_without_Image_Text_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_TextTD_Checked").addClass("SlideType_Choose_2_without_Image_TextTD_InCorrect");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_2_without_Image_Text_InCorrect").removeClass("SlideType_Choose_2_without_Image_Text_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_without_Image_Div_InCorrect").addClass("SlideType_Choose_2_without_Image_Div_UnChecked").removeClass("SlideType_Choose_2_without_Image_Div_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_without_Image_Image_Circle").addClass("SlideType_Choose_2_without_Image_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Image_Image_Circle_Checked");
				},1000);
				
				$("#"+sectionId+" .SlideType_Choose_2_without_Image_TextTD").addClass("SlideType_Choose_2_without_Image_TextTD_UnChecked").removeClass("SlideType_Choose_2_without_Image_TextTD_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
				$("#disableBottomBarButton").css("display","block");
				playInCorrectSound();
				if(!$("#"+sectionId).hasClass("CorrectAnswer"));
				$("#"+sectionId).addClass("WrongAnswer");
				if(correctFlag==1){
					//userAnswerArray.push(2);
				}
				correctFlag=0;
		}
	}
	
}


//function SlideType_Missing_Word_Function(sectionId,SlideType_Missing_Word_TitleText,SlideType_Missing_Word_optionString,SlideType_Missing_Word_Answer,SlideType_Missing_Word_Question_Part1,SlideType_Missing_Word_Question_Part2){
//	
//	this.checkSlideType_Missing_Word_Answer = checkSlideType_Missing_Word_Answer;
//	$("#"+sectionId+" .titleText").html(replaceVariable(SlideType_Missing_Word_TitleText));
//	$("#"+sectionId+" .questionPart1Text").html(replaceVariable(SlideType_Missing_Word_Question_Part1));
//	$("#"+sectionId+" .questionPart2Text").html(replaceVariable(SlideType_Missing_Word_Question_Part2));
//	var dataString = SlideType_Missing_Word_optionString.split("*&");
//	
//	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_UnChecked");
//	
//	var correctIndex = SlideType_Missing_Word_Answer.replace("option","");
//	var arrTemp = [];
//	var lengthTemp = 0;
//	for(var i=0;i<dataString.length/2;i++){
//		if(dataString[2*i]!="" && dataString[2*i]!=undefined){
//			lengthTemp++;
//		}
//	}
//	while(arrTemp.length < lengthTemp){
//		var num = getRandomNumber(1,lengthTemp);
//		var flag = 0;
//		for(var i=0;i<arrTemp.length;i++){
//			if(arrTemp[i] == num){
//				flag = 1;
//				break;
//			}
//		}
//		if(flag == 0){
//			arrTemp.push(num);
//		}
//	}
//	
//	var optionHtml = "";
//	for(var i=0;i<dataString.length/2;i++){
//		if(dataString[2*i]!="" && dataString[2*i]!=undefined){
//			var j = arrTemp[i]-1;
//			var text = dataString[2*j];
//			optionHtml += "<option tipText=\""+dataString[2*j+1]+"\" answerClass=\"option"+(j+1)+"\" value=\""+dataString[2*j]+"\">"+dataString[2*j]+"</option>";
////			$("#"+sectionId+" #SlideType_Missing_Word_select_choice").append("" +
////					"<option tipText=\""+dataString[2*i+1]+"\" answerClass=\"option"+(i+1)+"\" value=\""+dataString[2*i]+"\">"+dataString[2*i]+"</option>"+
////			"");
//		}
//	}
//	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").append(optionHtml);
//	
//	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").change(function(){
//		$("#disableBottomBarButton").css("display","none");
//		$("#bottomBarButton").addClass("checkButtonAnimation");
//		playAudio($(this).val(), course_language);
//		if(isInitialTest == "true"){
//			$("#bottomBarButton").click();
//			setTimeout(function(){
//				bottomBarButtonClicked();
//			},800);
//		}
//	});
//	
//	function checkSlideType_Missing_Word_Answer(){
//		
//		if(	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("answerClass")==SlideType_Missing_Word_Answer ){
//			  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_Correct animated tada").removeClass("SlideType_Missing_Word_select_choice_UnChecked");
//			  setTimeout(function(){
//				  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").removeClass("animated tada");
//			  },1100);
//			  $("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
//			  $("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
//			  playCorrectSound();
//			  
//			  if(correctFlag==1){
//				  gameCoin=gameCoin+equivalent_positive_coins;
//				  //userAnswerArray.push(1);
//				  if(isInLessonTest == "false" && isInitialTest == "false"){
//						showAwardCoinInLesson();
//					}
//			  }else{
//				  //correctFlag=1;
//			  }
//			  
//			  setTimeout(function(){
//				  var st = $("#"+sectionId+" .questionPart1Text").text() +" "+ $("#"+sectionId+" #SlideType_Missing_Word_select_choice").val() + " " + $("#"+sectionId+" .questionPart2Text").text();
//				  playAudio(st, course_language);
//			  },100);
//			  var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("tipText"));
//			  $("#bottomBarButton").attr("isDisable","true");
//				setTimeout(function(){
//				$("#bottomBarButton").attr("isDisable","false");
//				showTipPopup(text);
//			  },500);
//			  //$("#bottomBarButton").removeClass("checkButtonAnimation");
//		  }else{
//			  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_InCorrect");
//			  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("animated shake");
//			  setTimeout(function(){
//				  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").removeClass("SlideType_Missing_Word_select_choice_InCorrect");
//				  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").removeClass("animated shake");
//			  },1100);
//			  $("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
//				$("#disableBottomBarButton").css("display","block");
//			  playInCorrectSound();
//			  if(correctFlag==1){
//					//userAnswerArray.push(2);
//				}
//			  correctFlag=0;
//			  $("#bottomBarButton").attr("isDisable","true");
//				setTimeout(function(){
//					$("#bottomBarButton").attr("isDisable","false");
//					var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("tipText"));
//					showTipPopup(text);
//				},500);
//		  }
//		
//	}
//	
//}

function SlideType_Missing_Word_Function(sectionId,SlideType_Missing_Word_TitleText,SlideType_Missing_Word_optionString,SlideType_Missing_Word_Answer,SlideType_Missing_Word_Question_Part1,SlideType_Missing_Word_Question_Part2){
	
	this.checkSlideType_Missing_Word_Answer = checkSlideType_Missing_Word_Answer;
	$("#"+sectionId+" .titleText").html(replaceVariable(SlideType_Missing_Word_TitleText));
	$("#"+sectionId+" .questionPart1Text").html(replaceVariable(SlideType_Missing_Word_Question_Part1));
	$("#"+sectionId+" .questionPart2Text").html(replaceVariable(SlideType_Missing_Word_Question_Part2));
	var dataString = SlideType_Missing_Word_optionString.split("*&");
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").html("");	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_UnChecked");
	for(var i=0;i<dataString.length/2;i++){
		if(dataString[2*i]!="" && dataString[2*i]!=undefined){
			var text = dataString[2*i];
//			$("#"+sectionId+" #SlideType_Missing_Word_select_choice").append("" +
//					"<option tipText=\""+dataString[2*i+1]+"\" answerClass=\"option"+(i+1)+"\" value=\""+dataString[2*i]+"\">"+dataString[2*i]+"</option>"+
//			"");
		   var html = '<div class="SlideType_Missing_Word_Div SlideType_Missing_Word_Div_UnChecked option'+(i+1)+'" tipText=\"'+dataString[2*i+1]+'\" answerClass=\"option"'+(i+1)+'\" >'+
				        '<table style="width:100%;height:100%;">'+
				         '<tr>'+
				          '<td class="SlideType_Missing_Word_ImageTD"><div class="SlideType_Missing_Word_Image_Circle SlideType_Missing_Word_Image_Circle_UnChecked"></div></td>'+
				          '<td class="SlideType_Missing_Word_TextTD SlideType_Missing_Word_TextTD_UnChecked"><div class="SlideType_Missing_Word_Text SlideType_Missing_Word_Text_UnChecked">'+dataString[2*i]+'</div></td>'+
				         '</tr>'+
				        '</table>'+
				       '</div>';
		   $("#"+sectionId+" #SlideType_Missing_Word_select_choice").append(html);
		}
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
//			if(SlideType_Choose_4_without_Image_Answer_Type.toLowerCase()=="listenable"){
//				playAudio($(this).find(".SlideType_Choose_4_without_Image_Text").text(), course_language);
//			}else{
//				playTapSound();
//			}
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
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
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
	
//	function checkSlideType_Missing_Word_Answer(){
//		
//		if(	$("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("answerClass")==SlideType_Missing_Word_Answer ){
//			  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_Correct animated tada").removeClass("SlideType_Missing_Word_select_choice_UnChecked");
//			  setTimeout(function(){
//				  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").removeClass("animated tada");
//			  },1100);
//			  $("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
//			  $("#bottomBarButton").attr("onclick","Reveal.navigateNext()");
//			  playCorrectSound();
//			  setTimeout(function(){
//				  var st = $("#"+sectionId+" .questionPart1Text").text() +" "+ $("#"+sectionId+" #SlideType_Missing_Word_select_choice").val() + " " + $("#"+sectionId+" .questionPart2Text").text();
//				  playAudio(st, course_language);
//			  },100);
//			  if($("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("answerClass")!=""){
//				  var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("tipText"));
//					setTimeout(function(){
//						showTipPopup(text);
//					},500);
//			  }
//			  //$("#bottomBarButton").removeClass("checkButtonAnimation");
//		  }else{
//			  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_InCorrect");
//			  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("animated shake");
//			  setTimeout(function(){
//				  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").removeClass("SlideType_Missing_Word_select_choice_InCorrect");
//				  $("#"+sectionId+" #SlideType_Missing_Word_select_choice").removeClass("animated shake");
//			  },1100);
//			  $("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton").removeClass("checkButtonAnimation");
//				$("#disableBottomBarButton").css("display","block");
//			  playInCorrectSound();
//			  if($("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("answerClass")!=""){
//				  var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" #SlideType_Missing_Word_select_choice").find('option:selected').attr("tipText"));
//					setTimeout(function(){
//						showTipPopup(text);
//					},500);
//			  }
//		  }
//		
	}
	
}

function SlideType_Tip_Slide_Function(sectionId,SlideType_Tip_Slide_TitleText,SlideType_Tip_Slide_TipText){
	
	$("#"+sectionId+" .titleText").html(replaceVariable(SlideType_Tip_Slide_TitleText));
	
	var dataString = SlideType_Tip_Slide_TipText.split("*&");
	for(var i=0;i<dataString.length/3;i++){
		var temp_equal = "";
		var before = "";//dataString[3*i].split("=")[0];
		var after = "";//dataString[3*i].split("=")[1];
		if (dataString[3*i]!=null && dataString[3*i]!="" && dataString[3*i]!=undefined){
			before = dataString[3*i].split("=")[0];
			after = dataString[3*i].split("=")[1];
		}
		if(before == undefined){
			before = "";
			temp_equal ="";
		}
		if(after == undefined){
			after = "";
			temp_equal ="";
		}
		if(courseId==18){
			$("#"+sectionId+" .SlideType_Tip_Slide_tipText").append("" +
					'<div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
						'<span class="SlideType_Tip_Slide_beforeText">'+replaceVariable(dataString[3*i])+' </span>'+
						'<span> '+temp_equal+' </span>'+
						'<span class="SlideType_Tip_Slide_afterText">'+replaceVariable(dataString[3*i+1])+'</span>'+
					'</div>'+
			"");
		}else{
		$("#"+sectionId+" .SlideType_Tip_Slide_tipText").append("" +
				'<div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
					'<span class="SlideType_Tip_Slide_beforeText">'+replaceVariable(before)+' </span>'+
					'<span> '+temp_equal+' </span>'+
					'<span class="SlideType_Tip_Slide_afterText">'+replaceVariable(after)+'</span>'+
					'<div class="SlideType_Tip_Slide_Explanation"><span class="tipExplanationText">'+replaceVariable(dataString[3*i+1])+'</span></div>'+
				'</div><br>'+
		"");
		}
	}
	
	if(courseId==18){
		
		for(var i=0;i<dataString.length/3;i++){
			$("#"+sectionId+" .SlideType_Tip_Slide_tipText").append("" +
					'<br><div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
						'<div class="SlideType_Tip_Slide_Explanation"><span class="tipExplanationText">'+replaceVariable(dataString[3*i+2])+'</span></div>'+
					'</div><br>'+
			"");
		}
	}
	
	$("#"+sectionId+" .SlideType_Tip_Slide_tipText .tipExplanationText").each(function(){
		if($(this).text()==""){
			$(this).parent().css("display","none");
		}
	});
	$("#"+sectionId+" .tipText").html(replaceVariable(SlideType_Tip_Slide_TipText));
}

function SlideType_IMAGE_Tip_Slide_Function(sectionId,SlideType_IMAGE_Tip_Slide_TitleText,SlideType_IMAGE_Tip_Slide_TipText){
	
	$("#"+sectionId+" .titleText").html(replaceVariable(SlideType_IMAGE_Tip_Slide_TitleText));
	
	var dataString = SlideType_IMAGE_Tip_Slide_TipText.split("*&");
	console.log(courseId);
	console.log(dataString);
	for(var i=0;i<dataString.length/3;i++){
		var temp_equal = "";
		var before = "";//dataString[3*i].split("=")[0];
		var after = "";//dataString[3*i].split("=")[1];
		if (dataString[3*i]!=null && dataString[3*i]!="" && dataString[3*i]!=undefined){
			var tipString = (dataString[3*i]).replace("src=","src~~~").replace("''","'").replace("'''","'");
			console.log("tipString : "+tipString);
			before = tipString.split("=")[0];
			after = tipString.split("=")[1];
		}
		if(before == undefined){
			before = "";
		}
		if(after == undefined){
			after = "";
		}
		if(dataString[3*i]!=""){
			temp_equal = "=";
		}
		
		before = before.replace("src~~~","src=");
		after = after.replace("src~~~","src=");
		
		console.log("before : "+before);
		if(courseId==18){
			$("#"+sectionId+" .SlideType_IMAGE_Tip_Slide_tipText").append("" +
					'<div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
						'<span class="SlideType_IMAGE_Tip_Slide_beforeText">'+replaceVariable(dataString[3*i])+' </span>'+
						'<span> '+temp_equal+' </span>'+
						'<span class="SlideType_IMAGE_Tip_Slide_afterText">'+replaceVariable(dataString[3*i+1])+'</span>'+
					'</div>'+
			"");
		}else{
			$("#"+sectionId+" .SlideType_IMAGE_Tip_Slide_tipText").append("" +
					'<div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
						'<span class="SlideType_IMAGE_Tip_Slide_beforeText">'+replaceVariable(before)+' </span>'+
						'<span class="equalSign"> '+temp_equal+' </span>'+
						'<span class="SlideType_IMAGE_Tip_Slide_afterText">'+replaceVariable(after)+'</span>'+
					'</div><br>'+
			"");
		}
		$("#"+sectionId+" .SlideType_IMAGE_Tip_Slide_afterText").each(function(){
			if($(this).text() == ""){
				$(this).parent().find(".equalSign").remove();
			}
		});
		
		$("#"+sectionId+" .SlideType_IMAGE_Tip_Slide_tipText img").each(function () {
			if(window.parent.b2bName != undefined && window.parent.b2bName !=""){
				var src1 = $(this).attr('src');
				var src1Arr = src1.split("/");
				 $(this).attr('src','https://storage.helloenglish.com/English-App/PronunciationFiles/'+window.parent.b2bName.toLowerCase()+'/'+ src1Arr[src1Arr.length-1]);
			}else{
				var src1 = $(this).attr('src');
				var src1Arr = src1.split("/");
				$(this).attr('src','https://storage.helloenglish.com/English-App/PronunciationFiles/'+ src1Arr[src1Arr.length-1]);
			}
		   
		});
	}
	
	if(courseId==18){
		
		for(var i=0;i<dataString.length/3;i++){
			$("#"+sectionId+" .SlideType_IMAGE_Tip_Slide_tipText").append("" +
					'<br><div class="tip'+(i+1)+'" style="font-size:30px;padding:0px 15px;line-height:1.2em!important;">'+
						'<div class="SlideType_IMAGE_Tip_Slide_Explanation"><span class="tipExplanationText">'+replaceVariable(dataString[3*i+2])+'</span></div>'+
					'</div><br>'+
			"");
		}
	}
	
	$("#"+sectionId+" .SlideType_IMAGE_Tip_Slide_tipText .tipExplanationText").each(function(){
		if($(this).text()==""){
			$(this).parent().css("display","none");
		}
	});
	$("#"+sectionId+" .tipText").html(replaceVariable(SlideType_IMAGE_Tip_Slide_TipText));
}


function SlideType_Jumble_Slide_Function(sectionId,SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_QuestionText,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_option_String,SlideType_Jumble_Slide_Typing_Language){
	
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
		$("#"+sectionId+" .QuestionText").html(replaceVariable(SlideType_Jumble_Slide_QuestionText));
		dataOptions = SlideType_Jumble_Slide_option_String.split("*&");
		
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
				if(isInLessonTest == "false" && isInitialTest == "false"){
					showAwardCoinInLesson();
				}
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

function SlideType_Dialog_Function(sectionId,SlideType_Dialog_String){
	
	var dataString = SlideType_Dialog_String.split("*&");
	
	for(var i=0;i<dataString.length/3;i++){
		if(dataString[3*i+1]!=""){
			if(i%2==0){
				$("#"+sectionId+" #chatBox").append("" +
						'<div>'+
							//'<img style="width: 80px;float:right;margin-right: -20px; margin-top: 10px; " alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15-anti.png">'+
							'<div class="SlideType_Dialog_Speaker_Name" style="float:right;right:-35px;">'+replaceVariable(dataString[3*i])+'</div>'+
							'<img style="position: relative; width: 50px; float: right; z-index: -1;margin-top: 5px;" src="../../../InteractiveLessons/img/red_tail.png" />'+
							'<div class="chatList1_Box dialogText dialogNumber'+i+'" style="max-width: 60%;cursor:pointer;right: 70px; padding: 15px 35px; min-width: 100px; font-size: 25px; background: #FE5C57; border-radius: 4px; float: right; margin-right: -15px;">'+replaceVariable(dataString[3*i+1])+'</div>'+
							'<div class="listenDialog bigIconCircle"  dialogNumber="'+i+'" style="background: #FE5C57; margin: auto; position: relative; height: 55px; width: 55px; right: 20px; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite; box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1); float: right; top: 8px;"> <img src="../../../InteractiveLessons/img/soundIconWhite_2.png" style="width:30px;margin-top: 12px;">  </div>'+
							'<div class="SlideType_Dialog_TranslationDiv" style="float: right;text-align: right;margin-right: 150px!important;">'+replaceVariable(dataString[3*i+2])+'</div>'+
						'</div>'+
						'<br><br>'+
				"");
			}else{
				$("#"+sectionId+" #chatBox").append("" +
						'<div>'+
							//'<img style="width: 80px;float:left;margin-left: -20px; margin-top: 10px; " alt="" src="../../../InteractiveLessons/img/monster-yellow-rotate-15-anti.png">'+
							'<div class="SlideType_Dialog_Speaker_Name" style="float:left;left:-35px;">'+replaceVariable(dataString[3*i])+'</div>'+
							'<img style="position: relative; width: 50px; float: left; z-index: -1;margin-top: 5px;" src="../../../InteractiveLessons/img/yellow_tail.png" />'+
							'<div class="chatList2_Box dialogText dialogNumber'+i+'" style="max-width: 60%;cursor:pointer;right: 70px; padding:15px 35px; min-width: 100px; font-size: 25px; background: #F8CE46; border-radius: 4px; float: left; margin-left: -15px;">'+replaceVariable(dataString[3*i+1])+'</div>'+
							'<div class="listenDialog  bigIconCircle"  dialogNumber="'+i+'" style="background: #F8CE46; margin: auto; position: relative; height: 55px; width: 55px; left: 20px; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite; box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1); float: left; top: 8px;"> <img src="../../../InteractiveLessons/img/soundIconWhite_2.png" style="width:30px;margin-top: 12px;">  </div>'+
							'<div class="SlideType_Dialog_TranslationDiv" style="float: left;text-align: left;margin-left: 150px!important;">'+replaceVariable(dataString[3*i+2])+'</div>'+
						'</div>'+
						'<br><br>'+
				"");
			}
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


function SlideType_Video_Slide_Function(sectionId,SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_Video_Id,SlideType_Choose_2_Video_Autoplay,SlideType_Choose_2_Video_StartTime,SlideType_Choose_2_Video_EndTime){

	
	
	this.checkSlideType_Choose_2_with_Top_Photo_Answer = checkSlideType_Choose_2_with_Top_Photo_Answer;
	var dataOptions = SlideType_Choose_2_with_Top_Photo_option_String.split("*&");
	
	$(function(){
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").html(replaceVariable(SlideType_Choose_2_with_Top_Photo_Question));
		//$("#"+sectionId+" .SlideType_Choose_2_Video").attr("src","https://www.youtube.com/embed/"+SlideType_Choose_2_Video_Id+"?start="+(SlideType_Choose_2_Video_StartTime/1000)+"&end="+(SlideType_Choose_2_Video_EndTime/1000));
				if(SlideType_Choose_2_with_Top_Photo_Question_Display_Flag.toLowerCase()=="yes" || SlideType_Choose_2_with_Top_Photo_Question_Display_Flag.toLowerCase()==""){
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").css("display","block");
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText_WhenHidden").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").css("display","none");
		}
		var minFontSize = 35;
		for(var i=0;i<2;i++){
			var fontSize = "35px";
			var fontSize1=35;
			if((dataOptions[2*i]).length >=28 && (dataOptions[2*i]).length < 40){
				fontSize = "30px";
				fontSize1 = 30;
			}else if((dataOptions[2*i]).length >=40 && (dataOptions[2*i]).length < 50){
				fontSize = "25px";
				fontSize1 = 25;
			}else if((dataOptions[2*i]).length >=50 && (dataOptions[2*i]).length < 60){
				fontSize = "20px";
				fontSize1 = 20;
			}else if((dataOptions[2*i]).length >=60){
				fontSize = "15px";
				fontSize1 = 15;
			}
			
			if(minFontSize > fontSize1){
				minFontSize = fontSize1;
			}
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+i+")").css('font-size',fontSize);
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+i+")").html( replaceVariable(dataOptions[2*i]) );
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div:eq("+i+")").attr("tipText", replaceVariable(dataOptions[2*i+1]) );
		}
		if(SlideType_Choose_2_with_Top_Photo_Question_Type.toLowerCase()=="listenable"){
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").text($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").attr("hintText1"));
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").text($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").attr("hintText2"));
		}
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").click(function(){
			if(SlideType_Choose_2_with_Top_Photo_Question_Type.toLowerCase()=="listenable"){
				playAudio($(this).text(), course_language);
			}else{
				playTapSound();
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div").click(function(){
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				if(SlideType_Choose_2_with_Top_Photo_Answer_Type.toLowerCase()=="listenable"){
					playAudio($(this).find(".SlideType_Choose_2_with_Top_Photo_Text").text(), course_language);
				}else{
					playTapSound();
				}
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div").addClass("SlideType_Choose_2_with_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked");
				
				$(this).addClass("SlideType_Choose_2_with_Top_Photo_Div_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_Div_UnChecked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_TextTD").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_Text").addClass("SlideType_Choose_2_with_Top_Photo_Text_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_Text_UnChecked");
				
			}
		});
		
	});
	

	function checkSlideType_Choose_2_with_Top_Photo_Answer(){
		
		if($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_with_Top_Photo_Answer)){
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Div_Correct").removeClass("SlideType_Choose_2_with_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Correct").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD_Checked").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_Correct").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_Text").removeClass("SlideType_Choose_2_with_Top_Photo_Text_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
					$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				 
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
				var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Div_InCorrect").removeClass("SlideType_Choose_2_with_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_with_Top_Photo_Text_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD_Checked").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_InCorrect");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_with_Top_Photo_Text_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_InCorrect").addClass("SlideType_Choose_2_with_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Div_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked");
				},1000);
				
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked");
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


function SlideType_Choose_2_with_Top_Photo_Function(sectionId,SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_with_Top_Photo_Image_Name,imageFolder){
	
	
	this.checkSlideType_Choose_2_with_Top_Photo_Answer = checkSlideType_Choose_2_with_Top_Photo_Answer;
	var dataOptions = SlideType_Choose_2_with_Top_Photo_option_String.split("*&");
	
	$(function(){
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").html(replaceVariable(SlideType_Choose_2_with_Top_Photo_Question));
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image").attr("src",imageFolder+SlideType_Choose_2_with_Top_Photo_Image_Name.trim().toLowerCase()+".jpg");
		if(SlideType_Choose_2_with_Top_Photo_Question_Display_Flag.toLowerCase()=="yes" || SlideType_Choose_2_with_Top_Photo_Question_Display_Flag.toLowerCase()==""){
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").css("display","block");
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText_WhenHidden").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").css("display","none");
		}
		
		var correctIndex = SlideType_Choose_2_with_Top_Photo_Answer.replace("option","");
		var arrTemp = [];
		while(arrTemp.length < 2){
			var num = getRandomNumber(1,2);
			var flag = 0;
			for(var i=0;i<arrTemp.length;i++){
				if(arrTemp[i] == num){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				arrTemp.push(num);
			}
		}
		
		var minFontSize = 35;
		for(var i=0;i<2;i++){
			var fontSize = "35px";
			var fontSize1=35;
			if((dataOptions[2*i]).length >=28 && (dataOptions[2*i]).length < 40){
				fontSize = "30px";
				fontSize1 = 30;
			}else if((dataOptions[2*i]).length >=40 && (dataOptions[2*i]).length < 50){
				fontSize = "25px";
				fontSize1 = 25;
			}else if((dataOptions[2*i]).length >=50 && (dataOptions[2*i]).length < 60){
				fontSize = "20px";
				fontSize1 = 20;
			}else if((dataOptions[2*i]).length >=60){
				fontSize = "15px";
				fontSize1 = 15;
			}
			
			if(minFontSize > fontSize1){
				minFontSize = fontSize1;
			}
			
			if(correctIndex == i+1){
				SlideType_Choose_2_with_Top_Photo_Answer = "option"+arrTemp[i];
			}
			
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").css("font-size",fontSize);
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("font-size",fontSize);
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").css("line-height","initial");
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("line-height","initial");
		
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").html( replaceVariable(dataOptions[2*i]) );
			if(dataOptions[2*i+1] != ""){
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div:eq("+(arrTemp[i]-1)+")").attr("tipText", replaceVariable(dataOptions[2*i+1]) );
			}
			
		}
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text").each(function(){
			$(this).css("font-size",minFontSize+"px");
		});
		
		if(SlideType_Choose_2_with_Top_Photo_Question_Type.toLowerCase()=="listenable"){
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").text($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").attr("hintText1"));
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").text($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_HintText").attr("hintText2"));
		}
		
		updateInputVariable();
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").each(function(){
			if(SlideType_Choose_2_with_Top_Photo_Question_Type.toLowerCase()=="listenable"){
				TTSWordsArray.push($(this).text());
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_QuestionText").click(function(){
			if(SlideType_Choose_2_with_Top_Photo_Question_Type.toLowerCase()=="listenable"){
				playAudio($(this).text(), course_language);
			}else{
				playTapSound();
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div").click(function(){
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				if(SlideType_Choose_2_with_Top_Photo_Answer_Type.toLowerCase()=="listenable"){
					playAudio($(this).find(".SlideType_Choose_2_with_Top_Photo_Text").text(), course_language);
				}else{
					playTapSound();
				}
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div").addClass("SlideType_Choose_2_with_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked");
				
				$(this).addClass("SlideType_Choose_2_with_Top_Photo_Div_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_Div_UnChecked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_TextTD").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_Text").addClass("SlideType_Choose_2_with_Top_Photo_Text_Checked").removeClass("SlideType_Choose_2_with_Top_Photo_Text_UnChecked");
				
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
		
	});

	function checkSlideType_Choose_2_with_Top_Photo_Answer(){
		
		if($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_with_Top_Photo_Answer)){
				var text = tipPopUpDiv_Title_Correct +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Div_Correct").removeClass("SlideType_Choose_2_with_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Correct").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD_Checked").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_Correct").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked");
				$(this).find(".SlideType_Choose_2_with_Top_Photo_Text").removeClass("SlideType_Choose_2_with_Top_Photo_Text_Checked");
				$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
				$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
				playCorrectSound();
				
				if(correctFlag==1){
					if(!$("#"+sectionId).hasClass("WrongAnswer"));
					$("#"+sectionId).addClass("CorrectAnswer");
					gameCoin=gameCoin+equivalent_positive_coins;
					//userAnswerArray.push(1);
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");
					//correctFlag=1;
				}
				 
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
				var text = tipPopUpDiv_Title_InCorrect +"*&"+ replaceVariable($("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").attr("tipText"));
				$("#bottomBarButton").attr("isDisable","true");
				setTimeout(function(){
					$("#bottomBarButton").attr("isDisable","false");
					showTipPopup(text);
				},500);
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Div_InCorrect").removeClass("SlideType_Choose_2_with_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text_Checked").addClass("SlideType_Choose_2_with_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_with_Top_Photo_Text_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD_Checked").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_InCorrect");
				setTimeout(function(){
					$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Text_InCorrect").removeClass("SlideType_Choose_2_with_Top_Photo_Text_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Div_InCorrect").addClass("SlideType_Choose_2_with_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Div_InCorrect");
					$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_Image_Circle_Checked");
				},1000);
				
				$("#"+sectionId+" .SlideType_Choose_2_with_Top_Photo_TextTD").addClass("SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_with_Top_Photo_TextTD_Checked");
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


function SlideType_Choose_2_without_Top_Photo_Function(sectionId,SlideType_Choose_2_without_Top_Photo_Question,SlideType_Choose_2_without_Top_Photo_option_String,SlideType_Choose_2_without_Top_Photo_Answer,SlideType_Choose_2_without_Top_Photo_Question_Type,SlideType_Choose_2_without_Top_Photo_Question_Display_Flag,SlideType_Choose_2_without_Top_Photo_Answer_Type){
	
	
	this.checkSlideType_Choose_2_without_Top_Photo_Answer = checkSlideType_Choose_2_without_Top_Photo_Answer;
	var dataOptions = SlideType_Choose_2_without_Top_Photo_option_String.split("*&");
	
	$(function(){
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_QuestionText").html(replaceVariable(SlideType_Choose_2_without_Top_Photo_Question));
		
		if(SlideType_Choose_2_without_Top_Photo_Question_Display_Flag.toLowerCase()=="yes" || SlideType_Choose_2_without_Top_Photo_Question_Display_Flag.toLowerCase()==""){
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").css("display","block");
		}else{
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_QuestionText_WhenHidden").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").css("display","none");
		}
		
		var correctIndex = SlideType_Choose_2_without_Top_Photo_Answer.replace("option","");
		var arrTemp = [];
		while(arrTemp.length < 2){
			var num = getRandomNumber(1,2);
			var flag = 0;
			for(var i=0;i<arrTemp.length;i++){
				if(arrTemp[i] == num){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				arrTemp.push(num);
			}
		}
		
		var minFontSize = 35;
		for(var i=0;i<2;i++){
			var fontSize = "35px";
			var fontSize1=35;
			if((dataOptions[2*i]).length >=28 && (dataOptions[2*i]).length < 40){
				fontSize = "30px";
				fontSize1 = 30;
			}else if((dataOptions[2*i]).length >=40 && (dataOptions[2*i]).length < 50){
				fontSize = "25px";
				fontSize1 = 25;
			}else if((dataOptions[2*i]).length >=50 && (dataOptions[2*i]).length < 60){
				fontSize = "20px";
				fontSize1 = 20;
			}else if((dataOptions[2*i]).length >=60){
				fontSize = "15px";
				fontSize1 = 15;
			}
			
			if(minFontSize > fontSize1){
				minFontSize = fontSize1;
			}
			
			if(correctIndex == i+1){
				SlideType_Choose_2_without_Top_Photo_Answer = "option"+arrTemp[i];
			}
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").css("font-size",fontSize);
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("font-size",fontSize);
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").css("line-height","initial");
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").find( "span" ).css("line-height","initial");
		
			
			$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text:eq("+(arrTemp[i]-1)+")").html( replaceVariable(dataOptions[2*i]) );
			if(dataOptions[2*i+1]!=""){
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div:eq("+(arrTemp[i]-1)+")").attr("tipText", replaceVariable(dataOptions[2*i+1]) );
			}
		}
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text").each(function(){
			$(this).css("font-size",minFontSize+"px");
		});
		
		if(SlideType_Choose_2_without_Top_Photo_Question_Type.toLowerCase().trim()=="listenable"){
			$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").css("display","block");
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").attr("hintText1"));
		}else{
			$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").css("display","none");
			$("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").text($("#"+sectionId+" .SlideType_Choose_2_without_Image_HintText").attr("hintText2"));
		}
		
//		$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").click(function(){
//			playAudio($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_QuestionText").text(), course_language);
//		});
		
		updateInputVariable();
		$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").each(function(){
			TTSWordsArray.push($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_title").text());
		});
		
		$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_Listen_QuestionText").click(function(){
			playAudio($(this).attr('textToPlay'), course_language);
		});
		
		$("#"+sectionId+" #SlideType_Choose_2_without_Top_Photo_QuestionText").each(function(){
			if(SlideType_Choose_2_without_Top_Photo_Question_Type.toLowerCase()=="listenable"){
				TTSWordsArray.push($(this).text());
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_QuestionText").click(function(){
			if(SlideType_Choose_2_without_Top_Photo_Question_Type.toLowerCase()=="listenable"){
				playAudio($(this).text(), course_language);
			}else{
				playTapSound();
			}
		});
		
		$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").click(function(){
			if($("#bottomBarButton").attr("continue")!=$("#bottomBarButton").val()){
				$("#disableBottomBarButton").css("display","none");
				$("#bottomBarButton").addClass("checkButtonAnimation");
				if(SlideType_Choose_2_without_Top_Photo_Answer_Type.toLowerCase()=="listenable"){
					playAudio($(this).find(".SlideType_Choose_2_without_Top_Photo_Text").text(), course_language);
				}else{
					playTapSound();
				}
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div").addClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked");
				$("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Text").removeClass("SlideType_Choose_2_without_Top_Photo_Text_Checked").addClass("SlideType_Choose_2_without_Top_Photo_Text_UnChecked");
				
				$(this).addClass("SlideType_Choose_2_without_Top_Photo_Div_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Div_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Image_Circle").addClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_TextTD").addClass("SlideType_Choose_2_without_Top_Photo_TextTD_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked");
				$(this).find(".SlideType_Choose_2_without_Top_Photo_Text").addClass("SlideType_Choose_2_without_Top_Photo_Text_Checked").removeClass("SlideType_Choose_2_without_Top_Photo_Text_UnChecked");
				
				if(isInitialTest == "true"){
					$("#bottomBarButton").click();
					setTimeout(function(){
						bottomBarButtonClicked();
					},800);
				}
			}
		});
		
	});

	function checkSlideType_Choose_2_without_Top_Photo_Answer(){
		
		if($("#"+sectionId+" .SlideType_Choose_2_without_Top_Photo_Div_Checked").hasClass(SlideType_Choose_2_without_Top_Photo_Answer)){
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
					if(isInLessonTest == "false" && isInitialTest == "false"){
						showAwardCoinInLesson();
					}
				}else{
					if(!$("#"+sectionId).hasClass("CorrectAnswer"));
					$("#"+sectionId).addClass("WrongAnswer");	
					//correctFlag=1;
				}
				 
				//$("#bottomBarButton").removeClass("checkButtonAnimation");
		}else{
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

function SlideType_Listen_Box_Function(sectionId,SlideType_Listen_Box_String,SlideType_Listen_Box_Title_Text){
	
	$("#"+sectionId+" .titleText").html(replaceVariable(SlideType_Listen_Box_Title_Text));
	
	var dataString = SlideType_Listen_Box_String.split("*&");
	
	for(var i=0;i<dataString.length/2;i++){
		$("#"+sectionId+" #listenTable").append("" +
				'<tr class="speakWord" style="background: #ccc;cursor:pointer;margin-bottom:20px;">'+
				'<td class="speakWordText" style="width:550px;font-size:20px;text-align: center;border-radius: 10px 0px 0px 10px;height:60px;">'+replaceVariable(dataString[2*i])+'</td>'+
				'<td style="width:50px;text-align: center;border-radius: 0px 10px 10px 0px;"><img style="display: table-cell;vertical-align: baseline !important;" src="../../../InteractiveLessons/img/soundIconWhite_2.png" /></td>'+
				'</tr>'+
				'<tr>'+
				'<td class="SlideType_Listen_Box_TranslationDiv" style="width:550px;font-size:20px;text-align: center;border-radius: 10px 0px 0px 10px;">'+replaceVariable(dataString[2*i+1])+'</td>'+
				'</tr>'+
		"");
	}
	
	updateInputVariable();
	$("#"+sectionId+" .speakWord").each(function(){
		TTSWordsArray.push($(this).text());
	});
	
	$("#"+sectionId+" .speakWord").click(function(){
		var _this  = this;
		playAudio($(this).find(".speakWordText").text(),course_language);
		$(_this).next().find(".SlideType_Listen_Box_TranslationDiv").css("opacity","1");
		setTimeout(function(){
			$(_this).next().find(".SlideType_Listen_Box_TranslationDiv").css("opacity","0");
		},5000);
		
	});
	
}

function SlideType_Special_Slide_Function(sectionId,SlideType_Special_Slide_Data){
	
	var dataString = SlideType_Special_Slide_Data.replace(/["]/g,"").split("*&");
	
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
	
	$("#"+sectionId+" .SlideType_Special_Slide_Inner_Container table td").click(function(){
		if($(this).attr("islistenable").toLowerCase() == "true"){
			playAudio($(this).text(),course_language);
		}
	});
	
}

function SlideType_Last_Slide_Function(sectionId,SlideType_Last_Slide_Title_Text,SlideType_Last_Slide_String){
	
	$("#"+sectionId+" .titleText").html(replaceVariable(SlideType_Last_Slide_Title_Text));
	$("#"+sectionId+" .lastSlideText").html(replaceVariable(SlideType_Last_Slide_String));
	
}

//function storeData(maxCoins,gameCoin){
//	$(".endScoreTable").each(function() {
//		$(".coinsWon").text(gameCoin);
//		$(".lastScore").text(coins);
//		$(".maxCoins").text("à¤‡à¤¸ game à¤®à¥‡à¤‚ à¤†à¤ª "+maxCoins+" coins à¤¤à¤• à¤œà¥€à¤¤ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚!");
//		var improvedScore=0;
//		if(parseInt(gameCoin)>parseInt(coins))
//			{
//				improvedScore=parseInt(gameCoin)-parseInt(coins);
//			}
//		$(".improvedScore").text(improvedScore);
//		});
//}

//translation code using azure
function doTranslation(t) {
}
//function initAzure() {
//	$.ajax({
//		url: 'initializeAzureTranslatorAPIWithoutLogin.action',
//		dataType: 'json',
//		success: function(result) {
//			azure = result['access_token'];
//			// Azure expires in 10 minute, so renew before 10 min.
//			setTimeout(initAzure, 1000*60*9);
//		},
//		error: function(jqXHR, errorText, errorThrown) {
//	}});
//}
//
//function jsonpCallback(a, d) {
//	var c = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
//	if(window.hasOwnProperty(c) == false) {
//		window[c] = function(t) {	
//			saveLessonParameter(d.key,t);
//			delete window[c];
//		};
//		return c;
//	} else {
//		return jsonpCallback(a, d);
//	}
//}
//
//
//function doAzureTranslation(o, ml, tl, ir,key) {
//	var f = azureLangCode(ml), to = azureLangCode(tl), t = o;
//	if(t=='') { return; }
//	var c = jsonpCallback(doTranslation, {o: o,f: ml,to: tl,r: ir,key:key});
//	$.ajax({
//		url: '//api.microsofttranslator.com/V2/Ajax.svc/Translate',
//		data: {
//			appid: 'Bearer ' + azure,
//			to: to,
//			from: f,
//			text: t,
//			contentType: 'text/html'
//		},
//		dataType: 'jsonp',
//		jsonp: 'oncomplete',
//		jsonpCallback: c,
//		error: function(a, b, c) {
//			console.log("Unable to start azure");
//		}
//	});
//}
//
//function azureLangCode(l) {
//	l = l.toLowerCase();
//	if(l == 'spanish') {
//		return 'es';
//	} else if(l.indexOf('chinese') > -1 || l.indexOf('mandarin') > -1) {
//		return 'zh-CHS';
//	} else if(l == 'hindi') {
//		return 'hi';
//	} else if(l == 'japanese') {
//		return 'ja';
//	}else if(l == 'portuguese') {
//		return 'pt';
//	} else {
//		return 'en';
//	}
//}
//
//
