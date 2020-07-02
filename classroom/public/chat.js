 var lessonShown = true;
 var chatShown = true;
 var quizResponseListener;
 var quizResponseTimer;
 var quizResponseData = {};
 var studentData = [];
 var isAdmin = false;
 
 var firebaseConfig = {
   apiKey: "AIzaSyAsqQLjg5DSmv_j0nDI6RBhyFAzZbHdznw",
   authDomain: "hello-english-app-269406.firebaseapp.com",
   databaseURL: "https://hello-english-app-269406.firebaseio.com",
   projectId: "hello-english-app-269406",
   storageBucket: "hello-english-app-269406.appspot.com",
   messagingSenderId: "194812903325",
   appId: "1:194812903325:web:e6456950b0b80ff5a9b974",
   measurementId: "G-ENFS9M67KD"
 };
 var secondaryApp = firebase.initializeApp(firebaseConfig);
 firebase.firestore().enablePersistence();
 var db = secondaryApp.firestore();
 var slideNo = 0;
 var url = "";
 var id = "";
 var isChatToShow = true;
 var teacherAction = [];
var chatIos = getUrlVars()["chatIos"];
   var autoTimer = false;

 $(function(){
   var sessionId = getUrlVars()["roomName"];
   var name = getUrlVars()["name"];
   isAdmin = getUrlVars()["isAdmin"];
   
  console.log("sessionId:"+sessionId);
   if(sessionId == undefined && window.location.href.indexOf("/live") > -1){
      sessionId = window.location.href.split("/")[4];  
   }
    var timerOn = getUrlVars()["timerOn"];
   console.log("sessionId:"+sessionId);
   if(timerOn != undefined && timerOn != null && timerOn != "undefined") {
     autoTimer = timerOn;
   }
  if(window.location.href.indexOf("teacherDashboard") > -1){
    sessionId = window.location.href.split("/")[4];  
    isAdmin = true;
  }
  if(window.location.href.indexOf("studentSyncedQuiz") > -1){
    sessionId = window.location.href.split("/")[4];  
    isAdmin = false;
  }
   console.log("sessionId:"+sessionId);
   if(sessionId != undefined && sessionId != null && sessionId != "undefined") {
     id = sessionId;
   if(isAdmin){
     startQuizResponseListner();
     startquizResponseTimer();
     startStudentDataListener();
   }
     db.collection("liveAppSessionTeacherAction").doc(id).get()
    .then((querySnapshot) => {
      if(querySnapshot.data().data != undefined) {
        teacherAction = querySnapshot.data().data;
      } else {
         db.collection('liveAppSessionTeacherAction').doc(id).set({format: true}, { merge: true }).then(function() {
         }).catch(function(error) {});
      }
        pageLoaded();    
      
    }).catch(function(error) {
        pageLoaded();
    });
   }
   if(chatIos != undefined && chatIos != null && chatIos != "undefined") {
     isChatToShow = stringToBoolean(chatIos);
   }
   
   $(".adminFunction").css("display", "none");
   if(isAdmin != undefined && isAdmin != null && isAdmin != "undefined") {
     if(isAdmin == true ||  isAdmin == "true"){
       $(".msger-chat").css("height","250px");
       $(".adminFunction").css("display", "flex");
     $("#teacherPanel2").css("display","inline-block");
     $("#chatSection").css("height","auto");
     }
   }
   if (autoTimer == true || autoTimer == "true") {
     $(".autoTimerButton").css("display", "none");
   }
   if(name != undefined && name != null && name != "undefined") {
     userName = name;
   }
   $("form").submit(function() { return false; });
   if(isChatToShow){
  //resetUI();   
   }   
   $(".messageInput").on('keyup', function (e) {
     if (e.keyCode === 13) {
      sendMessage();// Do something
    }
    if($(".messageInput").val().trim() == ""){
      $(".messageSendButton").css("opacity",".5");
      $(".messageSendButton").attr("disabled");
    }else{
      $(".messageSendButton").css("opacity","1");
      $(".messageSendButton").removeAttr("disabled");
    }
  });
   $(".messageSendButton").css("opacity",".5");
   $(".messageSendButton").attr("disabled");

 });

 function pageLoaded() {
    var jsonObject = {};
   jsonObject["type"] = "pageLoaded";
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
   teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
 }

 function getUpdateListener() {
   db.collection("liveAppSessionParameters").doc(id)
   .onSnapshot(function (doc) {
     console.log("doc.data getUpdateListener:",doc.data());
     var slideNumber = 0;
     var lessonUrl = "";
     var dataObject = doc.data();
     var showAnswer = false;
     var showNativeChat = true;
     var showNativeLesson = true;
     var timer = 0;
     if (dataObject.org != undefined) {
       var org = dataObject.org;
       if (org != undefined) {
         if(org.length > 0){
           $("#registration_organization").html("");
           for(var i=0;i<org.length;i++){
             $("#registration_organization").append('<option value="'+org[i]+'">'+org[i]+'</option>')
           }
      // updateRegistrationForm();       
      // checkRegistrationParameters();
         }

       }
     }
     if (dataObject.currentSlide != undefined) {
       slideNumber = Number(dataObject.currentSlide);
     }
     if (dataObject.timer != undefined){
       timer = Number(dataObject.timer)
     }
     if (dataObject.lessonUrl != undefined){
       lessonUrl = dataObject.lessonUrl;
     }
     if (dataObject.showAnswer != undefined){
       showAnswer = stringToBoolean(dataObject.showAnswer);
     }
     if (dataObject.showNativeChat != undefined){
       showNativeChat = stringToBoolean(dataObject.showNativeChat);
     }
     if (dataObject.showNativeLesson != undefined){
       showNativeLesson = stringToBoolean(dataObject.showNativeLesson);
     }
     if(dataObject.autoTimer != undefined){
       autoTimer = stringToBoolean(dataObject.autoTimer);
     }
     if (autoTimer == true || autoTimer == "true") {
         $(".autoTimerButton").css("display", "none");
     } else {
         $(".autoTimerButton").css("display", "block");
     }
     lessonShown = showNativeLesson;
     chatShown = showNativeChat;
     if (showNativeChat) {
       $(".chatArea").css("display", "block");
       $(".chatArea2").css("display", "flex");
     } else {
       $(".chatArea").css("display", "none");
       $(".chatArea2").css("display", "none");
     }
     if (showNativeLesson) {
       $(".showHideLessonText").text("Hide Native Lesson");
     } else {
       $(".showHideLessonText").text("Show Native Lesson");
     }
     if (!isChatToShow) {
       $(".chatArea").css("display", "none");
       $(".chatArea2").css("display", "none");
      $("#chatSection").css("display", "none");
     $("#iframe").addClass("iframeFullScreen");
     }else{
     $("#iframe").removeClass("iframeFullScreen");
   }
     var wn =document.getElementById('iframe').contentWindow;
   console.log("slideNo:"+slideNo);
     if (url.trim() != lessonUrl.trim()) {
       url = lessonUrl;
       slideNo = slideNumber;
       //var isAdmin = getUrlVars()["isAdmin"];
       if(isAdmin == true ||  isAdmin == "true"){
         lessonUrl = lessonUrl.trim()+"&isAdmin=true";
       }
       if (autoTimer == true || autoTimer == "true") {
         $("#iframe").attr('src', lessonUrl.trim()+"&liveSession=true&email="+$("#screen-email").val()+"&header=none&slide="+slideNumber+"&sessionId="+id+"&timerOn=true");
        } else {
         $("#iframe").attr('src', lessonUrl.trim()+"&liveSession=true&email="+$("#screen-email").val()+"header=none&slide="+slideNumber+"&sessionId="+id); 
        }
     } else {
       if (slideNumber != slideNo){
         slideNo = slideNumber;
         wn.postMessage('slide='+slideNumber, "*");  
       } else {
         if(showAnswer){
           wn.postMessage('showAnswer', "*");
         } else if (timer != 0) {
           wn.postMessage('startTimer='+timer, "*");
         }
     if (dataObject.showLeaderboard != undefined){
       var showLeaderboard = stringToBoolean(dataObject.showLeaderboard);
       if(showLeaderboard){
         wn.postMessage('showLeaderboard', "*");
       }
     }
       }
     }

   });
   
   
   db.collection("liveAppSessionParameters").doc(id).collection("currentBadge").doc("details")
   .onSnapshot(function (doc) {
     console.log("doc.data getUpdateListener:",doc.data());
   var data = doc.data();
   if(data != undefined && data.status != undefined && data.status){
     var wn = document.getElementById('iframe').contentWindow;
     wn.postMessage('showAwardBadge='+data.badgeName+"#"+data.userName+"#"+data.userID, "*"); 
   }
   });
   
 }

 function stringToBoolean(val){
   var a = {
     'true':true,
     'false':false
   };
   return a[val];
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
   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
     function(m,key,value) {
       vars[key] = value;
     });
   return vars;
 }
 
 function awardBadge(){
   var badge = $("#chooseBadge").val();
   var name = $("#chooseBadgeUserName").val().split("/")[0];
   var userId = $("#chooseBadgeUserName").val().split("/")[1];
   if(badge == "" || name == ""){
     alert("Choose award and username");
     return;
   }
   responseData = {
          webinarID : id,
          userName: name,
          badgeName : badge,
          userID : userId,
          status : true
        };
  var saveLiveAppBadgeWon = secondaryApp.functions('asia-east2').httpsCallable('saveLiveAppBadgeWon');
  saveLiveAppBadgeWon(responseData).then(function(result) {
    console.log("saveLiveAppBadgeWon:",result);
    
    var sanitizedMessage = result.data.text;
  }).catch(function(error) {
    console.log(error);
  });
  
  db.collection('liveAppSessionParameters').doc(id)
  .collection("currentBadge").doc("details").set(responseData, { merge: true }).then(function() {
   setTimeout(function(){
     responseData.status = false;
     db.collection('liveAppSessionParameters').doc(id).collection("currentBadge").doc("details").set(responseData, { merge: true }).then(function() {
      }).catch(function(error) {});
   },10000);  
   }).catch(function(error) {});
   
   var jsonObject = {};
   jsonObject["type"] = "AwardBadge";
   jsonObject["userName"] = name;
   jsonObject["badgeName"] = badge;
   jsonObject["userID"] = userId;
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
   teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
   
 }

 function goToSlide() {
   var slide = $(".slideInput").val();
   if(slide.trim() == ""){
     return alert('Please enter a slide number');
   }
   $(".loadingClassSlide").css("display", "inline-block");
   $(".btnClassSlide").css("display", "none");
   $(".slideDiv").css("display", "inline-block");
   var goToNextSlideInfo = secondaryApp.functions().httpsCallable('goToNextSlide');
   goToNextSlideInfo({
     sessionId : id,
     slideNumber: parseInt(slide)
   }
   ).then(function(result) {
     $(".slideDiv").css("display", "flex");
     $(".loadingClassSlide").css("display", "none");
     $(".btnClassSlide").css("display", "inline-block");
   });
 }

 function previousSlide() { 
   var tempSlide = slideNo - 1; 
   if (tempSlide < 0){
     tempSlide = 0;
   }
   $(".loadingClassSlide").css("display", "inline-block");
   $(".btnClassSlide").css("display", "none");
   $(".slideDiv").css("display", "inline-block"); 
   var dataObject = {currentSlide: tempSlide, timer: 0, showAnswer: false}
   db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {
     $(".slideDiv").css("display", "flex");
     $(".loadingClassSlide").css("display", "none");
     $(".btnClassSlide").css("display", "inline-block");
   }).catch(function(error) {});
   var jsonObject = {};
   jsonObject["type"] = "Previous";
   jsonObject["sildeNoFrom"] = slideNo;
   jsonObject["sildeNoTo"] = tempSlide;
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
   teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});

 }

 function nextSlide() {
   $(".loadingClassSlide").css("display", "inline-block");
   $(".btnClassSlide").css("display", "none");
   $(".slideDiv").css("display", "inline-block"); 
   var tempSlide = slideNo + 1 ;
   var dataObject = {currentSlide: tempSlide, timer: 0, showAnswer: false}
   db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {
     $(".slideDiv").css("display", "flex");
     $(".loadingClassSlide").css("display", "none");
     $(".btnClassSlide").css("display", "inline-block");
   }).catch(function(error) {});
      var jsonObject = {};
   jsonObject["type"] = "Next";
   jsonObject["sildeNoFrom"] = slideNo;
   jsonObject["sildeNoTo"] = tempSlide;
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
   teacherAction.push(jsonObject);
      db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {}); 
 }

 function startTimer(){
   var timerVal = $(".timerInput").val();
   if(timerVal.trim() == ""){
     timerVal = 15;
   }
   $(".loadingClassTimer").css("display", "inline-block");
   $(".btnClassTimer").css("display", "none");
   $(".timerDiv").css("display", "inline-block");
   var startTimer = secondaryApp.functions().httpsCallable('startTimer');
   startTimer({
     sessionId : id,
     timer: parseInt(timerVal)
   }
   ).then(function(result) {
     $(".timerDiv").css("display", "flex");
     $(".loadingClassTimer").css("display", "none");
     $(".btnClassTimer").css("display", "inline-block");
   });
 }

 function startTimerWithCheckAnswer() {
   var timerVal = $(".timerInput").val();
   if(timerVal.trim() == ""){
     timerVal = 15;
   } else {
     timerVal = parseInt(timerVal);
   }
   $(".loadingClassTimer").css("display", "inline-block");
   $(".btnClassTimer").css("display", "none");
   $(".timerDiv").css("display", "inline-block");
   var dataObject = {timer: timerVal, showAnswer: false}
   db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {
     var x = setInterval(function() {
       clearInterval(x);
       dataObject = {timer: 0, showAnswer: true};
       db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {
         $(".timerDiv").css("display", "flex");
         $(".loadingClassTimer").css("display", "none");
         $(".btnClassTimer").css("display", "inline-block");      
       }).catch(function(error) {});   
        var jsonObject = {};
   jsonObject["type"] = "showAnswer";
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});   
     }, (timerVal * 1000));
   }).catch(function(error) {});
      var jsonObject = {};
   jsonObject["type"] = "timer";
   jsonObject["value"] = timerVal;
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});

 }

 function changeUrl() {
   if($(".urlString").val().trim() != ""){
     const dataObject = {timer: 0, showAnswer: false, currentSlide: 0, lessonUrl: $(".urlString").val().trim() , showNativeLesson: true}
     db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {   
     }).catch(function(error) {});
     var jsonObject = {};
   jsonObject["type"] = "changeUrl";
   jsonObject["value"] = $(".urlString").val().trim();
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
   }
 }

 function showAnswer() {
   $(".loadingClass").css("display", "block");
   $(".btnClass").css("display", "none");
   var dataObject = {timer: 0, showAnswer: true};
   db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {
     $(".loadingClass").css("display", "none");
     $(".btnClass").css("display", "inline-block");    
   }).catch(function(error) {});
     var jsonObject = {};
   jsonObject["type"] = "showAnswer";
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
 }


 function showOrHideLesson() {
   $(".loadingClass").css("display", "block");
   $(".btnClass").css("display", "none");
   var flag = true;
   if (lessonShown){
     flag = false;
   }
   var showOrHide = secondaryApp.functions().httpsCallable('showOrHide');
   showOrHide({
     sessionId : id,
     type : "lesson",
     flag : flag
   }
   ).then(function(result) {
     $(".loadingClass").css("display", "none");
     $(".btnClass").css("display", "inline-block");
   });
   var jsonObject = {};
   jsonObject["type"] = "showOrHideLesson";
   jsonObject["value"] = flag;
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
 }

 function showOrHideChat() {
   $(".loadingClass").css("display", "block");
   $(".btnClass").css("display", "none");
   var flag = true;
   if (chatShown){
     flag = false;
   }
   var showOrHide = secondaryApp.functions().httpsCallable('showOrHide');
   showOrHide({
     sessionId : id,
     type : "chat",
     flag : flag
   }
   ).then(function(result) {
     $(".loadingClass").css("display", "none");
     $(".btnClass").css("display", "inline-block");
   });
    var jsonObject = {};
   jsonObject["type"] = "showOrHideChat";
   jsonObject["value"] = flag;
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
 }
 
 function makeLeaderboard(){
   $(".loadingClass").css("display", "block");
   $(".btnClass").css("display", "none");
   var dataObject = {timer: 0, showLeaderboard: true};
   db.collection('liveAppSessionParameters').doc(id).set(dataObject, { merge: true }).then(function() {
     $(".loadingClass").css("display", "none");
     $(".btnClass").css("display", "inline-block");    
   }).catch(function(error) {});
     var jsonObject = {};
   jsonObject["type"] = "showLeaderboard";
   jsonObject["time"] = moment(new Date().getTime()).format("DD-MM-YYYY HH:mm:ss");
  teacherAction.push(jsonObject);
   db.collection('liveAppSessionTeacherAction').doc(id).set({data: teacherAction}, { merge: true }).then(function() {
   }).catch(function(error) {});
 }

 function loadUrl() {
   if($(".urlString").val().trim() != ""){
     sendNotification(JSON.stringify({ "adminType": "loadUrl", "url": $(".urlString").val().trim()}));
   }
 }

 function loadSlideNumber(number) {
   console.log("loadSlideNumber:"+number);
   var wn = document.getElementById('iframe').contentWindow;
   wn.postMessage('slide='+number, "*");   
 }

 function displayLesson() {
   if(lessonShown){
     lessonShown = false;
     $("#iframe").css("display","none");
     $(".showLessonText").val("Show Lesson");
     $(".chatDiv").css("top", "0px");
   } else {
     lessonShown = true;
     $("#iframe").css("display","block");
     $(".showLessonText").val("Hide Lesson");
     $(".chatDiv").css("top", "300px");
   }
 }

 function setTimer(timerVal) {
   if (timerVal == undefined || timerVal.trim() == ""){
     timerVal = "60";
   }
   var wn =document.getElementById('iframe').contentWindow;
   wn.postMessage('startTimer='+timerVal, "*");
 }

 function addMessage(userName, message, classInfo) {
   try {
     var message = JSON.parse(message);
     if (message["adminType"] != undefined && message["adminType"] != null) {
       var type = message["adminType"].trim();
       if( type == "nextSlide") {
         var wn =document.getElementById('iframe').contentWindow;
         wn.postMessage('nextSlide', "*");
       } else if( type == "hideLesson") {
         $(".chatDiv").css("top", "0px");
         $("#iframe").css("display","none");
       } else if ( type == "showLesson") {
         $(".chatDiv").css("top", "300px");
         $("#iframe").css("display","flex");
       } else if (type == "showAnswer"){
         var wn =document.getElementById('iframe').contentWindow;
         wn.postMessage('showAnswer', "*");
       } else if (type == "loadUrl"){
         $("#iframe").attr('src',message["url"].trim()) ;
       } else if (type == "setTime"){
         setTimer(message["value"].trim())
       } else if (type == "loadSlide"){
         loadSlideNumber(message["slide"].trim());
       }
     } else {
       var html = '<div class="'+classInfo+'"><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">'+userName+' : '+message+'</div></div><div class="msg-text"></div>';
       $(".msger-chat").append(html);
       $(".msger-chat").animate({ scrollTop: 100000}, 1000);
     }
   } catch(err){
     var html = '<div class="'+classInfo+'"><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">'+userName+' : '+message+'</div></div><div class="msg-text"></div>';
     $(".msger-chat").append(html);
     $(".msger-chat").animate({ scrollTop: 100000}, 1000);
   }

 }
 
 function startStudentDataListener(){
   db.collection("liveAppSessionRegistration").doc(id).collection("users")
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var data = doc.data();
            var obj = {};
            obj.name = data.Name;
            obj.userId = data.UserID;
            
            var isFound = false;
            for(var i=0;i<studentData.length;i++){
              if(studentData[i].name == obj.name && studentData[i].userId == obj.userId){
                isFound = true;
              }
            }
            if(!isFound){
              studentData.push(obj);  
            }
          });
          for(var i=0;i<studentData.length;i++){
            if(i==0){
              $("#chooseBadgeUserName").html('<option value="">Choose User</option>');
            }
            $("#chooseBadgeUserName").append('<option value="'+studentData[i].name.split(" ")[0]+'/'+studentData[i].userId+'">'+studentData[i].name.split(" ")[0]+'('+studentData[i].userId+')</option>');
          }
        });
  db.collection("sessionCollection").doc("androidLive").collection("webinarData").doc(moment(new Date().getTime()).format("YYYYMMDD"))
  .collection("webinar").doc(id).collection("userData")
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var data = doc.data();
            var obj = {};
            obj.name = data.name;
            obj.email = data.email;
            obj.phone = data.phone;
            if(obj.phone != undefined && obj.phone != "undefined"){
              obj.userId = obj.phone;
            }
            if(obj.email != undefined && obj.email != "undefined"){
              obj.userId = obj.email;
            }
            var isFound = false;
            for(var i=0;i<studentData.length;i++){
              if(studentData[i].name == obj.name && studentData[i].userId == obj.userId){
                isFound = true;
              }
            }
            if(!isFound){
              studentData.push(obj);  
            }
          });          
          for(var i=0;i<studentData.length;i++){
            if(i==0){
              $("#chooseBadgeUserName").html('<option value="">Choose User</option>');
            }
            $("#chooseBadgeUserName").append('<option value="'+studentData[i].name.split(" ")[0]+'/'+studentData[i].userId+'">'+studentData[i].name.split(" ")[0]+'('+studentData[i].userId+')</option>');
          }
        });  
 }
 
 function startQuizResponseListner(){
   try{
     quizResponseListener();
   }catch(err){}
   
  quizResponseListener = db.collection("liveAppSessionQuizResponse").doc(id)
        .onSnapshot(function (doc) {
          console.log("liveAppSessionQuizResponse:",doc.data());
          quizResponseData = doc.data();
        });
}

