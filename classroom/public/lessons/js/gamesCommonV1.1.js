var coinStackDelayArray = [1,20,27,34,37,40,43,47,50,52,65];


function startCoinStackAnimation(){
	$(".coinStackAnimationScreen").css("display","block");
	
	if(coinsWonCount > 0){
		$(".coinInStack").css("bottom","700px");
		setTimeout(function(){
			for(var i=0;i<coinsWonCount;i++){
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

function showAwardCoin(){
	var random1 = getRandomInt(1,coinFeedbackArray.length);
	$(".coinfeedbackText").text(coinFeedbackArray[random1-1]);
	$(".awardCoinContainer,.coinfeedbackText").css("display","block");
	$(".awardCoinContainer").addClass("awardCoinAnimation animated animationDuration1500ms");
	$(".awardCoinText").text("+"+equivalent_positive_coins);
	$("#gameCoinDiv").text(gameCoin);
	try{
		Android.coinWon(equivalent_positive_coins);
	}catch(err){}
	try{
		if (typeof(Storage) !== "undefined") {
			if (localStorage[webinarId]) {
			  localStorage[webinarId] = Number(localStorage[webinarId]) + equivalent_positive_coins;
			} else {
			  localStorage[webinarId] = equivalent_positive_coins;
			}
		}
	}catch(err){}
	console.log("courseId:"+courseId+"/lessonNumber:"+lessonNumber+"/slidenumber"+Reveal.getCurrentSlide().getAttribute('slidenumber'));
	var slideNo = Reveal.getCurrentSlide().getAttribute('slidenumber');
	var classId = getUrlParam("classId","");
	var name = getUrlParam("name","");
	var uid = getUrlParam("uid","");
	var org = getUrlParam("org","");
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://us-central1-hello-english-app-269406.cloudfunctions.net/liveClassCoinsInfo?function=saveCoinsData&uid="+uid+"&name="+name+"&org="+org+"&classId="+classId+"&slideNo="+slideNo+"&lessonId="+courseId+"&coinsOnCurrentSlide="+equivalent_positive_coins+"&coinsTotal="+gameCoin,
	  "method": "GET",
	  "headers": {}
	}
	/*
	$.ajax(settings).done(function (response) {
	  console.log(this.url);
	  console.log(response);
	});
	*/
	/*
	var liveClassCoinsInfo = firebase.functions().httpsCallable('liveClassCoinsInfo');
	liveClassCoinsInfo(
		{	function: "saveCoinsData",
			uid : uid,
			name : name,
			org : org,
			classId : classId,
			slideNo : slideNo,
			lessonId : courseId,
			coinsOnCurrentSlide : equivalent_positive_coins,
			coinsTotal : gameCoin
		}
	).then(function(result) {
	  // Read result of the Cloud Function.
	  console.log(result);
	  //var sanitizedMessage = result.data.text;
	  // ...
	});
	*/
	
	setTimeout(function(){
		$(".coinfeedbackText").addClass("coinFeedbackAnimation animated");
	},300);
	setTimeout(function(){
		$(".awardCoinContainer").removeClass("awardCoinAnimation animated animationDuration1500ms");
		$(".coinfeedbackText").removeClass("coinFeedbackAnimation animated");
		$(".awardCoinContainer").css("display","none");
		$(".coinfeedbackText").css("display","none");
		
	},1600);
	playCoinSound();
}

function showAwardCoin(slideCoin){
	var random1 = getRandomInt(1,coinFeedbackArray.length);
	$(".coinfeedbackText").text(coinFeedbackArray[random1-1]);
	$(".awardCoinContainer,.coinfeedbackText").css("display","block");
	$(".awardCoinContainer").addClass("awardCoinAnimation animated animationDuration1500ms");
	$(".awardCoinText").text("+"+slideCoin);
	$("#gameCoinDiv").text(gameCoin);
	try{
		Android.coinWon(slideCoin);
	}catch(err){}
	try{
		if (typeof(Storage) !== "undefined") {
			if (localStorage[webinarId]) {
			  localStorage[webinarId] = Number(localStorage[webinarId]) + slideCoin;
			} else {
			  localStorage[webinarId] = slideCoin;
			}
		}
	}catch(err){}
	console.log("courseId:"+courseId+"/lessonNumber:"+lessonNumber+"/slidenumber"+Reveal.getCurrentSlide().getAttribute('slidenumber'));
	var slideNo = Reveal.getCurrentSlide().getAttribute('slidenumber');
	var classId = getUrlParam("classId","");
	var name = getUrlParam("name","");
	var uid = getUrlParam("uid","");
	var org = getUrlParam("org","");
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://us-central1-hello-english-app-269406.cloudfunctions.net/liveClassCoinsInfo?function=saveCoinsData&uid="+uid+"&name="+name+"&org="+org+"&classId="+classId+"&slideNo="+slideNo+"&lessonId="+courseId+"&coinsOnCurrentSlide="+slideCoin+"&coinsTotal="+gameCoin,
	  "method": "GET",
	  "headers": {}
	}
	
	setTimeout(function(){
		$(".coinfeedbackText").addClass("coinFeedbackAnimation animated");
	},300);
	setTimeout(function(){
		$(".awardCoinContainer").removeClass("awardCoinAnimation animated animationDuration1500ms");
		$(".coinfeedbackText").removeClass("coinFeedbackAnimation animated");
		$(".awardCoinContainer").css("display","none");
		$(".coinfeedbackText").css("display","none");
		
	},1600);
	playCoinSound();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function playCoinSound(){
	soundManager.play("coin");
}

function shuffleArray1(array) {
	var tmp, curr, top = array.length;
	if(top) {
		while(--top) {
			curr = Math.floor(Math.random() * (top + 1));
			tmp = array[curr];
			array[curr] = array[top];
			array[top] = tmp;
		}
	}

	return array;
}

function setRTL(parentContainer) {
	if (language.toLowerCase().indexOf("urdu") > -1
			|| language.toLowerCase().indexOf("shahmukhi") > -1
			|| language.toLowerCase().indexOf("arabic") > -1) {

		parentContainer.find("textarea").each(
				function() {
					var text = $(this).val().toLowerCase();
					text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g, '');
					// text = text.replace(/\//g, '');
					text = text.replace(/^\s+|\s+$/g, '');
					text = text.replace(/ /g, '');
					text = text.replace(" ", "");
					var flag = 0;
					if (new RegExp("[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
							.test(text))
						flag = 1;
					// if(!$(this).val().toLowerCase().match(/[a-z]/i) ||
					// $(this).val()==""){
					if (flag == 1) {
						$(this).bind('textarea propertychange', function() {
							var textToSend = $(this).val();
							var result = applySpecialChar(textToSend);
							$(this).val(result);
						});

						$(this).attr("dir", "rtl");
					} else {
						$(this).attr("dir", "");
					}
				});

		parentContainer.find("input").each(
				function() {
					var text = $(this).val();
					text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g, '');
					text = text.replace(/\//g, '');
					text = text.replace(/^\s+|\s+$/g, '');
					text = text.replace(/ /g, "");
					var flag = 0;
					if (new RegExp("[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
							.test(text))
						flag = 1;
					// if(!$(this).val().toLowerCase().match(/[a-z]/i) ||
					// $(this).val()==""){
					if (flag == 1) {
						$(this).bind('input propertychange', function() {
							var textToSend = $(this).val();
							var result = applySpecialChar(textToSend);
							$(this).val(result);
						});
						$(this).attr("dir", "rtl");
					} else {
						$(this).attr("dir", "");
					}
				});
		parentContainer
				.find("div")
				.each(
						function() {
							var text = $(this).text().trim();
							if ($(this).children().length > 0) {
								return true;
							}
							if (true) {
								if (text != "" && text != undefined
										&& text != null) {
									text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g,
											'');
									text = text.replace(/\//g, '');
									text = text.replace(/^\s+|\s+$/g, '');
									text = text.replace(/ /g, "");
									var flag = 0;
									if (new RegExp(
											"[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
											.test(text))
										flag = 1;
									// if(!$(this).val().toLowerCase().match(/[a-z]/i)
									// || $(this).val()==""){
									if (flag == 1) {
										var result = applySpecialChar($(this)
												.text());
										$(this).text(result);
										$(this).attr("dir", "rtl");
									} else {
										$(this).attr("dir", "");
									}
								}
							}
						});

		parentContainer
				.find("td")
				.each(
						function() {
							var text = $(this).text().trim();
							if ($(this).children().length > 0) {
								return true;
							}
							if (true) {
								if (text != "" && text != undefined
										&& text != null) {
									text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g,
											'');
									text = text.replace(/\//g, '');
									text = text.replace(/^\s+|\s+$/g, '');
									text = text.replace(/ /g, "");
									var flag = 0;
									if (new RegExp(
											"[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
											.test(text))
										flag = 1;
									// if(!$(this).val().toLowerCase().match(/[a-z]/i)
									// || $(this).val()==""){
									if (flag == 1) {
										var result = applySpecialChar($(this)
												.text());
										$(this).text(result);
										$(this).attr("dir", "rtl");
									} else {
										$(this).attr("dir", "");
									}
								}
							}
						});
		parentContainer
				.find("span")
				.each(
						function() {
							var text = $(this).text().trim();
							if ($(this).children().length > 0) {
								return true;
							}
							if (true) {
								if (text != "" && text != undefined
										&& text != null) {
									text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g,
											'');
									text = text.replace(/\//g, '');
									text = text.replace(/^\s+|\s+$/g, '');
									text = text.replace(/ /g, "");
									var flag = 0;
									if (new RegExp(
											"[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
											.test(text))
										flag = 1;
									// if(!$(this).val().toLowerCase().match(/[a-z]/i)
									// || $(this).val()==""){
									if (flag == 1) {
										var result = applySpecialChar($(this)
												.text());
										$(this).text(result);
										$(this).attr("dir", "rtl");
									} else {
										$(this).attr("dir", "");
									}
								}
							}
						});

		parentContainer
				.find("a")
				.each(
						function() {
							var text = $(this).text().trim();
							if ($(this).children().length > 0) {
								return true;
							}
							if (true) {
								if (text != "" && text != undefined
										&& text != null) {
									text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g,
											'');
									text = text.replace(/\//g, '');
									text = text.replace(/^\s+|\s+$/g, '');
									text = text.replace(/ /g, "");
									var flag = 0;
									if (new RegExp(
											"[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
											.test(text))
										flag = 1;
									// if(!$(this).val().toLowerCase().match(/[a-z]/i)
									// || $(this).val()==""){
									if (flag == 1) {
										var result = applySpecialChar($(this)
												.text());
										$(this).text(result);
										$(this).attr("dir", "rtl");
									} else {
										$(this).attr("dir", "");
									}
								}
							}
						});

		parentContainer
				.find(".variableClassForUrdu")
				.each(
						function() {
							var text = $(this).parent().text().trim();
							// if($(this).children().length > 0){return true;}
							if (true) {
								if (text != "" && text != undefined
										&& text != null) {
									text = text.replace(/[!-.,;Â¡Â¿?'":><$#]/g,
											'');
									text = text.replace(/\//g, '');
									text = text.replace(/^\s+|\s+$/g, '');
									text = text.replace(/ /g, "");
									var flag = 0;
									if (new RegExp(
											"[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]")
											.test(text))
										flag = 1;
									// if(!$(this).val().toLowerCase().match(/[a-z]/i)
									// || $(this).val()==""){
									if (flag == 1) {
										var result = applySpecialChar($(this)
												.text());
										$(this).text(result);
										$(this).attr("dir", "rtl");
									} else {
										$(this).attr("dir", "");
									}
								}
							}
						});

	}

}

function validateLoginForm(){
	var username = $(".loginBox #userName").val();
	var password = $(".loginBox #password").val();
	$(".loginBox .usernameRequired").css("display","none");
	$(".loginBox .passwordRequired").css("display","none");
	$(".loginBox .validateEmail").css("display","none");
	
	var atpos=username.indexOf("@");
	var dotpos=username.lastIndexOf(".");
	
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=username.length){
		$(".loginBox .validateEmail").css("display","");
		return;
	}
	if(password==null || password==""){
		$(".loginBox .passwordRequired").css("display","block");
		return;
	}
	if(username==null || username=="" || password==null || password==""){
		
		if (username==null || username==""){$(".loginBox .usernameRequired").css("display","");  }
		if (password==null || password==""){$(".loginBox .passwordRequired").css("display","");  }
		return;
	}
	makeUserLogin( username, password);
}

function makeUserLogin(email, password) {
	
	$(".loginBox .alreadyAppUser").css("display","none");
	$(".loginBox .emailNotVerified").css("display","none");
	$(".loginBox .errorDiv").text("");
	$(".loginBox .linkSentAgain").css("display","none");
	
	//console.log("makeUserLogin: "+email);
	
	$.ajax({
		url : 'makeUserWebLogin.action',
		data : {
			email : email,
			password : password
		},
		success : function(result) {
			console.log(this.url);
			console.log(result);
			$(".loginBox .userEmail").text(email);
			$(".loginBox .alreadyAppUser").css("display","none");
			$(".loginBox .emailNotVerified").css("display","none");
			$(".loginBox .errorDiv").text("");
			
			if(result["success"][0]["code"]==3 || result["success"][0]["code"]==2){
				$(".loginBox .emailNotVerified").css("display","");
			}else if(result["success"][0]["code"]==1){
				isLoggedIn = true;
				$(".loginBox").css('display','none');
				gameEnd();
			}else if(result["success"][0]["code"]==4){
				$(".loginBox .errorDiv").text("incorrect username");
			}else if(result["success"][0]["code"]==5 || result["success"][0]["code"]==19){
				$(".loginBox .errorDiv").text("incorrect password");
			}else if(result["success"][0]["code"]==6){
				$(".loginBox .errorDiv").text("incorrect username and password");
			}else if(result["success"][0]["code"]==19){
				$(".loginBox .alreadyAppUser").css("display","");
			}
			
		}
	});
}

function makeUserLogout() {

	$.ajax({
		url : '../logout.action',
		data : {},
		success : function(result) {
			if (result["success"] == 15) {
				window.location.reload();
			}
		}
	});
}

function resendLink(email) {
	
	$(".alreadyAppUser").css("display","none");
	
	$.ajax({
		url : 'resendVerificationCodeWebLogin.action',
		data : {
			email : email
		},
		success : function(result) {
			//console.log(this.url);
			//console.log(result);
			if(result["success"]==13){
				$(".signUpSuccessful").css("display","none");
				$(".linkSentAgain").css("display","");
			}
			
		}
	});
}
function validateSignUpForm(){
	var firstName = $(".mainsignupdiv #firstName").val();
	var lastName = $(".mainsignupdiv #lastName").val();
	var email = $(".mainsignupdiv #userEmail").val();
	var password = $(".mainsignupdiv #password").val();
	var confirmPassword = $(".mainsignupdiv #confirmPassword").val();
	var flag = true;
	
	$(".mainsignupdiv .firstnameRequired").css("display","none");
	$(".mainsignupdiv .lastnameRequired").css("display","none");
	$(".mainsignupdiv .userEmailRequired").css("display","none");
	$(".mainsignupdiv .passwordRequired").css("display","none");
	$(".mainsignupdiv .confirmpasswordRequired").css("display","none");
	$(".mainsignupdiv .passwordNotMatch").css("display","none");
	$(".mainsignupdiv .validateEmail").css("display","none");
	
	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	
	if(firstName==null || lastName=="" || email==null || email=="" || password==""
			|| confirmPassword==""){
		
		if (firstName==null || firstName==""){$(".mainsignupdiv .firstnameRequired").css("display","");  }
		if (lastName==null || lastName==""){$(".mainsignupdiv .lastnameRequired").css("display","");  }
		if (email==null || email==""){$(".mainsignupdiv .userEmailRequired").css("display","");  }
		if (password==null || password==""){$(".mainsignupdiv .passwordRequired").css("display","");  }
		if (confirmPassword==null || confirmPassword==""){$(".mainsignupdiv .confirmpasswordRequired").css("display","");  }
		flag = false;
	}
	
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		if(email!=""){
			$(".mainsignupdiv .validateEmail").css("display","");
		}
		flag = false;
	}
	
	if(password != confirmPassword){
		$(".mainsignupdiv .passwordNotMatch").css("display","");
		flag = false;
	}
	
	if(flag){
		courseId = $('.mainsignupdiv #course option:selected').attr("courseId");
		var language= $('.mainsignupdiv #course option:selected').text().split(" ");
		makeUserSignUp( $(".mainsignupdiv #userEmail").val(), $(".mainsignupdiv #password").val(),language[2],$(".mainsignupdiv #firstName").val(),$(".mainsignupdiv #lastName").val(),courseId);
	}else{
		return;
	}
	
	
}

function makeUserSignUp(email, password,language,firstName,lastName,courseId) {
	
	$(".mainsignupdiv .firstnameRequired").css("display","none");
	$(".mainsignupdiv .lastnameRequired").css("display","none");
	$(".mainsignupdiv .userEmailRequired").css("display","none");
	$(".mainsignupdiv .passwordRequired").css("display","none");
	$(".mainsignupdiv .confirmpasswordRequired").css("display","none");
	$(".mainsignupdiv .passwordNotMatch").css("display","none");
	$(".mainsignupdiv .validateEmail").css("display","none");
	
	$.ajax({
		url : 'makeUserWebSignUp.action',
		data : {
			email : email,
			password : password,
			firstName : firstName,
			lastName : lastName,
			language : language,
			courseId : courseId
		},
		success : function(result) {
			//console.log(this.url);
			//console.log(result);
			if(result["success"]["status"]==true){
				$(".mainsignupdiv .userEmail").text(email);
				$(".mainsignupdiv .signUpSuccessful").css("display","block");
				$(".mainsignupdiv .signupForm").css("display","none");
				//window.location.reload();
			}else if(result["success"]["code"]==17){
				$(".mainsignupdiv .alreadyRegistered").css("display","");
			}else if(result["success"]["code"]==0){
				$(".mainsignupdiv .errorDiv").text("Server Error");
			}
			

		}
	});
}

function formatString(data,arg1,arg2,arg3){
	if(data.indexOf("%1$d") > -1){
//		data = data.substr(0,data.indexOf("%1$d")) + arg1 + data.substr(data.indexOf("%1$d")+4,data.length);
		data = data.replace("%1$d",arg1);
	}
	if(data.indexOf("%1$s") > -1){
		data = data.replace("%1$s",arg1);
	}
	if(arg2 != undefined){
		if(data.indexOf("%2$d") > -1){
			data = data.replace("%2$d",arg2);
		}
		if(data.indexOf("%2$s") > -1){
			data = data.replace("%2$s",arg2);
		}
	}
	if(arg3 != undefined){
		if(data.indexOf("%3$d") > -1){
			data = data.replace("%3$d",arg3);
		}
		if(data.indexOf("%3$s") > -1){
			data = data.replace("%3$s",arg3);
		}
	}
	return data;
}

function formatString(data,arg1,arg2,arg3){
	if(data.indexOf("%1$d") > -1){
//		data = data.substr(0,data.indexOf("%1$d")) + arg1 + data.substr(data.indexOf("%1$d")+4,data.length);
		data = data.replace("%1$d",arg1);
	}
	if(data.indexOf("%1$s") > -1){
		data = data.replace("%1$s",arg1);
	}
	if(arg2 != undefined){
		if(data.indexOf("%2$d") > -1){
			data = data.replace("%2$d",arg2);
		}
		if(data.indexOf("%2$s") > -1){
			data = data.replace("%2$s",arg2);
		}
	}
	if(arg3 != undefined){
		if(data.indexOf("%3$d") > -1){
			data = data.replace("%3$d",arg3);
		}
		if(data.indexOf("%3$s") > -1){
			data = data.replace("%3$s",arg3);
		}
	}
	return data;
}