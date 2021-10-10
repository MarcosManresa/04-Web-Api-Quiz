var questionsEl = document.querySelector("#question");
var timerEl = document.querySelector("#timer");
var choiceEl = document.querySelector("#choice");
var submitBtn = document.querySelector("#submiting");
var startBtn = document.querySelector("#starting");
var initialEl = document.querySelector("#init");
var feedbackEl = document.querySelector("#feedback-1");

//variables for the state of the quiz
var currentQuestionIndex = 0;
var timer = questions.length * 15;
var timerId;

// Start quiz function
function QuizStart(){
    //Hiding the Starting Screen
    var screenStartEl = document.getElementById("screen-start");
    screenStartEl.setAttribute("class", "hiding");

    // Un-hides the questions
    questionsEl.removeAttribute("class");

    //Commences the timer
    timerId =  setInterval(clockTick, 1000);
    //Shows the time it starts with
    timerEl.textContent = timer;

    AcquireQuestion();
}

function AcquireQuestion(){
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // updates the title with a current question
    var titleEl = document.getElementById("title-question");
    titleEl.textContent = currentQuestion.title;

    // Clears out old question choices
    choiceEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i){
        // creates a new button for each choice
        var choicesNode = document.createElement("button");
        choicesNode.setAttribute("class", "choice");
        choicesNode.setAttribute("value", choice);

        choicesNode.textContent = i + 1 + ". " + choice;

        //attaches an event listener to each click
        choicesNode.onclick = questionClick;

        //Displays it on page
        choiceEl.appendChild(choicesNode);
    });
}

function questionClick(){
    //Checks if the input is wrong
    if(this.value !== questions[currentQuestionIndex].answer) {
        //Penalizes time
        timer -= 15;
        
        if(timer < 0){
            timer=0;
        }
        //Displays updates time on the page
        timerEl.textContent = timer;
        feedbackEl.textContent = "Wrong!"
        feedbackEl.style.fontSize = "200%"
    }else{
        feedbackEl.textContent = "Correct!"
        feedbackEl.style.fontSize = "200%"
    }

    //Displays the right/wrong feedback
    feedbackEl.setAttribute("class", "feedback-1");
    setTimeout(function(){
        feedbackEl.setAttribute("class", "feedback hiding");
    }, 1000); 

    //Moves forward onto next question
    currentQuestionIndex++;

    //Evaluates time
    if(currentQuestionIndex === questions.length){
        endQuiz();
    }else{
        AcquireQuestion();
    }
}

function endQuiz() {
    // Stops the tiemr
    clearInterval(timerId);

    //Shows the end screen
    var endScreenEl = document.getElementById("screen-end");
    endScreenEl.removeAttribute("class");

    //Shows the users final score
    var scoreFinalEL = document.getElementById("score-final");
    scoreFinalEL.textContent = timer;

    //hides the questions
    questionsEl.setAttribute("class", "hiding");
}

function clockTick(){
    //updates the tiemr
    timer--;
    timerEl.textContent =timer;

    //Auto checks if the user has ran out of time
    if(timer <= 0){
        endQuiz();
    }
}

function highScoreSave(){
    //gets the value in the input box
    var intialize = initialEl.value.trim();

    if(intialize !== ""){
        //acquires saved scores from local storage, if there isn't any sets an empty array
        var scorehighs =
        JSON.parse(window.localStorage.getItem("highscoring")) || [];

        // formats the new score for the user
        var scoreNew = {
            score: timer,
            initials: intialize
        };

        //saves to the local storage
        scorehighs.push(scoreNew);
        window.localStorage.setItem("highscoring", JSON.stringify(scorehighs));

        //redirects to the next page
        window.location.href = "score.html";
    }
}

function checkEnter(event){
    // checks the enter key
    if(event.key === "Enter"){
        highScoreSave();
    }
}

// submit initials 
submitBtn.onclick = highScoreSave;

//start quiz
startBtn.onclick = QuizStart;

initialEl.onkeyup = checkEnter;