var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],viewportwidth=w.innerWidth||e.clientWidth||g.clientWidth,viewportheight=w.innerHeight||e.clientHeight||g.clientHeight;
var dataArray;
var dataObject;
var examEvaluation;
var isPlayble = false;
var isEmbed = true;
var isInLessonTest = false;
var isInitialTest = false;
var loginScreen = false;
var courseId = "courseplan029";
var lessonNumber = 1;
var course_language = "english";
var gameCoin = 1;
var scoreForGroup = 35;
var groupNumber = "";
var setNumber = 0;
var questionsPerSet = 3;
var totalQuestionCount = 0;
var questonCounter = 0;
var questionsResponseData;
var testTime = "";
var currentSectionType = "Grammar";
var equivalent_positive_coins = 1;
var isTestCompleted = false;
var testId = "abhinavTesting"
coinFeedbackArray = ["Very Good!","Well Done!","Good Job!","Awesome!"];

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
var defaultProject = firebase.initializeApp(firebaseConfig);
var analytics = firebase.analytics();
firebase.firestore().enablePersistence();
var db = defaultProject.firestore();

$(function(){
	
	courseId = getUrlParam("courseId","");
	lessonNumber = getUrlParam("lessonNumber",0);
	
	//fetchLessonDataFromFirestore(courseId,lessonNumber);
	loadTestData();
});

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

function fetchLessonDataFromFirestore(courseId,lessonNumber){
	console.log("fetchLessonDataFromFirestore");
	db.collection("courseLessonsJSON").doc(courseId).collection("lessons").doc(lessonNumber)
	.onSnapshot(function(querySnapshot) {
		console.log("fetchLessonDataFromFirestore",querySnapshot.data().json);
		dataArray = $.parseJSON(querySnapshot.data().json);
		loadAllSlides();
	});
}

