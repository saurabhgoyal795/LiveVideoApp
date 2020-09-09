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
var fromLangauge = "hindi";
var slideCount=0;
var currentQuestionNumber = 0;
var setWiseQuestionCounter =0;
var testSetQuestionCount = 3;
var totalTestQuestion = 15;
var testDataObject;
var testDataArray;
var testId;
var grammarCounter = 0;
var vocabCounter = 0;
var listeningCounter=0;
var readingCounter=0;
var writingCounter=0;
var isNewSection=true;
var sectionCounter=1;


var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
//Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
//At least Safari 3+: "[object HTMLElemesntConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
var soundmanagerReadyFlag =0 ;
var playSlideSoundOnceFlag = 0;
var setTimeoutForJellySlide;
var tipPopUpDiv_Title_Correct = "Great Job";
var tipPopUpDiv_Title_InCorrect = "try Again";
var courseId = 0;
var nativeCourseId = 0;
var learningLanguageId = 0;
var setTimeOutVar = null;
var TTSWordsArray = [];
var userAnswerArray = [];
var initialTestScorePerBundle = [0,0,0,0];
var initialTestSlideCounter = 0;
var soundWords ={"are":"r","au": "A U","car": "kaar","maintain":"mentain","facility":"fesility","punjab": "panjab","ltd": "limited"};
var initialTestRecLevel = 1;
var defaultLocale = "en-IN";
var isFirstSlide = true;
var isTestCompleted=false;