function startquizResponseTimer(){
  setInterval(function(){
    var data = quizResponseData;
    for (key in data) {
      var key = parseInt(key);
      if(key == slideNo){
        var html = "";
        if(data[key].topScorer != undefined && data[key].topScorer.length >= 1){
          html += "<div style='border:1px solid #ccc;border-radius:4px;padding:8px;'><label>Correct Response</label>"
          html += "<div>"
          for(var i=0;i<data[key].topScorer.length;i++){
            html += data[key].topScorer[i].name.split(" ")[0]+",";
          }
          html += "</div></div>"
        }
        if(data[key].incorrectOptions != undefined && data[key].incorrectOptions.length >= 1){
          html += "<div style='border:1px solid #ccc;border-radius:4px;padding:8px;margin-top:8px;'><label>InCorrect Response</label>"
          html += "<div>"
          for(var i=0;i<data[key].incorrectOptions.length;i++){
            html += data[key].incorrectOptions[i].name.split(" ")[0]+",";
          }
          html += "</div></div>"
        }
        $("#studentResponse").html(html);
        break;
      }else{
        $("#studentResponse").html("");
      }
      
    }
  },1000);
}

 function showModal() {
   $("#myModal").addClass('show');
   $("#myModal").removeClass('fade');
 }

 function hideModal() {
   $("#myModal").addClass('fade');
   $("#myModal").removeClass('show');
 }

 function sendMessage() {
   sendNotification($(".messageInput").val());
 }

 function sendNotification(message) {
   if(message == ""){
     return;
   }
   var messageObject = {};
   var notifcationBody = {};
   var notification = {};
   var msgId = new Date().getTime()
   messageObject["msg"] = message;
   messageObject["task"] = "";
   messageObject["t"] = "regular";
   messageObject["nt"] = "Chat Testing";
   messageObject["nm"] = message;
   messageObject["ni"] = "";
   messageObject["name"] = userName;
   messageObject["helloCode"] = "";
   messageObject["image"] = "";
   messageObject["webinarId"] = id;
   messageObject["notifId"] = "0";
   messageObject["task"] = "";
   messageObject["ct"] = "";
   messageObject["serverLink"] = "https://storage.helloenglish.com/English-App/Resources/NotificationIcon/";
   messageObject["nbi"] = "1offline.jpeg";
   notification["message"] = messageObject;
   notification["id"] = msgId;
   notification["type"] = "inAppChat";
   notification["priority"] = 9;

   var data = {
     'function'    : 'sendChatMessage',
     'messageToSend' : notification,
     'topicCondition': "'webinar_"+id+"' in topics",
     'sendChatMessage': true

   };
   $.ajax({
     url:"https://helloenglishapp.com/TeacherChat/SendChat.php",
     method: "GET",
     data:data,
     success:function(dataNew) {
       $(".messageInput").val('');
       console.log(dataNew)
     },
     error: function(a, b, c) {

     }
   });
 }