function loadTestData(){
	dataObject = $.parseJSON('{ "examEvaluation": { "3": { "examSet1": { "0": "-25", "1": "-13", "2": "13", "3": "25" }, "examSet2": { "0": "-20", "1": "-10", "2": "10", "3": "20" }, "examSet3": { "0": "-15", "1": "-8", "2": "8", "3": "15" }, "examSet4": { "0": "-10", "1": "-5", "2": "5", "3": "10" }, "examSet5": { "0": "-5", "1": "-3", "2": "3", "3": "5" } }, "5": { "examSet1": { "0": "0", "1": "0", "2": "0", "3": "0", "4": "0", "5": "0" }, "examSet2": { "0": "0", "1": "0", "2": "0", "3": "0", "4": "0", "5": "0" }, "examSet3": { "0": "0", "1": "0", "2": "0", "3": "0", "4": "0", "5": "0" } }, "6": { "examSet1": { "0": "-35", "1": "-23", "2": "-12", "3": "0", "4": "12", "5": "23", "6": "35" }, "examSet2": { "0": "-25", "1": "-17", "2": "-8", "3": "0", "4": "8", "5": "17", "6": "25" }, "examSet3": { "0": "-15", "1": "-10", "2": "-5", "3": "0", "4": "5", "5": "10", "6": "15" } } }, "Grammar": { "questionCount": "15", "A2": { "Set_0": [{ "question_id": "3612", "question": "What is the comparative form of important?", "right_answer": "more important", "option_1": "more importanter", "option_2": "importanter" }, { "question_id": "3619", "question": "Which word goes in the space?<br>Which is the ___ planet from the sun?", "right_answer": "furthest / farthest", "option_1": "farrest", "option_2": "most far" }, { "question_id": "3624", "question": "Which sentence is NOT correct?", "right_answer": "We inside went because it was cold.", "option_1": "I\'d like to work overseas.", "option_2": "The weather is lovely. Let\'s go outside!" }], "Set_1": [{ "question_id": "3630", "question": "Which sentence is NOT correct?", "right_answer": "Environment is a serious issue.", "option_1": "Climate change is a serious issue.", "option_2": "Pollution is a serious issue." }, { "question_id": "3631", "question": "Which sentence is NOT correct?", "right_answer": "People are increasingly worried about economy.", "option_1": "People are increasingly worried about health.", "option_2": "People are increasingly worried about crime." }, { "question_id": "3633", "question": "In which sentence can you write: having?", "right_answer": "___ children will change your life.", "option_1": "I am ___ three cars.", "option_2": "I stopped work ___ a cup of coffee." }], "Set_2": [{ "question_id": "3644", "question": "Where can you write the word \'went\'?", "right_answer": "We ____ to France every year. ", "option_1": "We ____ to France next week.", "option_2": "We ____ to France in a month." }, { "question_id": "3652", "question": "Complete the sentence.<br>The girl ___ cycling to school.", "right_answer": "is ", "option_1": "are", "option_2": "am" }, { "question_id": "3659", "question": "Which sentence does NOT use the present continuous in the correct way?", "right_answer": "We are taking the bus to school every day.", "option_1": "Tim is working at the moment.", "option_2": "James is arriving at noon tomorrow." }], "Set_3": [{ "question_id": "3669", "question": "Which is the correct answer?<br>Can your brother speak German?", "right_answer": "No, he can’t.", "option_1": "Yes, he cans.", "option_2": "No, he don’t." }, { "question_id": "3678", "question": "Which question is correct?", "right_answer": "Which television are you going to buy?", "option_1": "What time we going to arrive?", "option_2": "Where you are going to stay?" }, { "question_id": "3698", "question": "Choose the correct option: _________ is the matter?", "right_answer": "What", "option_1": "Why", "option_2": "Who" }] }, "B1": { "Set_0": [{ "question_id": "3763", "question": "Which sentence is correct?", "right_answer": "Neither of them lives here.", "option_1": "Neither of they live here.", "option_2": "Neither Alice or Mark live here." }, { "question_id": "3764", "question": "Which sentence uses ’too’ incorrectly?", "right_answer": "Jemma is too beautiful. She’s the prettiest girl I know.", "option_1": "Change your clothes! Those clothes are too dirty.", "option_2": "Don’t drive too fast. You’ll have an accident." }, { "question_id": "3766", "question": "Which word goes in the space?<br>The film is ___ funny! I liked it so much that I watched it three times! ", "right_answer": "so", "option_1": "not", "option_2": "much" }], "Set_1": [{ "question_id": "3770", "question": "Which question is correct?", "right_answer": "Can you tell me where you were born?", "option_1": "Can you tell me where were you born?", "option_2": "Can you tell me if where you were born?" }, { "question_id": "3771", "question": "Which question is NOT correct?", "right_answer": "I want to know when is he going to get a job.", "option_1": "Have you any idea if we’ve got any bread?", "option_2": "Do you know if they’ve fixed their car?" }, { "question_id": "3778", "question": "Which word completes the sentence?<br>When I turned on the television, my favourite program _______.", "right_answer": "had finished nearly", "option_1": "has nearly finished", "option_2": "had nearly finished" }], "Set_2": [{ "question_id": "3779", "question": "Which word completes the sentence?<br>We ___ been out long when it started to rain.", "right_answer": "had", "option_1": "hadn\'t", "option_2": "weren\'t" }, { "question_id": "3781", "question": "Which sentence has a similar meaning?<br>Someone stole my phone. Then I found my bag and the phone was not there.", "right_answer": "When I found my bag, I noticed that someone had stolen my phone.", "option_1": "When I found my bag, I had noticed that someone had stolen my phone. ", "option_2": "When I found my bag, I had noticed that someone stole my phone." }, { "question_id": "3819", "question": "Choose the correct option:", "right_answer": "I’m working tomorrow", "option_1": "I work tomorrow.", "option_2": "i  don’t working tomorrow." }], "Set_3": [{ "question_id": "3820", "question": "Choose the correct option:", "right_answer": "Have you finished your project?", "option_1": "Have you got finished your project?", "option_2": "Did you finished your project?" }, { "question_id": "3821", "question": "Choose the correct option: I _________ some coffee and toast for my breakfast", "right_answer": "usually have", "option_1": "am usually having", "option_2": "am used to have" }, { "question_id": "3823", "question": "Choose the correct option:", "right_answer": "At this rate, they will never be here on time.", "option_1": "At this rate, they are never going here on time.", "option_2": "At this rate, they are never here on time." }], "Set_4": [{ "question_id": "3824", "question": "Choose the correct option:", "right_answer": "How far is it from Hong Kong to Shanghai?", "option_1": "How long is it from Hong Kong to Shanghai?", "option_2": "How much is it from Hong Kong to Shanghai?" }, { "question_id": "3829", "question": "Choose the appropriate preposition. I don\'t agree _________ you.", "right_answer": "with", "option_1": "about", "option_2": "at" }, { "question_id": "3832", "question": "Choose the appropriate preposition: She\'s married _________ a doctor, you know.", "right_answer": "to", "option_1": "about", "option_2": "with" }] }, "B2": { "Set_0": [{ "question_id": "3841", "question": "Which word goes in the space?<br>You look different ___ your father.", "right_answer": "from", "option_1": "unlike", "option_2": "as " }, { "question_id": "3844", "question": "Complete the question.<br>What would you do if there _____ an earthquake?", "right_answer": "were", "option_1": "could be", "option_2": "would be" }, { "question_id": "3847", "question": "Which sentence is NOT true of the second conditional?", "right_answer": "It describes what will happen in the future. ", "option_1": "It describes an imaginary situation.", "option_2": "You can use it for daydreaming and wishing." }], "Set_1": [{ "question_id": "3855", "question": "Which word or phrase CANNOT complete the sentence?<br>Dogs ___ kept under control.", "right_answer": "must ", "option_1": "should be", "option_2": "are always" }, { "question_id": "3858", "question": "Report this sentence correctly.<br>Tom said ‘I’m going to London tomorrow.’<br>Five days later you say...", "right_answer": "Tom said he was going to London the following day.", "option_1": "Tom said he is going to London the following day.", "option_2": "Tom said he was going to London tomorrow." }, { "question_id": "3862", "question": "In which sentence can you NOT delete ’that’?", "right_answer": "A photocopier is a machine that makes copies of pages.", "option_1": "The film that we saw yesterday was brilliant.", "option_2": "I’ve lost the magazine that I was reading." }], "Set_2": [{ "question_id": "3863", "question": "What CANNOT go in the space?<br>Julie looked after the injured bird ___ she found in the garden.", "right_answer": "who", "option_1": "that", "option_2": "(no word is needed here)" }, { "question_id": "3865", "question": "Paul: ‘I won’t be at the meeting tomorrow.’<br>Paul said that he _______ at the meeting the following day", "right_answer": "wouldn\'t be", "option_1": "won\'t be", "option_2": "can\'t be" }, { "question_id": "3896", "question": "Choose the correct option: ", "right_answer": "He said he wasn\'t feeling well", "option_1": "He told he wasn\'t feeling well.", "option_2": "He said he doesn\'t feeling well" }], "Set_3": [{ "question_id": "3897", "question": "Choose the correct option: ", "right_answer": "We won’t know what to do until we get the results.", "option_1": "We won’t know how to do after we get the results", "option_2": "When we get the results we won’t know what to do" }, { "question_id": "3899", "question": "Choose the correct option: ", "right_answer": "He’s probably lost her number", "option_1": "Probably, he’s lost her number", "option_2": "He’s lost her number, probably" }, { "question_id": "3901", "question": "Choose the correct option: ", "right_answer": "What do you think we’ll be doing in five years’ time?", "option_1": "What do you think we do in five year’s time?", "option_2": "What do you think you’re doing in five years’ time?" }] }, "C1": { "Set_0": [{ "question_id": "3911", "question": "The conclusions of the climate deniers are _________ wrong.", "right_answer": "fundamentally", "option_1": "up to a point", "option_2": "primarily" }, { "question_id": "3923", "question": "He\'s been working there _______ ten years.", "right_answer": "for", "option_1": "since", "option_2": "already" }, { "question_id": "3930", "question": "Yes, but the fact of the ________ is that is that you can start a home based business without much stress at all.", "right_answer": "matter", "option_1": "problem", "option_2": "question" }], "Set_1": [{ "question_id": "3963", "question": "Choose the correct option: There you are ! _________", "right_answer": "I have been waiting for ages", "option_1": "I waited for ages", "option_2": "I have waited for ages" }, { "question_id": "3965", "question": "Choose the correct option: I don´t think Tokyo _________", "right_answer": "is as dangerous as London", "option_1": "is dangerous like London", "option_2": "is so dangerous as London" }, { "question_id": "3966", "question": "Choose the correct option", "right_answer": "He looks just like his father", "option_1": "He looks just after his father", "option_2": "He looks just as his father" }], "Set_2": [{ "question_id": "3967", "question": "Choose the correct option", "right_answer": "Your birthday´s next month, isn´t it?", "option_1": "Your birthday is going to be next month, isn´t it?", "option_2": "Your birthday will be next month, won´t it?" }, { "question_id": "3969", "question": "Choose the correct option", "right_answer": "I can´t imagine why he said that", "option_1": "I don´t imagine why he said that", "option_2": "I might imagine why he said that" }, { "question_id": "3971", "question": "Choose the correct option:  I have never been _________ in all my life!", "right_answer": "so embarrassed", "option_1": "such an embarrassed", "option_2": "such embarrassed" }] }, "C2": { "Set_0": [{ "question_id": "3973", "question": "The President resigned; the whiff of scandal remained _______", "right_answer": "nevertheless", "option_1": "otherwise", "option_2": "therefore" }, { "question_id": "3977", "question": "By the time you\'re my age, you _______ your mind.", "right_answer": "will probably have changed", "option_1": "would probably change", "option_2": "will probably change" }, { "question_id": "3986", "question": "They live about _______ from here.", "right_answer": "an hour\'s drive", "option_1": "an hour of drive", "option_2": "a drive hour" }], "Set_1": [{ "question_id": "3988", "question": "_________ longer do we perceive the only great threat to our security in the hostile manoeuvres of foreign armies.", "right_answer": "No", "option_1": "Not", "option_2": "For" }, { "question_id": "4034", "question": "Choose the correct option:", "right_answer": "You won´t have heard the news yet", "option_1": "You will have heard the news yet", "option_2": "You would have heard the news yet" }, { "question_id": "4039", "question": "Choose the correct option:", "right_answer": "Bicycles are widely used in Amsterdam", "option_1": "Bicycles are in use widely in Amsterdam", "option_2": "Bicycles use widely in Amsterdam" }] } }, "Vocabulary": { "questionCount": "15", "A2": { "Set_0": [{ "question_id": "3711", "question": "Pick the correct word for the definition: A noise you can hear in a storm.", "right_answer": "thunder", "option_1": "hail", "option_2": "storm" }, { "question_id": "3719", "question": "My video recorder isn\'t __________ could you repair it for me?", "right_answer": "working", "option_1": "doing", "option_2": "making" }, { "question_id": "3720", "question": "I bought some milk at the little shop on the __________ .", "right_answer": "corner of our street", "option_1": "end of the road", "option_2": "bus stop" }], "Set_1": [{ "question_id": "3726", "question": "There are 24 hours in a __________ .", "right_answer": "day", "option_1": "night", "option_2": "week" }, { "question_id": "3731", "question": "Did you enjoy the __________ from London to Tokyo?", "right_answer": "flight", "option_1": "flying", "option_2": "fly" }, { "question_id": "3734", "question": "Jorge is Venezuelan and his wife is __________ .", "right_answer": "Swedish", "option_1": "Sweden", "option_2": "Swede" }], "Set_2": [{ "question_id": "3741", "question": "I\'d like to make __________ with the dentist, please.", "right_answer": "an appointment", "option_1": "a meeting", "option_2": "a reservation" }, { "question_id": "3743", "question": "They live on the top floor of a big block of __________ .", "right_answer": "flats / apartments", "option_1": "houses", "option_2": "rooms" }, { "question_id": "3748", "question": "When I went through customs, nobody __________ my passport.", "right_answer": "checked", "option_1": "looked", "option_2": "controlled" }], "Set_3": [{ "question_id": "3749", "question": "My video recorder isn\'t __________ could you repair it for me?", "right_answer": "working", "option_1": "making", "option_2": "going" }, { "question_id": "3754", "question": "Could you tell me the __________ to Piccadilly Circus, please?", "right_answer": "way", "option_1": "road", "option_2": "path" }, { "question_id": "3755", "question": "Jack\'s not well I think we should call an __________ .", "right_answer": "ambulance", "option_1": "accident", "option_2": "illness" }] }, "B1": { "Set_0": [{ "question_id": "3789", "question": "Choose the best word for this definition:<br>A gesture, action, or sound that is used to convey information or instructions", "right_answer": "Signal", "option_1": "Initiation", "option_2": "Fad" }, { "question_id": "3792", "question": "Choose the best word for this definition:<br>Food and household supplies sold at a store", "right_answer": "Grocery", "option_1": "Condiment", "option_2": "Seasoning" }, { "question_id": "3794", "question": "Choose the best word for this definition:<br>A rectangular area in a city surrounded by streets and usually containing several buildings", "right_answer": "Block", "option_1": "Port", "option_2": "Kiosk" }], "Set_1": [{ "question_id": "3797", "question": "Choose the best word for this definition:<br>Makeup that is used on the eyes", "right_answer": "Mascara", "option_1": "Blush", "option_2": "Polish" }, { "question_id": "3798", "question": "Choose the best word for this definition:<br>a toiletry that emits and diffuses a fragrant odour", "right_answer": "Perfume", "option_1": "Vermillion", "option_2": "Sanitiser" }, { "question_id": "3799", "question": "Choose the best word for this definition:<br>Out of fashion", "right_answer": "Antiquated", "option_1": "Contemporary", "option_2": "Trendy" }], "Set_2": [{ "question_id": "3805", "question": "Choose the best word for this definition:<br>An attribute that must be met or complied with and that fits a person for something", "right_answer": "Qualification", "option_1": "Dictionary", "option_2": "Notice" }, { "question_id": "3809", "question": "Choose the best word for this definition:<br>Fine powdery foodstuff obtained by grinding and sifting the meal of a cereal grain", "right_answer": "Flour", "option_1": "Cereal", "option_2": "Husk" }, { "question_id": "3810", "question": "Choose the best word for this definition:<br>A language user\'s knowledge of words", "right_answer": "Vocabulary", "option_1": "Speak", "option_2": "Message" }], "Set_3": [{ "question_id": "3812", "question": "Choose the best word for this definition:<br>Make mention of", "right_answer": "Mention", "option_1": "Sentence", "option_2": "Pronounce" }, { "question_id": "3814", "question": "Choose the best word for this definition:<br>Easy and not involved or complicated", "right_answer": "Elementary", "option_1": "Pronunciation", "option_2": "Word" }, { "question_id": "3826", "question": "What is the synonym of \'exhausted\'?", "right_answer": "Tired", "option_1": "Boring", "option_2": "Frightened" }], "Set_4": [{ "question_id": "3828", "question": "What is the synonym of \'mannered\'?", "right_answer": "Polite", "option_1": "Good", "option_2": "Intelligent" }, { "question_id": "3834", "question": "Choose the correct option: When George _________ his own business, everyone", "right_answer": "set up", "option_1": "grew upto", "option_2": "grew into" }, { "question_id": "3836", "question": "Choose the correct option: His friends told him not to _________ his fantastic collection. ", "right_answer": "throw away", "option_1": "started in", "option_2": "started out" }] }, "B2": { "Set_0": [{ "question_id": "3868", "question": "Barry is a .... driver. On his way to work today, he nearly killed three people.", "right_answer": "reckless", "option_1": "routine", "option_2": "privileged" }, { "question_id": "3869", "question": "After .... the woman\'s health, the doctor told her she was completely healthy.", "right_answer": "assessing", "option_1": "maintaining", "option_2": "infecting" }, { "question_id": "3870", "question": "Carol and Jim .... after the big fight they had last night. Today, they are happy together again.", "right_answer": "made up", "option_1": "figured out", "option_2": "showed off" }], "Set_1": [{ "question_id": "3872", "question": "Since he had no siblings, Jason was stuck with the .... of caring for his ill parents.", "right_answer": "burden", "option_1": "inheritance", "option_2": "essence" }, { "question_id": "3875", "question": "Takeshi\'s grandmother passed away 5 years ago. Every August, Takeshi goes to the .... to put candles around her grave.", "right_answer": "cemetery", "option_1": "exhibition", "option_2": "funeral" }, { "question_id": "3880", "question": "Jenny is a heavy smoker. After the 10-hour flight, she was really .... a cigarette.", "right_answer": "craving", "option_1": "plunging", "option_2": "scrambling" }], "Set_2": [{ "question_id": "3881", "question": "Goldman\'s Bank is based in New York. Last month, the bank opened its first .... in London.", "right_answer": "branch", "option_1": "colony", "option_2": "breed" }, { "question_id": "3883", "question": "Adidas is having a .... this month: buy a pair of shoes and get a free pair of socks.", "right_answer": "promotion", "option_1": "feast", "option_2": "rally" }, { "question_id": "3886", "question": "Tina\'s grandparents .... her. They give her gifts and sweets every visit.", "right_answer": "spoil", "option_1": "disregard", "option_2": "mistreat" }], "Set_3": [{ "question_id": "3887", "question": "There was one major .... in the burglar\'s plan: he didn\'t bring a car big enough to fit all of the stolen equipment.", "right_answer": "flaw", "option_1": "asset", "option_2": "prospect" }, { "question_id": "3889", "question": "The chef received many .... from his guests about the delicious dinner he made.", "right_answer": "compliments", "option_1": "excuses", "option_2": "curses" }, { "question_id": "3892", "question": "Derek\'s .... at the meeting made everyone angry. He should learn to control his emotion.", "right_answer": "outburst", "option_1": "recession", "option_2": "interval" }] }, "C1": { "Set_0": [{ "question_id": "3938", "question": "Establish or indicate who or what (someone or something) is.", "right_answer": "Identify", "option_1": "Define", "option_2": "Interpret" }, { "question_id": "3939", "question": "Set up or found", "right_answer": "Establish", "option_1": "Inaugurate", "option_2": "Search" }, { "question_id": "3946", "question": "Missive (noun)", "right_answer": "A letter to be sent", "option_1": "Respect for a person or a thing", "option_2": "Act of moving, action" }], "Set_1": [{ "question_id": "3953", "question": "Restrain (verb)", "right_answer": "To hold back, to prevent from doing", "option_1": "To change or adapt to fit or match something", "option_2": "To write quickly" }, { "question_id": "3954", "question": "A special or prominent article in a newspaper or magazine.", "right_answer": "Feature", "option_1": "Journal", "option_2": "News" }, { "question_id": "3956", "question": "(Behavioural attributes) the way a person behaves toward other people.", "right_answer": "Conduct", "option_1": "Complex", "option_2": "Range" }], "Set_2": [{ "question_id": "3958", "question": "The visual percept of a region.", "right_answer": "Aspect", "option_1": "Journal", "option_2": "Region" }, { "question_id": "3959", "question": "Set up or lay the groundwork for.", "right_answer": "Institute", "option_1": "Conclude", "option_2": "Obtain" }, { "question_id": "3961", "question": "Become conscious of.", "right_answer": "Perceive", "option_1": "Administrate", "option_2": "Regulate" }] }, "C2": { "Set_0": [{ "question_id": "4012", "question": "I don\'t think Paul will ever get married — he\'s the stereotypical _______ bachelor.", "right_answer": "confirmed", "option_1": "settled", "option_2": "fixed" }, { "question_id": "4017", "question": "After the football match the crowds _______ out of the stadium into the nearest bars and cafes.", "right_answer": "poured", "option_1": "leaked", "option_2": "dripped" }, { "question_id": "4025", "question": "The country has few natural resources and its economy has been _______ for some time now.", "right_answer": "diseased", "option_1": "sick", "option_2": "ill" }], "Set_1": [{ "question_id": "4029", "question": "The government is doing all it can to _______ war on dangerous driving.", "right_answer": "wage", "option_1": "launch", "option_2": "battle" }, { "question_id": "4048", "question": "Choose the appropriate verb to form the expression: To _________ a party.", "right_answer": "throw", "option_1": "serve", "option_2": "acquire" }, { "question_id": "4056", "question": "Choose the appropriate verb to form the expression: To _________ a tooth", "right_answer": "cut", "option_1": "drive", "option_2": "acquire" }] } }, "time": 20, "setLevel": true }');
	examEvaluation = dataObject.examEvaluation;
	examEvaluation["A2"] = 0;
	examEvaluation["B1"] = 0;
	examEvaluation["B2"] = 0;
	examEvaluation["C1"] = 0;
	examEvaluation["C2"] = 0;
			
	testTime = dataObject.time;
	$(".timerCounterText").text(testTime+":00");
	render_1stSlide();
	getTotalQuestionCount(dataObject);
	getSetData(scoreForGroup,true);
}
var testTimeInterval;
function startTestTimer(){
	var totalSec = testTime*60;
	testTimeInterval = setInterval(function(){
		totalSec--;
		var min = parseInt(totalSec/60);
		var sec = totalSec%60;
		if(min == 0 && sec == 0){
			testTimeOver();
			clearInterval(testTimeInterval);
			return;
		}else{
			if(sec < 10){
				sec = "0"+sec;
			}
			$(".timerCounterText").text(min+":"+sec);	
		}
		
	},1000);
}

