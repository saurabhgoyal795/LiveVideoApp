var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// At least Safari 3+: "[object HTMLElemesntConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
var soundmanagerReadyFlag =0 ;
var playSlideSoundOnceFlag = 0;
var setTimeoutForJellySlide;
var tipPopUpDiv_Title_Correct = "Great Job";
var tipPopUpDiv_Title_InCorrect = "try Again";
var courseId = 0;
var isLoggedIn = false;
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
var currentSlideNo = 0;
var language = "hindi";

$(function(){

	// SoundManager Setup
	soundManager.setup({
		  url: '../../../SoundManager/swf/',
		  preferFlash: false,debugMode:false,
		  onready: function() {
			  soundmanagerReadyFlag = 1;
				soundManager.createSound({
					id : 'coin',
					url : 'sounds/coin_sound.mp3'
				});
				soundManager.createSound({
					id : 'coin_correctsound',
					url : 'sounds/coins.mp3'
				});
				soundManager.load('coin_correctsound');
				
				soundManager.createSound({
					id : 'coin_incorrectsound',
					url : 'sounds/wrong_answer.mp3'
				});
				soundManager.load('coin_incorrectsound');
				
				soundManager.createSound({
					id : 'slide_transition',
					url : 'sounds/slide_transition.mp3'
				});
				soundManager.load('slide_transition');
				
				soundManager.createSound({
					id : 'tap_sound',
					url : 'sounds/popup_sound.mp3'
				});
				soundManager.load('tap_sound');
				
				soundManager.createSound({
					id : 'pounce_end_30',
					url : 'sounds/pounce_end_30.mp3'
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
	$("#bottomBarButton").attr("check","CHECK");
	
	for(var i=0;i<TTSWordsArray.length;i++){
		loadAudio(TTSWordsArray[i],i+1);
	}
});	

function bottomBarButtonClicked(){
	if($(this).attr("isDisable") == "true"){return;}
	if(isInitialTest){
		if(correctFlag == 1){
			userAnswerArray.push(1);
		}else{
			userAnswerArray.push(2);
		}
		correctFlag = 1;
		var nextSlide = parseInt($(Reveal.getCurrentSlide()).attr("slideNumber"),10);
		console.log("nextSlide: "+nextSlide);
		var bundleNo = 0;
		var bundleIndex = userAnswerArray.length/5;
		if(userAnswerArray.length%5 == 0){
			var score = 0;
			for(var i=(bundleIndex-1)*5;i<userAnswerArray.length;i++){
				if(userAnswerArray[i]==1){
					score++;
				}
			}
			console.log("bundleIndex: "+bundleIndex);
			bundleNo = initialTestScorePerBundle[bundleIndex-1];
			console.log("bundleNo: "+bundleNo);
			if(bundleNo != -1){
				if(score >= 3){
					nextSlide =  initialTestOutCondition[bundleNo][2]*5 + 1;
					initialTestScorePerBundle[bundleIndex] = initialTestOutCondition[bundleNo][2];
					console.log("initialTestScorePerBundle[bundleIndex]: "+initialTestScorePerBundle[bundleIndex]);
					if(initialTestOutCondition[bundleNo][2] == -1){
						initialTestRecLevel = parseInt(initialTestOutCondition[bundleNo][1])+1;
					}else{
						initialTestRecLevel = initialTestOutCondition[initialTestOutCondition[bundleNo][2]][0];
					}
				}else{
					nextSlide =  initialTestOutCondition[bundleNo][3]*5 + 1;
					initialTestScorePerBundle[bundleIndex] = initialTestOutCondition[bundleNo][3];
					console.log("initialTestScorePerBundle[bundleIndex]: in else"+initialTestScorePerBundle[bundleIndex]);
					
					if(initialTestOutCondition[bundleNo][3] == -1){
						initialTestRecLevel = initialTestOutCondition[bundleNo][0];
					}else{
						initialTestRecLevel = initialTestOutCondition[initialTestOutCondition[bundleNo][3]][0];
					}
				}
			}else{
				
			}
			
		}
		console.log("nextSlide: "+nextSlide);
		console.log("initialTestRecLevel: "+initialTestRecLevel);
		console.log("userAnswerArray length: "+userAnswerArray.length);
		setTimeout(function(){
			if(initialTestScorePerBundle[bundleIndex] != -1){
				Reveal.slide(nextSlide);
			}else{
				Reveal.slide($("#outerSlides section").length-1);
			}
//			playSlideTransitionSound();
//			callOnNextSlide();
		},1000);
	}else{
		//Reveal.navigateNext();
	}
	console.log("at last");
}

function playCorrectSound(){
	currentSlideNo = parseInt($(Reveal.getCurrentSlide()).attr("slideNumber"),10) + 1;
	soundManager.play('coin_correctsound');
}

function playInCorrectSound(){
	$(".bottomBarNotificationText div").css("display","inline-block");
	$(".bottomBarNotificationText div").addClass("bounceInRight animated");
	if(viewportwidth < 500){
		$(".forumLink").css("display","none");
	}
	soundManager.play('coin_incorrectsound');
}
function playSlideTransitionSound(){
	soundManager.play('slide_transition');
}

function playTapSound(){
	soundManager.play('tap_sound');
}


// This functions is called from everywhere ,to play TTS  
function playAudio(text, language) {
	console.log("play at start : "+text);
	/*
	text = text.trim();
	temx = removeSpecialCharacter(text);
	text = text.replace("%","percent1");
	var processedText = decodeURI(text);
	processedText = processedText.replace("percent1","%");
	if(processedText in soundWords){
		processedText = soundWords[processedText];
	}
//	stopAllAudio();
	var found = false;
	$(".audio").each(function(){
		if( removeSpecialCharacter($(this).attr("text").replace(/\s+/g, '')) == processedText.trim().replace(/\s+/g, '')){
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
		text=text.trim();
		text=text.replace("%","percent1");
		var processedText = decodeURI(text);
		processedText = processedText.replace("percent1","%");
		var number = $('.audioDiv').children().size();
		$(".audioDiv").append('<audio class="audio audio'+number+'" text="'+processedText.trim()+'" style="display:none;"><source class="source source'+number+'" src="" type="audio/mp3"></source></audio>');
		
		var x = $('.audio'+number)[0];
		var source = $('.source'+number);
		console.log("play :",processedText);
//		source.attr("src",'https://voice.helloenglish.com/file/'+window.parent.defaultLocale+'/'+processedText);
		source.attr("src",'https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text='+processedText+'&locale='+window.parent.defaultLocale);
		x.load();
		x.play();
	}
	*/
	
//	var x = document.getElementById("audio"); 
//	var source = document.getElementById("mp3_src");
//    source.src='https://voice.helloenglish.com/file/'+processedText;
//    x.load();
//	x.play();
	
//	var translatedWordlanguage = bcp47CodeForLanguage(language);
//	var mySoundObject = soundManager.createSound({
////		url: "//mail.culturealley.com/ttsCultureAlley.php?tl="+translatedWordlanguage+"&q="+encodeURIComponent(processedText);
//		url: "https://192.168.1.4:3000/file/"+encodeURIComponent(processedText),
//		autoLoad: true,
//		autoPlay: true,
//		onload: function() {
//			alert('The sound '+this.id+' loaded!');
//		}
//	});
	
}

function loadAudio(text,number){
	/*
	text=text.toLowerCase().trim();
	text=text.replace("%","percent1");
	var processedText = decodeURI(text);
	processedText = processedText.replace("percent1","%");
	
	$(".audioDiv").append('<audio class="audio audio'+number+'" text="'+processedText.toLowerCase().trim()+'" style="display:none;"><source class="source source'+number+'" src="" type="audio/mp3"></source></audio>');
	
	var x = $('.audio'+number)[0];
	var source = $('.source'+number);
//	source.attr("src",'https://voice.helloenglish.com/file/'+window.parent.defaultLocale+'/'+processedText);
	try{
		source.attr("src",'https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text='+processedText+'&locale='+window.parent.defaultLocale);
	}catch(err){}
	x.load();
	*/
}

function stopAllAudio(){
	$.each($('audio'), function () {
		//this.currentTime = 0;
	    this.pause();
	});
}

// To hide translation Blue popup
function closepopUpHighlightDiv() {
	
	if($( "#translationPopup" ).css("display")=="block") {
		$( "#translationPopup" ).css("display","none");
	}
	
}

// Remove All Special Characters to match strings
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
		
//		while(dataString.toLowerCase().indexOf("<name>") > -1){
//			dataString = dataString.replace("<name>", "<span class='mynameClass variableClassForUrdu'></span>");
//			dataString = dataString.replace("<NAME>", "<span class='mynameClass variableClassForUrdu'></span>");
////			dataString = "<span>" + dataString.substr(0,dataString.indexOf("<name>")) + "</span>"+
////			"<name>" + "<span>" + dataString.substr(dataString.indexOf("<name>")+6,dataString.length-1) + "</span>";
//		}
		while(dataString.toLowerCase().indexOf("<friend-name>") > -1){
			dataString = dataString.replace("<friend-name>", "<span class='myfriendnameClass variableClassForUrdu'></span>");
			dataString = dataString.replace("<FRIEND-NAME>", "<span class='myfriendnameClass variableClassForUrdu'></span>");
		}
		
		//replace default strings
		
		while(dataString.toLowerCase().indexOf("<name>") > -1 || dataString.toLowerCase().indexOf("<name-static>") > -1){
			dataString = dataString.replace("<name>", appStringObject["1895"]);
			dataString = dataString.replace("<name-static>", appStringObject["1895"]);
		}
		while(dataString.toLowerCase().indexOf("<country-name-static>") > -1 || dataString.toLowerCase().indexOf("<country-name>") > -1){
			dataString = dataString.replace("<country-name-static>", appStringObject["1896"]);
			dataString = dataString.replace("<country-name>", appStringObject["1896"]);
		}
		while(dataString.toLowerCase().indexOf("<country-nationality>") > -1){
			dataString = dataString.replace("<country-nationality>", appStringObject["1897"]);
		}
		while(dataString.toLowerCase().indexOf("<capital-city-name>") > -1){
			dataString = dataString.replace("<capital-city-name>", appStringObject["1898"]);
		}
		while(dataString.toLowerCase().indexOf("<country-currency>") > -1){
			dataString = dataString.replace("<country-currency>", appStringObject["1899"]);
		}
		while(dataString.toLowerCase().indexOf("<country-language-name>") > -1){
			dataString = dataString.replace("<country-language-name>", appStringObject["1900"]);
		}
		while(dataString.toLowerCase().indexOf("<language-name2>") > -1){
			dataString = dataString.replace("<language-name2>", appStringObject["1901"]);
		}
		while(dataString.toLowerCase().indexOf("<language-name3>") > -1){
			dataString = dataString.replace("<language-name3>", appStringObject["1902"]);
		}
		while(dataString.toLowerCase().indexOf("<state-name>") > -1){
			dataString = dataString.replace("<state-name>", appStringObject["1903"]);
		}
		while(dataString.toLowerCase().indexOf("<company-name>") > -1){
			dataString = dataString.replace("<company-name>", appStringObject["1904"]);
		}
		while(dataString.toLowerCase().indexOf("<actor-name>") > -1){
			dataString = dataString.replace("<actor-name>", appStringObject["1905"]);
		}
		while(dataString.toLowerCase().indexOf("<actor-surname>") > -1){
			dataString = dataString.replace("<actor-surname>", appStringObject["1906"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-name>") > -1){
			dataString = dataString.replace("<actress-name>", appStringObject["1907"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-surname>") > -1){
			dataString = dataString.replace("<actress-surname>", appStringObject["1908"]);
		}
		while(dataString.toLowerCase().indexOf("<businessman-name>") > -1){
			dataString = dataString.replace("<businessman-name>", appStringObject["1909"]);
		}
		while(dataString.toLowerCase().indexOf("<businessman-surname>") > -1){
			dataString = dataString.replace("<businessman-surname>", appStringObject["1910"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-name2>") > -1){
			dataString = dataString.replace("<actress-name2>", appStringObject["1911"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-surname2>") > -1){
			dataString = dataString.replace("<actress-surname2>", appStringObject["1912"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name-static>") > -1 || dataString.toLowerCase().indexOf("<city-name>") > -1){
			dataString = dataString.replace("<city-name-static>", appStringObject["1913"]);
			dataString = dataString.replace("<city-name>", appStringObject["1913"]);
		}
		while(dataString.toLowerCase().indexOf("<city-area>") > -1){
			dataString = dataString.replace("<city-area>", appStringObject["1914"]);
		}
		while(dataString.toLowerCase().indexOf("<city-landmark>") > -1){
			dataString = dataString.replace("<city-landmark>", appStringObject["1915"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name1>") > -1){
			dataString = dataString.replace("<city-name1>", appStringObject["1916"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name2>") > -1){
			dataString = dataString.replace("<city-name2>", appStringObject["1917"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name3>") > -1){
			dataString = dataString.replace("<city-name3>", appStringObject["1918"]);
		}
		while(dataString.toLowerCase().indexOf("<female-name>") > -1){
			dataString = dataString.replace("<female-name>", appStringObject["1919"]);
		}
		while(dataString.toLowerCase().indexOf("<female-surname>") > -1){
			dataString = dataString.replace("<female-surname>", appStringObject["1920"]);
		}
		while(dataString.toLowerCase().indexOf("<female-name2>") > -1){
			dataString = dataString.replace("<female-name2>", appStringObject["1921"]);
		}
		while(dataString.toLowerCase().indexOf("<female-name3>") > -1){
			dataString = dataString.replace("<female-name3>", appStringObject["1922"]);
		}
		while(dataString.toLowerCase().indexOf("<male-name>") > -1){
			dataString = dataString.replace("<male-name>", appStringObject["1923"]);
		}
		while(dataString.toLowerCase().indexOf("<male-surname>") > -1){
			dataString = dataString.replace("<male-surname>", appStringObject["1924"]);
		}
		while(dataString.toLowerCase().indexOf("<male-name2>") > -1){
			dataString = dataString.replace("<male-name2>", appStringObject["1925"]);
		}
		while(dataString.toLowerCase().indexOf("<male-name3>") > -1){
			dataString = dataString.replace("<male-name3>", appStringObject["1926"]);
		}
		while(dataString.toLowerCase().indexOf("<friend-name-static>") > -1 || dataString.toLowerCase().indexOf("<friend-name>") > -1){
			dataString = dataString.replace("<friend-name-static>", appStringObject["1927"]);
			dataString = dataString.replace("<friend-name>", appStringObject["1927"]);
		}
		while(dataString.toLowerCase().indexOf("<foreigncountry-name>") > -1){
			dataString = dataString.replace("<foreigncountry-name>", appStringObject["1928"]);
		}
		while(dataString.toLowerCase().indexOf("<smallcar-name>") > -1){
			dataString = dataString.replace("<smallcar-name>", appStringObject["1929"]);
		}
		while(dataString.toLowerCase().indexOf("<famousmale-name>") > -1){
			dataString = dataString.replace("<famousmale-name>", appStringObject["1930"]);
		}
		//end
		
		//replace default native strings
		while(dataString.toLowerCase().indexOf("<name-static-native>") > -1 || dataString.toLowerCase().indexOf("<name-native>") > -1){
			dataString = dataString.replace("<name-static-native>", appStringObject["1931"]);
			dataString = dataString.replace("<name-native>", appStringObject["1931"]);
		}
		while(dataString.toLowerCase().indexOf("<country-name-native>") > -1 || dataString.toLowerCase().indexOf("<country-name-static-native>") > -1){
			dataString = dataString.replace("<country-name-native>", appStringObject["1932"]);
			dataString = dataString.replace("<country-name-static-native>", appStringObject["1932"]);
		}
		while(dataString.toLowerCase().indexOf("<country-nationality-native>") > -1){
			dataString = dataString.replace("<country-nationality-native>", appStringObject["1933"]);
		}
		while(dataString.toLowerCase().indexOf("<capital-city-name-native>") > -1){
			dataString = dataString.replace("<capital-city-name-native>", appStringObject["1934"]);
		}
		while(dataString.toLowerCase().indexOf("<country-currency-native>") > -1){
			dataString = dataString.replace("<country-currency-native>", appStringObject["1935"]);
		}
		while(dataString.toLowerCase().indexOf("<country-language-name-native>") > -1){
			dataString = dataString.replace("<country-language-name-native>", appStringObject["1936"]);
		}
		while(dataString.toLowerCase().indexOf("<language-name2-native>") > -1){
			dataString = dataString.replace("<language-name2-native>", appStringObject["1937"]);
		}
		while(dataString.toLowerCase().indexOf("<language-name3-native>") > -1){
			dataString = dataString.replace("<language-name3-native>", appStringObject["1938"]);
		}
		while(dataString.toLowerCase().indexOf("<state-name-native>") > -1){
			dataString = dataString.replace("<state-name-native>", appStringObject["1939"]);
		}
		while(dataString.toLowerCase().indexOf("<company-name-native>") > -1){
			dataString = dataString.replace("<company-name-native>", appStringObject["1940"]);
		}
		while(dataString.toLowerCase().indexOf("<actor-name-native>") > -1){
			dataString = dataString.replace("<actor-name-native>", appStringObject["1941"]);
		}
		while(dataString.toLowerCase().indexOf("<actor-surname-native>") > -1){
			dataString = dataString.replace("<actor-surname-native>", appStringObject["1942"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-name-native>") > -1){
			dataString = dataString.replace("<actress-name-native>", appStringObject["1943"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-surname-native>") > -1){
			dataString = dataString.replace("<actress-surname-native>", appStringObject["1944"]);
		}
		while(dataString.toLowerCase().indexOf("<businessman-name-native>") > -1){
			dataString = dataString.replace("<businessman-name-native>", appStringObject["1945"]);
		}
		while(dataString.toLowerCase().indexOf("<businessman-surname-native>") > -1){
			dataString = dataString.replace("<businessman-surname-native>", appStringObject["1946"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-name2-native>") > -1){
			dataString = dataString.replace("<actress-name2-native>", appStringObject["1947"]);
		}
		while(dataString.toLowerCase().indexOf("<actress-surname2-native>") > -1){
			dataString = dataString.replace("<actress-surname2-native>", appStringObject["1948"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name-static-native>") > -1 || dataString.toLowerCase().indexOf("<city-name-native>") > -1){
			dataString = dataString.replace("<city-name-static-native>", appStringObject["1949"]);
			dataString = dataString.replace("<city-name-native>", appStringObject["1949"]);
		}
		while(dataString.toLowerCase().indexOf("<city-area-native>") > -1){
			dataString = dataString.replace("<city-area-native>", appStringObject["1950"]);
		}
		while(dataString.toLowerCase().indexOf("<city-landmark-native>") > -1){
			dataString = dataString.replace("<city-landmark-native>", appStringObject["1951"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name1-native>") > -1){
			dataString = dataString.replace("<city-name1-native>", appStringObject["1952"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name2-native>") > -1){
			dataString = dataString.replace("<city-name2-native>", appStringObject["1953"]);
		}
		while(dataString.toLowerCase().indexOf("<city-name3-native>") > -1){
			dataString = dataString.replace("<city-name3-native>", appStringObject["1954"]);
		}
		while(dataString.toLowerCase().indexOf("<female-name-native>") > -1){
			dataString = dataString.replace("<female-name-native>", appStringObject["1955"]);
		}
		
		while(dataString.toLowerCase().indexOf("<female-surname-native>") > -1){
			dataString = dataString.replace("<female-surname-native>", appStringObject["1956"]);
		}
		while(dataString.toLowerCase().indexOf("<female-name2-native>") > -1){
			dataString = dataString.replace("<female-name2-native>", appStringObject["1957"]);
		}
		while(dataString.toLowerCase().indexOf("<female-name3-native>") > -1){
			dataString = dataString.replace("<female-name3-native>", appStringObject["1958"]);
		}
		while(dataString.toLowerCase().indexOf("<male-name-native>") > -1){
			dataString = dataString.replace("<male-name-native>", appStringObject["1959"]);
		}
		while(dataString.toLowerCase().indexOf("<male-surname-native>") > -1){
			dataString = dataString.replace("<male-surname-native>", appStringObject["1960"]);
		}
		while(dataString.toLowerCase().indexOf("<male-name2-native>") > -1){
			dataString = dataString.replace("<male-name2-native>", appStringObject["1961"]);
		}
		while(dataString.toLowerCase().indexOf("<male-name3-native>") > -1){
			dataString = dataString.replace("<male-name3-native>", appStringObject["1962"]);
		}
		while(dataString.toLowerCase().indexOf("<friend-name-static-native>") > -1 || dataString.toLowerCase().indexOf("<friend-name-native>") > -1){
			dataString = dataString.replace("<friend-name-static-native>", appStringObject["1963"]);
			dataString = dataString.replace("<friend-name-native>", appStringObject["1963"]);
		}
		while(dataString.toLowerCase().indexOf("<foreigncountry-name-native>") > -1){
			dataString = dataString.replace("<foreigncountry-name-native>", appStringObject["1964"]);
		}
		while(dataString.toLowerCase().indexOf("<smallcar-name-native>") > -1){
			dataString = dataString.replace("<smallcar-name-native>", appStringObject["1965"]);
		}
		while(dataString.toLowerCase().indexOf("<famousmale-name-native>") > -1){
			dataString = dataString.replace("<famousmale-name-native>", appStringObject["1966"]);
		}
		//end
		
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
	while(dataString.toLowerCase().indexOf("<span>") > -1){
		dataString=dataString.replace("<span>", "");
	}
	while(dataString.toLowerCase().indexOf("</span>") > -1){
		dataString=dataString.replace("</span>", "");
	}
	
	return dataString;
}

function showTipPopup(string){
	if(string.indexOf("undefined") > -1 || string == "" || string.indexOf("<span></span>") > -1
			|| isInLessonTest == "true" || isInitialTest == "true"){
		return;
	}
	while(string.indexOf('\\"') > -1){
		string = string.replace('\\"',"'");
	}
	var data = string.split("*&");
	if(data[0].toLowerCase()=="try again"){
		$("#tipPopUpInnerDiv").css("background","#FE5C57");
	}else{
		$("#tipPopUpInnerDiv").css("background","#49C9AF");
	}
	console.log("showTipPopup:"+isWebinar);
	if(isWebinar){
		$(".tipPopUpDiv_Title").html("Tip");	
		$("#tipPopUpDiv_Button").css("display","none");
	}else{
		$(".tipPopUpDiv_Title").html(data[0]);	
	}
	if(isTouchEvent()){
		$("#tipPopUpDiv_Button").attr("ontouchend","hideTipPoup();event.preventDefault();event.stopPropagation();");
	}else{
		$("#tipPopUpDiv_Button").attr("onclick","hideTipPoup();event.preventDefault();event.stopPropagation();");
	}
	
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
//		$(".slides .present .listenSentence").click();
		$(".slides .present .playVideo").click();
	}
	if($(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo")){
//		$(".slides .present .listenSentence").click();
		$(".slides .present .playVideo").click();
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

	try{
		if(window.parent.location.href.indexOf("WebTranslationInterface") > -1 ){
			window.parent.navigateRightFromIframe();
		}	
	}catch(err){}
	
		
}

function hideBottomBarButton(){
	if($(".slides .present").hasClass("slideType_First_Slide")){
		$("#bottomBarButton").css("display","none");
	}else{
		$("#bottomBarButton").css("display","block");
	}
}

function clearotherscreens() {
	$( ".SlideType_Smart_Revision" ).each(function( index ) {
		 $( this ).remove() ;
		});
}
function onUpdateSlide(slideNumber){
	var slideNo = slideNumber+1;
	correctFlag = 1;
	
	try{
		try{
		clearInterval(webinarAnswerDurationTimer);
		}catch(err){}
		webinarAnswerDuration = 0;
		webinarAnswerDurationTimer = setInterval(function(){
			webinarAnswerDuration += 50;
		},50);
	}catch(err){}
	if(timerOn){
		equivalent_positive_coins = parseInt(getUrlParam("maxCoinsPerQuestion","10"));
	}
	
	if(isInitialTest == "true"){
		$("#bottomBarButton").css("visibility","hidden");
	}
	$("#bottomBarButton").removeClass("checkButtonAnimation");
	$(".bottomBarNotificationText div").css("display","none");
	$(".bottomBarNotificationText div").removeClass("bounceInRight animated");
	$(".forumLink").css("display","");
	closepopUpHighlightDiv();
	hideTipPoup();
	clearTimeout(setTimeoutForJellySlide);
	hideBottomBarButton();
	soundManager.stopAll();
	stopAllAudio();
	clearTimeout(setTimeOutVar);
	$(".bottomBarNotificationText").css("opacity","1");
	
	if($(".slides .present").hasClass("slideType_First_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
		$("#disableBottomBarButton").css("display","none");
		$(".forumLink").css("display","none");
		$(".bottomBarNotificationText").css("opacity","0");
	}else if($(".slides .present").hasClass("slideType_Input")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
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
			//$(".slides .present .yellow-arrow").css("top",($(".TTSMainWord:eq(0)").position().top + 50));
			//$(".slides .present .yellow-arrow").css("left",($(".TTSMainWord:eq(0)").position().left +$(".TTSMainWord:eq(0)").width()/2 - 47));
			$(".slides .present .yellow-arrow").css("display","block");
		},1000);
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}try{var frame = $('.slides .present').find('iframe')[0];$('.slides .present').find('iframe').remove();$('.slides .present #videoContainer').append(frame);}catch(err){}try{$('.slides .present').find('video')[0].pause()}catch(err){}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
		$("#disableBottomBarButton").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_4_with_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_4_with_Image_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
		
	}else if($(".slides .present").hasClass("SlideType_Choose_2_with_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_with_Image_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Transaltion_Box")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Transaltion_Box_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
		setTimeout(function(){
			$("#SlideType_Transaltion_Box_InputBox").focus();
		},1000);
		$("#bottomBarButton").css("visibility","");
	}else if($(".slides .present").hasClass("SlideType_ListenableTranslation")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_ListenableTranslation_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
		setTimeout(function(){
			$("#SlideType_ListenableTranslation_InputBox").focus();
		},1000);
		$("#bottomBarButton").css("visibility","");
	}else if($(".slides .present").hasClass("SlideType_LearningTypingTemplate")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Transaltion_Box_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
		setTimeout(function(){
			$("#SlideType_Transaltion_Box_InputBox").focus();
		},1000);
		$("#bottomBarButton").css("visibility","");
	}else if($(".slides .present").hasClass("SlideType_CombinedTranslation")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_CombinedTranslation_Answer()");
		$(".tipBox").css("display","none");
		setTimeout(function(){
			$("#SlideType_CombinedTranslation_InputBox").focus();
		},1000);
		$("#bottomBarButton").css("visibility","");
	}else if($(".slides .present").hasClass("SlideType_Pronunciation")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Pronunciation_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_4_without_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_4_without_Image_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_2_without_Image")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_without_Image_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Missing_Word")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Missing_Word_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Tip_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").removeClass("checkButtonAnimation");
		$("#disableBottomBarButton").css("display","none");
		setTimeOutVar = setTimeout(function(){
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
						},5000);
		$(".tipBox").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
	}else if($(".slides .present").hasClass("SlideType_Jumble_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Jumble_Slide_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
		$("#bottomBarButton").css("visibility","");
		
	}else if($(".slides .present").hasClass("SlideType_Dialog")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").removeClass("checkButtonAnimation");
		$("#disableBottomBarButton").css("display","none");
		setTimeOutVar = setTimeout(function(){
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
						},5000);
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext();try{window.parent.nextCalled(currentSlideNo)}catch(err){}");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_2_with_Top_Photo")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_with_Top_Photo_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Choose_2_without_Top_Photo")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_without_Top_Photo_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");		
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_LearningTextOptionsTemplate")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_without_Top_Photo_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");		
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_MultipleCorrectTemplate")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_Multiple_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");		
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_AeroplaneTemplate")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Aeroplane_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");		
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_PronunciationTemplate")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
		$("#disableBottomBarButton").css("display","block");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}lessonFunctionCallVar["+($(".slides .present").attr("slidenumber")-1)+"].checkSlideType_Choose_2_without_Top_Photo_Answer();try{window.parent.checkAnswerCalled(currentSlideNo)}catch(err){}");		
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Listen_Box")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Summary_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").css("display","block").removeClass("checkButtonAnimation");
		$("#disableBottomBarButton").css("display","none");
		setTimeOutVar = setTimeout(function(){
							$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").addClass("checkButtonAnimation");
						},5000);
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
	}else if($(".slides .present").hasClass("SlideType_Revision")){
//		$(".coinsWon").text(gameCoin+" Coins");
//		$(".lastScore").text(coins+" Coins");
//		$(".maxCoins").text(maxCoins+" Coins");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}if(!IsSmartRevision){clearotherscreens();}Reveal.navigateNext()");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		if(gameCoin<maxCoins){
			
		}else{
			
			$("#bottomBarButton").click();
		}
		
		
	}else if($(".slides .present").hasClass("SlideType_Last_Slide")){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").css("display","none");;
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
		
		var improvedScore = gameCoin;
	
		$("#coinsWonCount").text(improvedScore+" COINS WON");
		if(improvedScore>0){
			$(".endScoreOuterTable").css("display","none");
			startCoinStackAnimationLesson(improvedScore);
			
			setTimeout(function(){
				$(".coinStackAnimationScreen").css("display","none");
				$(".endScoreOuterTable").css("display","");
			}, 4000);
		}
		if(isWebinar && webinarId != ""){
				var responseData = {
					WebinarID : webinarId,
					Name: webinar_user_name,
					UserID : webinar_user_email,
					EmployeeID : webinar_user_employeeId,
					Organization : webinar_user_organization,
					BatchNumber : getUrlParam("BatchNumber",""),
					LessonID : courseId,
					CoinWon : gameCoin,
					CreatedAt : getCurrentDateTime()
				};
				var saveLiveAppCoinsWon = firebase.functions().httpsCallable('saveLiveAppCoinsWon');
				saveLiveAppCoinsWon(responseData).then(function(result) {
					console.log("saveLiveAppCoinsWon:",result);
				  var sanitizedMessage = result.data.text;
				}).catch(function(error) {
				  console.log(error);
				});
			}
		/*
		if(isInLessonTest == "false"){
			
			if(isHw=="true"){
				$(".bonusCoins").text(bonusCoins+" Coins");
				$("#hwBonusCoins").text(bonusCoins+" Coins");
				
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
		*/
		/*
		if(mId!=""){
			console.log("mId: "+mId);
			updateUserMessangerCoin(mId,lessonNumberVar,gameCoin);
		}
		if(isInLessonTest == "false" && isInitialTest == "false"){
			console.log("isLoggedIn : "+isLoggedIn);
			
				if(isB2BLesson=="true"){
					if(isLoggedIn){
						updateUserCoin(userId, lessonNumberVar, gameCoin, window.parent.nativeLangId, 5,'LEARN_LESSON_B2B');
						updateCompletedTask(userId, taskString, userLang,gameCoin);
					}
					if(!window.parent.b2bProgress.lesson.hasOwnProperty(lessonNumberVar)){
						window.parent.b2bProgress.lesson[lessonNumberVar] =  "true"; 
					}
					loginParameters = "lessonNumberVar="+lessonNumberVar+"&gameCoin="+gameCoin+"&userLang="+language+"&earned_via=LEARN_LESSON_B2B&taskString="+taskString;
				}else{
					if(isLoggedIn){
						updateUserCoin(userId, lessonNumberVar, gameCoin, window.parent.nativeLangId, 5,'LEARN_LESSON');
						updateCompletedTask(userId, taskString, userLang,gameCoin);
					}
					loginParameters = "lessonNumberVar="+lessonNumberVar+"&gameCoin="+gameCoin+"&userLang="+language+"&earned_via=LEARN_LESSON&taskString="+taskString;
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
				console.log("isLoggedIn : "+isLoggedIn);
				if(isLoggedIn)
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
			$(".closeIframeInLargeScreen").css("display","block");
			
			if(window.parent.isB2Buser){
				if(initialTestRecLevel <50)
					initialTestRecLevel = 0;
				else if((initialTestRecLevel >=50) && (initialTestRecLevel<125) )
					initialTestRecLevel = 50;
				else if((initialTestRecLevel >= 125) && (initialTestRecLevel<175))
					initialTestRecLevel = 125;
				else if((initialTestRecLevel >= 175) && (initialTestRecLevel<250))
					initialTestRecLevel = 175;
				else if((initialTestRecLevel >= 250) && (initialTestRecLevel<325))
					initialTestRecLevel = 250;
				else if(initialTestRecLevel>=325)
					initialTestRecLevel = 325;
			}
			console.log("isLoggedIn : "+isLoggedIn);
			if(isLoggedIn)
				updateUserCoin(userId, (initialTestRecLevel+1), 200, window.parent.nativeLangId, 5,'FIRST_TESTOUT');
			$(".initialTestFeedbackLevel").text(initialTestRecLevel);
		}
		*/
		
	}else{
		
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton");
		$("#disableBottomBarButton").css("display","none");
		$("#bottomBarButton").attr("onclick","if($(this).attr('isDisable') == 'true'){return;}Reveal.navigateNext()");
		if(isWebinar){
			$("#bottomBarButton").attr("onclick","");
		}
		$(".tipBox").css("display","none");
	}
	
	console.log("$$$ currentSlideNo : "+currentSlideNo+" && slideNo : "+slideNo);
	if(timerOn){
		postMessage_cancelTimer();
	}
	if(isquizBuilder){
		$("#loadSlideDiv").css("display","");
		try{
			updateSlideCounterDiv(parseInt(Reveal.getCurrentSlide().getAttribute('slidenumber'))-1);	
		}catch(err){}
	}
	if(currentSlideNo <= slideNo){
			if(timerOn && orientationChanged == "false"){
				if($(".slides .present").hasClass("SlideType_Missing_Word")
					|| $(".slides .present").hasClass("SlideType_Jumble_Slide")
					|| $(".slides .present").hasClass("SlideType_LearningTextOptionsTemplate")
					|| $(".slides .present").hasClass("SlideType_MultipleCorrectTemplate")
					|| $(".slides .present").hasClass("SlideType_AeroplaneTemplate")
					|| $(".slides .present").hasClass("SlideType_PronunciationTemplate")
					|| $(".slides .present").hasClass("SlideType_ListenableTranslation")
					|| $(".slides .present").hasClass("SlideType_LearningTypingTemplate")){
						console.log('$(".slides .present"):'+$(".slides .present"));
						if($(".slides .present").attr("isPlayedOnce") == undefined){	
							postMessage_startTimer(parseInt($(".slides .present").attr("timerOn")));
						}
				}
			}
			console.log("orientationChanged:"+orientationChanged);
			if(orientationChanged == "true"){
				postMessage_checkAnswer();
				return;
			}
		}
	if(currentSlideNo < slideNo || isInitialTest == "true"){
		currentSlideNo = slideNo;
	}else if(currentSlideNo > slideNo && slideNo > 1){
		$("#bottomBarButton").val($("#bottomBarButton").attr("continue")).removeClass("greenButton").addClass("purpleButton").removeClass("checkButtonAnimation");
		if(isWebinar){
			if($(".slides .present").attr("isPlayedOnce") == "true"){
				$("#bottomBarButton").attr("onclick","");	
			}
			if($(".slides .present").hasClass("SlideType_LearningTextOptionsTemplate")){
				
			}else if($(".slides .present").hasClass("SlideType_AeroplaneTemplate")){
				
			}else if($(".slides .present").hasClass("SlideType_Missing_Word")){
				
			}else if($(".slides .present").hasClass("SlideType_Jumble_Slide")){
				
			}else{
				$("#bottomBarButton").attr("onclick","");	
			}
		}else{
			$("#bottomBarButton").attr("onclick","try{var frame = $('.slides .present').find('iframe')[0];$('.slides .present').find('iframe').remove();$('.slides .present #videoContainer').append(frame);}catch(err){}try{$('.slides .present').find('video')[0].pause()}catch(err){}Reveal.navigateNext()");
		}
		$("#disableBottomBarButton").css("display","none");
		$("#slide"+slideNo).css("background","#ddd!important");
		//$("#slide"+slideNo+" .sectionInnerContainer").css("opacity",".54");
		if(isInitialTest != "true"){
			$("#slide"+slideNo+" .sectionInnerContainer .blockedDiv").each(function(){
				$(this).remove();
			});
			if(isWebinar){
				$("#bottomBarButton").val($("#bottomBarButton").attr("check")).addClass("greenButton").removeClass("purpleButton");
			}else{
				$("#slide"+slideNo+" .sectionInnerContainer").css("background","#ccc");
			}
			
			//$("#slide"+slideNo+" .sectionInnerContainer").append("<div class='blockedDiv' style='position:absolute;width:100%;height:100%;z-index:1;top:0px;background:rgba(0,0,0,.2);' onclick='return;'></div>");
		}
		$("#slide"+slideNo+" .animated").each(function(){
			$(this).removeClass("animated");
		});
		$("#slide"+slideNo).click(function(){
			return;
		});
		
	}
	if(!isInLessonTest && !isInitialTest){
		$(".slideLeftArrow").css("display","block");
	}
	if(isTouchEvent()){
		$("#bottomBarButton").attr("ontouchend",$("#bottomBarButton").attr("onclick"));
		$("#bottomBarButton").attr("onclick","");
	}
}

function disableBackSlide(){
	
}

function SmartRevision() {
	IsSmartRevision=true;
	for(var i=2;i<lessondataarray.length+2;i++){
		if($("#slide"+i).hasClass("WrongAnswer")){
			wrongdataarray[wrongquestionscounter]=lessondataarray[i-2];
			wrongquestionscounter++;
		}
	}
	createsmartrevision();
}
function createsmartrevision() {
	$("#bottomBarButton").click();
	$(".sectionInnerContainer span").css("color","#FE5C57");
	$("#jumbleSource span").css("color","#2b3e50");
	$(".totalCoinsWon").css("color","#2b3e50");
	$(".totalNewCoinsWon").css("color","#2b3e50");
	
	
	slideCount++;
	var lessonlength=lessondataarray.length;
//	var lessonlength=2;
//	for(var i=0,j=lessondataarray.length;j<2*lessondataarray.length;j++,i++){
	for(var i=0,j=lessonlength+3;j<lessonlength+wrongdataarray.length+3;j++,i++){
//		for(var i=0,j=2+3;j<wrongdataarray.length+2+3;j++,i++){
			
			var arr = wrongdataarray[i];
			var slide_type = arr[3];
	var arrData=[];
			for (var k = 4; k < arr.length; k++) {

				if (arr[k]!=null && typeof arr[k] === 'string' ){
					
					arr[k]=arr[k].replace(/\n/g, "<br>");
					arr[k]=arr[k].replace(/\"/g, "'");
					arr[k]=arr[k].replace("^n^", "<br>");
		
				}

				arrData[k - 4]= arr[k];

			}	
			/*for JELLY start*/
			if(slide_type.toLowerCase()=="input"){
				$("#slide"+j).addClass("slideType_Input");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div class="titleText"';
				htmltext+=' style="padding-top: 100px !important; max-width: 790px; margin: auto;"></div>';
				htmltext+=' <div class="nameInputBox">';
				htmltext+=' <input id="slideType_Input_inputText" class="appStringPlaceholder" type="text"';
				htmltext+=' placeholder="'+appStringObject[58]+'">';
				htmltext+=' </div>';
				htmltext+=' <div class="monsterBarNotification"';
				htmltext+=' style="margin-top: 52px !important;">';
				htmltext+=' <div class="notificationTipBox"';
				htmltext+=' style="position: absolute; font-size: 16px; width: 162px; line-height: normal; background: #7f7f7f; border-radius: 4px; padding: 10px; right: 190px; margin-top: 10px; color: #fff;line-height: 1.2em!important;">';
				htmltext+=' <span class="notificationTipBoxText" style="color: #fff;"></span>';
				htmltext+=' <img	';
				htmltext+=' style="width: 50px; position: absolute; right: -23px; top: 20px; z-index: -1;"';
				htmltext+=' src="../../../InteractiveLessons/img/call-out 300px.png">';
				htmltext+=' </div>';
				htmltext+=' <img class="monsterBarNotificationImage"';
				htmltext+=' style="width: 75px; position: absolute; transform: rotate(-20deg); right: 100px; margin-top: 60px; z-index: 1;"';
				htmltext+=' alt=""';
				htmltext+=' src="../../../InteractiveLessons/img/jelly-monster-2-small.png">';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				   var slideType_Input_TitleText = arrData[0];
				     var variableName = arrData[112];
				     var slideType_Input_TipText = appStringObject[68];
				     lessonFunctionCallVar[slideCount] = new slideType_Input_Function("slide"+j,slideType_Input_TitleText,slideType_Input_TipText,variableName);
				     slideCount++;
			}
			/*for JELLY end*/
			/*for JELLY start*/
			else if(slide_type.toLowerCase()=="jelly"){
				$("#slide"+j).addClass("SlideType_Jelly");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;"></div>';
				htmltext+=' <img src="../../../InteractiveLessons/img/yellow-arrow.png" class="yellow-arrow yellow-arrow-upward" style="display: none; position: absolute; top: 200px; left: 400px; z-index: 1000; display: none;">';
				htmltext+=' <div class="monsterBarNotification" style="margin-top: 205px !important;">';
				htmltext+=' <div class="notificationTipBox" class="tipText" style="position: absolute; font-size: 15px; width: 162px; line-height: normal; background: #7f7f7f; border-radius: 4px; padding: 10px; right: 190px; margin-top: 10px; color: #fff;line-height: 1.2em!important;">';
				htmltext+=' <span class="notificationTipBoxText" style="color: #fff;"></span>';
				htmltext+=' <img style="width: 50px; position: absolute; right: -23px; top: 20px; z-index: -1;" src="../../../InteractiveLessons/img/call-out 300px.png">';
				htmltext+=' </div>';
				htmltext+=' <img class="monsterBarNotificationImage" style="width: 75px; position: absolute; transform: rotate(-20deg); right: 100px; margin-top: 60px; z-index: 1;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small.png">';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				var SlideType_Jelly_TipText = appStringObject[77];
				var dataString = arrData[1]+"*&"+arrData[2]+"*&"+arrData[3]+"*&"+arrData[4]+"*&"+arrData[5]+"*&"+arrData[6]+"*&"+arrData[7]+"*&"+arrData[8]+"*&"+arrData[9]+"*&"+arrData[10]+"*&"+arrData[11]+"*&"+arrData[12]+"*&"+arrData[13]+"*&"+arrData[14]+"*&"+arrData[15];
			     lessonFunctionCallVar[slideCount] = new SlideType_Jelly_Function("slide"+j,SlideType_Jelly_TipText,dataString);
			     slideCount++;
			}
			/*for JELLY start*/
			/*for CHOOSE 4 start*/
			if(slide_type.toLowerCase()=="choose 4"){
				if (arrData[17].trim().toLowerCase().indexOf("without")>=0 ) {
				
				
				$("#slide"+j).addClass("SlideType_Choose_4_without_Image");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="padding: 30px 0px;">';
				htmltext+=' <div>';
				htmltext+=' <table style="width: 100%; margin: auto;">';
				htmltext+=' <tr>';
				htmltext+=' <td style="text-align: center;">';
				htmltext+=' <!-- ';
				htmltext+=' <span class="SlideType_Choose_4_without_Image_HintText" style="font-size: 20px; display: block;color:#FE5C57;" hintText1="सही अनुवाद चुनिए" hintText2="सही अंग्रेज़ी अनुवाद चुनिए"></span>';
				htmltext+=' -->';
				htmltext+=' </td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' <table style="width: 100%; margin: auto;">';
				htmltext+=' <tr>';
				htmltext+=' <td style="text-align: center;">';
				htmltext+=' <span class="SlideType_Choose_4_without_Image_QuestionText" style="font-size: 24px; margin-left: 50px;width:100%!important;color:#FE5C57!important;"></span> ';
				htmltext+=' <span class="SlideType_Choose_4_without_Image_QuestionText_WhenHidden appStringSpan" style="display: none; font-size: 22px; margin-left: 50px;">'+appStringObject[84]+'</span></td>';
				htmltext+=' <td style="width: 50px;">';
				htmltext+=' <div id="SlideType_Choose_4_without_Image_Listen_QuestionText"';
				htmltext+=' class="animated pulse"';
				htmltext+=' style="display: none; text-align: center; cursor: pointer; height: 50px; float: left; width: 50px; border-top-left-radius: 100px; border-top-right-radius: 100px; border-bottom-right-radius: 100px; border-bottom-left-radius: 100px; display: block; background: rgb(73, 201, 175);">';
				htmltext+=' <img style="margin-top: 13px;"';
				htmltext+=' src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
				htmltext+=' </div>';
				htmltext+=' </td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' </div>';
				htmltext+=' <div style="width: 98%;">';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option1">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option2">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option3">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option4">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				console.log(slide_type+": Slide " +j+" :",arrData);
				  var SlideType_Choose_4_without_Image_Question = "";
				     if(arrData[111].trim().toLowerCase()==""){
				     	SlideType_Choose_4_without_Image_Question = " <span style='color:#FE5C57'>"+arrData[137]+"</span><span style='color:#FE5C57'> "+arrData[111]+" </span><span style='color:#FE5C57'>"+arrData[138]+"</span>";
				     }else{
				     SlideType_Choose_4_without_Image_Question = " <span style='color:#FE5C57'>"+arrData[137]+"</span><span style='color:#FE5C57'> '"+arrData[111]+"' </span><span style='color:#FE5C57'>"+arrData[138]+"</span>";
				     }
				     var SlideType_Choose_4_without_Image_option_String = arrData[18]+"*&"+arrData[22]+"*&"+arrData[19]+"*&"+arrData[23]+"*&"+arrData[20]+"*&"+arrData[24]+"*&"+arrData[21]+"*&"+arrData[25];
				     var SlideType_Choose_4_without_Image_Answer = "option"+arrData[30];
				     var SlideType_Choose_4_without_Image_Question_Type = arrData[16];
				     var SlideType_Choose_4_without_Image_Question_Display_Flag = arrData[115];
				     var SlideType_Choose_4_without_Image_Answer_Type = arrData[113];
				     //console.log(slideCount+" / SlideType_Choose_4_without_Image_Answer_Type: "+SlideType_Choose_4_without_Image_Answer_Type)
				     lessonFunctionCallVar[slideCount] = new SlideType_Choose_4_without_Image_Function("slide"+j,SlideType_Choose_4_without_Image_Question,SlideType_Choose_4_without_Image_option_String,SlideType_Choose_4_without_Image_Answer,SlideType_Choose_4_without_Image_Question_Type,SlideType_Choose_4_without_Image_Question_Display_Flag,SlideType_Choose_4_without_Image_Answer_Type);
				     slideCount++;
				}else{
					
					$("#slide"+j).addClass("SlideType_Choose_4_with_Image");
					var htmltext="";
					htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
					htmltext+=' ';
					htmltext+=' <div style="padding: 30px 0px;">';
					htmltext+=' <!-- ';
					htmltext+=' <span class="SlideType_Choose_4_with_Image_HintText" style="font-size:20px;color:#FE5C57;" hintText1="सही अनुवाद चुनिए" hintText2="सही अंग्रेज़ी अनुवाद चुनिए"></span> ';
					htmltext+=' -->';
					htmltext+=' <br> <span class="SlideType_Choose_4_with_Image_QuestionText"';
					htmltext+=' style="font-size: 30px;"></span>';
					htmltext+=' </div>';
					htmltext+=' ';
					htmltext+=' <div style="width: 100%;">';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option1">';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>';
					htmltext+=' <div';
					htmltext+=' style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">';
					htmltext+=' <img class="SlideType_Choose_4_with_Image_Img_Source"';
					htmltext+=' src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option2">';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>';
					htmltext+=' <div';
					htmltext+=' style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">';
					htmltext+=' <img class="SlideType_Choose_4_with_Image_Img_Source"';
					htmltext+=' src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option3">';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>';
					htmltext+=' <div';
					htmltext+=' style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">';
					htmltext+=' <img class="SlideType_Choose_4_with_Image_Img_Source"';
					htmltext+=' src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option4">';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>';
					htmltext+=' <div';
					htmltext+=' style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">';
					htmltext+=' <img class="SlideType_Choose_4_with_Image_Img_Source"';
					htmltext+=' src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">';
					htmltext+=' </div>';
					htmltext+=' <div';
					htmltext+=' class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>';
					htmltext+=' </div>';
					htmltext+=' </div>';
					$("#slide"+j+" .sectionInnerContainer").append(htmltext);
					$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
					  var SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData[137]+"</span> '"+arrData[111]+"' <span style='color:#FE5C57'>"+arrData[138]+"</span>";
				         if(arrData[111].trim().toLowerCase()==""){
				         SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData[137]+"</span> "+arrData[111]+" <span style='color:#FE5C57'>"+arrData[138]+"</span>";
					     }else{
					     SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData[137]+"</span> '"+arrData[111]+"' <span style='color:#FE5C57'>"+arrData[138]+"</span>";
					     }
				         var SlideType_Choose_4_with_Image_Option_String = arrData[18]+"*&"+arrData[26]+"*&"+arrData[22]+"*&"+arrData[19]+"*&"+arrData[27]+"*&"+arrData[23]+"*&"+arrData[20]+"*&"+arrData[28]+"*&"+arrData[24]+"*&"+arrData[21]+"*&"+arrData[29]+"*&"+arrData[25];
					     var SlideType_Choose_4_with_Image_Answer = "option"+arrData[30];
					     var SlideType_Choose_4_with_Image_Question_Type = arrData[16];
					     var SlideType_Choose_4_with_Image_Question_Display_Flag = arrData[115];
					     var SlideType_Choose_4_with_Image_Answer_Type = arrData[113];
					     var imageFolder = "//d3m4f8ejbzwpn0.cloudfront.net/interactive_lessons/";
					     lessonFunctionCallVar[slideCount] = new SlideType_Choose_4_with_Image_Function("slide"+j,SlideType_Choose_4_with_Image_QuestionText,SlideType_Choose_4_with_Image_Option_String,SlideType_Choose_4_with_Image_Answer,SlideType_Choose_4_with_Image_Question_Type,SlideType_Choose_4_with_Image_Question_Display_Flag,SlideType_Choose_4_with_Image_Answer_Type,imageFolder);
					     slideCount++;
				}
				
			}
			/*for CHOOSE 4 end*/
			/*for CHOOSE 2 start*/
			if(slide_type.toLowerCase()=="choose 2"){
				if (arrData[90].trim().toLowerCase().indexOf("without")>=0 ||	arrData[90].trim().toLowerCase()=="no") {
				
				
				$("#slide"+j).addClass("SlideType_Choose_2_without_Top_Photo");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="padding: 60px 0px;">';
				htmltext+=' <div>';
				htmltext+=' <table style="width: 100%; margin: auto;">';
				htmltext+=' <tr>';
				htmltext+=' <td style="text-align: center;">';
		
				htmltext+=' </td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' <table style="width: 100%; margin: auto;">'; 	  
				htmltext+=' <tr>';
				htmltext+=' <td style="text-align: center;"><span';
				htmltext+=' style="display: none;"';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_title"></span> <span';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_QuestionText"';
				htmltext+=' style="font-size: 30px; margin-left: 50px;"></span> <span';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_QuestionText_WhenHidden appStringSpan"';
				htmltext+=' style="display: none; font-size: 30px; margin-left: 50px;">'+appStringObject[78]+'</span></td>';
				htmltext+=' <td style="width: 50px;">';
				htmltext+=' <div';
				htmltext+=' id="SlideType_Choose_2_without_Top_Photo_Listen_QuestionText"';
				htmltext+=' textToPlay="'+arrData[80]+'" ';
				htmltext+=' class="animated pulse"';
				htmltext+=' style="display: none; text-align: center; cursor: pointer; height: 50px; float: left; width: 50px; border-top-left-radius: 100px; border-top-right-radius: 100px; border-bottom-right-radius: 100px; border-bottom-left-radius: 100px; display: block; background: rgb(73, 201, 175);">';
				htmltext+=' <img style="margin-top: 10px;"';
				htmltext+=' src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
				htmltext+=' </div>';
				htmltext+=' </td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' </div>';
				htmltext+=' <div style="width: 100%;">';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option1">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option2">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' </div>';
				
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");

			    var SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> '"+arrData[80]+"' <span style='color:#FE5C57'>"+arrData[140]+"</span>";
		       if(arrData[80].trim().toLowerCase()==""){
	        	SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> "+arrData[80]+" <span style='color:#FE5C57'>"+arrData[140]+"</span>";
		       }else if(arrData[139].trim().toLowerCase()=="" && arrData[140].trim().toLowerCase()==""){
		     	SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> "+arrData[80]+" <span style='color:#FE5C57'>"+arrData[140]+"</span>";
		       }else{
		     	SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> '"+arrData[80]+"' <span style='color:#FE5C57'>"+arrData[140]+"</span>";
		       }
		        var SlideType_Choose_2_without_Top_Photo_option_String = arrData[86]+"*&"+arrData[88]+"*&"+arrData[87]+"*&"+arrData[89];
		        var SlideType_Choose_2_without_Top_Photo_Answer = "option"+arrData[83];
		        var SlideType_Choose_2_without_Top_Photo_Question_Type = arrData[84];
		        var SlideType_Choose_2_without_Top_Photo_Question_Display_Flag = arrData[119];
		        var SlideType_Choose_2_without_Top_Photo_Answer_Type = arrData[118];
		        lessonFunctionCallVar[slideCount] = new SlideType_Choose_2_without_Top_Photo_Function("slide"+j,SlideType_Choose_2_without_Top_Photo_Question,SlideType_Choose_2_without_Top_Photo_option_String,SlideType_Choose_2_without_Top_Photo_Answer,SlideType_Choose_2_without_Top_Photo_Question_Type,SlideType_Choose_2_without_Top_Photo_Question_Display_Flag,SlideType_Choose_2_without_Top_Photo_Answer_Type);
		        slideCount++;
				}	else {

				$("#slide"+j).addClass("SlideType_Choose_2_with_Top_Photo");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="padding: 20px 0px;">';
				htmltext+=' <div style="display: block; margin-bottom: 10px;"';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_title"></div>';
				htmltext+=' <img class="SlideType_Choose_2_with_Top_Photo_Image"';
				htmltext+=' style="height: 150px; border-radius: 20px;"';
				htmltext+=' src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg" /> <br>';

				htmltext+=' <br> <span';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_QuestionText"';
				htmltext+=' style="font-size: 30px;"></span>';
				htmltext+=' </div>';
				htmltext+=' <div style="width: 100%;">';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_Div SlideType_Choose_2_with_Top_Photo_Div_UnChecked option1">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_Image_Circle SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_TextTD SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_Text SlideType_Choose_2_with_Top_Photo_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' <div';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_Div SlideType_Choose_2_with_Top_Photo_Div_UnChecked option2">';
				htmltext+=' <table style="width: 100%; height: 100%;">';
				htmltext+=' <tr>';
				htmltext+=' <td><div';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_Image_Circle SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked"></div></td>';
				htmltext+=' <td';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_TextTD SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked"><div';
				htmltext+=' class="SlideType_Choose_2_with_Top_Photo_Text SlideType_Choose_2_with_Top_Photo_Text_UnChecked"></div></td>';
				htmltext+=' </tr>';
				htmltext+=' </table>';
				htmltext+=' </div>';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
		        var SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> '"+arrData[80]+"' <span style='color:#FE5C57'>"+arrData[140]+"</span>";
		        if(arrData[80].trim().toLowerCase()==""){
		        SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> '"+arrData[80]+"' <span style='color:#FE5C57'>"+arrData[140]+"</span>";
			     }else{
			     SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData[139]+"</span> '"+arrData[80]+"' <span style='color:#FE5C57'>"+arrData[140]+"</span>";
			     }
		        var SlideType_Choose_2_with_Top_Photo_Image_Name = arrData[91];
		        var SlideType_Choose_2_with_Top_Photo_option_String = arrData[86]+"*&"+arrData[88]+"*&"+arrData[87]+"*&"+arrData[89];
		        var SlideType_Choose_2_with_Top_Photo_Answer = "option"+arrData[83];
		        var SlideType_Choose_2_with_Top_Photo_Question_Type = arrData[84];
		        var SlideType_Choose_2_with_Top_Photo_Question_Display_Flag = arrData[119];
		        var SlideType_Choose_2_with_Top_Photo_Answer_Type = arrData[118];
		        var imageFolder = "//d3m4f8ejbzwpn0.cloudfront.net/interactive_lessons/";
		        lessonFunctionCallVar[slideCount] = new SlideType_Choose_2_with_Top_Photo_Function("slide"+j,SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_with_Top_Photo_Image_Name,imageFolder);
		        slideCount++;
				}
			}
			/*for CHOOSE 2 end*/
			/*for MISSING WORD start*/
			if(slide_type.toLowerCase()=="missing word"){
				$("#slide"+j).addClass("SlideType_Missing_Word");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="padding: 10px 0px; color: #FE5C57;">';
				htmltext+=' <span class="titleText" style="font-size: 30px; color: #FE5C57;text-transform: capitalize!important;"></span>';
				htmltext+=' </div>';
				htmltext+=' <div class="SlideType_Missing_Word_QuestionText" style="width: 100%; font-size: 24px;margin-bottom:20px;">';
				htmltext+=' <span class="questionPart1Text" ></span> <span> ______ </span>';
				htmltext+=' <span class="questionPart2Text"></span>';
				htmltext+=' </div>';
				htmltext+=' <div id="SlideType_Missing_Word_select_choice" class="SlideType_Missing_Word_select_choice_UnChecked" style="margin-bottom:20px;"></div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				var SlideType_Missing_Word_Question_Part_temp = arrData[38];
			     var SlideType_Missing_Word_Question_Part1 = SlideType_Missing_Word_Question_Part_temp.split("$$$")[0];
			     var SlideType_Missing_Word_Question_Part2 = SlideType_Missing_Word_Question_Part_temp.split("$$$")[1];
			     var SlideType_Missing_Word_optionString = arrData[39]+"*&"+arrData[43]+"*&"+arrData[41]+"*&"+arrData[44]+"*&"+arrData[42]+"*&"+arrData[45]+"*&"+arrData[40]+"*&"+arrData[46];
			     var SlideType_Missing_Word_Answer = "option"+arrData[82];
			     var SlideType_Missing_Word_TitleText = arrData[37];
			     lessonFunctionCallVar[slideCount] = new SlideType_Missing_Word_Function("slide"+j,SlideType_Missing_Word_TitleText,SlideType_Missing_Word_optionString,SlideType_Missing_Word_Answer,SlideType_Missing_Word_Question_Part1,SlideType_Missing_Word_Question_Part2);
			     slideCount++;
			
			}
			/*for MISSING WORD end*/
			/*for translation box start*/
			if(slide_type.toLowerCase()=="translation box"){
				$("#slide"+j).addClass("SlideType_Transaltion_Box");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="padding: 80px 0px;">';
				htmltext+=' <span class="titleText" style="font-size: 30px; color: #FE5C57;"></span>';
				htmltext+=' </div>';
				htmltext+=' <div style="width: 100%; height: 90px;">';
				htmltext+=' <div class="SlideType_Transaltion_Box_Question"';
				htmltext+=' style="width: 300px; height: 55px; padding: 17px 0px; font-size: 30px; float: left; text-align: right;"></div>';
				htmltext+=' <div id="SlideType_Transaltion_Box_Listen_Text"';
				htmltext+=' style="cursor: pointer; height: 50px; float: left; width: 50px; margin: 20px 20px; border-radius: 100px; background: #49C9AF;">';
				htmltext+=' <img style="margin-top: 13px;"';
				htmltext+=' src="../../../InteractiveLessons/img/soundIconWhite_2.png" />';
				htmltext+=' </div>';
				htmltext+=' <div style="height: 90px; float: left; margin: 0px 30px;">';
				htmltext+=' <img style="height: 60px; margin-top: 15px;"';
				htmltext+=' src="../../../InteractiveLessons/img/forward-button-green-2x.png" />';
				htmltext+=' </div>';
				htmltext+=' <div class="SlideType_Transaltion_Box_InputBoxOuterDiv"';
				htmltext+=' style="width: 400px; height: 90px; float: left; border-radius: 20px; border: none;">';
				htmltext+=' <input id="SlideType_Transaltion_Box_InputBox"';
				htmltext+=' style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;"';
				htmltext+=' type="text">';
				htmltext+=' </div>';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				   var SlideType_Transaltion_Box_TitleText =arrData[32];
			       var SlideType_Transaltion_Box_Question = arrData[33];
			       var SlideType_Transaltion_Box_Answer = arrData[34];
			       var SlideType_Transaltion_Box_Tip_On_Correct =arrData[35];
			       var SlideType_Transaltion_Box_Tip_On_InCorrect = arrData[36];
			       var SlideType_Transaltion_Box_Typing_Language = arrData[120];
			       lessonFunctionCallVar[slideCount] = new SlideType_Transaltion_Box_Function("slide"+j,SlideType_Transaltion_Box_TitleText,SlideType_Transaltion_Box_Question,SlideType_Transaltion_Box_Answer,SlideType_Transaltion_Box_Tip_On_Correct,SlideType_Transaltion_Box_Tip_On_InCorrect,SlideType_Transaltion_Box_Typing_Language);
			       slideCount++;
			}
			/*for translation box end*/
			/*for tip slide start*/
			if(slide_type.toLowerCase()=="tip slide"){
				$("#slide"+j).addClass("SlideType_Tip_Slide");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div class="SlideType_Tip_Slide_Inner_Container"';
				htmltext+=' style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">';
				htmltext+=' <div class="titleText"';
				htmltext+=' style="padding: 30px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">';
				htmltext+=' </div>';
				htmltext+=' <div class="SlideType_Tip_Slide_tipText"';
				htmltext+=' style="width: 100%; font-size: 30px;"></div>';
				htmltext+=' </div>';
				htmltext+=' <div style="position: absolute; left: 10px; bottom: -15px;display: none;">';
				htmltext+=' <img';
				htmltext+=' style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0, 1, 0, 180deg); width: 60px; z-index: -1;"';
				htmltext+=' src="../../../InteractiveLessons/img/tip-tail-f9f9f9.png" /> ';
				htmltext+=' <img style="width: 70px;" alt=""';
				htmltext+=' src="../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15.png">';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				 var SlideType_Tip_Slide_TipText = arrData[47]+"*&"+arrData[48]+"*&*&"+arrData[49]+"*&"+arrData[50]+"*&";
			     var SlideType_Tip_Slide_TitleText =appStringObject[52];
			     lessonFunctionCallVar[slideCount] = new SlideType_Tip_Slide_Function("slide"+j,SlideType_Tip_Slide_TitleText,SlideType_Tip_Slide_TipText);
			     slideCount++;
				
			}
			/*for tip slide end*/
			/*for jumble start*/
			if(slide_type.toLowerCase()=="jumble"){
				$("#slide"+j).addClass("SlideType_Jumble_Slide");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="width: 100%;">';
				htmltext+=' <div class="QuestionText" style="padding: 70px 0px 0px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">';
				htmltext+=' </div>';
				htmltext+=' <div class="notificationTipBox" style="position: absolute; right: 55px; top: 10px; padding: 5px; width: 220px; text-transform: uppercase; font-size: 17px; background: #7f7f7f; border-radius: 4px;line-height: 1.2em!important;display: none;">';
					htmltext+=' <span style="color: #fff;">'+appStringObject[79]+'</span> <img';
						htmltext+=' style="position: absolute; right: -25px; transform: rotate3d(0, 0, 0, 180deg); width: 50px; z-index: -1; top: 5px;"';
						htmltext+=' src="../../../InteractiveLessons/img/call-out 300px.png" />';
				htmltext+=' </div>';
				htmltext+=' <div class="monsterBarNotificationImage"';
					htmltext+=' style="position: absolute; right: 0px; top: 25px; width: 40px; height: 61px; background: url(\'../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15-anti.png\'); background-size: cover; background-repeat: no-repeat;display: none;">';
				htmltext+=' </div>';
				htmltext+=' <div style="width: 100%; font-size: 20px; margin-top: 30px;">';
					htmltext+=' <li class="animatedListClass" style=""></li>';
					htmltext+=' <ul id="jumbleTarget"';
						htmltext+=' style="width: 710px; min-height: 114px; background: #eee; border: 2px solid #F8CE46; border-radius: 4px;">';
htmltext+=' ';
					htmltext+=' </ul>';
					htmltext+=' <ul id="jumbleSource"';
						htmltext+=' style="margin-top: 50px; border: 2px solid #F8CE46; width: 710px; min-height: 100px; border-radius: 4px;">';
					htmltext+=' </ul>';
				htmltext+=' </div>';
			htmltext+=' </div>';
			$("#slide"+j+" .sectionInnerContainer").append(htmltext);
			$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
		     var SlideType_Jumble_Slide_QuestionText = arrData[52];
		     var SlideType_Jumble_Slide_AnswerText = arrData[136];
		     var SlideType_Jumble_Slide_option_String = arrData[53]+"*&"+arrData[54]+"*&"+arrData[55]+"*&"+arrData[56]+"*&"+arrData[57]+"*&"+arrData[58];
		     var SlideType_Jumble_Slide_Typing_Language = "0";
		     var SlideType_Jumble_Slide_slideNumber = slideCount;
		     lessonFunctionCallVar[slideCount] = new SlideType_Jumble_Slide_Function("slide"+j,SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_QuestionText,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_option_String,SlideType_Jumble_Slide_Typing_Language);
		     slideCount++;
			}
			/*for jumble end*/
			/*for SUMMARY start*/
			if(slide_type.toLowerCase()=="summary"){
				$("#slide"+j).addClass("SlideType_Listen_Box");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div style="padding: 40px 0px;">';
				htmltext+=' <span class="titleText" style="font-size: 30px;"></span>';
			htmltext+=' </div>';
			htmltext+=' <div style="width: 100%;">';
				htmltext+=' <table id="listenTable"';
					htmltext+=' style="width: 600px; margin: auto; border-spacing: 0px 20px;">';
htmltext+=' ';
				htmltext+=' </table>';
			htmltext+=' </div>';
			$("#slide"+j+" .sectionInnerContainer").append(htmltext);
			$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
			 var SlideType_Listen_Box_Title_Text = appStringObject[82];
			var SlideType_Listen_Box_String = arrData[59]+"*&"+arrData[63]+"*&"+arrData[62]+"*&"+arrData[64]+"*&"+arrData[60]+"*&"+arrData[65]+"*&"+arrData[61]+"*&"+arrData[66];
			 lessonFunctionCallVar[slideCount] = new SlideType_Listen_Box_Function("slide"+j,SlideType_Listen_Box_String,SlideType_Listen_Box_Title_Text);
			 slideCount++;
			}
			
			/*for SUMMARY end*/
			/*for DIALOG start*/
			if(slide_type.toLowerCase()=="dialog"){
				$("#slide"+j).addClass("SlideType_Dialog");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div id="title_dialog"';
				htmltext+=' style="color: #FE5C57; font-size: 30px; padding: 5px 0px 5px 0px;">'+arrData[67]+'</div>';
				htmltext+=' <div id="chatBox"';
				htmltext+=' 	style="width: 100%; height: 365px; overflow-x: hidden; overflow-y: scroll; padding-top: 20px;">';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
				 var SlideType_Dialog_Title_Text = arrData[67];
				 var SlideType_Dialog_String = "*&"+arrData[68]+"*&"+arrData[72]+"*&*&"+arrData[69]+"*&"+arrData[74]+"*&*&"+arrData[70]+"*&"+arrData[75]+"*&*&"+arrData[71]+"*&"+arrData[73]+"*&*&"+arrData[121]+"*&"+arrData[126]+"*&*&"+arrData[122]+"*&"+arrData[127]+"*&*&"+arrData[123]+"*&"+arrData[128]+"*&*&"+arrData[124]+"*&"+arrData[129]+"*&*&"+arrData[125]+"*&"+arrData[130];	
			     lessonFunctionCallVar[slideCount] = new SlideType_Dialog_Function("slide"+j,SlideType_Dialog_String);
			     slideCount++;
			}
			/*for DIALOG end*/
			
			/*for SPECIAL SLIDE start*/
			if(slide_type.toLowerCase()=="special slide"){
				$("#slide"+j).addClass("SlideType_Special_Slide");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <div class="SlideType_Special_Slide_Inner_Container"';
				htmltext+=' style="height: 400px; width: 800px; position: absolute; left: 80px; top: 40px; overflow-y: auto;">';
				htmltext+=' </div>';
				$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
			     var SlideType_Special_Slide_Data = arrData[145]+"*&"+arrData[142]+"*&"+arrData[146]+"*&"+arrData[143]+"*&"+arrData[147]+"*&"+arrData[144];
			     lessonFunctionCallVar[slideCount] = new SlideType_Special_Slide_Function("slide"+j, SlideType_Special_Slide_Data);
					slideCount++;
			
			}
			/*for SPECIAL SLIDE end*/
			/*for LISTENABLE TRANSLATION start*/
			if(slide_type.toLowerCase()=="listenable translation"){
				$("#slide"+j).addClass("SlideType_ListenableTranslation");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' ';
				htmltext+=' <table style="width: 100%;height: 100%;">';
				htmltext+=' <tr>';
					htmltext+=' <td>';
						htmltext+=' <div class="SlideType_ListenableTranslation_Question"';
							htmltext+='  style="width: 100%;padding: 16px; font-size: 24px;text-align: left;">'+arrData[161]+'</div>';
						htmltext+=' <div id="SlideType_ListenableTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">';
							htmltext+=' <img style="margin-top: 15px;width: 24px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
							if(arrData[167].toLowerCase()=="1"|| arrData[167].toLowerCase()=="yes"){
								htmltext+=' <audio id="audio" style="display:none;" >';
								  htmltext+=' <source id="mp3_src" src="https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text='+arrData[162]+'&locale='+locale +'" type="audio/mp3"></source>';
								htmltext+=' </audio>	';
							}else{
								htmltext+=' <audio id="audio" style="display:none;" >';
							if(isB2BUser){
								 	htmltext+=' <source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+language.toLowerCase() +'/'+arrData[162]+'" type="audio/mp3"></source>';
							}else{
								 	htmltext+=' <source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+userLang.split("_")[0].toLowerCase() +'/'+arrData[162]+'" type="audio/mp3"></source>';
								} 
								htmltext+=' </audio>';
							}
						htmltext+=' </div>';
						htmltext+=' <div class="SlideType_ListenableTranslation_InputBoxOuterDiv"';
							htmltext+=' style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;">';
							htmltext+=' <input id="SlideType_ListenableTranslation_InputBox"';
								htmltext+=' style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;background:#eee;"';
								htmltext+=' type="text">';
						htmltext+=' </div>';
					htmltext+=' </td>';
				htmltext+=' </tr>';
			htmltext+=' </table>';
			$("#slide"+j+" .sectionInnerContainer").append(htmltext);
			$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
			console.log("LISTENABLE TRANSLATION",arrData);
		       var SlideType_ListenableTranslation_Audio = arrData[162];
		       var SlideType_ListenableTranslation_IsTTS = arrData[167];
		       var SlideType_ListenableTranslation_Answer = arrData[163];
		       var SlideType_ListenableTranslation_Tip_On_Correct = arrData[164];
		       var SlideType_ListenableTranslation_Tip_On_InCorrect = arrData[165];
		       var SlideType_ListenableTranslation_Typing_Language = arrData[166];
		       lessonFunctionCallVar[slideCount] = new SlideType_ListenableTranslation_Function("slide"+j,SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect,SlideType_ListenableTranslation_Typing_Language);
		       slideCount++;
			}
			/*for LISTENABLE TRANSLATION slide end*/
			/*for image tip slide start*/
			if(slide_type.toLowerCase()=="image tip slide"){
				$("#slide"+j).addClass("SlideType_IMAGE_Tip_Slide");
				var htmltext="";
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
				htmltext+=' <div class="SlideType_IMAGE_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">'
				       htmltext+=' <div class="titleText" style="padding: 30px 0px;color:#49C9AF!important;font-size:30px;text-transform: uppercase;">'
				       htmltext+=' </div>'
				       htmltext+=' <div class="SlideType_IMAGE_Tip_Slide_tipText" style="width: 100%;font-size:30px;">'
				       htmltext+=' </div>'
				      htmltext+=' </div>'
				      htmltext+=' <div style="position: absolute;left: 10px; bottom: -15px;">'
				       htmltext+=' <img style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0,1,0,180deg); width: 60px; z-index: -1;display: none;" src="../img/tip-tail-f9f9f9.png" />'
				       htmltext+=' <img style="width: 70px;display: none; " alt="" src="../img/jelly-monster-2-small - rotate-15.png">'
				      htmltext+=' </div>'
				    		$("#slide"+j+" .sectionInnerContainer").append(htmltext);
				$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");

				   var SlideType_IMAGE_Tip_Slide_TipText = arrData[180]+"*&";
				     var SlideType_IMAGE_Tip_Slide_TitleText = appStringObject[52] ;
				     lessonFunctionCallVar[slideCount] = new SlideType_IMAGE_Tip_Slide_Function("slide"+j,SlideType_IMAGE_Tip_Slide_TitleText,SlideType_IMAGE_Tip_Slide_TipText);
				     slideCount++;
			}
			/*for image tip slide end*/
			/*for pronunciation start*/
			if(slide_type.toLowerCase()=="pronunciation"){
				$("#slide"+j).addClass("SlideType_Pronunciation");
				var htmltext="";
				htmltext+='';
				htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>';
						htmltext+=' <table style="width: 100%;height: 100%;">';
							htmltext+=' <tr>';
								htmltext+=' <td>';
									htmltext+=' <div class="SlideType_Pronunciation_Question"';
										htmltext+=' style="width: 90%;padding: 16px; font-size: 22px;text-align: center;margin: auto;">';
											htmltext+=' <span style="color:#FE5C57;">'+arrData[149]+'</span>';
											htmltext+=' <span style="">'+arrData[148]+'</span>';
											htmltext+=' <span style="color:#FE5C57;">'+arrData[150]+'</span>';
										htmltext+=' </div>';
									htmltext+=' <div style="width:500px;text-align: center;margin: auto; ">';
										htmltext+=' <div class="SlideType_Pronunciation_ImageDiv SlideType_Pronunciation_ImageDiv_UnChecked option1" ';
										htmltext+=' tipText="'+arrData[153]+'">';
											htmltext+=' <div ';
												htmltext+=' class="SlideType_Pronunciation_Image_Circle SlideType_Pronunciation_Image_Circle_UnChecked"></div>';
											htmltext+=' <div style="height: 200px;background: #fff;display: table-cell;border-radius: 15px 15px 0px 0px;width: 200px;">';
												htmltext+=' <img class="SlideType_Pronunciation_Img_Source" src="../../../images/listen.png" style="width: 45px;">';
											htmltext+=' </div>';
											htmltext+=' <div class="SlideType_Pronunciation_ImageText SlideType_Pronunciation_ImageText_UnChecked" style="padding: 16px 8px;text-align: left;">Option 1</div>';
											htmltext+=' <audio id="audio" style="display:none;" >';
											 if(isB2BUser){
											 	htmltext+=' <source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+language.toLowerCase() +'/'+arrData[151]+'" type="audio/mp3"></source>';
											 	}else{ 
											 	htmltext+=' <source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+userLang.split("_")[0].toLowerCase() +'/'+arrData[151]+'" type="audio/mp3"></source>';
											 } 
											htmltext+=' </audio>';
										htmltext+=' </div>';
										htmltext+=' <div class="SlideType_Pronunciation_ImageDiv SlideType_Pronunciation_ImageDiv_UnChecked option2" ';
											htmltext+=' tipText="'+arrData[154]+'">';
											htmltext+=' <div';
												htmltext+=' class="SlideType_Pronunciation_Image_Circle SlideType_Pronunciation_Image_Circle_UnChecked"></div>';
											htmltext+='<div style="height: 200px;background: #fff;display: table-cell;border-radius: 15px 15px 0px 0px;width: 200px;">';
												htmltext+='<img class="SlideType_Pronunciation_Img_Source" src="../../../images/listen.png" style="width: 45px;">';
											htmltext+='</div>';
											htmltext+='<div class="SlideType_Pronunciation_ImageText SlideType_Pronunciation_ImageText_UnChecked" style="padding: 16px 8px;text-align: left;">Option 2</div>';
											htmltext+='<audio id="audio" style="display:none;" >';
											if(isB2BUser){
											 	htmltext+='<source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+language.toLowerCase() +'/'+arrData[152]+'" type="audio/mp3"></source>';
											 	}else{
											 	htmltext+='<source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+userLang.split("_")[0].toLowerCase() +'/'+arrData[152]+'" type="audio/mp3"></source>';
											 	} 
											htmltext+='</audio>';
										htmltext+='</div>';
									htmltext+='</div>';
	
								htmltext+='</td>';
							htmltext+='</tr>';
						htmltext+='</table>';
						$("#slide"+j+" .sectionInnerContainer").append(htmltext);
						$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
						  var SlideType_Pronunciation_Answer = "option"+arrData[155];
					       lessonFunctionCallVar[slideCount] = new SlideType_Pronunciation_Function("slide"+j,SlideType_Pronunciation_Answer);
					       slideCount++;
			}
			/*for pronunciation end*/
			/*for combined translation start*/
			if(slide_type.toLowerCase()=="combined translation"){
			console.log("slide_type : "+slide_type);
			$("#slide"+j).addClass("SlideType_CombinedTranslation");
			var htmltext="";
			htmltext+=' <div style="position: absolute; /* top: -5px; */ left: calc(50% - 100px); height: 24px; width: 200px; background-color: #49C9AF; z-index: 1000; font-size: 20px; border-radius: 0px 0px 8px 8px;">SMART REVISION</div>'
			htmltext+=' <table style="width: 100%;height: 100%;"><tr><td><div class="SlideType_CombinedTranslation_Question"style="width: 90%;padding: 16px; font-size: 22px;text-align: center;margin: auto;">';
			htmltext+=' <span style="color:#FE5C57;">'+arrData[169]+'</span>';
			htmltext+=' <span style="color:#fff;">'+arrData[168]+'</span>';
			htmltext+=' <span style="color:#FE5C57;">'+arrData[170]+'</span>';
			htmltext+=' </div>';
				if(arrData[171]=="1" || arrData[171].toLowerCase()=="yes"){
					htmltext+=' <div style="width: 90%;border-radius: 20px; border: none;text-align: center;font-size: 22px;margin:10px auto;">';
						htmltext+=' <span style="color:#fff;">'+arrData[173]+'</span>';
					htmltext+=' </div>	';
				}
				if(arrData[172]=="1" || arrData[172].toLowerCase()=="yes"){
					 htmltext+=' <div id="SlideType_CombinedTranslation_Listen_Text" style="cursor: pointer;height: 50px;width:50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">';
					 htmltext+=' <img style="margin-top: 15px;width: 24px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
						if(arrData[179]=="1" || arrData[179].toLowerCase()=="yes" ){
							htmltext+=' <audio id="audio" style="display:none;" >';
							htmltext+=' <source id="mp3_src" src="https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text='+arrData[174]+'&locale='+window.parent.defaultLocale +'" type="audio/mp3"></source>';
							htmltext+=' </audio>	';
						}else{
							htmltext+=' <audio id="audio" style="display:none;" >';
								if(isB2BUser){ 
									htmltext+=' <source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+language.toLowerCase() +'/'+arrData[174]+'" type="audio/mp3"></source>';
								}else{ 
									htmltext+=' <source id="mp3_src" src="//language-practice.s3.amazonaws.com/English-App/PronunciationFiles/'+userLang.split("_")[0].toLowerCase() +'/'+arrData[174]+'"type="audio/mp3"></source>';
								} 
							htmltext+=' </audio>';
						}
					htmltext+=' </div>';
				}
			htmltext+=' <div class="SlideType_CombinedTranslation_InputBoxOuterDiv"';
			htmltext+=' style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;margin-top: 10px;">';
			htmltext+=' <input id="SlideType_CombinedTranslation_InputBox"';
			htmltext+=' 	style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size:40px;background:#eee;"';
			htmltext+=' type="text">';
			htmltext+=' </div>';
			htmltext+=' 					';
			htmltext+=' </td>';
			htmltext+=' </tr>';
			htmltext+=' </table>';
			htmltext+=' 			';			
			$("#slide"+j+" .sectionInnerContainer").append(htmltext);
			$("#slide"+j+" .sectionInnerContainer").css("background-color","#2b3e50");
			console.log("COMBINED TRANSLATION",arrData);
		       var SlideType_CombinedTranslation_Audio = arrData[174];
		       var SlideType_CombinedTranslation_IsTTS = arrData[179];
		       var SlideType_CombinedTranslation_Answer = arrData[175];
		       var SlideType_CombinedTranslation_Tip_On_Correct =arrData[176];
		       var SlideType_CombinedTranslation_Tip_On_InCorrect =arrData[177];
		       var SlideType_CombinedTranslation_Typing_Language = arrData[178];
		       console.log("slideCount : ",slideCount);
		       console.log("j : ",j);
		       lessonFunctionCallVar[slideCount] = new SlideType_CombinedTranslation_Function("slide"+j,SlideType_CombinedTranslation_Audio,SlideType_CombinedTranslation_IsTTS,SlideType_CombinedTranslation_Answer,SlideType_CombinedTranslation_Tip_On_Correct,SlideType_CombinedTranslation_Tip_On_InCorrect,SlideType_CombinedTranslation_Typing_Language);
		       slideCount++;
		}
		/*for combined translation end*/
			$(".sectionInnerContainer span").css("color","#FE5C57");
			$("#jumbleSource span").css("color","#2b3e50");
			$(".totalCoinsWon").css("color","#2b3e50");
			$(".totalNewCoinsWon").css("color","#2b3e50");
			$(".option1 span").css("color","#2b3e50");
			$(".option2 span").css("color","#2b3e50");
			$(".option3 span").css("color","#2b3e50");
			$(".option4 span").css("color","#2b3e50");
			
	}
		//for length
		for(var i=wrongdataarray.length+lessonlength+3;i<2*lessonlength+3;i++){
		//for length =5
// 		for(var i=wrongdataarray.length+5+3;i<2*5+3;i++){
			//FOR length =2 
//		for(var i=wrongdataarray.length+2+3;i<2*2+3;i++){
			$("#slide"+i).remove();
		}
}

function updateUserMessangerCoin(mID,lessonId,gameCoin) {
	
	$.ajax({
		url : '../updateMessangerUserData.action',
		data : {
			mID : mID,
			lessonId : lessonId,
			coins : gameCoin,
			completed : 1,
			type:"lesson"
		},dataType:"json",
		success : function(result) {
			console.log("Saved");
		}
	});

}
function updateUserBonusCoin(userId,lessonNumberVar,gameCoin,nativeLanguageId,learningLanguageId) {
	var earnedVia1="LEARN_LESSON_BONUS";
	if(isB2BLesson=="true"){
		earnedVia1="LEARN_LESSON_B2B_BONUS";
		gameCoin=50;
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
			console.log(this.url);
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from lessonV1.9.js line 1368");
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
	data1 = {
			user_id : userId,
			earned_via : earned_via,
			challenge_number : lessonNumberVar,
			coins : gameCoin,
			nativeLanguageId : nativeLanguageId,
			learningLanguageId : learningLanguageId,
			isB2bUser : window.parent.isB2Buser
		};
	try{
		window.parent.updateLocalStorage(earned_via,lessonNumberVar,gameCoin,"",
				nativeLanguageId,learningLanguageId);
		} catch (e) {}
	$.ajax({
		url : '../updateUserCoinForAndroid.action',
		data : data1,
		dataType:"json",
		success : function(result) {
			console.log(this.url);
			//console.log(result);
			if(result.hasOwnProperty('error')){
				if(result.error=="sessionExpired"){
					console.log("redirecting from lessonV1.9.js line 1405");
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
					console.log("redirecting from lessonV1.9.js line 1431");
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
function redirectToHEForLogin(){
	window.parent.open("https://helloenglish.com/WebLogin/index.jsp?"+loginParameters);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}