$(function(){

	// SoundManager Setup
	soundManager.setup({
		  url: '../../../SoundManager/swf/',
		  preferFlash: false,debugMode:false,
		  onready: function() {
			  soundmanagerReadyFlag = 1;
				soundManager.createSound({
					id : 'coin_correctsound',
					url : '../../../InteractiveLessons/sounds/coins.mp3'
				});
				soundManager.load('coin_correctsound');
				
				soundManager.createSound({
					id : 'coin_incorrectsound',
					url : '../../../InteractiveLessons/sounds/wrong_answer.mp3'
				});
				soundManager.load('coin_incorrectsound');
				
				soundManager.createSound({
					id : 'slide_transition',
					url : '../../../InteractiveLessons/sounds/slide_transition.mp3'
				});
				soundManager.load('slide_transition');
				
				soundManager.createSound({
					id : 'tap_sound',
					url : '../../../InteractiveLessons/sounds/popup_sound.mp3'
				});
				soundManager.load('tap_sound');
				
		  }
	});
	
	// Prevent onclick on tipPopupDiv so that it prevent click on elements below it. 
	$("#tipPopUpDiv").click(function(evt){
		evt.preventDefault();
		evt.stopPropagation();
	});
	
	// Keyboard Input function
	$("body").keyup(function(e) {
		
		if($("#tipPopUpDiv").css("display") == "block"){
			return;
		}
		
		// If user Press Enter on any slide except Input slide type, it check for the answer by calling onclick of bottomBar Button
//		if (e.keyCode == 13) {
//			if($("#disableBottomBarButton").css("display")=="none"){
//				if(!$(".slides .present").hasClass("slideType_Input")){
//					$( "#bottomBarButton").click();
//				}
//			}
//		}
		
		// for choose 4, choose 2, user can select option by clicking number keys- 1,2,3,4
		if(e.keyCode == 49){
			if($(".slides .present").hasClass("SlideType_Choose_4_without_Image") || $(".slides .present").hasClass("SlideType_Choose_4_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_without_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo") || $(".slides .present").hasClass("SlideType_Choose_2_without_Top_Photo") ){
				$(".slides .present .option1").click();
			}
		}else if(e.keyCode == 50){
			if($(".slides .present").hasClass("SlideType_Choose_4_without_Image") || $(".slides .present").hasClass("SlideType_Choose_4_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_without_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo") || $(".slides .present").hasClass("SlideType_Choose_2_without_Top_Photo") ){
				$(".slides .present .option2").click();
			}
		}else if(e.keyCode == 51){
			if($(".slides .present").hasClass("SlideType_Choose_4_without_Image") || $(".slides .present").hasClass("SlideType_Choose_4_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_without_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo") || $(".slides .present").hasClass("SlideType_Choose_2_without_Top_Photo") ){
				$(".slides .present .option3").click();
			}
		}else if(e.keyCode == 52){
			if($(".slides .present").hasClass("SlideType_Choose_4_without_Image") || $(".slides .present").hasClass("SlideType_Choose_4_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_without_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Image") || $(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo") || $(".slides .present").hasClass("SlideType_Choose_2_without_Top_Photo") ){
				$(".slides .present .option4").click();
			}
		}
	});
	
		//initializing azure
//		initAzure();
		
		$("#typingQuizPopup, #quizPopup, #translationPopup, #underlinedReplacementPopup , .white-screen-1").click(function(evt){
			evt.stopPropagation();
		});
		
		$(".listenTranslatedWordForFacebook").click(function(){
			playAudio($(".WordInPopUpForFacebook").text(),course_language);
		});
	
	$("body").click(function(){
		//hideTipPoup();
	});
	
	setTimeout(function(){
		updateInputVariable();
	},2000);
	
	$(".slideType_Input .monsterBarNotification").css("visibility","hidden");
	$("#bottomBarButton").attr("continue","NEXT");
	$("#bottomBarButton").attr("check","NEXT");
	
	for(var i=0;i<TTSWordsArray.length;i++){
		loadAudio(TTSWordsArray[i],i+1);
	}
});	

function bottomBarButtonClicked(){
	console.log("in bottomBarButtonClicked");
	if($(this).attr("isDisable") == "true"){return;}
	if(isInitialTest){
		if(correctFlag == 1){
			userAnswerArray.push(1);
		}else{
			userAnswerArray.push(2);
		}
		correctFlag = 1;
		var nextSlide = parseInt($(Reveal.getCurrentSlide()).attr("slideNumber"),10);
		//console.log("nextSlide: "+nextSlide);
		var bundleNo = 0;
		var bundleIndex = userAnswerArray.length/10;
		if(userAnswerArray.length%10 == 0){
			var score = 0;
			for(var i=(bundleIndex-1)*10;i<userAnswerArray.length;i++){
				if(userAnswerArray[i]==1){
					score++;
				}
			}
			bundleNo = initialTestScorePerBundle[bundleIndex-1];
			//console.log("bundleNo: "+bundleNo);
			if(bundleNo != -1){
				if(score > 6){
					nextSlide =  initialTestOutCondition[bundleNo][2]*10 + 1;
					initialTestScorePerBundle[bundleIndex] = initialTestOutCondition[bundleNo][2];
					if(initialTestOutCondition[bundleNo][2] == -1){
						initialTestRecLevel = parseInt(initialTestOutCondition[bundleNo][1])+1;
					}else{
						initialTestRecLevel = initialTestOutCondition[initialTestOutCondition[bundleNo][2]][0];
					}
				}else{
					nextSlide =  initialTestOutCondition[bundleNo][3]*10 + 1;
					initialTestScorePerBundle[bundleIndex] = initialTestOutCondition[bundleNo][3];
					if(initialTestOutCondition[bundleNo][3] == -1){
						initialTestRecLevel = initialTestOutCondition[bundleNo][0];
					}else{
						initialTestRecLevel = initialTestOutCondition[initialTestOutCondition[bundleNo][3]][0];
					}
				}
			}else{
				
			}
			
		}
		//console.log("nextSlide: "+nextSlide);
		//console.log("initialTestRecLevel: "+initialTestRecLevel);
		//console.log("userAnswerArray length: "+userAnswerArray.length);
		setTimeout(function(){
			if(initialTestScorePerBundle[bundleIndex] != -1){
				Reveal.slide(nextSlide);
			}else{
				Reveal.slide(71);
			}
//			playSlideTransitionSound();
//			callOnNextSlide();
		},1000);
	}else{
		//Reveal.navigateNext();
	}
}

function playCorrectSound(){
	soundManager.play('coin_correctsound');
}

function playInCorrectSound(){
	soundManager.play('coin_incorrectsound');
}
function playSlideTransitionSound(){
	soundManager.play('slide_transition');
}

function playTapSound(){
	soundManager.play('tap_sound');
}


//This functions is called from everywhere ,to play TTS  
function playAudio(text, language) {
	console.log("in playAudio");
	//console.log("play: "+text);
	text = text.toLowerCase().trim();
	temx = removeSpecialCharacter(text);
	text = text.replace("%","percent1");
	var processedText = decodeURI(text);
	processedText = processedText.replace("percent1","%");
	if(processedText in soundWords){
		processedText = soundWords[processedText];
	}
	stopAllAudio();
	var found = false;
	$(".audio").each(function(){
		if( removeSpecialCharacter($(this).attr("text").replace(/\s+/g, '')) == processedText.toLowerCase().trim().replace(/\s+/g, '')){
			if($(this)[0].duration > 0){
				$(this)[0].play();
			}else{
				$(this)[0].load();
				$(this)[0].play();
			}
			found = true;
			return false;
		}
	});
	if(!found){
		text=text.toLowerCase().trim();
		text=text.replace("%","percent1");
		var processedText = decodeURI(text);
		processedText = processedText.replace("percent1","%");
		var number = $('.audioDiv').children().size();
		$(".audioDiv").append('<audio class="audio audio'+number+'" text="'+processedText.toLowerCase().trim()+'" style="display:none;"><source class="source source'+number+'" src="" type="audio/mp3"></source></audio>');
		
		var x = $('.audio'+number)[0];
		var source = $('.source'+number);
		source.attr("src",'http://sound.culturealley.com/file/'+window.parent.defaultLocale+'/'+processedText);
		x.load();
		x.play();
	}
	
//	var x = document.getElementById("audio"); 
//	var source = document.getElementById("mp3_src");
// source.src='http://voice.helloenglish.com/file/'+processedText;
// x.load();
//	x.play();
	
//	var translatedWordlanguage = bcp47CodeForLanguage(language);
//	var mySoundObject = soundManager.createSound({
////		url: "//mail.culturealley.com/ttsCultureAlley.php?tl="+translatedWordlanguage+"&q="+encodeURIComponent(processedText);
//		url: "http://192.168.1.4:3000/file/"+encodeURIComponent(processedText),
//		autoLoad: true,
//		autoPlay: true,
//		onload: function() {
//			alert('The sound '+this.id+' loaded!');
//		}
//	});
	
}

function loadAudio(text,number){
	console.log("in loadAudio");
	text=text.trim();
	text=text.replace("%","percent1");
	var processedText = decodeURI(text);
	processedText = processedText.replace("percent1","%");
	
	$(".audioDiv").append('<audio class="audio audio'+number+'" text="'+processedText.toLowerCase().trim()+'" style="display:none;"><source class="source source'+number+'" src="" type="audio/mp3"></source></audio>');
	
	var x = $('.audio'+number)[0];
	var source = $('.source'+number);
//	source.attr("src",'http://voice.helloenglish.com/file/'+window.parent.defaultLocale+'/'+processedText);
	source.attr("src",'https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text='+processedText+'&locale='+window.parent.defaultLocale);
	x.load();
}

function stopAllAudio(){
	$.each($('audio'), function () {
		//this.currentTime = 0;
	    this.pause();
	});
}

//To hide translation Blue popup
function closepopUpHighlightDiv() {
	
	if($( "#translationPopup" ).css("display")=="block") {
		$( "#translationPopup" ).css("display","none");
	}
	
}

//Remove All Special Characters to match strings
function removeSpecialCharacter(m){
	var meaning = m ; 
	meaning = meaning.replace(/[!-.,;Â¡Â¿?'"ã€Œã€�â€™]/g, '');
	meaning = meaning.replace(/[â€˜â€™â€œâ€�''""â€™'ã€Œ ã€� â€’ â€“ â€” â€• â€� -]/g, '');
	meaning = meaning.replace(/\//g, '');
	meaning = meaning.replace(/[Ã¡Ä�ÇŽÃ Ä€Ã�Ç�Ã€]/g,'a');
	meaning = meaning.replace(/[Ã©Ä“Ä›Ã¨Ä’Ã‰ÄšÃˆ]/g,'e');
	meaning = meaning.replace(/[Ã­Ã­Ä«Ã­Ç�Ã¬ÄªÃ�Ç�ÃŒ]/g,'i');
	meaning = meaning.replace(/[Ã³Å�Ã³Ç’Ã²ÅŒÃ“Ç‘Ã’]/g,'o');
	meaning = meaning.replace(/[ÃºÃ¼Å«ÃºÇ”Ã¹Ç–Ç˜ÇšÇœÅªÃšÇ“Ã™Ç•Ç—Ç™Ãœ]/g,'u');
	meaning = meaning.replace(/[Ã±Ã±Ã±Ã±]/g,'n');
	meaning = meaning.replace(/[Ã¼]/g,'u');
	meaning = meaning.replace(/^\s+|\s+$/g,'');
	
	return meaning;
}


function bcp47CodeForLanguage(lang) {
	if(lang.trim().toLowerCase() == 'english' ||
			lang.trim().toLowerCase() == 'english - british') {
		return 'en-US';
		
	} else if(lang.trim().toLowerCase() == 'mandarin' ||
			lang.trim().toLowerCase() == 'chinese') {
		return 'zh-CN';
	} else if(lang.trim().toLowerCase() == 'spanish') {
		return 'es-ES';
	} else if(lang.trim().toLowerCase() == 'japanese') {
		return 'ja-JP';
	} else if(lang.trim().toLowerCase() == 'portuguese') {
		return 'pt-PT';
	} else if(lang.trim().toLowerCase() == 'hindi') {
		return 'hi-IN';
	} else if(lang.trim().toLowerCase() == 'gujarati') {
		return 'gu-IN';
	} else if(lang.trim().toLowerCase() == 'punjabi') {
		return 'pa-IN';
	} else if(lang.trim().toLowerCase() == 'english - american') {
		return 'en-US';
	}
}
/*END Slide Type 3*/

function updateInputName(name){
	$(".mynameClass").text(myName).attr("mainword",myName).attr("nativeword",myName);
}

function updateInputFriendName(name){
	$(".myfriendnameClass").text(name).attr("mainword",name).attr("nativeword",name);
}

function updateInputCountryName(countryName){
	$(".mycountryClass").text(countryName).attr("mainword",countryName).attr("nativeword",countryName);
}

function updateInputPhoneNumber(phoneNumber){
	$(".myphonenumberClass").text(phoneNumber).attr("mainword",phoneNumber).attr("nativeword",phoneNumber);
}

function updateInputMyEmail(email){
	$(".myemailClass").text(email).attr("mainword",email).attr("nativeword",email);
}

function updateInputVariable(){
	
	$(".mynameClass").text(" "+myName+" ").attr("mainword",myName).attr("nativeword",myName);
	$(".myfriendnameClass").text(" "+myFriendName+" ").attr("mainword",myFriendName).attr("nativeword",myFriendName);
	$(".mycountryClass").text(" "+myCountryName+" ").attr("mainword",myCountryName).attr("nativeword",myCountryName);
	$(".myphonenumberClass").text(" "+myPhoneNumber+" ").attr("mainword",myPhoneNumber).attr("nativeword",myPhoneNumber);
	$(".myemailClass").text(" "+myEmail+" ").attr("mainword",myEmail).attr("nativeword",myEmail);
	
}

function isChar(str) {
	  return /^[a-zA-Z]+$/.test(str);
	}

function replaceVariable(dataString){
	if(dataString!="" && dataString!=undefined && dataString!=null){
		
		while(dataString.toLowerCase().indexOf("<name>") > -1){
			dataString = dataString.replace("<name>", "<span class='mynameClass variableClassForUrdu'></span>");
			dataString = dataString.replace("<NAME>", "<span class='mynameClass variableClassForUrdu'></span>");
//			dataString = "<span>" + dataString.substr(0,dataString.indexOf("<name>")) + "</span>"+
//			"<name>" + "<span>" + dataString.substr(dataString.indexOf("<name>")+6,dataString.length-1) + "</span>";
		}
		while(dataString.toLowerCase().indexOf("<friend-name>") > -1){
			dataString = dataString.replace("<friend-name>", "<span class='myfriendnameClass variableClassForUrdu'></span>");
			dataString = dataString.replace("<FRIEND-NAME>", "<span class='myfriendnameClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<country-name>") > -1){
			dataString=dataString.replace("<country-name>", "<span class='mycountryClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<COUNTRY-NAME>", "<span class='mycountryClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<email-address>") > -1){
			dataString=dataString.replace("<email-address>", "<span class='myemailClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<EMAIL-ADDRESS>", "<span class='myemailClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<phone-number>") > -1){
			dataString=dataString.replace("<phone-number>", "<span class='myphonenumberClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<PHONE-NUMBER>", "<span class='myphonenumberClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<profession>") > -1){
			dataString=dataString.replace("<profession>", "<span class='professionClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<PROFESSION>", "<span class='professionClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<profession-native>") > -1){
			dataString=dataString.replace("<profession-native>", "<span class='professionNativeClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<PROFESSION-NATIVE>", "<span class='professionNativeClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<profession-article>") > -1){
			dataString=dataString.replace("<profession-article>", "<span class='professionArticleClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<PROFESSION-ARTICLE>", "<span class='professionArticleClass variableClassForUrdu'></span>");
		}
		while(dataString.toLowerCase().indexOf("<profession-article-wrong>") > -1){
			dataString=dataString.replace("<profession-article-wrong>", "<span class='professionArticleWrongClass variableClassForUrdu'></span>");
			dataString=dataString.replace("<PROFESSION-ARTICLE-WRONG>", "<span class='professionArticleWrongClass variableClassForUrdu'></span>");
		}
	}
	dataString = "<span>"+dataString+"</span>";
	return dataString;
	
}

function replaceVariableInString(dataString){
	
	while(dataString.toLowerCase().indexOf("<name>") > -1){
		dataString= dataString.replace("<name>", myName);
		dataString= dataString.replace("<NAME>", myName);
	}
	while(dataString.toLowerCase().indexOf("<friend-name>") > -1){
		dataString = dataString.replace("<friend-name>", myFriendName);
		dataString = dataString.replace("<FRIEND-NAME>", myFriendName);
	}
	while(dataString.toLowerCase().indexOf("<country-name>") > -1){
		dataString=dataString.replace("<country-name>", myCountryName);
		dataString=dataString.replace("<COUNTRY-NAME>", myCountryName);
	}
	while(dataString.toLowerCase().indexOf("<email-address>") > -1){
		dataString=dataString.replace("<email-address>", myEmail);
		dataString=dataString.replace("<EMAIL-ADDRESS>", myEmail);
	}
	while(dataString.toLowerCase().indexOf("<phone-number>") > -1){
		dataString=dataString.replace("<phone-number>", myPhoneNumber);
		dataString=dataString.replace("<PHONE-NUMBER>", myPhoneNumber);
	}
	while(dataString.toLowerCase().indexOf("<profession>") > -1){
		dataString=dataString.replace("<profession>", profession);
		dataString=dataString.replace("<PROFESSION>", profession);
	}
	while(dataString.toLowerCase().indexOf("<profession-native>") > -1){
		dataString=dataString.replace("<profession-native>", professionNative);
		dataString=dataString.replace("<PROFESSION-NATIVE>", professionNative);
	}
	while(dataString.toLowerCase().indexOf("<profession-article>") > -1){
		dataString=dataString.replace("<profession-article>", professionArticle);
		dataString=dataString.replace("<PROFESSION-ARTICLE>", professionArticle);
	}
	while(dataString.toLowerCase().indexOf("<profession-article-wrong>") > -1){
		dataString=dataString.replace("<profession-article-wrong>", professionArticleWrong);
		dataString=dataString.replace("<PROFESSION-ARTICLE-WRONG>", professionArticleWrong);
	}
	
	return dataString;
	
}

function updateJumbleAnswerString(dataString){
	while(dataString.indexOf("<name>") > -1){
		dataString= dataString.replace("<name>", myName);
	}
	while(dataString.indexOf("<friend-name>") > -1){
		dataString = dataString.replace("<friend-name>", myFriendName);
	}
	while(dataString.indexOf("<country-name>") > -1){
		dataString=dataString.replace("<country-name>", myCountryName);
	}
	while(dataString.indexOf("<email-address>") > -1){
		dataString=dataString.replace("<email-address>", myEmail);
	}
	while(dataString.indexOf("<phone-number>") > -1){
		dataString=dataString.replace("<phone-number>", myPhoneNumber);
	}
	
	while(dataString.toLowerCase().indexOf("<profession>") > -1){
		dataString=dataString.replace("<profession>", profession);
	}
	while(dataString.toLowerCase().indexOf("<profession-native>") > -1){
		dataString=dataString.replace("<profession-native>", professionNative);
	}
	while(dataString.toLowerCase().indexOf("<profession-article>") > -1){
		dataString=dataString.replace("<profession-article>", professionArticle);
	}
	while(dataString.toLowerCase().indexOf("<profession-article-wrong>") > -1){
		dataString=dataString.replace("<profession-article-wrong>", professionArticleWrong);
	}
	
	return dataString;
}

function showTipPopup(string){
	if(string.indexOf("undefined") > -1 || string == "" || string.indexOf("<span></span>") > -1
			|| isInLessonTest == "true" || isInitialTest == "true"){
		return;
	}
	var data = string.split("*&");
	if(data[0].toLowerCase()=="try again"){
		$("#tipPopUpDiv").css("background","#FE5C57");
	}else{
		$("#tipPopUpDiv").css("background","#49C9AF");
	}
	$(".tipPopUpDiv_Title").html(data[0]);
	$(".tipPopUpDiv_Tip_Text").html(replaceVariable(data[1]));
	
	$("#tipPopUpDiv").removeClass("tipPopUpBounceOutDown").addClass("tipPopUpBounceInUp").css("display","block");
	
	if(language.toLowerCase().indexOf("urdu") > -1){		
		setTimeout(function(){
			$("#tipPopUpDiv div").each(function(){
				var html = $(this).html();
				$(this).find("br").remove();
				var text = $(this).text().trim();
				if($(this).children().length > 0){return true;}
				if(true){
					if(text!="" && text!=undefined && text!=null){
						text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g, '');
						text = text.replace(/\//g, '');
						text = text.replace(/^\s+|\s+$/g, '');
						text = text.replace(/ /g,'');
						text = text.replace(" ","");
						
						var flag = 0;
						for(var i=0;i<text.length;i++){
							if(!text.charAt(i).toLowerCase().match(/[a-z0-9]/i)){
								flag = 1;
								break;
							}
						}
						//if(!$(this).val().toLowerCase().match(/[a-z]/i) || $(this).val()==""){
						if(flag == 1){
							$(this).attr("dir","rtl");
						}
					}
				}
				$(this).html(html);
				
			});
			
			$("#tipPopUpDiv span").each(function(){
				var html = $(this).html();
				$(this).find("br").remove();
				var text = $(this).text().trim();
				if($(this).children().length > 0){return true;}
				if(true){
					if(text!="" && text!=undefined && text!=null){
						text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g, '');
						text = text.replace(/\//g, '');
						text = text.replace(/^\s+|\s+$/g, '');
						text = text.replace(/ /g,'');
						text = text.replace(" ","");
						
						var flag = 0;
						for(var i=0;i<text.length;i++){
							if(!text.charAt(i).toLowerCase().match(/[a-z0-9]/i)){
								flag = 1;
								break;
							}
						}
						//if(!$(this).val().toLowerCase().match(/[a-z]/i) || $(this).val()==""){
						if(flag == 1){
							$(this).parent().attr("dir","rtl");
						}
					}
				}
				$(this).html(html);
			});

		},10);
	}
}

function setRTLForUrduInJellySlide(){
	
	if(language.toLowerCase().indexOf("urdu") > -1 || language.toLowerCase().indexOf("punjabi_shahmukhi") > -1
			|| language.toLowerCase().indexOf("arabic") > -1){		
		setTimeout(function(){
			$("#tipPopUpDiv div").each(function(){
				var html = $(this).html();
				$(this).find("br").remove();
				var text = $(this).text().trim();
				if($(this).children().length > 0){return true;}
				if(true){
					if(text!="" && text!=undefined && text!=null){
						text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g, '');
						text = text.replace(/\//g, '');
						text = text.replace(/^\s+|\s+$/g, '');
						text = text.replace(/ /g,'');
						text = text.replace(" ","");
						
						var flag = 0;
						for(var i=0;i<text.length;i++){
							if(!text.charAt(i).toLowerCase().match(/[a-z0-9]/i)){
								flag = 1;
								break;
							}
						}
						//if(!$(this).val().toLowerCase().match(/[a-z]/i) || $(this).val()==""){
						if(flag == 1){
							$(this).attr("dir","rtl");
						}
					}
				}
				$(this).html(html);
				
			});
			
			$("#tipPopUpDiv span").each(function(){
				var html = $(this).html();
				$(this).find("br").remove();
				var text = $(this).text().trim();
				if($(this).children().length > 0){return true;}
				if(true){
					if(text!="" && text!=undefined && text!=null){
						text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g, '');
						text = text.replace(/\//g, '');
						text = text.replace(/^\s+|\s+$/g, '');
						text = text.replace(/ /g,'');
						text = text.replace(" ","");
						
						var flag = 0;
						for(var i=0;i<text.length;i++){
							if(!text.charAt(i).toLowerCase().match(/[a-z0-9]/i)){
								flag = 1;
								break;
							}
						}
						//if(!$(this).val().toLowerCase().match(/[a-z]/i) || $(this).val()==""){
						if(flag == 1){
							$(this).parent().attr("dir","rtl");
						}
					}
				}
				$(this).html(html);
			});

		},10);
	}
	
	
}

function hideTipPoup(){
	$("#tipPopUpDiv").removeClass("tipPopUpBounceInUp").addClass("tipPopUpBounceOutDown");
	setTimeout(function(){
		$("#tipPopUpDiv").css("display","none");
	},1000);
	if($(".slides .present").hasClass("SlideType_Jelly")){
		openNextJellyPopupAfter3Sec();
	}
	
}
function openNextJellyPopup(){
	if($("#translationPopup").css("display")=="block"){
		$(".slides .present .nextPopup:eq(0)").click();
		return;
	}
}

function openNextJellyPopupAfter3Sec(){
	if($("#tipPopUpDiv").hasClass("tipPopUpBounceOutDown")){
		setTimeoutForJellySlide = setTimeout(function(){
			if($("#translationPopup").css("display")=="block"){
				$(".slides .present .nextPopup:eq(0)").click();
			}
		},10000);
		
	}
}

function callOnNextSlide(){
	
	if(!isFirstSlide){
		if(correctFlag == 1){
			userAnswerArray.push(1);
		}else{
			userAnswerArray.push(2);
		}
	}else{
		isFirstSlide = false;
	}
	correctFlag = 1;
	
	stopAllAudio();
	
	if($(".slides .present").hasClass("SlideType_Jelly")){
		$(".slides .present .listenSentence").click();
	}
	
	if($(".slides .present").hasClass("SlideType_Choose_4_with_Image")){
			$(".slides .present .SlideType_Choose_4_with_Image_ImageText").each(function(){
				if($(this).height() > 50){
					$(this).addClass("SlideType_Choose_4_with_Image_ImageText_LineHeight");
				}
			});
			$(".slides .present .SlideType_Choose_4_with_Image_ImageDiv").removeClass("animated tada_slow");
			
			$(".slides .present .SlideType_Choose_4_with_Image_ImageDiv:eq(0)").addClass("animated tada_slow");
			setTimeout(function(){
				$(".slides .present .SlideType_Choose_4_with_Image_ImageDiv:eq(1)").addClass("animated tada_slow");
				setTimeout(function(){
					$(".slides .present .SlideType_Choose_4_with_Image_ImageDiv:eq(2)").addClass("animated tada_slow");
					setTimeout(function(){
						$(".slides .present .SlideType_Choose_4_with_Image_ImageDiv:eq(3)").addClass("animated tada_slow");
					},150);
				},150);
			},150);
		
	}
	if($(".slides .present").hasClass("SlideType_Choose_4_without_Image")){
		if($(".slides .present").attr("Questiontype").toLowerCase().trim()=="listenable"){
			playAudio($(".slides .present .SlideType_Choose_4_without_Image_QuestionText").text(), course_language);
		}
		
		$(".slides .present .SlideType_Choose_4_without_Image_Div").removeClass("animated tada_slow");
		$(".slides .present .SlideType_Choose_4_without_Image_Div:eq(0)").addClass("animated tada_slow");
		setTimeout(function(){
			$(".slides .present .SlideType_Choose_4_without_Image_Div:eq(1)").addClass("animated tada_slow");
			setTimeout(function(){
				$(".slides .present .SlideType_Choose_4_without_Image_Div:eq(2)").addClass("animated tada_slow");
				setTimeout(function(){
					$(".slides .present .SlideType_Choose_4_without_Image_Div:eq(3)").addClass("animated tada_slow");
				},150);
			},150);
		},150);
		
	}
	
	if($(".slides .present").hasClass("SlideType_Transaltion_Box")){
		setTimeout(function(){
			$(".slides .present .SlideType_Transaltion_Box_InputBoxOuterDiv #SlideType_Transaltion_Box_InputBox").focus();
		},500);
		setTimeout(function(){
			$(".slides .present .SlideType_Transaltion_Box_InputBoxOuterDiv #SlideType_Transaltion_Box_InputBox").focus();
		},1000);
		$(".slides .present  #SlideType_Transaltion_Box_Listen_Text").click();
	}
	
	if($(".slides .present").hasClass("SlideType_Dialog")){
		var dialogString = "";
		$(".slides .present #chatBox .dialogText").each(function(){
			dialogString = dialogString + "  " + $(this).contents().text();
		});
		playAudio(dialogString, course_language);
	}
	
	if($(".slides .present").hasClass("SlideType_Missing_Word")){
		setTimeout(function(){
			$(".slides .present #SlideType_Missing_Word_select_choice").focus();
		},500);
	}
	
	if(window.parent.location.href.indexOf("WebTranslationInterface") > -1 ){
		window.parent.navigateRightFromIframe();
	}
		
}

function hideBottomBarButton(){
	if($(".slides .present").hasClass("slideType_First_Slide")){
		$("#bottomBarButton").css("display","none");
	}else{
		$("#bottomBarButton").css("display","block");
	}
}


function onUpdateSlide(slideNumber){
	var slideNo = slideNumber+1;
	
	if(isInitialTest == "true"){
		$("#bottomBarButton").css("visibility","hidden");
	}
	$("#bottomBarButton").removeClass("checkButtonAnimation");
	closepopUpHighlightDiv();
	hideTipPoup();
	clearTimeout(setTimeoutForJellySlide);
	hideBottomBarButton();
	soundManager.stopAll();
	clearTimeout(setTimeOutVar);
	
	if($(".slides .present").hasClass("slideType_First_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
		$("#disableBottomBarButton").css("display","none");
	}else if($(".slides .present").hasClass("slideType_Input")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
		setTimeout(function(){
			$("#slideType_Input_inputText").focus();
		},1000);
	}else if($(".slides .present").hasClass("SlideType_Jelly")){
		$(".slides .present .yellow-arrow").css("display","none");
		setTimeout(function(){
			if($("#translationPopup").css("display")=="none"){
				$(".slides .present .TTSMainWord:eq(0)").click();
			}
		},5000);
		setTimeout(function(){
			$(".slides .present .yellow-arrow").css("top",($(".TTSMainWord:eq(0)").position().top + 50));
			$(".slides .present .yellow-arrow").css("left",($(".TTSMainWord:eq(0)").position().left +$(".TTSMainWord:eq(0)").width()/2 - 47));
			$(".slides .present .yellow-arrow").css("display","block");
		},1000);
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
		$("#disableBottomBarButton").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_4_with_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_4_with_Image_Answer()");
		$(".tipBox").css("display","none");
		
	}else if($(".slides .present").hasClass("SlideType_Choose_2_with_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_with_Image_Answer()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Transaltion_Box")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Transaltion_Box_Answer()");
		$(".tipBox").css("display","none");
		setTimeout(function(){
			$("#SlideType_Transaltion_Box_InputBox").focus();
		},1000);
		$("#bottomBarButton").css("visibility","");
	}else if($(".slides .present").hasClass("SlideType_Choose_4_without_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_4_without_Image_Answer()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_2_without_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_without_Image_Answer()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Missing_Word")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Missing_Word_Answer()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Tip_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").removeClass("checkButtonAnimation");
		$("#disableBottomBarButton").css("display","none");
		setTimeOutVar = setTimeout(function(){
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
						},5000);
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Jumble_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Jumble_Slide_Answer()");
		$(".tipBox").css("display","none");
		$("#bottomBarButton").css("visibility","");
	}else if($(".slides .present").hasClass("SlideType_Dialog")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").removeClass("checkButtonAnimation");
		$("#disableBottomBarButton").css("display","none");
		setTimeOutVar = setTimeout(function(){
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
						},5000);
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_with_Top_Photo_Answer()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_2_without_Top_Photo")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_without_Top_Photo_Answer()");		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Listen_Box")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Summary_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").css("display","block").removeClass("checkButtonAnimation");
		$("#disableBottomBarButton").css("display","none");
		setTimeOutVar = setTimeout(function(){
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
						},5000);
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Last_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").css("display","none");;
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
		window.parent.lastLessonSlide=true;
		var improvedScore=0;
		if(parseInt(gameCoin)>parseInt(coins))
		{
			improvedScore=parseInt(gameCoin)-parseInt(coins);
		}
	
		var bonusCoins=100;

		
		if(isInLessonTest == "false"){
			if(isHw=="true"){
				window.parent.isLessonHw=true;
				window.parent.updateHomeWorkData(window.parent.email,0,lessonNumberVar,tileNumber);
				window.parent.tileNumber=tileNumber;
				if(improvedScore>0){
					bonusCoins=parseInt(improvedScore,10)+parseInt(bonusCoins,10);
				}
				$(".endScoreOuterTable").css("display","none");
				startCoinStackAnimationLesson(bonusCoins+" Coins");
				setTimeout(function(){
					$(".coinStackAnimationScreen").css("display","none");
					$(".endScoreOuterTable").css("display","");
				}, 4000);
				
				updateUserBonusCoin(userId, lessonNumberVar, 100, window.parent.nativeLangId, learningLanguageId);
				
			}else{
				if(improvedScore>0){
					$(".endScoreOuterTable").css("display","none");
					startCoinStackAnimationLesson(improvedScore);
					setTimeout(function(){
						$(".coinStackAnimationScreen").css("display","none");
						$(".endScoreOuterTable").css("display","");
					}, 4000);
				}
			}
			if(isHw=="true"){
				$(".bonusCoins").text(bonusCoins+" Coins");
				if(bonusCoins > 0){
					$(".coinsTableFeebackWon").css("display","block");
					$(".totalNewCoinsWon").text(bonusCoins);
				}else{
					$(".coinsTableFeebackLost").css("display","block");
					$(".totalCoinsWon").text(parseInt(gameCoin,10)+parseInt(bonusCoins,10));
				}
			}else{
				$(".bonusCoins").text(improvedScore+" Coins");
				if(improvedScore > 0){
					$(".coinsTableFeebackWon").css("display","block");
					$(".totalNewCoinsWon").text(improvedScore);
				}else{
					$(".coinsTableFeebackLost").css("display","block");
					$(".totalCoinsWon").text(gameCoin);
				}
			}
			$(".coinsWon").text(gameCoin+" Coins");
			$(".lastScore").text(coins+" Coins");
			$(".maxCoins").text(maxCoins+" Coins");
			
			
			$(".improvedScore").text(improvedScore+" Coins");
		}
		
		if(isInLessonTest == "false" && isInitialTest == "false"){
			if(isB2BLesson=="true"){
				updateUserCoin(userId, lessonNumberVar, gameCoin, window.parent.nativeLangId, 5,'LEARN_LESSON_B2B');
				updateCompletedTask(userId, taskString, userLang,gameCoin);
				if(!window.parent.b2bProgress.lesson.hasOwnProperty(lessonNumberVar)){
					window.parent.b2bProgress.lesson[lessonNumberVar] =  "true"; 
				}
			}else{
				updateUserCoin(userId, lessonNumberVar, gameCoin, window.parent.nativeLangId, 5,'LEARN_LESSON');
				updateCompletedTask(userId, taskString, userLang,gameCoin);
			}
		}else if(isInLessonTest == "true"){
			$(".endScoreTable").css("display","none");
			$(".coinStackAnimationScreen").css("display","none");
			var currentLevel = window.parent.currentLevel;
			var currentLevelTemp = (25*testNumber) + 1;
			var unlockedLessonAfterTest = currentLevelTemp + "-" + (parseInt(currentLevelTemp,10)+5);
			if(currentLevelTemp > currentLevel){
				currentLevel = currentLevelTemp;
			}
			if(userAnswerArray.length < 30){
				if(correctFlag == 1){
					userAnswerArray.push(1);
				}else{
					userAnswerArray.push(2);
				}
				correctFlag = 1;
			}
			$(".testQuestionCount").text("30");
			var correctCount = 0;
			for(var i=0;i<userAnswerArray.length;i++){
				if(userAnswerArray[i]==1){
					correctCount++;
				}
			}
			$(".testCorrectCount").text(correctCount);
			$(".unlockedLessonAfterTest").text(unlockedLessonAfterTest);
			$(".currentLevel").text(currentLevel);
			var testPassed = false;
			if(correctCount >= 20){
				testPassed = true;
			}
			if(testPassed){
				$(".testPassedDiv").css("display","block");
				$(".testEndSlideButton").val($(".testEndSlideButton").val().replace("-10000",currentLevel));
				$(".testEndSlideButton").click(function(){
					window.parent.$(".lessonScreen .lessonListTable .lessonNumber"+currentLevel).click();
					setTimeout(function(){
						window.parent.$(".lessonScreen .taskListContainer .taskTiles:eq(0)").click();
					},100);
				});
				updateUserCoin(userId, testNumber-1, gameCoin, window.parent.nativeLangId, 5,'TASK_TESTOUT');
			}else{
				$(".testFailedDiv").css("display","block");
				$(".testEndSlideButton").val($(".testEndSlideButton").attr("failedText"));
				$(".testEndSlideButton").click(function(){
					window.parent.reloadIFrame();
				});
			}
			$(".coinsTableFeebackForTest").css("display","block");
		}
		if(isInitialTest == "true"){
			$(".coinsTableFeebackDiv").css("display","none");
			$(".endScoreTable").css("display","none");
			$(".coinStackAnimationScreen").css("display","none");
			updateUserCoin(userId, initialTestRecLevel, 200, window.parent.nativeLangId, 5,'FIRST_TESTOUT');
			$(".initialTestFeedbackLevel").text(initialTestRecLevel);
		}
		
	}else{
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		$(".tipBox").css("display","none");
	}
	
	$("#bottomBarButton").attr("onclick","NextTestSlide();Reveal.navigateNext()");
	
}

function updateUserBonusCoin(userId,lessonNumberVar,gameCoin,nativeLanguageId,learningLanguageId) {
	var earnedVia1="LEARN_LESSON_BONUS";
	if(isB2BLesson=="true"){
		earnedVia1="LEARN_LESSON_B2B_BONUS";
	}
	try{
		window.parent.updateLocalStorage(earnedVia1,lessonNumberVar,gameCoin,"",
				nativeLanguageId,learningLanguageId);
		} catch (e) {}
	$.ajax({
		url : '../updateUserCoinForAndroid.action',
		data : {
			user_id : userId,
			earned_via : earnedVia1,
			challenge_number : lessonNumberVar,
			coins : gameCoin,
			nativeLanguageId : nativeLanguageId,
			learningLanguageId : learningLanguageId,
			isB2bUser : window.parent.isB2Buser
		},dataType:"json",
		success : function(result) {
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from certification_test.js line 1102");
					window.top.location.href="../../index.jsp?isLogin=true";
				}
			}else{
				try {
					deleteFromLocalStorage(earnedVia1,lessonNumberVar,nativeLanguageId);
				} catch (e) {}
			}
			window.parent.isTask1Completed=="true";
			window.parent.getUserCoinsAndRank();
		}
	});

}
function updateUserCoin(userId,lessonNumberVar,gameCoin,nativeLanguageId,learningLanguageId,earned_via) {
	var data1;
	if(earned_via == "LEARN_LESSON_B2B"){
		data1 = {
				user_id : userId,
				earned_via : earned_via,
				challenge_number : lessonNumberVar,
				coins : gameCoin,
				string_identifier : window.parent.b2bId,
				nativeLanguageId : nativeLanguageId,
				learningLanguageId : learningLanguageId,
				isB2bUser : window.parent.isB2Buser
			};
	}else{
		data1 = {
				user_id : userId,
				earned_via : earned_via,
				challenge_number : lessonNumberVar,
				coins : gameCoin,
				nativeLanguageId : nativeLanguageId,
				learningLanguageId : learningLanguageId,
				isB2bUser : window.parent.isB2Buser
			};
	}
	try{
		window.parent.updateLocalStorage(earned_via,lessonNumberVar,gameCoin,"",
				nativeLanguageId,learningLanguageId);
		} catch (e) {}
	$.ajax({
		url : '../updateUserCoinForAndroid.action',
		data : data1,
		dataType:"json",
		success : function(result) {
			//console.log(this.url);
			//console.log(result);
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from certification_test.js line 1151");
					window.top.location.href="../../index.jsp?isLogin=true";
				}
			}else{
				try {
					deleteFromLocalStorage(earned_via,lessonNumberVar,nativeLanguageId);
				} catch (e) {}
			}
			window.parent.getUserCoinsAndRank();
		}
	});

}

function updateCompletedTask(userId,taskString,language,gameCoin) {
	
	$.ajax({
		url : '../updateUserCompletedTask.action',
		data : {
			userId : userId,
			taskString : taskString,
			language : language
		},dataType:"json",
		success : function(result) {
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from certification_test.js line 1177");
					window.top.location.href="../../index.jsp?isLogin=true";
				}
			}
		}
	});