function testTimeOver(){
	isTestCompleted = true;
	clearInterval(testTimeInterval);
	console.log("testTimeOver()");
	$(".timerCounterText").text("00:00");	
	var counter = 0;
	while(Reveal.getSlide(counter) != undefined){
		counter++;
	}
	render_SlideType_Last_Slide(counter);
	initializeReveal();
	setTimeout(function(){
		Reveal.slide(counter);
	},100);
}

function saveResponseToServer(){
	console.log("saveResponseToServer");
	var sections = ["grammar","vocabulary","writing","speaking"];
	for(var a=0;a<sections.length;a++){
		if(questionsResponseData[sections[a]] != undefined && questionsResponseData[sections[a]].answerResponseData != undefined){
			var arr = questionsResponseData[sections[a]].answerResponseData;
			for(var i=0;i<arr.length;i++){
				var data = {
					"function":"saveUserResponse",
					"test":"true",
					"testId":testId,
					"groupId":arr[i].groupId,
					"setId":arr[i].setId,
					"questionId":arr[i].questionId,
					"questionNumber":arr[i].questionNumber,
					"userResponse":arr[i].userResponse,
					"question":arr[i].question,
					"isCorrect":arr[i].isCorrect,
					"examType":arr[i].examType,
					"score":arr[i].score
				};
				saveResponse(i,data);
			}
		}
	}
}

function saveResponse(i,data){
	console.log(data);
	$.ajax({
		url : "https://mail.culturealley.com/english-app/home.php",
		data : data,
		method:"get",
		dataType:"post",
		success : function(result) {
			console.log("saveResponseToServer result :"+i+":",result);
		},
		error: function (error) {
			console.log(this.url);
			console.log(error.responseText);
		}
	});
}

function NextTestSlide1(){
	console.log("in NextTestSlide:"+setWiseQuestionCounter);
	saveResponseToServer();
	if((setWiseQuestionCounter)%testSetQuestionCount == 0){
		//loadNextSetTestData1();
		if(questionsResponseData.grammar != "undefined"){
			if(questionsResponseData.grammar.questionCounter <= questionsResponseData.grammar.totalQuestion){
				var correctCount = 0;
				for(var i=questionsResponseData.grammar.answerResponse.length-questionsPerSet; i<questionsResponseData.grammar.answerResponse.length; i++){
					if(questionsResponseData.grammar.answerResponse[i] == 1){
						correctCount++;
					}
				}
				console.log("scoreForGroup:"+scoreForGroup);
				try{
					scoreForGroup += parseInt(examEvaluation[questionsPerSet+""]["examSet"+(setNumber+1)][correctCount+""]);
				}catch(err){}
				/*
				if(setNumber == 0){
					scoreForGroup += parseInt(examEvaluation[questionsPerSet+""]["examSet"+(setNumber+1)][correctCount+""]);	
				}else{
					scoreForGroup += parseInt(examEvaluation[questionsPerSet+""]["examSet"+setNumber][correctCount+""]);	
				}
				*/
				
				console.log("scoreForGroup:"+scoreForGroup);
				if(questionsResponseData.grammar.questionCounter == questionsResponseData.grammar.totalQuestion){
					questionsResponseData.grammar.isCompleted = true;
				}
			}
			
		}
		var sectionType = "";
		if(questionsResponseData.grammar != "undefined" && !questionsResponseData.grammar.isCompleted){
			sectionType = "Grammar";
		}else if(questionsResponseData.vocabulary != "undefined" && !questionsResponseData.vocabulary.isCompleted){
			sectionType = "Vocabulary";
		}else if(questionsResponseData.writing != "undefined" && !questionsResponseData.writing.isCompleted){
			sectionType = "Writing";
		}else if(questionsResponseData.speaking != "undefined" && !questionsResponseData.speaking.isCompleted){
			sectionType = "Speaking";
		}else{
			testTimeOver();
			return;
		}
		if(currentSectionType != sectionType){
			/*
			$.each(examEvaluation, function(key,val){
				console.log("key : "+key+" ; value : "+val);
				examEvaluation[key+""].setCounter = 0;
			});
			*/
			examEvaluation["A2"] = 0;
			examEvaluation["B1"] = 0;
			examEvaluation["B2"] = 0;
			examEvaluation["C1"] = 0;
			examEvaluation["C2"] = 0;
			groupNumber = "";
			scoreForGroup = 35;//default
		}
		currentSectionType = sectionType;
		
		getSetData(scoreForGroup,false)
	}else{
		setWiseQuestionCounter++;
	}
	currentQuestionNumber++;
	if(setWiseQuestionCounter<=totalQuestionCount){
		
	}
	$(".questionCounterText").text((currentQuestionNumber+1)+" of "+totalQuestionCount);
}

function getSetData(score,isFirstTime){
	
	var gnumber = getGroup(score);
	console.log("gnumber:"+gnumber+"/groupNumber:"+groupNumber);
	if(groupNumber == ""){
		groupNumber = gnumber;
		setNumber = 0;
		examEvaluation[groupNumber+""] = setNumber;
	}else if(groupNumber == gnumber){
		setNumber++;
		examEvaluation[groupNumber+""] = setNumber;
	}else{
		setNumber = examEvaluation[gnumber+""] + 1;
		examEvaluation[gnumber+""] = setNumber;
		groupNumber = gnumber;
	}
	console.log("gnumber:"+gnumber+"/groupNumber:"+groupNumber+"/setNumber:"+setNumber);
	loadNextSetTestData1(isFirstTime);
	
}

function getGroup(score){
	var group = "B1";
	if(score > -100 && score <= 20){
		group = "A2";
	}else if(score > 20 && score <= 40){
		group = "B1";
	}else if(score > 40 && score <= 60){
		group = "B2";
	}else if(score > 60 && score <= 80){
		group = "C1";
	}else if(score > 80 && score <= 100){
		group = "C2";
	}
	return group;
}

function loadNextSetTestData1(isFirstTime){
	dataArray = dataObject[currentSectionType][groupNumber]["Set_"+setNumber];
	if(examEvaluation[questionsPerSet+""].setCounter == undefined){
		examEvaluation[questionsPerSet+""].setCounter = setNumber;
	}
	console.log("dataArray",dataArray);
	if(dataArray == undefined){
		testTimeOver();
		return;
	}
	var slideType = "grammar";
	questionsPerSet = dataArray.length;
	testSetQuestionCount = dataArray.length;
	setWiseQuestionCounter = 1;
	for (var i = 0; i < dataArray.length; i++) {
		var obj = dataArray[i];
		if(slideType == "grammar"){
			render_GrammarTemplate(questonCounter,obj);	
		}
		questonCounter++;
	}
	
	initializeReveal();
	setTimeout(function(){
		if(isFirstTime){
			Reveal.slide(currentQuestionNumber);
		}else{
			Reveal.slide(currentQuestionNumber+1);	
		}
	},100);
}

function getTotalQuestionCount(data){
	totalQuestionCount = 0;
	questionsResponseData = $.parseJSON("{}");
	if(data.Grammar != undefined){
		totalQuestionCount += parseInt(data.Grammar.questionCount);
		questionsResponseData["grammar"] = $.parseJSON("{}");
		questionsResponseData["grammar"].totalQuestion = data.Grammar.questionCount;
		questionsResponseData["grammar"].questionCounter = 0;
		questionsResponseData["grammar"].answerResponse = $.parseJSON("[]");
		questionsResponseData["grammar"].answerResponseData = $.parseJSON("[]");
		questionsResponseData["grammar"].isCompleted = false;
	}
	if(data.Vocabulary != undefined){
		totalQuestionCount += parseInt(data.Vocabulary.questionCount);
		questionsResponseData["vocabulary"] = $.parseJSON("{}");
		questionsResponseData["vocabulary"].totalQuestion = data.Vocabulary.questionCount;
		questionsResponseData["vocabulary"].questionCounter = 0;
		questionsResponseData["vocabulary"].answerResponse = $.parseJSON("[]");
		questionsResponseData["vocabulary"].answerResponseData = $.parseJSON("[]");
		questionsResponseData["vocabulary"].isCompleted = false;
	}
	if(data.Writing != undefined){
		totalQuestionCount += parseInt(data.Writing.questionCount);
		questionsResponseData["writing"] = $.parseJSON("{}");
		questionsResponseData["writing"].totalQuestion = data.Grammar.questionCount;
		questionsResponseData["writing"].questionCounter = 0;
		questionsResponseData["writing"].answerResponse = $.parseJSON("[]");
		questionsResponseData["writing"].answerResponseData = $.parseJSON("[]");
		questionsResponseData["writing"].isCompleted = false;
	}
	if(data.Speaking != undefined){
		totalQuestionCount += parseInt(data.Speaking.questionCount);
		questionsResponseData["speaking"] = $.parseJSON("{}");
		questionsResponseData["speaking"].totalQuestion = data.Grammar.questionCount;
		questionsResponseData["speaking"].questionCounter = 0;
		questionsResponseData["speaking"].answerResponse = $.parseJSON("[]");
		questionsResponseData["speaking"].answerResponseData = $.parseJSON("[]");
		questionsResponseData["speaking"].isCompleted = false;
	}
	$(".questionCounterText").text("1 of "+totalQuestionCount);
}

