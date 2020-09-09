var config = {
	apiKey: "AIzaSyDIfD1TGi1AOZelnRPtfLC_sNn9_ImG2wU",
	authDomain: "intaplabs-com-culturealley-language-practice.firebaseapp.com",
	databaseURL: "https://intaplabs-com-culturealley-language-practice.firebaseio.com",
	projectId: "intaplabs.com:culturealley-language-practice",
	storageBucket: "",
	messagingSenderId: "1006908106368"
};
var defaultApp = firebase.initializeApp(config);
const messaging = firebase.messaging();
const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';
var id = "";
var userName = "Teacher";
var showchatIos = getUrlParam("chatIos","true");

if(showchatIos == "true"){
	messaging.onTokenRefresh(function() {
		messaging.getToken()
		.then(function(refreshedToken) {
			console.log('Token refreshed.' + refreshedToken);
			setTokenSentToServer(false);
		 resetUI();
	  }).catch(function(err) {
		console.log('Unable to retrieve refreshed token ', err);
		showToken('Unable to retrieve refreshed token ', err);
	  });
	});

	navigator.serviceWorker.addEventListener('message', function(event) {
		console.log('Received a message from service worker: ', event.data);
	});

	messaging.onMessage(function(payload) {
		console.log("Message received. ", payload);
		if (payload.data.message != null && payload.data.message != undefined) {
			var messageObject = JSON.parse(payload.data.message);
			addMessage(messageObject.name, messageObject.msg, "msg left-msg")
		}  
	});

}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return decodeURI(urlparameter);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function appendChatMessage(payload){
	console.log("type : "+payload);
}

function subscribeToATopic(token, topicName) {

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});
console.log("https://iid.googleapis.com/iid/v1/"+token+"/rel/topics/"+topicName);
xhr.open("POST", "https://iid.googleapis.com/iid/v1/"+token+"/rel/topics/"+topicName);
xhr.setRequestHeader("Authorization", "key=AAAA6nBmZoA:APA91bHqpvDDGA_zqGbpdsM13VpoY3CHa8MvKhB5BrorUapOcfjlrJ1CvaXVOFnsJD_9NTv_R7DXjfCbiEqadnxUsaGU1lcoVRW2my2lQRW8vw3Y6mOpexQPjZleBSzQ1IOX9vvE9YYHmo6wH9l94knetRjTunaLVw");
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
}

function resetUI() {
	clearMessages();
	showToken('loading...');
	messaging.getToken()
	.then(function(currentToken) {
		console.log("saurabh: "+currentToken);
		if (currentToken) {
			subscribeToATopic(currentToken, "webinar_"+id);
    } else {
    	console.log('No Instance ID token available. Request permission to generate one.');
    	requestPermission();
    	setTokenSentToServer(false);
    }
})
	.catch(function(err) {
		console.log('An error occurred while retrieving token. ', err);
		showToken('Error retrieving Instance ID token. ', err);
		if(err.code == "messaging/notifications-blocked"){
			console.log("hi i am there");
			setTimeout(function() {
				console.log("hi i am there1: "+ $(".incognitoModeCheck").attr("incognitoflAG"));
			}, 1000); 

		}else{
			setTimeout(function() {
				console.log("hi i am there2: "+ $(".incognitoModeCheck").attr("incognitoflAG"));
			}, 1000);  
		}
		setTokenSentToServer(false);
	});
}
  // [END get_token]

  function showToken(currentToken) {
  	console.log(currentToken);
  }

  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer(currentToken) {
  	if (!isTokenSentToServer()) {
  		console.log('Sending token to server...');
      // TODO(developer): Send the current token to your server.

      var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener("readystatechange", function () {
      	if (this.readyState === 4) {
      		console.log(this.responseText);
      	} 
      });
      data = 'email='+teacherEmail+'&gcmId=' + currentToken + '&teacherId='+teacherId;
      
      xhr.open("POST", "saveTeacherGcmId.action");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      
      console.log(data);
      xhr.send(data);

      setTokenSentToServer(false);
  } else {
  	console.log('Token already sent to  server so won\'t send it again unless it changes');
  }

}

function isTokenSentToServer() {
	return window.localStorage.getItem('sentToServer') == 1;
}

function setTokenSentToServer(sent) {
	window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function showHideDiv(divId, show) {
	if (show) {
		$('#' + divId).css('display','block');
	} else {
		$('#' + divId).css('display','none');
	}
}

function requestPermission() {
	console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission()
    .then(function() {
    	console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission, it
      // should update its UI reflecting this.
      resetUI();
      // [END_EXCLUDE]
  })
    .catch(function(err) {
    	console.log('Unable to get permission to notify.', err);
    	if( $(".incognitoModeCheck").attr("incognitoflAG")==0 || $(".incognitoModeCheck").attr("incognitoflAG")=="0"){
    		$("#errorDiv").css('display','block');
    		$("#errorDiv").html("You will not able to receive any messages currently as you have not given the notification permission on this link. Please refresh the link and click allow notifications to start receiving messages.");
    	}
    });
    // [END request_permission]
}

function clearMessages() {
}
