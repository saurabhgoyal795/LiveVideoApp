var harshConfusionSet = false;
var TestType = 'A'
var useGoogleSpeech = false;
var dictname = 'cmudict-en-us'
var googleSpeechEnabled = true;
var audioTest = false;
var tryAgainEnabled = true;
var setCounter =0;
var audioTimer;
var audioAnswerTimer;
var lazyLoadData;
var PS_config;
var dataArray;
var googleListening = false;
var currentQuestionNumber = 0;
var exited = false;
var wavblob;
var audiorequest = new XMLHttpRequest();

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
var currentRecordingId;
var vowels = ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"];
var useLanguageModel = false;
var displayResult = true;
var recognition;
var isMicEnabled = true;
var final_transcript;
var isKeydown = false;
var audioPlaying = false;
var readyForKeydown = false;
var allowKeydown = false;
var tryAgainCount = 0;
var dictionary = {};
var isTestStarted=true;
var micTesting = false;

$(function(){
	loadAudioRecorder();
	//loadUserEmail();
	var type = window.parent.audioTestPart;
	if (type==undefined)
		type = TestType;
	TestType = type;

		if (googleSpeechEnabled && true) {
			useGoogleSpeech = true;
		}
		
	soundManager.setup({
		url: './SoundManager/swf/',
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

});

function loadUserEmail() {
	console.log("in loadUserEmail");
	if (window.parent.e_mail)
		email = window.parent.e_mail
	else if (window.parent.email)
		email = window.parent.email
	else
		$.ajax({
		  url : 'https://helloenglish.com/getUserSessionParameters.action',
		  success : function(data) {
		    sessionDetail = data.success;
		    email = sessionDetail.email;
		  }
	  });
}

function loadQuestions(result) {
	console.log("in loadQuestions");
	console.log(result);
	// console.log("result",result);
	dataArray = result;
	var answers = [];
	TestType = result.testtype.toUpperCase();
	if(TestType=="E"){
		$(".listenText").html("Listen and summarize");
	}
	for (var i = 0; i < result.questions.length; i++) {
		// console.log('result type',result.type)
		var totalTime = parseInt(result.questions[i].Length);
		var sec = parseInt(totalTime%60);
		var min = parseInt(totalTime/60);
		if(sec < 10){
			sec = "0"+sec;
		}
		if(min < 10){
			min = "0"+min;
		}
		var slideHTML = $('.sampleSectionTemplate'+result.type).html()
		.replace('||slideCount||',i+currentQuestionNumber+2)
		.replace('||slideCount||',i+currentQuestionNumber+2)
		.replace('||slideCount||',i+currentQuestionNumber+2)
		.replace('||i+1||',result.type)
		.replace('||shortInstructions||',result.Short_instruction)
		.replace('||timeLimit/60||',min)
		.replace('||timeLimit%60||',sec)

		if (result.type==1)
			slideHTML = slideHTML.replace('||questionText||',result.questions[i].Question_text)
		else {
			slideHTML = slideHTML.replace('||questionText||','')
			audioTest = true;
		}
		$('#outerSlides').append(slideHTML);
		answers.push(result.questions[i].Answer);
		// console.log('done')
	}
	$('.questionCounterText').text('1 of '+result.questions.length);
	$('.attemptCount').html('This is a sample question');
	var audioCount = 0;
	for(var j=0;j<dataArray.questions.length;j++){
		audioCount++;
		loadAudioSpeaking(audioCount);
	}
	showSectionInstructionSpeaking(result.Long_instructions);
	Reveal.navigateNext();
	// initAudio();
		
}

function toggleRecording(item) {
	console.log("in toggleRecording");
	currentRecordingId = item-2;
	enableDebug(debugWavFile);
	if (useGoogleSpeech) {
		// togglePSRecording(item-2);
		startButton();
	}
	else {
		togglePSRecording(item-2);
	}
}

function bottomBarButtonClickedSpeaking(){
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
	console.log("play: "+text);
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
		source.attr("src",'http://androidttsusingapp-env.elasticbeanstalk.com/file/'+window.parent.defaultLocale+'/'+processedText);
		x.load();
		x.play();
	}
	
//	var x = document.getElementById("audio"); 
//	var source = document.getElementById("mp3_src");
// source.src='http://androidttsusingapp-env.elasticbeanstalk.com/file/'+processedText;
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

function loadAudioSpeaking(number){
	console.log("in loadAudioSpeaking");
	var audioPathSet = dataArray.AudioPath.split(".")[0];
	if (dataArray.type == 2)
		$(".audioDiv").append('<audio id="audio'+(number+currentQuestionNumber)+'" class="audio audio'+(number+currentQuestionNumber)+'" text="" style="display:none;"><source class="source source'+(number+currentQuestionNumber)+'" src="https://storage.helloenglish.com/Test-App/test_mp3/'+audioPathSet+'/'+dataArray.questions[number-1].FileName+'" type="audio/mp3"></source></audio>');
	else
		$(".audioDiv").append('<audio id="audio'+(number+currentQuestionNumber)+'" class="audio audio'+(number+currentQuestionNumber)+'" text="" style="display:none;"><source class="source source'+(number+currentQuestionNumber)+'" src="'+number+'.mp3" type="audio/mp3"></source></audio>');
//	source.attr("src",'http://androidttsusingapp-env.elasticbeanstalk.com/file/'+window.parent.defaultLocale+'/'+processedText);
//	var x = $('.audio'+number)[0];
//	x.load();
document.getElementById("audio"+(number+currentQuestionNumber)).load();
}

function stopAllAudio(){
	console.log("in stopAllAudio");
	console.log('stopallaudio');
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
	meaning = meaning.replace(/[!-.,;¡¿?'"「」’]/g, '');
	meaning = meaning.replace(/[‘’“”''""’'「 」 ‒ – — ― ‐ -]/g, '');
	meaning = meaning.replace(/\//g, '');
	meaning = meaning.replace(/[áāǎàĀÁǍÀ]/g,'a');
	meaning = meaning.replace(/[éēěèĒÉĚÈ]/g,'e');
	meaning = meaning.replace(/[ííīíǐìĪÍǏÌ]/g,'i');
	meaning = meaning.replace(/[óōóǒòŌÓǑÒ]/g,'o');
	meaning = meaning.replace(/[úüūúǔùǖǘǚǜŪÚǓÙǕǗǙÜ]/g,'u');
	meaning = meaning.replace(/[ññññ]/g,'n');
	meaning = meaning.replace(/[ü]/g,'u');
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
					text = text.replace(/[!-.,;¡¿?'":><$#]/g, '');
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
					text = text.replace(/[!-.,;¡¿?'":><$#]/g, '');
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
						text = text.replace(/[!-.,;¡¿?'":><$#]/g, '');
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
						text = text.replace(/[!-.,;¡¿?'":><$#]/g, '');
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
	
	$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}NextTestSlideSpeaking();Reveal.navigateNext();");
	
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
		url : 'http://helloenglish.com/updateUserCoinForAndroid.action',
		data : {
			user_id : userId,
			earned_via : earnedVia1,
			challenge_number : lessonNumberVar,
			coins : gameCoin,
			nativeLanguageId : nativeLanguageId,
			learningLanguageId : learningLanguageId
		},dataType:"json",
		success : function(result) {
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from audioTest.js line 1213");
					window.top.location.href="./index.jsp?isLogin=true";
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
			learningLanguageId : learningLanguageId
		};
	}else{
		data1 = {
			user_id : userId,
			earned_via : earned_via,
			challenge_number : lessonNumberVar,
			coins : gameCoin,
			nativeLanguageId : nativeLanguageId,
			learningLanguageId : learningLanguageId
		};
	}
	try{
		window.parent.updateLocalStorage(earned_via,lessonNumberVar,gameCoin,"",
				nativeLanguageId,learningLanguageId);
		} catch (e) {}
	$.ajax({
		url : 'http://helloenglish.com/updateUserCoinForAndroid.action',
		data : data1,
		dataType:"json",
		success : function(result) {
			//console.log(this.url);
			//console.log(result);
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from audioTest.js line 1262");
					window.top.location.href="./index.jsp?isLogin=true";
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
		url : 'http://helloenglish.com/updateUserCompletedTask.action',
		data : {
			userId : userId,
			taskString : taskString,
			language : language
		},dataType:"json",
		success : function(result) {
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from audioTest.js line 1288");
					window.top.location.href="./index.jsp?isLogin=true";
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

function drawTimer(percent){
	$('#outerSlides .present div.timer').html('<div id="slice"'+(percent > 50?' class="gt50"':'')+'><div class="pie"></div>'+(percent > 50?'<div class="pie fill"></div>':'')+'</div>');
	var deg = 360/100*percent;
	$('#outerSlides .present #slice .pie').css({
		'-moz-transform':'rotate('+deg+'deg)',
		'-webkit-transform':'rotate('+deg+'deg)',
		'-o-transform':'rotate('+deg+'deg)',
		'transform':'rotate('+deg+'deg)'
	});
}

var recording_on = false;
var totalTime;
$(document).keydown(function(evt) {
	if(testDataObject.testData.examType!=undefined && testDataObject.testData.examType.toLowerCase()=="speaking"){
		isKeydown = true;
		if (!readyForKeydown)
			return false;
		if (evt.keyCode == 32 && !allowKeydown)
			return false;
		if (evt.keyCode == 32 && !recording_on) {
			audiorequest.abort();
			$('#mictest_result').html('&nbsp;');
			$('.timer').removeClass('rotate');
			$('.fetchingScores').css('visibility','hidden');
			$('#mictestmic').removeClass('loader');
			$('#mictest_result').html('&nbsp;');
			$('#mictestmic').addClass('pulsate');
			displayResult = true;
			if (tryAgainEnabled) {
				totalTime = dataArray.questions!=undefined?parseInt(dataArray.questions[0].Length):10;
				drawTimer(0);
				var sec = parseInt(totalTime%60);
				var min = parseInt(totalTime/60);
				if(sec < 10){
					sec = "0"+sec;
				}
				if(min < 10){
					min = "0"+min;
				}
				console.log('time1',min,sec)
				$("#outerSlides .present .timeElapsed").text(min+":"+sec);
			}
			console.log('keydown');
			console.log('start')
			$("#outerSlides .present #record").click();
			recording_on = true;
	
			totalTime = dataArray.questions!=undefined?parseInt(dataArray.questions[setWiseQuestionCounter-1].Length):10;
			var sec = parseInt(totalTime%60);
			var min = parseInt(totalTime/60);
			if(sec < 10){
				sec = "0"+sec;
			}
			if(min < 10){
				min = "0"+min;
			}
	//			console.log('time2',min,sec)
			$("#outerSlides .present .timeElapsed").text(min+":"+sec);
			audioTimer = setInterval(function(){
				totalTime--;
				sec = parseInt(totalTime%60);
				min = parseInt(totalTime/60);
				if(sec < 10){
					sec = "0"+sec;
				}
				if(min < 10){
					min = "0"+min;
				}
	//				console.log('time3',min,sec)
				$("#outerSlides .present .timeElapsed").text(min+":"+sec);
				if(totalTime <= 0 && recording_on){
					clearInterval(audioTimer);
					console.log('timer end')
					$("#outerSlides .present #record").click();
					recording_on = false;
					allowKeydown = false;
					$('#bottomBarButton').attr('isDisable','false');
					return;
				}
			},1000);
			var timeElapsed = 0;
			var questionTime = totalTime*1000;
			audioAnswerTimer = setInterval(function(){
				timeElapsed += 10;
				var value = timeElapsed*100/questionTime;
				drawTimer(value);
				if(questionTime - timeElapsed <= 3000){
					$("#outerSlides .present .timer > #slice > .pie").css("border","10px solid #FE5C57");
					$("#outerSlides .present .timer > #slice > .pie").css("background-color","#FE5C57");
				}
				if(timeElapsed >= questionTime){
					clearInterval(audioAnswerTimer);
				}
			},10);
				
		}
	}
});

$(document).keyup(function(evt) {
	isKeydown = false
	if (audioPlaying)
		return
	if (evt.keyCode == 32 && recording_on) {
		evt.preventDefault();
		stopRecording();
	}
	if (evt.keyCode == 32) {
		if (!tryAgainEnabled) {
			allowKeydown = false;
		} else if(readyForKeydown) {
			allowKeydown = true;
		}
	}
});

function stopRecording() {
	if (exited)
		return;
	clearInterval(audioTimer);
	clearInterval(audioAnswerTimer);
	console.log('keyup');
	$("#outerSlides .present #record").click();
	recording_on = false;
	$('#mictestmic').removeClass('pulsate')
	if (!micTesting && TestType!='C' && totalTime == (parseInt(dataArray.questions[setWiseQuestionCounter-1].Length))) {
		totalTime = parseInt(dataArray.questions[setWiseQuestionCounter-1].Length);
		drawTimer(0);
		var sec = parseInt(totalTime%60);
		var min = parseInt(totalTime/60);
		if(sec < 10){
			sec = "0"+sec;
		}
		if(min < 10){
			min = "0"+min;
		}
		console.log('time4',min,sec)
		$("#outerSlides .present .timeElapsed").text(min+":"+sec);	
		alert('Hold spacebar and speak');
		displayResult = false;
	}
	else {
		$('.timer').addClass('rotate');
		$(".fetchingScores").text("Uploading...");
		$('.fetchingScores').css('visibility','visible');
		$('#mictestmic').addClass('loader')
		$('#mictest_result').html('Fetching result...');
		$('#bottomBarButton').attr('isDisable','false');
	}
}
function enableRec() {
	$('.holdSpacebar').css('visibility','visible');
	audioPlaying = false;
	allowKeydown = true;
}
function playAudioforAudioSlide(number){
	console.log('playingaudio');
	var audio = $('#audio'+number)[0];
	audio.addEventListener('ended', function (error) {
		console.log('ended',error);
		enableRec();
	});
	audio.addEventListener('error', function (error) {
		console.log('error', error);
		enableRec();
	});
	audio.addEventListener('interruptend', function (error) {
		console.log('interruptend', error);
		enableRec();
	});
	if (audioTest) {
		if(audio.duration > 0){
			audio.load();
			audio.play();
		}else{
			audio.load();
			audio.play();
		}
		audioPlaying = true;
		allowKeydown - false;
	} else {
		allowKeydown = true;
		audioPlaying = false;
	}
	$("#outerSlides .present .countDownDiv").css("display","none");
}

function NextTestSlideSpeaking(){
	console.log("in NextTestSlideSpeaking");
	$('.holdSpacebar').css('visibility','hidden');
	readyForKeydown = false;
	tryAgainCount = 0;
	if (useLanguageModel) {
		PS_config.pop()
		PS_config.push(['-lm','./'+dataArray.questions[setWiseQuestionCounter].Model])
		initializePocketPhinx(  
		{
			config: PS_config,
			lazyLoadData: lazyLoadData
		},
		function (argument) {
			console.log('new LM loaded');
		},
		function (result, original) {
			getResultE(result, original);
		}
		);
	}

	if(audioTest)
		allowKeydown = false;

	if(setWiseQuestionCounter >= dataArray.questions.length){
		// loadTestData();
		allowKeydown = false;
		readyForKeydown = false;
		loadNextSetTestData();
		
		// showSectionInstruction(index);
		setCounter++;
		setWiseQuestionCounter = 1;
		$('.attemptCount').html('This is a sample question');
		return;
	}
	
	$('.attemptCount').html('');
	
	currentQuestionNumber++;
	setWiseQuestionCounter++;
	$(".questionCounterText").text("Part "+TestType+": "+setWiseQuestionCounter+"/"+dataArray.questions.length);
	if(audioTimer != null){
		clearInterval(audioTimer);
	}
	if (!audioTest) {
		playAudioforAudioSlide(currentQuestionNumber);
		$(".countDownDiv").css("display","none");
		$('.holdSpacebar').css('visibility','visible');
		readyForKeydown = true;
	} else {
		var counter = 3;
		audioTimer = setInterval(function(){
			if(counter == 0){
				clearInterval(audioTimer);
				playAudioforAudioSlide(currentQuestionNumber);
				readyForKeydown = true;
			}else{
				counter--;
				$("#outerSlides .present .countDownDiv table .countDown").text(counter);
			}
		},1000);
	}
	$('#bottomBarButton').attr('isDisable','true');
	$("#bottomBarButton").css('opacity',0.5);
	$("#bottomBarButton").attr('disabled',true);
}

function startAudioTest(){
	console.log("in startAudioTest");
	$('.timer').removeClass('rotate');
	$('.fetchingScores').css('visibility','hidden');
	if (!useGoogleSpeech)
		if (!isPSLoaded()) {
			alert('not yet');
			return;
		}




		currentQuestionNumber++;
		setCounter++;
		$(".questionCounterText").text(setWiseQuestionCounter+" of "+dataArray.questions.length);
		$(".instructionDiv").css("display","none");
		$("#bottomInstButton").html("");
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").css("display","");
		Reveal.slide(currentQuestionNumber-1);

		$(".questionCounterText").text("Part "+TestType+": "+setWiseQuestionCounter+"/"+dataArray.questions.length);
		if (!audioTest) {
			clearInterval(audioTimer);
			playAudioforAudioSlide(currentQuestionNumber);
			readyForKeydown = true;
		} else {
			var counter = 3;
			audioTimer = setInterval(function(){
				if(counter == 0){
					clearInterval(audioTimer);
					readyForKeydown = true;
					playAudioforAudioSlide(currentQuestionNumber);
				}else{
					counter--;
					$("#outerSlides .present .countDownDiv table .countDown").text(counter);
				}
			},1000);
		}

		$('#bottomBarButton').attr('isDisable','true');
		$("#bottomBarButton").css('opacity',0.5);
		$("#bottomBarButton").attr('disabled',true);

//	for(var i=currentQuestionNumber;i<currentQuestionNumber+testSetQuestionCount;i++){
//		if(dataArray["examType"].toLowerCase() == "vocabulary" ||
//				dataArray["examType"].toLowerCase() == "grammar"){
//			lessonFunctionCallVar[i-1] = new SlideType_Missing_Word_Function1("slide"+(i+1),dataArray);
//		}
//	}

}

function showExitInstructions(index){
	console.log("in showExitInstructions");
	var html = '<div style="font-size: 32px;text-align: center;padding: 20px;">Please wait while your scores are being uploaded</div>'+
	'<ul style="font-size: 20px;padding: 20px;">Do not close this window, or press the back button.</ul>';
	var buttonHtml='<input onclick=\'startAudioTest();\''+
	'class="greenButton appStringValue" type="button" value="OK"'+
	'style="position: absolute; right: 12px; margin-top: 25px;z-index:100000;" />';

	$(".instructionDiv").html(html);
	$("#bottomInstButton").html(buttonHtml);
	$(".instructionDiv").css("display","block");
	$(".questionCounterText").text('Section Instructions');
	$("#disableBottomBarButton").css("display","none");
	$("#bottomBarButton").css("display","none");
	$("#bottomInstButton").css("display","none");
	allowKeydown = false;
	readyForKeydown = false;
	exited = true;

	var todate = new Date().toISOString().slice(0,10);
	$.ajax({
		url : 'https://helloenglish.com/saveUserFinalTestData.action?'+
					'email='+email+
					'&section='+TestType+
					'&numberOfQuestion='+dataArray.questionCount+
					'&date='+todate,
		// url : 'https://localhost:8050/test/sectionFinished',
		dataType: 'json',
		success : function(result) {
			console.log(result);
			var html = '<div style="font-size: 32px;text-align: center;padding: 20px;">Completed Part '+TestType+' of today\'s homework.</div>'+
			'<ul style="font-size: 20px;padding: 20px;">Please go back and take other homework tasks.</ul><br><button onclick="window.parent.closeLessonIframe()" class="greenButton">Go back</button>';
			$(".instructionDiv").html(html);
		}
	});	
}

function showSectionInstructionSpeaking(inst){
	console.log("in showSectionInstructionSpeaking");
	var html = '<div style="font-size: 32px;text-align: center;padding: 20px;">Section '+TestType+'</div>'+
	'<ul style="font-size: 16px;padding: 20px;">'+inst+'</ul>';
	var buttonHtml='<input onclick=\'startAudioTest();\''+
	'class="greenButton appStringValue" type="button" value="OK"'+
	'style="position: absolute; right: 12px; margin-top: 25px;z-index:100000; background: #e7e7e7!important;" />';
	
	$(".instructionDiv").html(html);
	$("#bottomInstButton").html(buttonHtml);
	if(isPSLoaded() || useGoogleSpeech) {
		$('.greenButton').css('background','none');
	}
	$(".instructionDiv").css("display","block");
	$(".questionCounterText").text('Section Instructions');
	$("#disableBottomBarButton").css("display","none");
	$("#bottomBarButton").css("display","none");
	$("#bottomInstButton").css("display","block");
	
}

function updateTestStatus(status){
	$.ajax({
		url : 'http://helloenglish.com/saveTestAppCompletionData.action',
		data : {
			testId : testId,
			testStatus : status
		},dataType:"json",
		success : function(result) {
			console.log("result",result);
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

function closeTest(){
	window.parent.$(".iframe-shadow").removeClass("slideInRight animated");
	window.parent.$(".iframe-" +
	                "shadow").addClass("slideOutRight animated");
	
	window.parent.$('#iframe').attr('src', '');
	window.parent.$(".iframe-shadow,.iframe-shadow-container").css("display","none");
	window.parent.$(".iframe-shadow").css("background-color","#a788ae");
	window.parent.$(".iframe-shadow").removeClass("slideOutRight animated");
}

function debugWavFile(data) {
  var idx = recorder.consumers.indexOf(audioDebugger);
  if(idx > -1) {
  	recorder.consumers.splice(idx, 1);
  }
  
  audioDebugger = null;
  
  wavblob = new Blob([data], { type: 'audio/wav' });

  var url = URL.createObjectURL(wavblob);
  
  var markup = ['<audio controls>',
  '<source src="', url, '" type="audio/wav" /></audio><br />',
  ];
  
  console.log(markup.join(''));
  $('.lastWavUrl').html(markup.join(''));
}

function startButton() {
	console.log("in startButton");
	console.log('isMicEnabled',isMicEnabled)
	console.log('recognizing',recognizing)
	if(!isMicEnabled){
		return;
	}
	if(recognizing){
		recorder.stop();
		isMicEnabled = true;
		$(".micStatus").text("Processing...");
		$(".micButton").removeClass("colorAnimation pulse animated infiniteIteration");
		$(".micButton").css("background","#fff");
		googleListening = false;
		recognizing = false;
    // recognition.stop();
    console.log(TestType, dataArray.questions[setWiseQuestionCounter-1], wavblob, URL.createObjectURL(wavblob));
    if (micTesting)
    	micTestUpload(wavblob);
    else{
    	uploadAudioFile("audio_"+dataArray.questions[setWiseQuestionCounter-1]["qid"]+".wav",wavblob,testId.toLowerCase(),email.toLowerCase());
    	//getPSScores(TestType, dataArray.questions[currentRecordingId], wavblob);
    }
  }else{
  	recognizing = true;
  	isMicEnabled = false;
  	console.log('recorder',recorder);
  	recorder.start(0);
    // recognition.lang = "en-IN";
    // recognition.start();
    isMicEnabled = true;
    $(".micButton").removeClass("tanslateMic");
    $(".micButton").addClass("colorAnimation pulse animated infiniteIteration");
    //showNextQuestion();  
  }
}

function uploadAudioFile(fileName,wavblob,testId,userId){
	console.log("in uploadAudioFile");
	var formData = new FormData();
    formData.append("uploadedFile", wavblob);
    if(!formData.has('uploadedFile')){
    	 formData.append("uploadedFile", wavblob);
    }
    formData.append("userId",userId);
    formData.append("testId",testId);
    formData.append("filename",fileName);
    
	$(".loading").css('display','block');
	$.ajax({
	url: "https://mail.culturealley.com/english-app/utility/TestAppUploadFileToS3.php",
	type: "POST",
	data:  formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(dataNew){
		console.log(dataNew);
		try {
			var response = JSON.parse(dataNew);
			$(".fetchingScores").text("Uploading...");
			$(".loading").css('display','none');
			if(response["response"]){
	 	       	console.log("FILE SAVED!!");
	 	       $("#bottomBarButton").css('opacity',1);
	 	       	$("#bottomBarButton").attr('disabled',false);
			}else{
				blobArr.push(wavblob);
		        console.log("File NOT SAVED!!"+response);
		    }
			$('.timer').removeClass('rotate');
			$('.fetchingScores').css('visibility','hidden');
		} catch (e) {
			$(".fetchingScores").text("Error occured, please try again!");
			$('.timer').removeClass('rotate');
		}
		
	     
	},
	error: function(a, b, c) {
		console.log('error:', a, b, c);
		$(".loading").css('display','none');
	}	
	 
	});
}


function writeSummaryToTable(summary) {
	console.log("in writeSummaryToTable");
	if (displayResult) {
		$('.tempresult').remove();
		var keys = Object.keys(summary.scoreDetails)
		if (keys.length==0 || TestType=='C') {
			$('.resultsTable').css('display','none');
		} else {
			$('.resultsTable').css('display','table');
		}
		if (summary.questionHTML.toLowerCase().indexOf('often') > -1)
			summary.tips.push('The word “often” can be pronounced with a silent “t” (the more common pronunciation) or with an audible “t.” Both are correct, according to The American Heritage Dictionary of the English Language.')
		if (summary.tips !=undefined){
			for(i=0;i<summary.tips.length;i++) {
			$('.tips > ul').append('<li class="tempresult">'+summary.tips[i]+'</li>')
			}
		}
		if (summary.specialScores !=undefined){
		$('.specialScores').html(summary.specialScores);
		}
		if (summary.specialScoresDebug !=undefined){
			console.log("specialScoresDebug");
			console.log(summary.specialScoresDebug);
			}

		
		for(i=0;i<keys.length;i++) {
			$('.resultsTable > tbody > tr.heading').append('<th class="tempresult">'+keys[i]+'</th>')
			$('.resultsTable > tbody > tr.max').append('<td class="tempresult">'+summary.scoreDetails[keys[i]].max+'</td>')
			$('.resultsTable > tbody > tr.score').append('<td class="tempresult">'+summary.scoreDetails[keys[i]].score+'</td>')
		}
		$('.resultText').html(summary.questionHTML);
		$('.resultSummary').css('display','flex');
		readyForKeydown = false;
		allowKeydown = false;
	}
}

function dismissSummary() {
	$('.resultSummary').css('display','none');
}

function goToNextSlide() {
	console.log("in goToNextSlide");
	dismissSummary();
	NextTestSlideSpeaking();
	Reveal.navigateNext();
	$('input.tryAgain').attr('disabled',false);
	$('input.tryAgain').css('opacity','1');
	$('.attemptCount').html('Attempt 1 of 3');
}

function tryAgain(evt) {
	tryAgainCount++;
	console.log(evt);
	if (tryAgainCount==2) {
		evt.disabled = true;
		$(evt).css('opacity','0.2');
	}
	dismissSummary();
	readyForKeydown = true;
	allowKeydown = true;
	$('.attemptCount').html('Attempt '+(tryAgainCount+1)+' of 3');
}

function getPSScores(testType, question, audioFile) {
	console.log("in getPSScores");
	curtime = String(Date.now());
	form = new FormData();
	form.append('email', email);
	form.append('dataSource', 'teleperformanceTest_'+testType);
	form.append('googlefilter', true);
	form.append('question', JSON.stringify(question));
	form.append('audioFile',audioFile,'tele_'+curtime+'.wav');
	
	audiorequest.open("POST", "https://voice2.helloenglish.com/test/");
//	 audiorequest.open("POST", "https://e62426b3.ngrok.io/test/");

	audiorequest.onreadystatechange=function() {
		if (audiorequest.readyState==4) {
			//alert the user that a response now exists in the responseTest property.
			console.log(audiorequest.responseText);
			// And to view in firebug
			scores = JSON.parse(audiorequest.responseText);
			// writeSummaryToTable({'resultText':question.Answer,'scoreDetails':scores.scores,'tips':[]})
			writeSummaryToTable(scores.success);
			$('.timer').removeClass('rotate');
			$('.fetchingScores').css('visibility','hidden');
			console.log('xhr',audiorequest);
			
			$(".playFile").attr("src","https://storage.helloenglish.com/English-Web/images/ic_volume_up_black_24dp_2x.png");
			$(".playFile").css("width","18px");
			$(".playFile").css("float","right");
		}
	}
	audiorequest.send(form);
}

function playAudioFile(fileName){
	console.log("in playAudioFile");
	 var obj = document.createElement("audio"); 
     obj.setAttribute("src", "https://s3.amazonaws.com/language-practice/English-App/PhoneticAudios/"+fileName);
     obj.load();
     obj.play(); 
}

function playWordFile(processedText){
	console.log("in playWordFile");
	 var obj = document.createElement("audio"); 
	 processedText = processedText.trim();
	 processedText = removeSpecialCharacter(processedText);
	 processedText = decodeURI(processedText);
	 obj.setAttribute("src",'https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text='+processedText+'&locale='+window.parent.defaultLocale);
     obj.load();
     obj.play();
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

function micTestUpload(audioFile) {
	console.log("In micTestUpload ");
	curtime = String(Date.now())
	form = new FormData()
	form.append('string',$('#mictestString').html());
	form.append('audioFile',audioFile,'tele_'+curtime+'.wav')
	audiorequest.open("POST", "https://voice2.helloenglish.com/test/mictest/");
	audiorequest.onreadystatechange=function() {
		if (audiorequest.readyState==4) {
			console.log(audiorequest.responseText);
			scores = JSON.parse(audiorequest.responseText);
			$('.lastWavUrl').css('visibility','visible');
			$('#mictestmic').removeClass('pulsate');
			$('#mictestmic').removeClass('loader');
			if (scores.success) {
				console.log("In micTestUpload if");
				$('#mictest_result').html('Heard correctly. Please click on "PROCEED".');
				$('#proceedFromMicTestButton').css('visibility','visible');
				$('#proceedFromMicTestButton').prop('disabled','');
			} else {
				$('#mictest_result').html('Didn\'t hear you. Please try again.');
			}
			console.log('xhr',audiorequest)
	 	}
	}
	audiorequest.send(form);
}

function proceedFromMicTest() {
	console.log("in proceedFromMicTest");
	readyForKeydown = false;
	allowKeydown = false;
	micTesting = false;
	$('.loadingbanner').css('opacity','0')
	setTimeout(function() {
		$('.loadingbanner').css('display', 'none');
  }, 500);		
}


function showErrorInWindow(err) {
  $('#recorderErrorContainer').css('display','flex');
  $('#recorderError').html(err);
}

function dismissRecorderError() {
	$('#recorderErrorContainer').css('display','none');
	readyForKeydown = true;
	allowKeydown = true;
}

function noErrorInRecorder() {
  $('#recorderError').css('display','none');
	$('#recorderNoError').css('display','block');
}