function loadAllSlides(){
	//dataArray = $.parseJSON('[{ "slide": 2, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "endTime": "97000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["Intonation patterns", "-1", "Longer and shorter sounds", ""] ] } }, { "slide": 3, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "startTime": "98000", "endTime": "130000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["English", "-1", "a language", ""], ["Communication", "-1", "exchanging of information by speaking, writing, or using some other medium", ""] ] } }, { "slide": 4, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "startTime": "140000", "endTime": "182000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["Content words", "-1", "nouns, verbs, adjectives, adverbs(words that carry meaning)", ""], ["Function words", "-1", "articles and prepositions", ""] ] } }, { "slide": 5, "template": "NativeVideoJellyTemplate", "slide_id": "", "data": { "video": "kIapQVNq3D4", "startTime": "189000", "endTime": "219000", "ratio": "1.7", "videoType": "youtube", "texts": [ ["Intonation & stress words", "-1", "through intonation we express emotions, intentions and attitudes", ""] ] } }, { "slide": 6, "template": "PronunciationTemplate", "slide_id": "", "data": { "heading": "<left>Choose the correct pronunciation of</left> speaking <right>?</right>", "correctIndex": 1, "options": [ ["speaking_c.mp3", ""], ["speaking_w.mp3", ""] ] } }, { "slide": 7, "template": "PronunciationTemplate", "slide_id": "", "data": { "heading": "<left>Choose the correct pronunciation of</left> understand <right>?</right>", "correctIndex": 1, "options": [ ["understand_c.mp3", ""], ["understand_w.mp3", ""] ] } }, { "slide": 8, "template": "PronunciationTemplate", "slide_id": "", "data": { "heading": "<left>Choose the correct pronunciation of</left> video <right>?</right>", "correctIndex": 1, "options": [ ["video_c.mp3", ""], ["video_w.mp3", ""] ] } }, { "slide": 9, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> Is English a stress-timed language? <right></right>", "correctIndex": 1, "options": [ ["Yes", ""], ["No", ""] ] } }, { "slide": 10, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> In a stress-timed language, what happens on the beat? <right></right>", "correctIndex": 1, "options": [ ["Stressed sounds", ""], ["Unstressed sounds", ""] ] } }, { "slide": 11, "slide_id": "", "template": "NativeTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> When we use stressed and unstressed sounds, what does that create? <right></right>", "correctIndex": 1, "options": [ ["Rhythm", ""], ["Intonation", ""] ] } }, { "slide": 12, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> What do we call the melody of our speech? <right></right>", "correctIndex": 1, "options": [ ["Intonation", ""], ["Rhythm", ""] ] } }, { "slide": 13, "slide_id": "", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option</left> In the word “English,” which syllable is stressed? <right></right>", "correctIndex": 1, "options": [ ["The first: En-", ""], ["The second: -glish", ""] ] } }]');	
	//dataArray = $.parseJSON('[{ "slide": 12, "slide_id": "RETA1479707503213", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "You can", "text_2": "these points on your next purchase.", "correctIndex": 1, "options": [ ["redeem", ""], ["condemn", "The correct term to be used will be \'redeem\'. \'Redeem\' = gain or regain possession of (something) in exchange for payment. Whereas, \'condemn\' = express complete disapproval of."] ] } }, { "slide": 13, "template": "JumbleTemplate", "slide_id": "RETA1479707529922", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "You can redeem these points in your next purchase", "options": ["these points", "next purchase", "you can", "redeem", "in your"] } }, { "slide": 14, "template": "DialogTemplate", "slide_id": "RETA1479707544971", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Excuse me. Where is the fitting room?", ""], ["", "It\'s right over there, madam.", ""], ["", "They fit just right. I\'ll buy them!", ""], ["", "Great! May I please request you to go to the tills, and pay over there. ", ""], ["", "Your total comes to Rs. 3500, madam. How would you like to pay? Will that be cash or credit?", ""], ["", "Can I pay by cheque please?", ""], ["", "No, madam. I am afraid we don\'t accept cheques.", ""], ["", "All right. I will pay by cash.", ""] ] } }, { "slide": 15, "template": "DialogTemplate", "slide_id": "RETA1479707546336", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Do you have a loyalty card with us, madam?", ""], ["", "No, I don\'t. What is that?", ""], ["", "If you get a card made, you can save 10 percent on all your purchases today. We are also offering 6 months credit, with no deposit.", ""], ["", "Not today. Thanks though.", ""], ["", "No problem, madam. We always have this offer, so whenever you decide to, just let us know.", ""], ["", "Sure. ", ""], ["", "Would you like a bag?", ""], ["", "Yes, of course.", ""], ["", "All right, madam. Shall I put your receipt in the bag?", ""] ] } }, { "slide": 16, "template": "DialogTemplate", "slide_id": "RETA1479707547532", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "OK. I was looking at some of the pants, but they are all a bit too long. Do you have alteration services here?", ""], ["", "Certainly, madam. I would like to inform you that there are additional charges, rupees 50 for the alteration. ", ""], ["", "Oh, all right. And when can I get the pants?", ""], ["", "It will take one day, madam.", ""], ["", "All right. Thank you.", ""], ["", "You\'re welcome, madam. Have a nice day!<br>", ""] ] } }, { "slide": 17, "slide_id": "RETA1479707570920", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Would you pay by cash or by card?", ""], ["Would you pay by using cash or by card?", "There is no need of the word \'using\'. As to pay by the means of something already means pay using it. Here, \'Using\' is redundant."] ] } }, { "slide": 18, "template": "LearningTextOptionsTemplate", "slide_id": "RETA1479707581684", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Here\'s your bill.", ""], ["Take your bill.", "With the customer one needs to be more polite."], ["Take yours bill.", "\'Yours\' is never used before a noun. It is generally used at the end of a sentence."], ["Your bill.", "This is not the appropriate way of talking to the customer."] ] } }, { "slide": 19, "slide_id": "RETA1479707606454", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "Please give me your card so that I can", "text_2": "it.", "correctIndex": 1, "options": [ ["swipe", ""], ["wipe", "\'Swipe\' = The passing of a card through an electronic reader."] ] } }, { "slide": 20, "template": "LearningTextOptionsTemplate", "slide_id": "RETA1479707619247", "data": { "heading": "<left>Pick the appropriate response:</left>  <right></right>", "correctIndex": 1, "options": [ ["Madam, I would request you to please enter your PIN number into the machine please.", ""], ["Can you please enter your PIN into the machine?", "With the customer you need to be more polite and formal."], ["Enter your PIN into the machine.", "With the customer you need to be more polite and formal."], ["Will you enter your PIN into the machine.", "With the customer you need to be more polite and formal."] ] } }, { "slide": 21, "slide_id": "RETA1479707646392", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Madam, I would request you to please enter your PIN into the machine, please.", ""], ["Madam, I would request to you to please enter your PIN to the machine, please.", ""] ] } }, { "slide": 22, "template": "ListenableTypingTemplate", "slide_id": "RETA1479707657872", "data": { "textToBeTranslated": "receipt/ card payment/ here\'s your", "audioFileName": "receipt/ card payment/ here\'s your", "heading": "Rearrange the words to form a sentence.", "play_with_tts": "YES", "correctTranslations": ["Here\'s your card payment receipt."], "tips": ["", ""] } }, { "slide": 23, "slide_id": "RETA1479707670809", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Here\'s your card payment receipt.", ""], ["Here\'re your card payment receipt.", "Here we are talking about the payment receipt of just one card, so we will not use \'are\'. \'Here\'re\' is the contraction of \'here and are\'."] ] } }, { "slide": 24, "slide_id": "RETA1479707672054", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Please sign the copy and return it to me.", ""], ["Please signature the copy and return it to me.", "\'Signature\' cannot be used here. \'Signature\' is a handwritten (and often stylized) depiction of someone\'s name, nickname, or even a simple \'X\' or other mark that a person writes on documents as a proof of identity and intent. But when we sign, we write our name short and concise."] ] } }, { "slide": 25, "slide_id": "RETA1479707690957", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "May I please request you to go to the", "text_2": ", and pay over there.", "correctIndex": 1, "options": [ ["tills", ""], ["tiffs", "The correct term to be used will be \'tills\'. \'Tills\' = a box, case, or drawer into which the money taken from the customer is kept."] ] } }, { "slide": 26, "slide_id": "RETA1479707692221", "template": "DropdownTemplate", "data": { "heading": "Pick the correct missing word.", "text_1": "I am", "text_2": "we don\'t accept cheques.", "correctIndex": 1, "options": [ ["afraid", ""], ["afraids", "The correct term to be used will be \'afraid\'. \'Afraid\' in this context is used to show a feeling of regret."], ["frightened", "The correct term to be used will be \'afraid\'. \'Afraid\' in this context is used to show a feeling of regret."] ] } }, { "slide": 27, "slide_id": "RETA1479707714453", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Do you have a loyalty card with us, madam?", ""], ["Do you have a liability card with us, madam?", "There is no such term as \'liability card\'. The correct term is \'loyalty card\' =  A swipe card issued by a supermarket or chain store to a customer, used to record credit points awarded for money spent in the store."] ] } }, { "slide": 28, "slide_id": "RETA1479707715660", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Would you like a bag?", ""], ["You would like a bag?", "In direct questions auxiliary (would) comes before the subject (you)."] ] } }, { "slide": 29, "template": "DialogTemplate", "slide_id": "RETA1479707733279", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Welcome to Shoppers Stop, sir. Are you next in the queue?", ""], ["", "Yes, I\'d like to buy this watch as a gift for my wife please.", ""], ["", "Certainly, sir. Would you like me to gift wrap it for you, sir?", ""], ["", "Yes please, that would be great.", ""], ["", "Are you sure this is the right size for your wife, sir?", ""], ["", "I\'m not sure, it\'s just a guess!", ""], ["", "In that case I can print a gift receipt so she doesn\'t see the price, but can bring it back to change the size if she needs to. Would you like me to do that, sir?", ""], ["", "Yes please, that would be amazing!", ""] ] } }, { "slide": 30, "template": "DialogTemplate", "slide_id": "RETA1479707734605", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Would you like me to put the gift receipt in the box with the watch?", ""], ["", "Yes please, that\'ll be perfect.", ""], ["", "Here you go, sir. Enjoy the rest of your day.", ""] ] } }, { "slide": 31, "slide_id": "RETA1479707743100", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the appropriate way to ask:</left>  <right></right>", "correctIndex": 1, "options": [ ["Are you next in the queue, sir?", ""], ["Are you next in the line, sir?", "\'Queue\' is correct to be used. As \'queues\' are formed when you\'re wanting to be served such as at a counter, or for admission."] ] } }, { "slide": 32, "slide_id": "RETA1479707744369", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the appropriate way to ask:</left>  <right></right>", "correctIndex": 1, "options": [ ["Would you like me to gift wrap it for you, sir?", ""], ["Do you want me to gift wrap it for you?", "You need to be more polite while talking to a customer."] ] } }, { "slide": 33, "template": "JumbleTemplate", "slide_id": "RETA1479707753260", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "Would you like me to put the gift receipt in the box with the watch?", "options": ["would you like me", "to put the gift", "with the watch?", "in the box", "receipt"] } }, { "slide": 34, "template": "JumbleTemplate", "slide_id": "RETA1479707754485", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "Would you like me to gift wrap it for you, sir?", "options": ["you like", "would", "for you, sir?", "me to", "gift wrap", "it"] } }, { "slide": 35, "template": "JumbleTemplate", "slide_id": "RETA1479707755663", "data": { "heading": "Arrange the jumbled words to form a sentence.", "answer": "Would you like that gift wrapped?", "options": ["you", "would", "wrapped?", "like that", "gift "] } }, { "slide": 36, "template": "DialogTemplate", "slide_id": "RETA1479707771973", "data": { "heading": "Listen to the dialogue carefully.", "conversations": [ ["", "Sir, may I please request you to mind the queue.", ""], ["", "But I am in a rush.", ""], ["", "I understand, sir. But there are other customers ahead of you. I kindly urge you to please mind the queue. Thank you for your patience.", ""] ] } }, { "slide": 37, "slide_id": "RETA1479707779890", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Sir, I urge you to please mind the queue.", ""], ["Sir, I command you to please mind the queue.", "We can never \'command\' a customer. We can always \'urge\' them politely make a request to mind the queue."] ] } }, { "slide": 38, "slide_id": "RETA1479707781251", "template": "LearningTextOptionsTemplate", "data": { "heading": "<left>Choose the correct option:</left>  <right></right>", "correctIndex": 1, "options": [ ["Please wait for your turn, madam.", ""], ["Please can you wait for your turn, madam.", "This doesn\'t seem polite or formal."] ] } }]');
	
	console.log("dataArray",dataArray);
	render_1stSlide();
	
	for (var i = 0; i < dataArray.length; i++) {
		var obj = dataArray[i];
		var slide_type = obj["template"];
		if(slide_type == "NativeVideoJellyTemplate"){
			render_NativeVideoJellyTemplate(i,obj);
		}else if(slide_type == "PronunciationTemplate"){
			render_PronunciationTemplate(i,obj);
		}else if(slide_type == "LearningTextOptionsTemplate" || slide_type == "NativeTextOptionsTemplate"){
			render_LearningTextOptionsTemplate(i,obj);
		}else if(slide_type == "TipTemplate"){
			render_TipTemplate(i,obj);
		}else if(slide_type == "DialogTemplate"){
			render_DialogTemplate(i,obj);
		}else if(slide_type == "ListenableTypingTemplate"){
			render_ListenableTypingTemplate(i,obj);
		}else if(slide_type == "DropdownTemplate"){
			render_DropdownTemplate(i,obj);
		}else if(slide_type == "JumbleTemplate"){
			render_JumbleTemplate(i,obj);
		}else if(slide_type == "TableTemplate"){
			render_TableTemplate(i,obj);
		}
	}
	
	for(var i=0;i<TTSWordsArray.length;i++){
		loadAudio(TTSWordsArray[i],i+1);
	}
	//render_SlideType_Last_Slide(dataArray.length);
	
	initializeReveal();
}

function render_1stSlide(){
	var html = "";
	html += '<section id="slide1" class="slideType_First_Slide" slideType="slideType_First_Slide" slideNumber="1" data-background="#fff">'
				+'<div class="sectionInnerContainer">';
					html += '<table style="margin:auto;text-align:center;height:100%;">'
							+'<tr>'
								+'<td style="text-align:center;">'
									+'<div class="slideType_First_Slide_Lesson_Number" style="text-align:center;display:none;">Start Test</div>'
									+'<div style="text-align:center;"><img style="width:100px;margin-bottom:20px;" src="https://storage.helloenglish.com/English-Web/images/exam_icon.png" /></div>'
									+'<div class="slideType_First_Slide_Lesson_Number">Start Test</div><div style="text-align:center;font-size: 28px;">Please do not press back or refresh button </div>'
									+'<input style="margin-top: 10px!important;" onclick="Reveal.navigateNext();startTestTimer();"'
										+'class="greenButton startLessonButton appStringValue" type="button"'
										+'value="Start">'
								+'</td>'
							+'</tr>'
						+'</table>';
						
				html += '</div>';
				
				slideCount++;
				
			html += '</section>'+
		
		$(".slides").append(html);
}

