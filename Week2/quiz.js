var quiz = (function () {
    var exports = {};
    
    //structure with ... questionText, options
    var questions = [{"questionText": "Sam thinks y=2x is going to ___ as x goes from 1 to 10.", "options": ["increases", "decreases", "goes up then down", "goes down then up"]}, {"questionText": "Jill thinks y=2x-5 is going to ___ as x goes from 1 to 10.", "options" : ["increases", "decreases", "goes up then down", "goes down then up"]}];
    
    var storeOnParse = false;
    var myQuiz = null;
    
    function getQuestion(number) {
        return questions[number];
    }
    
    function getCurrentQuestion() {
        if (storeOnParse) {
            return getQuestion(myQuiz.get("currentQuestion"));
        }
        return getQuestion(localStorage.currentQuestion);
    }
    
    function getCurrentQuestionNum() {
        if (storeOnParse) {
            return myQuiz.get("currentQuestion");
        }
        return localStorage.currentQuestion;
    }
    
    function getScore() {
        if (storeOnParse) {
            return myQuiz.get("score");
        }
        return localStorage.score;
    }
    
    function nextQuestion() {
        if (storeOnParse) {
            myQuiz.set("currentQuestion", "currentQuestion" + 1);
            console.log('parse');
        }
        else {
            localStorage.currentQuestion++;
        }
    }
            
    function incrementScore() {
        if (storeOnParse) {
            myQuiz.set("score", "score" + 1);
            console.log('parse2');
        }
        else {
            localStorage.score++;
        }
    }
    
    //input: takes in question index and student answer
    //output: true if answer is correct
    function checkAnswer(questionNum, answer) {
        var answerNum = getQuestion(questionNum).options.indexOf(answer);
        $('.resultDisplay').empty();
        $('.resultDisplay').append('<text>Loading...</text>');
        $.ajax({
            url: "http://localhost:8080",
            data: { questionNum: questionNum,
                    answerNum: answerNum}
            }).done(function(msg) {
                var correct = (msg === "true");
                $('.resultDisplay').empty();
                //displays whether the question was answered correctly 
                if (correct) {
                    $('.resultDisplay').append('<text>Correct!</text>');
                    incrementScore();
                }
                else {
                    $('.resultDisplay').append('<text>WRONG!</text>');
                }
            
                //adds button to either go to next question or show score(if quiz is over)
                var nextButton = $('<button class="nextButton">Next question</button>');
                nextButton.on("click", function () {
                    $('.quiz').empty();
                    nextQuestion();
                    try {
                        displayQuestion();
                    }
                    catch(err) {
                        $('.quiz').append('<text>The test is over.</text><p><text>Total score: ' + getScore() + '/' + getCurrentQuestionNum() + '</text>');
                        localStorage.clear();
                    }
                });
            $('.resultDisplay').append(nextButton);
        });        
    }
    
    //displays current quiz question to the student
    function displayQuestion() {
        var questionObject = getCurrentQuestion();
        
        var questionTitle = $('<text>Question ' + (parseInt(getCurrentQuestionNum()) + 1) + ': </text>');
        var question = $('<text>' + questionObject.questionText + '</text>');
        
        var options = $('<div class="options"></div>');
        for (var i = 0; i < questionObject["options"].length; i++){
            var radio = $("<input>", {type: "radio", name: "choice" + getCurrentQuestionNum(), value: questionObject.options[i]});
            options.append("<p>", radio, " ", questionObject.options[i]);
        }
        
        var submitButton = $('<button>Submit</button>');
        submitButton.on("click", function() {
            checkAnswer(getCurrentQuestionNum(), ($('input[name="choice'+getCurrentQuestionNum()+'"]:checked')).attr("value"));
        });
        
        var resultDisplay = $('<text class="resultDisplay">Choose an answer </text>');
                
        $('.quiz').append(questionTitle, question, options, "<p>", submitButton, resultDisplay);
    }
    
    function setupWithParse(){
        var QuizData = Parse.Object.extend("QuizData", {
            getCurrentQuestion: function() {
                return this.get("currentQuestion");
            },
            getScore: function() {
                return this.get("score");
            }
            }, {
            newQuiz: function() {
                var quiz = new QuizData();
                quiz.set("currentQuestion", 0);
                quiz.set("score", 0);
                return quiz;
            }
            
        });
        myQuiz = QuizData.newQuiz();
        
    }
    
    
    
    function setup(){
        //var parseStore = confirm("Press OK to store data on Parse cloud");
        parseStore = false;
        if (parseStore){
            storeOnParse = true;
            setupWithParse();
        }
        else{
            localStorage.currentQuestion=0;
            localStorage.score=0;
        }
        displayQuestion();
    }
    
    exports.setup = setup;
    return exports;
    
})();


$(document).ready(function() {
    Parse.initialize("Tgy24gEP8b21fWwcUVE7bMgiw3vVApxckZBPdqDF", "zeRM9Cf91yfVvAHYLiORnzRQA78c3WozHN212jRB");
    quiz.setup();
});