//	var id = "TD-"+taskString;
//	console.log(id);
//	window.parent.refreshLessonData(id,gameCoin);
	
}

function getParameterValue(name) {
	var queryString = window.location.search;
	queryString = queryString.substring(1, queryString.length);
	var paramPairs = queryString.split('&');
	for (var i = 0; i < paramPairs.length; i++) {
		var pair = paramPairs[i];
		pair = pair.split('=');
		if(name == pair[0])
			return pair[1];
	}
	
	return null;
}

var coinStackDelayArray = [1,20,27,34,37,40,43,47,50,52,65];


function startCoinStackAnimationLesson(improvedScore){
	$(".coinStackAnimationScreen").css("display","block");
	if(improvedScore > 0){
		$(".coinInStack").css("bottom","700px");
		setTimeout(function(){
			for(var i=0;i<improvedScore;i++){
				if(i==0){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'50px'});
					setTimeout(function(){
						$(".coinInStack:eq(0)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==1){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'100px'});
					setTimeout(function(){
						$(".coinInStack:eq(1)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==2){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'70px'});
					setTimeout(function(){
						$(".coinInStack:eq(2)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==3){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'65px'});
					setTimeout(function(){
						$(".coinInStack:eq(3)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==4){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'80px'});
					setTimeout(function(){
						$(".coinInStack:eq(4)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==5){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'115px'});
					setTimeout(function(){
						$(".coinInStack:eq(5)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==6){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'80px'});
					setTimeout(function(){
						$(".coinInStack:eq(6)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==7){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'95px'});
					setTimeout(function(){
						$(".coinInStack:eq(7)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==8){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'110px'});
					setTimeout(function(){
						$(".coinInStack:eq(8)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==9){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'130px'});
					setTimeout(function(){
						$(".coinInStack:eq(9)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}else if(i==10){
					$(".coinInStack:eq("+i+")").css({'-webkit-transition-duration':'.3s','transition-duration':'.3s','-webkit-transition-delay':coinStackDelayArray[i]*0.001*30+'s','transition-delay':coinStackDelayArray[i]*0.001*30+'s','bottom':'145px'});
					setTimeout(function(){
						$(".coinInStack:eq(10)").addClass("coinstackanim");
						playCoinSound();
					},(300+coinStackDelayArray[i]*30));
				}
				
			}
		},10);
		
	}
	
}


function playCoinSound(){
	soundManager.play("coin");
}

function getRandomNumber(start,end){
	return Math.floor(Math.random() * end) + start;
}

function NextTestSlide(){
	if(testDataObject["testData"]["examType"].toLowerCase()=="speaking"){
		NextTestSlideSpeaking();
	}else{
		console.log("in NextTestSlide");
		if((setWiseQuestionCounter)%testSetQuestionCount == 0){
			loadNextSetTestData();
		}
		currentQuestionNumber++;
		setWiseQuestionCounter++;
		if(setWiseQuestionCounter<=totalTestQuestion){
			$(".questionCounterText").text(setWiseQuestionCounter+" of "+totalTestQuestion);
		}
	}
}

function checkTestAvailability(){
	$.ajax({
		url : '../checkTestAvailability.action',
		data : {
			userId : userId,
		},dataType:"json",
		success : function(result) {
			console.log("result",result);
			
			if(result["success"]!=null){
				$(".loadingNextSetDiv").css("display","none");
				$(".testAvailable").css("display","block");
				$(".questionCounterText").text('');
				$(".noTestAvailable").css("display","none");
				testId = result["success"];
			}else{
				$(".testAvailable").css("display","none");
				$(".noTestAvailable").css("display","block");
				$("#noTestAvailableText").html(result["error"]);
				$(".loadingNextSetDiv").css("display","none");
			}
		}
	});
}

function startCertificationTest(){
	
	console.log("in startCertificationTest");
	showStartingInstruction();
	currentQuestionNumber++;
	setWiseQuestionCounter++;
	
//	for(var i=currentQuestionNumber;i<currentQuestionNumber+testSetQuestionCount;i++){
//		if(dataArray[i-1]["examType"].toLowerCase() == "vocabulary" ||
//				dataArray[i-1]["examType"].toLowerCase() == "grammar"){
//			lessonFunctionCallVar[i-1] = new SlideType_Missing_Word_Function1("slide"+(i+1),dataArray[i-1]);
//		}
//	}
	
}

function loadNextSetTestData(){
	console.log("in loadNextSetTestData");
	$(".loadingNextSetDiv").css("display","block");
	$('.internetPopUp').css('display','none');
	var action = '../startTestNew.action';
		var data = {
			userId : userId,
			testId : testId,
			b2bName : window.parent.b2bName
		};
	if(certified_test=="true"){
		data = {
			userId : userId,
			testId : testId,
			b2bName : window.parent.b2bName,
			certified_test : certified_test,
			testType : testType
		};
	}
	var timer = true;
	if(testDataObject!= undefined){
		action = '../saveUserResponseDataNew.action';
		data = {
				testId : testId,
				userResponse : JSON.stringify(testDataObject)
			};
		timer = false;
	}
	$.ajax({
		url : action,
		data : data,
		method:"post",
		dataType:"json",
		success : function(result) {
			console.log("url:"+this.url);
			console.log("question : "+JSON.stringify(result));
			if(result["status"]!=undefined && result["status"] == true){
				$(".loadingNextSetDiv").css("display","none");
				
				if(timer){
					if(result["testData"]["time"] != undefined){
						console.log("In TestData time variable");
						timeForTest = result["testData"]["time"];
						console.log("timeForTest:",timeForTest);
						clearInterval(ticker);
						startTimer(timeForTest*60);
					}else if(result["time"] != undefined){
						console.log("In time variable");
						timeForTest = result["time"];
						console.log("timeForTest:",timeForTest);
						clearInterval(ticker);
						startTimer(timeForTest*60);
					}
				}
				
				if(result["isTestCompleted"] == true){
					isTestCompleted=true;
					testCompleted();
				}else{
					testDataObject = result;
					var examType = testDataObject["testData"]["examType"];
					if(testDataObject["testData"]["sectionFinished"]==true){
						setWiseQuestionCounter=1;
						isNewSection=true;
					}
					totalTestQuestion=testDataObject["testData"]["questionCount"];
					if(isNewSection && examType.toLowerCase() != "speaking"){
						showSectionInstruction(examType,testDataObject["testData"]["Long_instructions"]);
					}
					if(isNewSection ){
						updateTestStatus(examType);
						isNewSection=false;
					}
					
					console.log("examType : "+examType);
					testSetQuestionCount=testDataObject["testData"]["questions"].length;
					
					 
					if(examType.toLowerCase() == "speaking"){
						loadQuestions(result["testData"]);
						console.log("speaking question : "+JSON.stringify(result));
					}else if(examType.toLowerCase() == "listening"){
						 testSetQuestionCount=1;
						 var html = '<section id="slide'+(currentQuestionNumber+1)+'" class="SlideType_Missing_Word"'+
							'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+1)+'"'+
								'data-background="#fff">';
						 html+=		'<div class="sectionInnerContainer" style="overflow-y:auto; ">';
							
						var audio_path=testDataObject["testData"]["audio_path"];
						if(audio_path!="null"){
							html+='<audio id="myAudio" style="width: 80%;margin: auto;margin-bottom: 30px;margin-top: 50px;" '+
								'controls autoplay>'+
							  '<source src="'+audio_path+'" type="audio/mp3">'+
							'</audio><br>';
						}
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							
							html+='<div style="width: 100%;font-size:30px;margin-top: 20px;padding:16px;text-align:left;">';
							html+= '<span class="questionText'+i+'"></span>'+
									     '</div>'+
									     '<div id="SlideType_Missing_Word_select_choice'+i+'" style="width: inherit;border: none!important;text-align: left;max-width: 650px;margin: auto;">'+
									     '</div>';
							if(i==testDataObject["testData"]["questions"].length-1){
								html+='</div>'+
								'</section>';
							}
						}
						
						$("#outerSlides").append(html);
						
						
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							listeningCounter++;
							testDataObject["testData"]["questions"][i]["questionNumber"] = listeningCounter;
							console.log("slide"+(currentQuestionNumber+1)+","+JSON.stringify(testDataObject["testData"]["questions"][i])+","+i);
							lessonFunctionCallVar[currentQuestionNumber+i+1] = new SlideType_Missing_Word_Function1("slide"+(currentQuestionNumber+1),testDataObject["testData"]["questions"][i],i,testDataObject["testData"]["questions"].length);
							
						}
						
							initializeReveal();
							
						
					}else if(examType.toLowerCase() == "reading"){
						 testSetQuestionCount=1;
						 var html = '<section id="slide'+(currentQuestionNumber+1)+'" class="SlideType_Missing_Word"'+
							'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+1)+'"'+
								'data-background="#fff">';
						 html+=		'<div class="sectionInnerContainer" style="overflow-y:auto; ">';
							
						var test_content=testDataObject["testData"]["content"].replace(/(?:\r\n|\r|\n)/g, '<br>');
						if(test_content!="null"){
							html+='<div id="test_content" style="width: 80%;margin: auto;margin-bottom: 30px;margin-top: 50px;font-size:24px;text-align:left;" '+
								'>'+
							  ''+test_content+
							'</div><br>';
						}
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							
							html+='<div style="width: 100%;font-size:30px;margin-top: 20px;padding:16px;text-align:left;">';
							html+= '<span class="questionText'+i+'"></span>'+
									     '</div>'+
									     '<div id="SlideType_Missing_Word_select_choice'+i+'" style="width: inherit;border: none!important;text-align: left;max-width: 650px;margin: auto;">'+
									     '</div>';
							if(i==testDataObject["testData"]["questions"].length-1){
								html+='</div>'+
								'</section>';
							}
						}
						
						$("#outerSlides").append(html);
						
						
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							readingCounter++;
							testDataObject["testData"]["questions"][i]["questionNumber"] = readingCounter;
							console.log("slide"+(currentQuestionNumber+1)+","+JSON.stringify(testDataObject["testData"]["questions"][i])+","+i);
							lessonFunctionCallVar[currentQuestionNumber+i+1] = new SlideType_Missing_Word_Function1("slide"+(currentQuestionNumber+1),testDataObject["testData"]["questions"][i],i,testDataObject["testData"]["questions"].length);
							
						}
						
							initializeReveal();
							
						
					}else if(examType.toLowerCase() == "grammar"){
						console.log("Grammer");
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							console.log(JSON.stringify(testDataObject["testData"]["questions"]));
							console.log("currentQuestionNumber : "+currentQuestionNumber);
							var html = '<section id="slide'+(currentQuestionNumber+i+1)+'" class="SlideType_Missing_Word"'+
								'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+i+1)+'"'+
									'data-background="#fff">'+
									'<div class="sectionInnerContainer" style="overflow-y:auto; ">'+
										'<div style="width: 100%;font-size:30px;margin-top: 20px;">'+
									       '<span class="questionText'+i+'"></span>'+
									     '</div>'+
									     '<div id="SlideType_Missing_Word_select_choice'+i+'" style="width: inherit;border: none!important;text-align: left;max-width: 650px;margin: auto;">'+
									     '</div>'+
									'</div>'+
								'</section>';
							$("#outerSlides").append(html);
							grammarCounter++;
							console.log("Grammer1");
							testDataObject["testData"]["questions"][i]["questionNumber"] = grammarCounter;
							lessonFunctionCallVar[currentQuestionNumber+i+1] = new SlideType_Missing_Word_Function1("slide"+(currentQuestionNumber+i+1),testDataObject["testData"]["questions"][i],i,1);
						}
						initializeReveal();
					}else if(examType.toLowerCase() == "vocabulary"){
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							var html = '<section id="slide'+(currentQuestionNumber+i+1)+'" class="SlideType_Missing_Word"'+
								'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+i+1)+'"'+
									'data-background="#fff">'+
									'<div class="sectionInnerContainer" style="overflow-y:auto; ">'+
										'<div style="width: 100%;font-size:30px;margin-top: 20px;">'+
									       '<span class="questionText'+i+'"></span>'+
									     '</div>'+
									     '<div id="SlideType_Missing_Word_select_choice'+i+'" style="width: inherit;border: none!important;text-align: left;max-width: 650px;margin: auto;">'+
									     '</div>'+
									'</div>'+
								'</section>';
							$("#outerSlides").append(html);
							vocabCounter++;
							testDataObject["testData"]["questions"][i]["questionNumber"] = vocabCounter;
							lessonFunctionCallVar[currentQuestionNumber+i+1] = new SlideType_Missing_Word_Function1("slide"+(currentQuestionNumber+i+1),testDataObject["testData"]["questions"][i],i,1);
						}
						initializeReveal();
					}else if(examType.toLowerCase() == "writing"){
						console.log("Writing");
						var questionTypeVar = 0;
						var isFirstQues = false;
						for(var i=0;i<testDataObject["testData"]["questions"].length;i++){
							var questionType = testDataObject["testData"]["questions"][i]["type"];
							isFirstQues = false;
							if(questionType!=questionTypeVar){
								isFirstQues = true;
								questionTypeVar = questionType;
							}
							if(isFirstQues){
								testDataObject["testData"]["questions"][i]["dontevaluate"] = "true";
							}
							var firstQuesDiv = "";
							if(isFirstQues){
								firstQuesDiv = '<div style="width: 100%;font-size:20px;margin-top: 20px;">(This is a sample question)</div>';
							}
							console.log("currentQuestionNumber : "+currentQuestionNumber);
							if(questionType==1){
								var html = '<section id="slide'+(currentQuestionNumber+i+1)+'" class="SlideType_Missing_Word"'+
									'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+i+1)+'"'+
										'data-background="#fff">'+
										'<div class="sectionInnerContainer" style="overflow-y:auto; ">'+firstQuesDiv+
											'<div style="width: 100%;font-size:30px;margin-top: 20px;">'+
										       '<span class="questionText'+i+'"></span>'+
										     '</div>'+
										     '<div id="SlideType_Missing_Word_select_choice'+i+'" style="width: inherit;border: none!important;text-align: left;max-width: 650px;margin: auto;">'+
										     '</div>'+
										'</div>'+
									'</section>';
								$("#outerSlides").append(html);
								lessonFunctionCallVar[currentQuestionNumber+i+1] = new SlideType_Missing_Word_Function1("slide"+(currentQuestionNumber+i+1),testDataObject["testData"]["questions"][i],i,1);
							}else{
								var html = '<section id="slide'+(currentQuestionNumber+i+1)+'" class="SlideType_Writing_Box"'+
								'slideType="SlideType_Writing_Box" slideNumber="'+(currentQuestionNumber+i+1)+'"'+
									'data-background="#fff">'+
									'<div class="sectionInnerContainer" style="overflow-y:auto; ">'+
										'<div style="width: 100%;font-size:20px;margin-top: 20px;">'+
									       '<span class="questionText'+i+'">'+testDataObject["testData"]["questions"][i]["question"].replace(/(?:\r\n|\r|\n)/g, '<br>')+'</span>'+
									     '</div>'+
									     '<div style="width: 100%;font-size:20px;margin-top: 20px;">'+
									     '<textarea spellcheck="false" onchange="saveWritingTextAnswer('+i+')" id="SlideType_Writing_Text_Box'+i+'" style="width: inherit;font-size:18px;height:260px;max-width: 80%;min-width:60%;margin: auto;">'+
									     '</textarea></div>'+
									'</div>'+
								'</section>';
								$("#outerSlides").append(html);
							}
							
							writingCounter++;
							testDataObject["testData"]["questions"][i]["questionNumber"] = writingCounter;
						}
						initializeReveal();
					}
					
					initializeReveal();
					
//					window.location.href = "#slide"+currentQuestionNumber;
					setTimeout(function(){
						Reveal.slide(currentQuestionNumber);
//						Reveal.navigateNext();
					},100);
				}
			}else{
				console.log("url:"+this.url);
				console.log("status false");
				$('.internetPopUp').css('display','block');
				$(".loadingNextSetDiv").css("display","none");
			}
		},
		error: function(a, b, c) {
			console.log('error:', a, b, c);
			$(".loadingNextSetDiv").css("display","none");
			$('.internetPopUp').css('display','block');
		}
	});
}
var isTestStarted=true;

function saveWritingTextAnswer(quesNo){
	var writAns = $("#SlideType_Writing_Text_Box"+quesNo).val().trim();
	testDataObject.testData.questions[quesNo].answer=encodeURIComponent(writAns);
}

function showSectionInstruction(section,inst){
	console.log("in showSectionInstruction");
	console.log("in showSectionInstruction");
	var html = '<div style="font-size: 32px;text-align: center;padding: 20px;">Section '+(sectionCounter++)+' : '+section+'</div>';
	if(inst!=undefined){
		html += '<ul style="font-size: 16px;padding: 20px;">'+inst+'</ul>';
	}else{
		html += '<ul style="font-size: 16px;padding: 20px;"><li>Choose the correct option.</li></ul>';
	}
	
	var buttonHtml='<input onclick=\'$(".questionCounterText").text(setWiseQuestionCounter+" of "+totalTestQuestion);$(".instructionDiv").css("display","none");$("#bottomInstButton").html("");\''+
	'class="greenButton appStringValue" type="button" value="OK"'+
	'style="position: absolute; right: 12px; margin-top: 25px;z-index:100000;">';
	if(section.toLowerCase()=="speaking"){
		buttonHtml='<input onclick=\'startAudioTest();\''+
		'class="greenButton appStringValue" type="button" value="OK"'+
		'style="position: absolute; right: 12px; margin-top: 25px;z-index:100000; background: #e7e7e7!important;" />';
	}
	if(isTestStarted)
	{
		buttonHtml='<input onclick=\'$(".questionCounterText").text(setWiseQuestionCounter+" of "+totalTestQuestion);$(".instructionDiv").css("display","none");$("#bottomInstButton").html("");\''+
		'class="greenButton appStringValue" type="button" value="OK"'+
		'style="position: absolute; right: 12px; margin-top: 25px;z-index:100000;">';
		isTestStarted=false;
	}
		
	$(".instructionDiv").html(html);
	$("#bottomInstButton").html(buttonHtml);
	$(".instructionDiv").css("display","block");
	$(".questionCounterText").text('Section Instructions');
	$("#disableBottomBarButton").css("display","none");
	$("#bottomBarButton").css("display","none");
	$("#bottomInstButton").css("display","block");
	
}

function showStartingInstruction(){
	console.log("in showStartingInstruction");
	var html = '<ul style="font-size: 16px;padding: 20px;"><li>Please do not quit the test in the middle, or refresh the page.</li>'+
		'<li>All the best!</li></ul>';
	
	var buttonHtml='<input onclick=\'$(".questionCounterText").text(setWiseQuestionCounter+" of "+totalTestQuestion);$(".instructionDiv").css("display","none");$("#bottomInstButton").html("");loadNextSetTestData();\''+
		'class="greenButton appStringValue" type="button" value="OK"'+
		'style="position: absolute; right: 12px; margin-top: 25px;z-index:100000;">';
	
	$(".instructionDiv").html(html);
	$("#bottomInstButton").html(buttonHtml);
	$(".instructionDiv").css("display","block");
	$(".questionCounterText").text('Instructions');
	$("#disableBottomBarButton").css("display","none");
	$("#bottomBarButton").css("display","none");
	$("#bottomInstButton").css("display","block");
}

function UserLogout() {

	$.ajax({
		url : '../../logout.action',
		data : {},
		success : function(result) {
			window.parent.location.href = "https://helloenglish.com/school.jsp";
		}
	});
}

function testCompleted(){
	console.log("in testCompleted");
	var html = '<section id="slide'+(1000)+'" class="SlideType_Missing_Word"'+
	'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+1)+'"'+
		'data-background="#fff">'+
		'<div class="sectionInnerContainer" style="overflow-y:auto; "><table style="margin:auto;text-align:center;height:100%;width:100%;border-collapse: collapse;"><tr>'+
		'<td>'+
		'<div style="text-align:center;color: #53e7c9;">Test Completed</div><br>'+
		'<div style="text-align:center;font-size: 28px;">Thank you for completing the test.</div><br>'+
		'<div style="text-align:center;"><button onclick="closeTest();" style="width: 100px;height: 32px;background-color: #FFec50;">Back</button></div>'+
		'</td></tr></table>'+
		'</div>'+
	'</section>';
	if(window.parent.b2bCompanyName!=undefined && window.parent.b2bCompanyName == "Rajmodelschools"){
		var html = '<section id="slide'+(1000)+'" class="SlideType_Missing_Word"'+
		'slideType="SlideType_Missing_Word" slideNumber="'+(currentQuestionNumber+1)+'"'+
			'data-background="#fff">'+
			'<div class="sectionInnerContainer" style="overflow-y:auto; "><table style="margin:auto;text-align:center;height:100%;width:100%;border-collapse: collapse;"><tr>'+
			'<td>'+
			'<div style="text-align:center;color: #53e7c9;">Test Completed</div><br>'+
			'<div style="text-align:center;font-size: 28px;">Thank you for completing the test.</div><br>'+
			'<div style="text-align:center;"><button onclick="UserLogout();" style="width: 100px;height: 32px;background-color: #FFec50;">Logout</button></div>'+
			'</td></tr></table>'+
			'</div>'+
		'</section>';
	}
$("#outerSlides").append(html);
Reveal.slide(1000);
$(".questionCounterText").text('');

$("#disableBottomBarButton").css("display","none");
$("#bottomBarButton").css("display","none");

$(".closeIframeInLargeScreen").css("display","block");

$.ajax({
	url : '../saveTestAppCompletionData.action',
	data : {
		testId : testId,
		testStatus : 'completed'
	},dataType:"json",
	success : function(result) {
		console.log("result",result);
		if(result["success"]!=null){
//			alert("saved");
		}else{
//			alert("not saved");
		}
	}
	
});
}

function updateTestStatus(status){
	console.log("in updateTestStatus");
$.ajax({
	url : '../saveTestAppCompletionData.action',
	data : {
		testId : testId,
		testStatus : status
	},dataType:"json",
	success : function(result) {
		console.log("result",result);
		if(result["success"]!=null){
//			alert("saved");
		}else{
//			alert("not saved");
		}
	}
});
}

function shuffleArray(array){
	for(var i=0;i<array.length;i++){
		var x = Math.floor((Math.random() * i) + 0);
		temp=array[x];
		array[x]=array[i];
		array[i]=temp;
	}
	return array;
}

var timeInSecs;
var ticker;


function startTimer(secs){
	timeInSecs = parseInt(secs);
	ticker = setInterval("tick()",1000); 
	tick(); // to start counter display right away
}
var isTimeUp=false;
function tick() {
	if(!isTimeUp){
		var secs = timeInSecs;
		if (secs>0) {
		timeInSecs--;
		}
		else {
			testCompleted(); // stop counting at zero
			updateTestStatus("time_s_up");
			isTimeUp = true;
		//startHWTimer();  // and start again if required
		}
	
		var hours= Math.floor(secs/3600);
		secs %= 3600;
		var mins = Math.floor(secs/60);
		secs %= 60;
		var result = ( (mins < 10) ? "0" : "" ) + mins
		                  + ":" + ( (secs < 10) ? "0" : "" ) + secs;
		$("#testTimer").text(result);
	}
}


function SlideType_Missing_Word_Function1(sectionId,SlideType_Missing_Word_Data, index,questionCount){
	
	//this.checkSlideType_Missing_Word_Answer = checkSlideType_Missing_Word_Answer;
	
	$("#"+sectionId+" .questionText"+index).html(SlideType_Missing_Word_Data["question"]);
	
	var optionString = "";
	var counter = 1;
	while(SlideType_Missing_Word_Data["option_"+counter] != undefined){
		optionString += SlideType_Missing_Word_Data["option_"+counter] + "*&";
		counter++;
	}
	optionString = optionString.substring(0, optionString.length-2);
	optionString = optionString.split("*&");
	optionString=shuffleArray(optionString);
	//$("#"+sectionId+" #SlideType_Missing_Word_select_choice").addClass("SlideType_Missing_Word_select_choice_UnChecked");

		var fontSize = "35px";
		var fontSize1=35;
		var minFontSize=35;
		for(var i=0;i<optionString.length;i++){
			var option = optionString[i];
		if(option.length >=28 && option.length < 40){
			fontSize = "30px";
			fontSize1 = 30;
		}else if(option.length >=40 && option.length < 50){
			fontSize = "25px";
			fontSize1 = 25;
		}else if(option.length >=50 && option.length < 60){
			fontSize = "20px";
			fontSize1 = 20;
		}else if(option.length >=60){
			fontSize = "15px";
			fontSize1 = 15;
		}	
		if(minFontSize>fontSize1){
			minFontSize=fontSize1;
		}
	}
		
	fontSize=minFontSize+"px";
		
	for(var i=0;i<optionString.length;i++){
		var option = optionString[i];
			
	   var html = '<div class="SlideType_Missing_Word_Div SlideType_Missing_Word_Div_UnChecked option'+(i+1)+'" answerClass=\"option"'+(i+1)+'\" >'+
			        '<table style="width:100%;height:100%;">'+
			         '<tr>'+
			          '<td><div class="SlideType_Missing_Word_Image_Circle SlideType_Missing_Word_Image_Circle_UnChecked"></div></td>'+
			          '<td class="SlideType_Missing_Word_TextTD SlideType_Missing_Word_TextTD_UnChecked"><div class="SlideType_Missing_Word_Text SlideType_Missing_Word_Text_UnChecked" style="font-size:'+fontSize+'!important;">'+option+'</div></td>'+
			         '</tr>'+
			        '</table>'+
			       '</div>';
	   $("#"+sectionId+" #SlideType_Missing_Word_select_choice"+index).append(html);
	}
	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice"+index).change(function(){
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").addClass("checkButtonAnimation");
		playAudio($(this).val(), course_language);
	});
	
	$("#"+sectionId+" #SlideType_Missing_Word_select_choice"+index+" .SlideType_Missing_Word_Div").click(function(){
		
		playTapSound();
		$("#"+sectionId+" #SlideType_Missing_Word_select_choice"+index+" .SlideType_Missing_Word_Div").removeClass("animated tada_slow");
		$("#"+sectionId+" #SlideType_Missing_Word_select_choice"+index+" .SlideType_Missing_Word_Div").addClass("SlideType_Missing_Word_Div_UnChecked").removeClass("SlideType_Missing_Word_Div_Checked");
		$("#"+sectionId+" .SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_UnChecked").removeClass("SlideType_Missing_Word_Image_Circle_Checked");
		$("#"+sectionId+" .SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_UnChecked").removeClass("SlideType_Missing_Word_TextTD_Checked");
		$("#"+sectionId+" .SlideType_Missing_Word_Text").removeClass("SlideType_Missing_Word_Text_Checked").addClass("SlideType_Missing_Word_Text_UnChecked");
		
		$(this).addClass("SlideType_Missing_Word_Div_Checked").removeClass("SlideType_Missing_Word_Div_UnChecked");
		$(this).find(".SlideType_Missing_Word_Image_Circle").addClass("SlideType_Missing_Word_Image_Circle_Checked").removeClass("SlideType_Missing_Word_Image_Circle_UnChecked");
		$(this).find(".SlideType_Missing_Word_TextTD").addClass("SlideType_Missing_Word_TextTD_Checked").removeClass("SlideType_Missing_Word_TextTD_UnChecked");
		$(this).find(".SlideType_Missing_Word_Text").addClass("SlideType_Missing_Word_Text_Checked").removeClass("SlideType_Missing_Word_Text_UnChecked");
		testDataObject["testData"]["questions"][index]["answer"] = $(this).find(".SlideType_Missing_Word_Text").text();
		
		var classLength=$("#"+sectionId+" .SlideType_Missing_Word_Div_Checked").length;
		if(classLength==questionCount){
			$("#disableBottomBarButton").css("display","none");
			$("#bottomBarButton").addClass("checkButtonAnimation");
		}
	});
	
}

function closeTest(){
	if(testapp=="true"){
		window.location.href = "../../../dashboard/AssessmentAuthentication.jsp";
		return;
	}
	window.parent.$(".iframe-shadow").removeClass("slideInRight animated");
	window.parent.$(".iframe-" +
			"shadow").addClass("slideOutRight animated");
	
	window.parent.$('#iframe').attr('src', '');
	window.parent.$(".iframe-shadow,.iframe-shadow-container").css("display","none");
	window.parent.$(".iframe-shadow").css("background-color","#a788ae");
	
	window.parent.$(".iframe-shadow").removeClass("slideOutRight animated");
	window.parent.$(".closeIframeInLargeScreen").css("display", "block");
	if(window.parent.AdditionalEmailsAdded == 0){
		window.parent.addStudentsForLearning();
	}
}