function render_SlideType_Last_Slide(i){
	var html = "";
		html += '<section id="slide('+(i+2)+')" class="SlideType_Last_Slide" slideType="SlideType_Special_Slide" slideNumber="'+(i+2)+'"	data-background="#fff">';
			
			html += '<div class="sectionInnerContainer" onclick="openDownloadLink()" style="overflow:auto;"><table style="width: 100%;height: 100%;border-collapse: collapse;">'
					+'<tr>'
						+'<td>'
							+'<div style="text-align: center;">'
								+'<img style="width: 50px;cursor: pointer;vertical-align: middle;" onclick="window.location=\'https://helloenglish.com\'" src="https://storage.helloenglish.com/English-Web/images/hlogo.png"/>'
								+'<div style="margin-top: 32px;font-family:Roboto Condensed, sans-serif;vertical-align: middle;font-size: 24px;">'
									+'<div style="text-align:center;color: #53e7c9;">Test Completed</div><br>'
									+'<div style="text-align:center;font-size: 28px;">Thank you for completing the test.</div><br>'
								+'</div>'
							+'</div>'
						+'</td>'
					+'</tr>'
					+'<tr><td style="text-align:center;font-size: 28px;">'
						+'Get the Hello English App<br>'
						+'Start learning English for free!'
					+'</td></tr>'
					+'<tr>'
						+'<td style="text-align: center;vertical-align: initial;margin-top: 16px;padding-top:16px;">'
							+'<img class="appleDownload" style="width: 150px;cursor: pointer;display: inline-block;margin-top: 16px;" onclick="openDownloadLink()" src="https://storage.helloenglish.com/English-Web/images/AP_download_badge.png"/>'
							+'<img class="androidDownload" style="width: 150px;cursor: pointer;display: inline-block;margin-top: 16px;margin-left: 5px;" onclick="openDownloadLink()" src="https://storage.helloenglish.com/English-Web/images/GP_download_badge.png"/>'
						+'</td>'
					+'</tr>'
				+'</table></div>';
			html += '<div class="coinStackAnimationScreen" style="position:absolute;top:0px;display:none;background: rgba(0,0,0,.5);text-align: center;margin: auto;width:100%;height:100%;z-index:2000;">'
				+'<table class="taskBlueStripTable" style="width:100%;height:100%;position:absolute;z-index:10;">'
					+'<tr>'
						+'<td>'
							+'<table class="taskBlueStrip animated" style="margin: auto;">'
								+'<tr>'
									+'<td>'
										+'<div style="width:400px;text-align:center;">'
											+'<div style="color:#FE5C57;font-size:25px;">Lesson completed</div>'
											+'<div style="color:#F8CE46;font-size:20px;margin-top:10px;"></div>'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'		
						+'</td>'
					+'</tr>'
				+'</table>'
				+'<div class="coinStackContainer" style=" position: relative; height: 100%;width:100%; max-width: 500px; margin: auto;">'
					+'<div>'
						+'<img class="coinInStack animated" style="bottom:50px;margin-left: -50px;z-index:1;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:100px;margin-left: -105px;z-index:2;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:70px;margin-left: 25px;z-index:3;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:65px;margin-left: -35px;z-index:6;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: 10px;z-index:5;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:115px;margin-left: -100px;z-index:4;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: -50px;z-index:7;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:95px;margin-left: -45px;z-index:8;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:110px;margin-left: -40px;z-index:9;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:130px;margin-left: -40px;z-index:10;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:145px;margin-left: -50px;z-index:11;" src="img/flat_coin.png">'
					+'</div>'
				+'</div>'
			+'</div>';
		+'</section>';
		
		$(".slides").append(html);
}


function render_slideType_Input(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="slideType_Input" slideType="slideType_Input" slideNumber="'+(i + 2)+'" data-autoslide="" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="titleText" style="padding-top: 100px !important; max-width: 790px; margin: auto;"></div>'
					+'<div class="nameInputBox">'
						+'<input id="slideType_Input_inputText" class="appStringPlaceholder" type="text" placeholder="'+document.write(getappStringObject("58"))+'">'
					+'</div>'
					+'<div class="monsterBarNotification" style="margin-top: 52px !important;">'
						+'<div class="notificationTipBox" style="position: absolute; font-size: 16px; width: 162px; line-height: normal; background: #7f7f7f; border-radius: 4px; padding: 10px; right: 190px; margin-top: 10px; color: #fff;line-height: 1.2em!important;">'
							+'<span class="notificationTipBoxText" style="color: #fff;"></span>'
							+'<img	style="width: 50px; position: absolute; right: -23px; top: 20px; z-index: -1;" src="../../../InteractiveLessons/img/call-out 300px.png">'
						+'</div>'
						+'<img class="monsterBarNotificationImage" style="width: 75px; position: absolute; transform: rotate(-20deg); right: 100px; margin-top: 60px; z-index: 1;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small.png">'
					+'</div>'
				+'</div>';
				
			     var slideType_Input_TitleText = arrData(0);
			     var variableName = arrData(112);
			     var slideType_Input_TipText = getappStringObject("68");
			     lessonFunctionCallVar[slideCount] = new slideType_Input_Function("slide"+(i+2),slideType_Input_TitleText,slideType_Input_TipText,variableName);
			     slideCount++;
			    
			html += '</section>'+
			
		$(".slides").append(html);
}


function render_SlideType_Jelly(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Jelly" slideType="SlideType_Jelly" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">';
				if(arrData(195).equalsIgnoreCase("")){
					html += '<div class="" style="width: 100%;display: inline-block;vertical-align: top!important;margin-top: 32px;height: 100%;overflow: auto;">'
							+'<div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;"></div>'
						+'</div>';
				}else{
					html += '<div class="videoContainer" style="display:inline-block;width:45%;"></div>'
					+'<div class="questionContainer" style="width: 50%;display: inline-block;vertical-align: top!important;margin-top: 32px;height: 100%;overflow: auto;">'
						+'<div class="translationTextDiv" style="padding: 0px 0px;height:100%;overflow-y:auto;"></div>'
					+'</div>';				
				}
					
					html += '<img src="../../../InteractiveLessons/img/yellow-arrow.png" class="yellow-arrow yellow-arrow-upward" style="display: none; position: absolute; top: 200px; left: 400px; z-index: 1000; display: none;">'
					+'<div class="monsterBarNotification" style="margin-top: 205px !important;">'
						+'<div class="notificationTipBox" class="tipText" style="position: absolute; font-size: 15px; width: 162px; line-height: normal; background: #7f7f7f; border-radius: 4px; padding: 10px; right: 190px; margin-top: 10px; color: #fff;line-height: 1.2em!important;">'
							+'<span class="notificationTipBoxText" style="color: #fff;"></span>'
							+'<img style="width: 50px; position: absolute; right: -23px; top: 20px; z-index: -1;" src="../../../InteractiveLessons/img/call-out 300px.png">'
						+'</div>'
						+'<img class="monsterBarNotificationImage" style="width: 75px; position: absolute; transform: rotate(-20deg); right: 100px; margin-top: 60px; z-index: 1;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small.png">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Jelly_TipText = getappStringObject("77");
			     var SlideType_Jelly_Video_Url = arrData(195);
			     var dataString = arrData(1)+"*&"+arrData(2)+"*&"+arrData(3)+"*&"+arrData(4)+"*&"+arrData(5)+"*&"+arrData(6)+"*&"+arrData(7)+"*&"+arrData(8)+"*&"+arrData(9)+"*&"+arrData(10)+"*&"+arrData(11)+"*&"+arrData(12)+"*&"+arrData(13)+"*&"+arrData(14)+"*&"+arrData(15);
			     lessonFunctionCallVar[slideCount] = new SlideType_Jelly_Function("slide"+(i + 2),SlideType_Jelly_TipText,dataString,SlideType_Jelly_Video_Url);
			     slideCount++;
			    
			html += '</section>';
			
		$(".slides").append(html);
}

function render_SlideType_Choose_4_without_Image(arrData){
		var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_4_without_Image" slideType="SlideType_Choose_4_without_Image" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer" style="overflow-y: auto!important;">'
					+'<div style="padding: 30px 0px;">'
						+'<div>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;">'
									+'</td>'
								+'</tr>'
							+'</table>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;">'
										+'<span class="SlideType_Choose_4_without_Image_QuestionText" style="font-size: 24px; margin-left: 50px;width:100%!important;"></span> '
										+'<span class="SlideType_Choose_4_without_Image_QuestionText_WhenHidden appStringSpan" style="display: none; font-size: 22px; margin-left: 50px;"><%=getappStringObject("84") %></span></td>'
									+'<td style="width: 50px;">'
										+'<div id="SlideType_Choose_4_without_Image_Listen_QuestionText" class="animated pulse" style="display: none; text-align: center; cursor: pointer; height: 50px; float: left; width: 50px; border-top-left-radius: 100px; border-top-right-radius: 100px; border-bottom-right-radius: 100px; border-bottom-left-radius: 100px; display: block; background: rgb(73, 201, 175);">'
											+'<img style="margin-top: 13px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
					+'<div style="width: 98%;">'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option1">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
										+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div>'
									+'</td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option2">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option3">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
										+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_4_without_Image_Div SlideType_Choose_4_without_Image_Div_UnChecked option4">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_4_without_Image_Image_Circle SlideType_Choose_4_without_Image_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_4_without_Image_TextTD SlideType_Choose_4_without_Image_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_4_without_Image_Text SlideType_Choose_4_without_Image_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
				+'</div>';
				
				     var SlideType_Choose_4_without_Image_Question = "";
				     if(arrData(111).equalsIgnoreCase("")){
				     	SlideType_Choose_4_without_Image_Question = " <span style='color:#FE5C57'>"+arrData(137)+"</span> "+arrData(111)+" <span style='color:#FE5C57'>"+arrData(138)+"</span>";
				     }else{
						SlideType_Choose_4_without_Image_Question = " <span style='color:#FE5C57'>"+arrData(137)+"</span>"+arrData(111)+" <span style='color:#FE5C57'>"+arrData(138)+"</span>";
				     }
				     var SlideType_Choose_4_without_Image_option_String = arrData(18)+"*&"+arrData(22)+"*&"+arrData(19)+"*&"+arrData(23)+"*&"+arrData(20)+"*&"+arrData(24)+"*&"+arrData(21)+"*&"+arrData(25);
				     var SlideType_Choose_4_without_Image_Answer = "option"+arrData(30);
				     var SlideType_Choose_4_without_Image_Question_Type = arrData(16);
				     var SlideType_Choose_4_without_Image_Question_Display_Flag = arrData(115);
				     var SlideType_Choose_4_without_Image_Answer_Type = arrData(113);
				     //console.log(slideCount+" / SlideType_Choose_4_without_Image_Answer_Type: "+SlideType_Choose_4_without_Image_Answer_Type)
				     lessonFunctionCallVar[slideCount] = new SlideType_Choose_4_without_Image_Function("slide"+(i + 2),SlideType_Choose_4_without_Image_Question,SlideType_Choose_4_without_Image_option_String,SlideType_Choose_4_without_Image_Answer,SlideType_Choose_4_without_Image_Question_Type,SlideType_Choose_4_without_Image_Question_Display_Flag,SlideType_Choose_4_without_Image_Answer_Type);
				     slideCount++;
				     
			html += '</section>';
			
		$(".slides").append(html);
}

function render_SlideType_Choose_4_with_Image(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_4_with_Image" slideType="SlideType_Choose_4_with_Image" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 30px 0px;">'
						+'<br> <span class="SlideType_Choose_4_with_Image_QuestionText" style="font-size: 30px;"></span>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option1">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option2">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option3">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
						+'<div class="SlideType_Choose_4_with_Image_ImageDiv SlideType_Choose_4_with_Image_ImageDiv_UnChecked option4">'
							+'<div class="SlideType_Choose_4_with_Image_Image_Circle SlideType_Choose_4_with_Image_Image_Circle_UnChecked"></div>'
							+'<div style="height: 200px; background: #fff; display: table-cell; border-radius: 15px 15px 0px 0px;">'
								+'<img class="SlideType_Choose_4_with_Image_Img_Source" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg">'
							+'</div>'
							+'<div class="SlideType_Choose_4_with_Image_ImageText SlideType_Choose_4_with_Image_ImageText_UnChecked"></div>'
						+'</div>'
					+'</div>'
				+'</div>';
				
				         var SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData(137)+"</span> '"+arrData(111)+"' <span style='color:#FE5C57'>"+arrData(138)+"</span>";
				         if(arrData(111).equalsIgnoreCase("")){
				         SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData(137)+"</span> "+arrData(111)+" <span style='color:#FE5C57'>"+arrData(138)+"</span>";
					     }else{
					     SlideType_Choose_4_with_Image_QuestionText = " <span style='color:#FE5C57'>"+arrData(137)+"</span> '"+arrData(111)+"' <span style='color:#FE5C57'>"+arrData(138)+"</span>";
					     }
				         var SlideType_Choose_4_with_Image_Option_String = arrData(18)+"*&"+arrData(26)+"*&"+arrData(22)+"*&"+arrData(19)+"*&"+arrData(27)+"*&"+arrData(23)+"*&"+arrData(20)+"*&"+arrData(28)+"*&"+arrData(24)+"*&"+arrData(21)+"*&"+arrData(29)+"*&"+arrData(25);
					     var SlideType_Choose_4_with_Image_Answer = "option"+arrData(30);
					     var SlideType_Choose_4_with_Image_Question_Type = arrData(16);
					     var SlideType_Choose_4_with_Image_Question_Display_Flag = arrData(115);
					     var SlideType_Choose_4_with_Image_Answer_Type = arrData(113);
					     var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/"+userLang.split("_")[0].toLowerCase() +"/";
					     if(isB2BUser || language == "triviagame"){
					     	var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/"+language.toLowerCase() +"/";
						 }
					     lessonFunctionCallVar[slideCount] = new SlideType_Choose_4_with_Image_Function("slide"+(i + 2),SlideType_Choose_4_with_Image_QuestionText,SlideType_Choose_4_with_Image_Option_String,SlideType_Choose_4_with_Image_Answer,SlideType_Choose_4_with_Image_Question_Type,SlideType_Choose_4_with_Image_Question_Display_Flag,SlideType_Choose_4_with_Image_Answer_Type,imageFolder);
					     slideCount++;
					     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Choose_2_without_Top_Photo(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_2_without_Top_Photo" slideType="SlideType_Choose_2_without_Top_Photo" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 60px 0px;">'
						+'<div>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;">'
									+'</td>'
								+'</tr>'
							+'</table>'
							+'<table style="width: 100%; margin: auto;">'
								+'<tr>'
									+'<td style="text-align: center;"><span style="display: none;" class="SlideType_Choose_2_without_Top_Photo_title"></span> <span class="SlideType_Choose_2_without_Top_Photo_QuestionText" style="font-size: 30px; margin-left: 50px;"></span> <span class="SlideType_Choose_2_without_Top_Photo_QuestionText_WhenHidden appStringSpan"'
										+'style="display: none; font-size: 30px; margin-left: 50px;"><%=getappStringObject("78") %></span></td>'
									+'<td style="width: 50px;">'
										+'<div id="SlideType_Choose_2_without_Top_Photo_Listen_QuestionText" textToPlay="<%=arrData(80)%>"  class="animated pulse" style="display: none; text-align: center; cursor: pointer; height: 50px; float: left; width: 50px; border-top-left-radius: 100px; border-top-right-radius: 100px; border-bottom-right-radius: 100px; border-bottom-left-radius: 100px; display: block; background: rgb(73, 201, 175);"> '
										+'<img style="margin-top: 10px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<div class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option1">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked">'
										+'<div class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_2_without_Top_Photo_Div SlideType_Choose_2_without_Top_Photo_Div_UnChecked option2">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_without_Top_Photo_Image_Circle SlideType_Choose_2_without_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_without_Top_Photo_TextTD SlideType_Choose_2_without_Top_Photo_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_2_without_Top_Photo_Text SlideType_Choose_2_without_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
				+'</div>';
				
				        var SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
				        if(arrData(80) == ("")){
							SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> "+arrData(80)+" <span style='color:#FE5C57'>"+arrData(140)+"</span>";
						 }else if(arrData(139) == ("") && arrData(140) == ("")){
							SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> "+arrData(80)+" <span style='color:#FE5C57'>"+arrData(140)+"</span>";
						 }else{
							SlideType_Choose_2_without_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
						 }
				        var SlideType_Choose_2_without_Top_Photo_option_String = +arrData(86)+"*&"+arrData(88)+"*&"+arrData(87)+"*&"+arrData(89);
				        var SlideType_Choose_2_without_Top_Photo_Answer = "option"+arrData(83);
				        var SlideType_Choose_2_without_Top_Photo_Question_Type = arrData(84);
				        var SlideType_Choose_2_without_Top_Photo_Question_Display_Flag = arrData(119);
				        var SlideType_Choose_2_without_Top_Photo_Answer_Type = arrData(118);
				        lessonFunctionCallVar[slideCount] = new SlideType_Choose_2_without_Top_Photo_Function("slide"+(i + 2),SlideType_Choose_2_without_Top_Photo_Question,SlideType_Choose_2_without_Top_Photo_option_String,SlideType_Choose_2_without_Top_Photo_Answer,SlideType_Choose_2_without_Top_Photo_Question_Type,SlideType_Choose_2_without_Top_Photo_Question_Display_Flag,SlideType_Choose_2_without_Top_Photo_Answer_Type);
				     
				        slideCount++;
				        
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Choose_2_with_Top_Photo(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Choose_2_with_Top_Photo" slideType="SlideType_Choose_2_with_Top_Photo" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="videoContainer" style="display:inline-block;width:45%;">'
						+'<div style="display: block; margin-bottom: 10px;" class="SlideType_Choose_2_with_Top_Photo_title"></div>';
						if(slide_type == ("VIDEO SLIDE")){ 
						//arrData.put(195, "how_are_you_rhonda_2.mp4");
							if(arrData(195).indexOf("mp4") >-1 || arrData(195).indexOf("3gp") >-1){
								html += '<div style="position: relative;">'
									'<video preload="auto" onended="$(this).next().css(\'display\',\'\');" style="width: 95%; height: auto; object-fit: contain; object-position : top;" '
										'class="video" poster="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/<%=arrData(195).replace(".mp4",".jpg").replace(".3gp",".jpg") %>">'
										'<source src="//storage.helloenglish.com/English-App/Downloadable_Lessons_V3/Lesson_Video/<%=arrData(195) %>" type="video/mp4">'
									'</video>'
									'<img class="playVideo" onclick="$(this).prev().get(0).play();$(this).css(\'display\',\'none\');" src="../../../InteractiveLessons/img/ic_play_arrow_white_48dp_2x.png" style="width:50px;position:absolute;left: 50%;top: 50%;background: rgba(0,0,0,.5);border-radius: 100%;margin-left: -25px;margin-top: -25px;cursor:pointer;">'
								'</div>';
							}else{
								html += '<iframe id="SlideType_Video_Div" width="100%" height="auto"'
									+'src="https://www.youtube.com/embed/<%=arrData(195)%>?start=<%=(int)Math.floor(Double.parseDouble(arrData(191))/1000)%>&end=<%=(int)Math.ceil(Double.parseDouble(arrData(193))/1000)%>"'
									+'frameborder="0"style="border: solid 4px #37474F"></iframe>';
							}
						}else{
							html += '<img class="SlideType_Choose_2_with_Top_Photo_Image" style="height: 150px; border-radius: 20px;" src="../../../InteractiveLessons/img/fbDemoProfilePic1.jpg" />';
						}
			html += '</div>'
						+'<div class="questionContainer" style="width: 50%;display: inline-block;vertical-align: top!important;margin-top: 32px;height: 100%;overflow: auto;">'
						+'<span class="SlideType_Choose_2_with_Top_Photo_QuestionText" style="font-size: 30px;"></span>'
						+'<div class="SlideType_Choose_2_with_Top_Photo_Div SlideType_Choose_2_with_Top_Photo_Div_UnChecked option1">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div class="SlideType_Choose_2_with_Top_Photo_Image_Circle SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_with_Top_Photo_TextTD SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_2_with_Top_Photo_Text SlideType_Choose_2_with_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
						+'<div class="SlideType_Choose_2_with_Top_Photo_Div SlideType_Choose_2_with_Top_Photo_Div_UnChecked option2">'
							+'<table style="width: 100%; height: 100%;">'
								+'<tr>'
									+'<td><div	class="SlideType_Choose_2_with_Top_Photo_Image_Circle SlideType_Choose_2_with_Top_Photo_Image_Circle_UnChecked"></div></td>'
									+'<td class="SlideType_Choose_2_with_Top_Photo_TextTD SlideType_Choose_2_with_Top_Photo_TextTD_UnChecked">'
									+'<div class="SlideType_Choose_2_with_Top_Photo_Text SlideType_Choose_2_with_Top_Photo_Text_UnChecked"></div></td>'
								+'</tr>'
							+'</table>'
						+'</div>'
					+'</div>'
				+'</div>';
				
					
				        var SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
				        if(arrData(80) == ("")){
							SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
					    }else{
					     SlideType_Choose_2_with_Top_Photo_Question = " <span style='color:#FE5C57'>"+arrData(139)+"</span> '"+arrData(80)+"' <span style='color:#FE5C57'>"+arrData(140)+"</span>";
					     }
				        var SlideType_Choose_2_with_Top_Photo_Image_Name = arrData(91);
				        var SlideType_Choose_2_with_Top_Photo_option_String = arrData(86)+"*&"+arrData(88)+"*&"+arrData(87)+"*&"+arrData(89);
				        var SlideType_Choose_2_with_Top_Photo_Answer = "option"+arrData(83);
				        var SlideType_Choose_2_with_Top_Photo_Question_Type = arrData(84);
				        var SlideType_Choose_2_with_Top_Photo_Question_Display_Flag = arrData(119);
				        var SlideType_Choose_2_with_Top_Photo_Answer_Type = arrData(118);
				        var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/"+userLang.split("_")[0].toLowerCase();
					     if(isB2BUser || language.equalsIgnoreCase("triviagame")){
					     	var imageFolder = "https://storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/";
						 } 
						 if(slide_type == ("VIDEO SLIDE")){
							var SlideType_Choose_2_Video_Id = arrData(195);
							var SlideType_Choose_2_Video_StartTime = arrData(191);
							var SlideType_Choose_2_Video_EndTime = arrData(193);
							var SlideType_Choose_2_Video_Autoplay = arrData(190);
							lessonFunctionCallVar[slideCount] = new SlideType_Video_Slide_Function("slide"+(i + 2),SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_Video_Id,SlideType_Choose_2_Video_Autoplay,SlideType_Choose_2_Video_StartTime,SlideType_Choose_2_Video_EndTime);
						}else{
				        	lessonFunctionCallVar[slideCount] = new SlideType_Choose_2_with_Top_Photo_Function("slide"+(i + 2),SlideType_Choose_2_with_Top_Photo_Question,SlideType_Choose_2_with_Top_Photo_option_String,SlideType_Choose_2_with_Top_Photo_Answer,SlideType_Choose_2_with_Top_Photo_Question_Type,SlideType_Choose_2_with_Top_Photo_Question_Display_Flag,SlideType_Choose_2_with_Top_Photo_Answer_Type,SlideType_Choose_2_with_Top_Photo_Image_Name,imageFolder);
				        }
				        slideCount++;
				        
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Missing_Word(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Missing_Word" slideType="SlideType_Missing_Word" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 10px 0px; color: #FE5C57;">'
						+'<span class="titleText" style="font-size: 30px; color: #FE5C57;text-transform: capitalize!important;"></span>'
					+'</div>'
					+'<div class="SlideType_Missing_Word_QuestionText" style="width: 100%; font-size: 24px;margin-bottom:20px;">'
						+'<span class="questionPart1Text"></span> <span> ______ </span>'
						+'<span class="questionPart2Text"></span>'
					+'</div>'
					+'<div id="SlideType_Missing_Word_select_choice" class="SlideType_Missing_Word_select_choice_UnChecked" style="margin-bottom:20px;"></div>'
				+'</div>';
				
			     var SlideType_Missing_Word_Question_Part_temp = arrData(38);
			     var SlideType_Missing_Word_Question_Part1 = SlideType_Missing_Word_Question_Part_temp.split("$$$")[0];
			     var SlideType_Missing_Word_Question_Part2 = SlideType_Missing_Word_Question_Part_temp.split("$$$")[1];
			     var SlideType_Missing_Word_optionString = arrData(39)+"*&"+arrData(43)+"*&"+arrData(41)+"*&"+arrData(44)+"*&"+arrData(42)+"*&"+arrData(45)+"*&"+arrData(40)+"*&"+arrData(46);
			     var SlideType_Missing_Word_Answer = "option"+arrData(82);
			     var SlideType_Missing_Word_TitleText = arrData(37);
			     lessonFunctionCallVar[slideCount] = new SlideType_Missing_Word_Function("slide"+(i + 2),SlideType_Missing_Word_TitleText,SlideType_Missing_Word_optionString,SlideType_Missing_Word_Answer,SlideType_Missing_Word_Question_Part1,SlideType_Missing_Word_Question_Part2);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Transaltion_Box(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Transaltion_Box" slideType="SlideType_Transaltion_Box" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 80px 0px;">'
						+'<span class="titleText" style="font-size: 30px; color: #FE5C57;"></span>'
					+'</div>'
					+'<div style="width: 100%; height: 90px;">'
						+'<div class="SlideType_Transaltion_Box_Question" style="width: 300px; height: 55px; padding: 17px 0px; font-size: 30px; float: left; text-align: right;"></div>'
						+'<div id="SlideType_Transaltion_Box_Listen_Text" style="cursor: pointer; height: 50px; float: left; width: 50px; margin: 20px 20px; border-radius: 100px; background: #49C9AF;">'
							+'<img style="margin-top: 13px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png" />'
						+'</div>'
						+'<div style="height: 90px; float: left; margin: 0px 30px;">'
							+'<img style="height: 60px; margin-top: 15px;" src="../../../InteractiveLessons/img/forward-button-green-2x.png" />'
						+'</div>'
						+'<div class="SlideType_Transaltion_Box_InputBoxOuterDiv" style="width: 400px; height: 90px; float: left; border-radius: 20px; border: none;">'
							+'<input id="SlideType_Transaltion_Box_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;" type="text">'
						+'</div>'
					+'</div>'
				+'</div>';
				
			       var SlideType_Transaltion_Box_TitleText = arrData(32);
			       var SlideType_Transaltion_Box_Question = arrData(33);
			       var SlideType_Transaltion_Box_Answer = arrData(34);
			       var SlideType_Transaltion_Box_Tip_On_Correct = arrData(35);
			       var SlideType_Transaltion_Box_Tip_On_InCorrect = arrData(36);
			       var SlideType_Transaltion_Box_Typing_Language = arrData(120);
			       lessonFunctionCallVar[slideCount] = new SlideType_Transaltion_Box_Function("slide"+(i + 2),SlideType_Transaltion_Box_TitleText,SlideType_Transaltion_Box_Question,SlideType_Transaltion_Box_Answer,SlideType_Transaltion_Box_Tip_On_Correct,SlideType_Transaltion_Box_Tip_On_InCorrect,SlideType_Transaltion_Box_Typing_Language);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Tip_Slide(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Tip_Slide" slideType="SlideType_Tip_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="SlideType_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">'
						+'<div class="titleText" style="padding: 30px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">'
						+'</div>'
						+'<div class="SlideType_Tip_Slide_tipText" style="width: 100%; font-size: 30px;"></div>'
					+'</div>'
					+'<div style="position: absolute; left: 10px; bottom: -15px;display: none;">'
						+'<img style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0, 1, 0, 180deg); width: 60px; z-index: -1;" src="../../../InteractiveLessons/img/tip-tail-f9f9f9.png" /> '
						+'<img style="width: 70px;" alt="" src="../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15.png">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Tip_Slide_TipText = arrData(47)+"*&"+arrData(48)+"*&*&"+arrData(49)+"*&"+arrData(50)+"*&";
			     var SlideType_Tip_Slide_TitleText = getappStringObject("52");
			     lessonFunctionCallVar[slideCount] = new SlideType_Tip_Slide_Function("slide"+(i + 2),SlideType_Tip_Slide_TitleText,SlideType_Tip_Slide_TipText);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Jumble_Slide(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Jumble_Slide" slideType="SlideType_Jumble_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="width: 100%;">'
						+'<div class="QuestionText" style="padding: 70px 0px 0px 0px; color: #49C9AF !important; font-size: 30px; text-transform: uppercase;">'
						+'</div>'
						+'<div class="notificationTipBox" style="position: absolute; right: 55px; top: 10px; padding: 5px; width: 220px; text-transform: uppercase; font-size: 17px; background: #7f7f7f; border-radius: 4px;line-height: 1.2em!important;display: none;">'
							+'<span style="color: #fff;"><%=getappStringObject("79") %></span> '
							+'<img style="position: absolute; right: -25px; transform: rotate3d(0, 0, 0, 180deg); width: 50px; z-index: -1; top: 5px;" src="../../../InteractiveLessons/img/call-out 300px.png" />'
						+'</div>'
						+'<div class="monsterBarNotificationImage" style="position: absolute; right: 0px; top: 25px; width: 40px; height: 61px; background: url(\'../../../InteractiveLessons/img/jelly-monster-2-small - rotate-15-anti.png\'); background-size: cover; background-repeat: no-repeat;display: none;">'
						+'</div>'
						+'<div style="width: 100%; font-size: 20px; margin-top: 30px;">'
							+'<li class="animatedListClass" style=""></li>'
							+'<ul id="jumbleTarget" style="width: 710px; min-height: 114px; background: #eee; border: 2px solid #F8CE46; border-radius: 4px;"></ul>'
							+'<ul id="jumbleSource" style="margin-top: 50px; border: 2px solid #F8CE46; width: 710px; min-height: 100px; border-radius: 4px;"> </ul>'
						+'</div>'
					+'</div>'
				+'</div>';
				
			     var SlideType_Jumble_Slide_QuestionText = arrData(52);
			     var SlideType_Jumble_Slide_AnswerText = arrData(136);
			     var SlideType_Jumble_Slide_option_String = arrData(53)+"*&"+arrData(54)+"*&"+arrData(55)+"*&"+arrData(56)+"*&"+arrData(57)+"*&"+arrData(58);
			     var SlideType_Jumble_Slide_Typing_Language = "0";
			     var SlideType_Jumble_Slide_slideNumber = slideCount;
			     lessonFunctionCallVar[slideCount] = new SlideType_Jumble_Slide_Function("slide"+(i + 2),SlideType_Jumble_Slide_slideNumber,SlideType_Jumble_Slide_QuestionText,SlideType_Jumble_Slide_AnswerText,SlideType_Jumble_Slide_option_String,SlideType_Jumble_Slide_Typing_Language);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Listen_Box(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Listen_Box" slideType="SlideType_Listen_Box" slideNumber="'+(i + 2)+'" data-autoslide="400000" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div style="padding: 40px 0px;">'
						+'<span class="titleText" style="font-size: 30px;"></span>'
					+'</div>'
					+'<div style="width: 100%;">'
						+'<table id="listenTable" style="width: 600px; margin: auto; border-spacing: 0px 20px;">'
						+'</table>'
					+'</div>'
				+'</div>';
				
				 var SlideType_Listen_Box_Title_Text = getappStringObject("82");
				 var SlideType_Listen_Box_String = arrData(59)+"*&"+arrData(63)+"*&"+arrData(62)+"*&"+arrData(64)+"*&"+arrData(60)+"*&"+arrData(65)+"*&"+arrData(61)+"*&"+arrData(66);
				 lessonFunctionCallVar[slideCount] = new SlideType_Listen_Box_Function("slide"+(i + 2),SlideType_Listen_Box_String,SlideType_Listen_Box_Title_Text);
				 slideCount++;
				 
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Dialog(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Dialog" slideType="SlideType_Dialog" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div id="title_dialog" style="color: #FE5C57; font-size: 30px; padding: 5px 0px 5px 0px;"><%=arrData(67)%></div>'
					+'<div id="chatBox" style="width: 100%; height: 365px; overflow-x: hidden; overflow-y: scroll; padding-top: 20px;">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Dialog_Title_Text = arrData(67);
			     var SlideType_Dialog_String = "*&"+arrData(68)+"*&"+arrData(72)+"*&*&"+arrData(69)+"*&"+arrData(74)+"*&*&"+arrData(70)+"*&"+arrData(75)+"*&*&"+arrData(71)+"*&"+arrData(73)+"*&*&"+arrData(121)+"*&"+arrData(126)+"*&*&"+arrData(122)+"*&"+arrData(127)+"*&*&"+arrData(123)+"*&"+arrData(128)+"*&*&"+arrData(124)+"*&"+arrData(129)+"*&*&"+arrData(125)+"*&"+arrData(130);
			     lessonFunctionCallVar[slideCount] = new SlideType_Dialog_Function("slide"+(i + 2),SlideType_Dialog_String);
			     slideCount++;
			     
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Special_Slide(arrData){
	var html = "";
	html += '<section id="slide'+(i+2)+'" class="SlideType_Special_Slide" slideType="SlideType_Special_Slide" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<div class="SlideType_Special_Slide_Inner_Container" style="height: 400px; width: 800px; position: absolute; left: 80px; top: 40px; overflow-y: auto;">'
					+'</div>'
				+'</div>';
				
			     var SlideType_Special_Slide_Data = arrData(145)+"*&"+arrData(142)+"*&"+arrData(146)+"*&"+arrData(143)+"*&"+arrData(147)+"*&"+arrData(144);
			     lessonFunctionCallVar[slideCount] = new SlideType_Special_Slide_Function("slide"+(i + 2), SlideType_Special_Slide_Data);
					slideCount++;
				
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_ListenableTranslation(arrData){
	var html = "" ;
		html += '<section id="slide'+(i+2)+'" class="SlideType_ListenableTranslation" slideType="SlideType_ListenableTranslation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
						+'<table style="width: 100%;height: 100%;">'
							+'<tr>'
								+'<td>'
									+'<div class="SlideType_ListenableTranslation_Question" style="width: 100%;padding: 16px; font-size: 24px;text-align: left;"><%=arrData(161)%></div>'
									+'<div id="SlideType_ListenableTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">'
										+'<img style="margin-top: 15px;width: 24px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
										if(arrData(167).equalsIgnoreCase("1") || arrData(167).equalsIgnoreCase("yes")){
											html += '<audio id="audio" style="display:none;" >'
											  +'<source id="mp3_src" src="https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text=<%=arrData(162)%>&locale=<%=locale %>" type="audio/mp3"></source>'
											+'</audio>';
										}else{
											html += '<audio id="audio" style="display:none;" >';
											 if(isB2BUser){
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.split("_")[0].toLowerCase() %>/<%=arrData(162)%>" type="audio/mp3"></source>';
											 }else{
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(162)%>" type="audio/mp3"></source>';
											 } 
											html += '</audio>';
										}
									html +='</div>'
									+'<div class="SlideType_ListenableTranslation_InputBoxOuterDiv" style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;">'
										+'<input id="SlideType_ListenableTranslation_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;background:#eee;" type="text">'
									+'</div>'
								+'</td>'
							+'</tr>'
						+'</table>'
				+'</div>';
				
					
			       var SlideType_ListenableTranslation_Audio = arrData(162);
			       var SlideType_ListenableTranslation_IsTTS = arrData(167);
			       var SlideType_ListenableTranslation_Answer = arrData(163);
			       var SlideType_ListenableTranslation_Tip_On_Correct = arrData(164);
			       var SlideType_ListenableTranslation_Tip_On_InCorrect = arrData(165);
			       var SlideType_ListenableTranslation_Typing_Language = arrData(166);
			       lessonFunctionCallVar[slideCount] = new SlideType_ListenableTranslation_Function("slide"+(i + 2),SlideType_ListenableTranslation_Audio,SlideType_ListenableTranslation_IsTTS,SlideType_ListenableTranslation_Answer,SlideType_ListenableTranslation_Tip_On_Correct,SlideType_ListenableTranslation_Tip_On_InCorrect,SlideType_ListenableTranslation_Typing_Language);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_CombinedTranslation(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_CombinedTranslation" slideType="SlideType_CombinedTranslation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<table style="width: 100%;height: 100%;">'
						+'<tr>'
							+'<td>'
								+'<div class="SlideType_CombinedTranslation_Question" style="width: 90%;padding: 16px; font-size: 22px;text-align: center;margin: auto;">'
										+'<span style="color:#FE5C57;"><%=arrData(169)%></span>'
										+'<span style=""><%=arrData(168)%></span>'
										+'<span style="color:#FE5C57;"><%=arrData(170)%></span>'
									+'</div>';
									if(arrData(171).equalsIgnoreCase("1") || arrData(171).equalsIgnoreCase("yes")){
										html += '<div style="width: 90%;border-radius: 20px; border: none;text-align: center;font-size: 22px;margin: 10px auto;">'
											+'<span style=""><%=arrData(173)%></span>'
										+'</div>';
									}
								if(arrData(172).equalsIgnoreCase("1") || arrData(172).equalsIgnoreCase("yes")){
									html += '<div id="SlideType_CombinedTranslation_Listen_Text" style="cursor: pointer;height: 50px;width: 50px;margin: 20px auto;border-radius: 100px;background: #49C9AF;text-align: center;">';
										html += '<img style="margin-top: 15px;width: 24px;" src="../../../InteractiveLessons/img/soundIconWhite_2.png">';
										if(arrData(179).equalsIgnoreCase("1") || arrData(179).equalsIgnoreCase("yes")){
											html += '<audio id="audio" style="display:none;" >'
											  +'<source id="mp3_src" src="https://mail.culturealley.com/english-app/utility/getTTSSoundFile.php?text=<%=arrData(174)%>&locale=<%=locale %>" type="audio/mp3"></source>'
											+'</audio>';
										}else{
											html += '<audio id="audio" style="display:none;" >';
											 if(isB2BUser){
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/<%=arrData(174)%>" type="audio/mp3"></source>';
											 }else{
											 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(174)%>" type="audio/mp3"></source>';
											 } 
											html += '</audio>';
										}
								html += '</div>';
								} 
								html += '<div class="SlideType_CombinedTranslation_InputBoxOuterDiv" style="width: 100%; height: 90px; border-radius: 20px; border: none;text-align: center;margin-top: 10px;">'
									+'<input id="SlideType_CombinedTranslation_InputBox" style="padding: 10px 20px; width: 360px; height: 70px; border: none; border-radius: 20px; font-size: 40px;background:#eee;" type="text">'
								+'</div>'
							+'</td>'
						+'</tr>'
					+'</table>'
				+'</div>';
				
			       var SlideType_CombinedTranslation_Audio = arrData(174);
			       var SlideType_CombinedTranslation_IsTTS = arrData(179);
			       var SlideType_CombinedTranslation_Answer = arrData(175);
			       var SlideType_CombinedTranslation_Tip_On_Correct = arrData(176);
			       var SlideType_CombinedTranslation_Tip_On_InCorrect = arrData(177);
			       var SlideType_CombinedTranslation_Typing_Language = arrData(178);
			       lessonFunctionCallVar[slideCount] = new SlideType_CombinedTranslation_Function("slide"+(i + 2),SlideType_CombinedTranslation_Audio,SlideType_CombinedTranslation_IsTTS,SlideType_CombinedTranslation_Answer,SlideType_CombinedTranslation_Tip_On_Correct,SlideType_CombinedTranslation_Tip_On_InCorrect,SlideType_CombinedTranslation_Typing_Language);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_Pronunciation(arrData){
	var html = "";
		html += '<section id="slide'+(i+2)+'" class="SlideType_Pronunciation" slideType="SlideType_Pronunciation" slideNumber="'+(i + 2)+'" data-background="#fff">'
				+'<div class="sectionInnerContainer">'
					+'<table style="width: 100%;height: 100%;">'
						+'<tr>'
							+'<td>'
								+'<div class="SlideType_Pronunciation_Question" style="width: 90%;padding: 16px; font-size: 22px;text-align: center;margin: auto;">'
										+'<span style="color:#FE5C57;"><%=arrData(149)%></span>'
										+'<span style="">'+document.write(arrData(148))+'</span>'
										+'<span style="color:#FE5C57;"><%=arrData(150)%></span>'
									+'</div>'
								+'<div style="width:500px;text-align: center;margin: auto; ">'
									+'<div class="SlideType_Pronunciation_ImageDiv SlideType_Pronunciation_ImageDiv_UnChecked option1" tipText="<%=arrData(153)%>">'
										+'<div class="SlideType_Pronunciation_Image_Circle SlideType_Pronunciation_Image_Circle_UnChecked"></div>'
										+'<div style="height: 200px;background: #fff;display: table-cell;border-radius: 15px 15px 0px 0px;width: 200px;">'
											+'<img class="SlideType_Pronunciation_Img_Source" src="../../../images/listen.png" style="width: 45px;">'
										+'</div>'
										+'<div class="SlideType_Pronunciation_ImageText SlideType_Pronunciation_ImageText_UnChecked" style="padding: 16px 8px;text-align: left;">Option 1</div>'
										+'<audio id="audio" style="display:none;" >';
										 if(isB2BUser){
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/<%=arrData(151)%>" type="audio/mp3"></source>';
										 }else{
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(151)%>" type="audio/mp3"></source>';
										 } 
										html += '</audio>';
									html += '</div>'
										+'<div class="SlideType_Pronunciation_ImageDiv SlideType_Pronunciation_ImageDiv_UnChecked option2"  tipText="<%=arrData(154)%>">'
										+'<div class="SlideType_Pronunciation_Image_Circle SlideType_Pronunciation_Image_Circle_UnChecked"></div>'
										+'<div style="height: 200px;background: #fff;display: table-cell;border-radius: 15px 15px 0px 0px;width: 200px;">'
											+'<img class="SlideType_Pronunciation_Img_Source" src="../../../images/listen.png" style="width: 45px;">'
										+'</div>'
										+'<div class="SlideType_Pronunciation_ImageText SlideType_Pronunciation_ImageText_UnChecked" style="padding: 16px 8px;text-align: left;">Option 2</div>'
										+'<audio id="audio" style="display:none;" >';
										if(isB2BUser){
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=language.toLowerCase() %>/<%=arrData(152)%>" type="audio/mp3"></source>';
										 }else{
										 	html += '<source id="mp3_src" src="//storage.helloenglish.com/English-App/PronunciationFiles/<%=userLang.split("_")[0].toLowerCase() %>/<%=arrData(152)%>" type="audio/mp3"></source>';
										 } 
										html += '</audio>'
									+'</div>'
								+'</div>'
							+'</td>'
						+'</tr>'
					+'</table>'
				+'</div>';
				
					console.log("PRONUNCIATION",arrData);
			       var SlideType_Pronunciation_Answer = "option"+arrData(155);
			       lessonFunctionCallVar[slideCount] = new SlideType_Pronunciation_Function("slide"+(i + 2),SlideType_Pronunciation_Answer);
			       slideCount++;
			       
			html += '</section>';
			
			$(".slides").append(html);
}

function render_SlideType_IMAGE_Tip_Slide(arrData){
	var html = "";
		html += '<section id="slide<%=(i+2)%>" class="SlideType_IMAGE_Tip_Slide" slideType="SlideType_IMAGE_Tip_Slide" slideNumber="<%=(i+2)%>"  data-background="#fff">'
				     +'<div class="sectionInnerContainer">'
				      +'<div class="SlideType_IMAGE_Tip_Slide_Inner_Container" style="border-radius: 30px; width: 800px; background: #f9f9f9; height: 400px; position: absolute; left: 80px; top: 40px;">'
				       +'<div class="titleText" style="padding: 30px 0px;color:#49C9AF!important;font-size:30px;text-transform: uppercase;">'
				       +'</div>'
				       +'<div class="SlideType_IMAGE_Tip_Slide_tipText" style="width: 100%;font-size:30px;">'
				       +'</div>'
				      +'</div>'
				      +'<div style="position: absolute;left: 10px; bottom: -15px;">'
				       +'<img style="position: absolute; top: -50px; left: 20px; transform: rotate3d(0,1,0,180deg); width: 60px; z-index: -1;display: none;" src="../img/tip-tail-f9f9f9.png" />'
				       +'<img style="width: 70px;display: none; " alt="" src="../img/jelly-monster-2-small - rotate-15.png">'
				      +'</div>'
				     +'</div>';
				     
				     var SlideType_IMAGE_Tip_Slide_TipText = arrData(180)+"*&";
				     var SlideType_IMAGE_Tip_Slide_TitleText = getappStringObject("52");
				     lessonFunctionCallVar[slideCount] = new SlideType_IMAGE_Tip_Slide_Function("slide<%=(i+2)%>",SlideType_IMAGE_Tip_Slide_TitleText,SlideType_IMAGE_Tip_Slide_TipText);
				     slideCount++;
				     
				  html += '</section>';
				  
				  $(".slides").append(html);
}

/*
function render_SlideType_Last_Slide(){
	var html = "";
		html += '<section id="slide<%=(2*i + 3)%>" class="SlideType_Last_Slide" slideType="SlideType_Special_Slide" slideNumber="<%=(i + 3)%>"	data-background="#fff">'
				'<div class="sectionInnerContainer" onclick="openDownloadLink()" style="overflow:auto;">';
			if(isEmbed){
				html += '<table style="width: 100%;height: 100%;border-collapse: collapse;background-image: url(\'https://language-practice.s3.amazonaws.com/English-App/Downloadable_Lessons_V3/lesson_images/lesson_+'+lessonNoForLink+'+.png\');background-size: cover;background-position: center;">'
					+'<tbody style="background: rgba(0,0,0,.5);"><tr>'
						+'<td>'
							+'<div style="text-align: center;">'
								+'<img style="width: 50px;cursor: pointer;vertical-align: middle;" onclick="window.location=\'https://helloenglish.com\'" src="//storage.helloenglish.com/English-Web/images/hlogo.png">'
								+'<div style="font-family: "Roboto Condensed", sans-serif;vertical-align: middle;font-size: 20px;color: #fff;margin-top: 16px;">'
									+'Get the Hello English App<br>'
									+'Start learning English for free!'
								+'</div>'
							+'</div>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align: center;vertical-align: initial;">'
						+'<img class="appleDownload" style="width: 150px;cursor: pointer;display: inline-block;margin-top: 16px;" onclick="openDownloadLink()" src="//storage.helloenglish.com/English-Web/images/AP_download_badge.png">'
						+'<div></div>'
						+'<img class="androidDownload" style="width: 150px;cursor: pointer;display: inline-block;" onclick="openDownloadLink()" src="//storage.helloenglish.com/English-Web/images/GP_download_badge.png">'
						+'</td>'
					+'</tr>'
				+'</tbody>'
				+'</table>';
			}else{
				html += '<table style="width: 100%;height: 100%;margin-bottom: 20px;">'
						+'<tr>'
							+'<td style="text-align: center;">';
								html += '<table class="endScoreTable">'
											+'<tr>'
												+'<td><%=getappStringObject("684") %> </td>'
												+'<td class="maxCoins"></td>'
											+'</tr>'
											+'<tr>'
												+'<td><%=getappStringObject("170") %> </td>'
												+'<td class="coinsWon"></td>'
											+'</tr>'
											+'<tr>'
												+'<td><%=getappStringObject("167") %></td>'
												+'<td class="lastScore"></td>'
											+'</tr>'
											+'<tr style="border-top:1px solid #F8CE46;">'
												+'<td><%=getappStringObject("171") %></td>'
												+'<td class="improvedScore"></td>'
											+'</tr>';
											
										html +='</table>';
									html +='<div class="coinsTableFeebackDiv" style="margin:20px 0px 0px;text-align:center;color:#F8CE46;font-size:20px;">'
										
									//var totalCoinsWonTemp = getappStringObject("63");
									//var totalNewCoinsWonTemp = getappStringObject("162");
										
									+'<div class="coinsTableFeebackLost" style="display:none;">'
										+'<div><%=totalCoinsWonTemp.replace("-10000","<span class=\'totalCoinsWon\'></span>") %></div>'
										+'<div><%=getappStringObject("163") %></div>'
									+'</div>'
									+'<div class="coinsTableFeebackWon" style="display:none;">'
										+'<div><%=totalNewCoinsWonTemp.replace("-10000","<span class=\'totalNewCoinsWon\'></span>") %></div>'
									+'</div>'
									+'<div class="coinsTableFeebackForTest" style="display:none;">'
										+'<div class="testPassedDiv" style="display:none;margin:0px 20px;">'
											+'<div><%=getappStringObject("595").replace("\\n", "<br>") %></div>'
											+'<div style="margin-top: 20px;"><%=String.format(getappStringObject("596"), -10000, -20000).replace("-10000","<span class=\'unlockedLessonAfterTest\'></span>").replace("-20000","<span class=\'currentLevel\'></span>") %></div>'
										+'</div>'
										+'<div class="testFailedDiv" style="display:none;margin:0px 20px;">'
											+'<div style="margin-top: 20px;"><%=String.format(getappStringObject("593"), -10000, -20000).replace("-10000","<span class=\'testQuestionCount\'></span>").replace("-20000","<span class=\'testCorrectCount\'></span>") %></div>'
										+'</div>'
									+'</div>'
									+'</div>';
									html += '<input class="greenButton nextLessonButton animated pulse" style="margin-top: 10px;width: initial!important;min-width: 280px;" type="button" value="<%=getappStringObject("54") %>">'
											+'<br>'
											+'<input class="greenButton practiceGameButton" style="margin-top: 10px;width: initial!important;min-width: 280px;" type="button" value="<%=getappStringObject("107") %>">'
											+'<br>'
											+'<input class="greenButton playAgainButton" style="margin-top: 10px;width: initial!important;min-width: 280px;" type="button" value="<%=getappStringObject("3") %>">';
											
							html += '</td>'
						+'</tr>'
					+'</table>';
				}
			
			html += '</div>'
			+'<div class="coinStackAnimationScreen" style="position:absolute;top:0px;display:none;background: rgba(0,0,0,.5);text-align: center;margin: auto;width:100%;height:100%;z-index:2000;">'
				+'<table class="taskBlueStripTable" style="width:100%;height:100%;position:absolute;z-index:10;">'
					+'<tr>'
						+'<td>'
							+'<table class="taskBlueStrip animated" style="margin: auto;">'
								+'<tr>'
									+'<td>'
										+'<div style="width:400px;text-align:center;">'
											+'<div style="color:#FE5C57;font-size:25px;"><%=getappStringObject("456") %></div>'
											+'<div style="color:#F8CE46;font-size:20px;margin-top:10px;"><%=getappStringObject("85") %></div>'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</table>'		
						+'</td>'
					+'</tr>'
				+'</table>'				
				+'<div class="coinStackContainer" style=" position: relative; height: 100%;width:100%; max-width: 500px; margin: auto;">'
					+'<div>'
						+'<img class="coinInStack animated" style="bottom:50px;margin-left: -50px;z-index:1;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:100px;margin-left: -105px;z-index:2;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:70px;margin-left: 25px;z-index:3;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:65px;margin-left: -35px;z-index:6;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: 10px;z-index:5;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:115px;margin-left: -100px;z-index:4;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:80px;margin-left: -50px;z-index:7;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:95px;margin-left: -45px;z-index:8;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:110px;margin-left: -40px;z-index:9;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:130px;margin-left: -40px;z-index:10;" src="img/flat_coin.png">'
						+'<img class="coinInStack animated" style="bottom:145px;margin-left: -50px;z-index:11;" src="img/flat_coin.png">'
						
					+'</div>'
				+'</div>'
			
			+'</div>'
		
		+'</section>';
		
		$(".slides").append(html);
}
*/
