let timeLeft = 60;
let questionTracker = 0;
let answerTracker = -1;
let startButton = document.querySelector('#startBtn');
let introBox = document.getElementById('intro-box');
let mainBox = document.getElementById("main-box");
var timer;
var highScores = JSON.parse(localStorage.getItem("names-and-scores")) || [];
const questions = ["Commonly used data types DO NOT include...", "The condition in an if/else statement is enclosed in...", "Arrays in JavaScript can be used to store...", "String values must be enclosed within ______ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is..."];
const answers = [
    {
        choices: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false},
        ]
    },

    {
        choices: [
            {text: "Quotes", correct: false},
            {text: "Parentheses", correct: true},
            {text: "Curly Brackets", correct: false},
            {text: "Square Brackets", correct: false},
        ]
    },

    {
        choices: [
            {text: "Numbers and Strings", correct: false},
            {text: "Other Arrays", correct: false},
            {text: "Booleans", correct: false},
            {text: "All of the Above", correct: true},
        ]
    },

    {
        choices: [
            {text: "Commas", correct: false},
            {text: "Curly Brackets", correct: false},
            {text: "Quotes", correct: true},
            {text: "Parentheses", correct: false},
        ]
    },

    {
        choices: [
            {text: "JavaScript", correct: false},
            {text: "Terminal/GitBash", correct: false},
            {text: "For Loops", correct: false},
            {text: "console.log", correct: true},
        ]
    },
];
//build timer
let startTimer = function() {

    let timerEl = document.createElement("p");

    timerEl.id = "timer";
    
    timerEl.append(timeLeft);

    let timerBox = document.querySelector('#timer-box');

    timerBox.appendChild(timerEl);
    
    //function to set up timer
    let setTimer = function() {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').innerHTML = timeLeft;
        }

        else if (timeLeft <= 0) {
            //end the game
            return endGame();
        }
    }
    //function to run timer on 1 sec interval
    timer = setInterval(setTimer, 1000);
}

let beginGame = function() {
    //removes old box
    introBox.remove();

    //creates and appends new div to main
    let questionBoxEl = document.createElement("div");
    questionBoxEl.id = "question-box";
    mainBox.appendChild(questionBoxEl);

    //create p div for questionbox for questions to go in
    let questionTextEl = document.createElement("p");
    questionTextEl.id = "question-text";
    questionBoxEl.appendChild(questionTextEl);

    //create buttons
    let answer1El = document.createElement("button");
    answer1El.id = "answer1";
    questionBoxEl.appendChild(answer1El);

    let answer2El = document.createElement("button");
    answer2El.id = "answer2";
    questionBoxEl.appendChild(answer2El);

    let answer3El = document.createElement("button");
    answer3El.id = "answer3";
    questionBoxEl.appendChild(answer3El);

    let answer4El = document.createElement("button");
    answer4El.id = "answer4";
    questionBoxEl.appendChild(answer4El);

    //run the function to run the game, uses success function to keep time
    success();
}

let genQuestion = function() {
    //pull from array to do question
    document.getElementById('question-text').innerText = questions[questionTracker];

    //prep for next question
    questionTracker++;
}

let genAnswers = function() {
    //prep buttons, track answer array
    answerTracker++;
    resetAnswers();

    //answer 1, display text
    document.getElementById('answer1').innerText = answers[answerTracker].choices[0].text;
    //test if right or wrong and assign new id or class
    if (answers[answerTracker].choices[0].correct === true) {
        document.getElementById('answer1').id = "correct-answer";
    }

    else if (answers[answerTracker].choices[0].correct === false) {
    document.getElementById('answer1').className = "wrong-answer";
    }

    //answer 2
    document.getElementById('answer2').innerText = answers[answerTracker].choices[1].text;

    if (answers[answerTracker].choices[1].correct === true) {
        document.getElementById('answer2').id = "correct-answer";
    }

    else if (answers[answerTracker].choices[1].correct === false) {
    document.getElementById('answer2').className = "wrong-answer";
    }

    //answer 3
    document.getElementById('answer3').innerText = answers[answerTracker].choices[2].text;

    if (answers[answerTracker].choices[2].correct === true) {
        document.getElementById('answer3').id = "correct-answer";
    }
    
    else if (answers[answerTracker].choices[2].correct === false) {
        document.getElementById('answer3').className = "wrong-answer";
    }

    //answer 4
    document.getElementById('answer4').innerText = answers[answerTracker].choices[3].text;

    if (answers[answerTracker].choices[3].correct === true) {
        document.getElementById('answer4').id = "correct-answer";
    }
    
    else if (answers[answerTracker].choices[3].correct === false) {
    document.getElementById('answer4').className = "wrong-answer";
    }

    //answer button event listeners
    document.getElementById('correct-answer').addEventListener("click", success);
    document.getElementsByClassName('wrong-answer')[0].addEventListener("click", failure);
    document.getElementsByClassName('wrong-answer')[1].addEventListener("click", failure);
    document.getElementsByClassName('wrong-answer')[2].addEventListener("click", failure);

}

let resetAnswers = function() {
        //remove event listeners if needed
        if (answerTracker>=1) {
            document.getElementById('correct-answer').removeEventListener("click", success);
            document.getElementsByClassName('wrong-answer')[0].removeEventListener("click", failure);
            document.getElementsByClassName('wrong-answer')[1].removeEventListener("click", failure);
            document.getElementsByClassName('wrong-answer')[2].removeEventListener("click", failure);
        }

        //reset answer 1
        document.getElementsByTagName("button")[0].id = 'answer1';
        document.getElementsByTagName("button")[0].className = 'answerBtn';
        
        //reset answer 2
        document.getElementsByTagName("button")[1].id = 'answer2';
        document.getElementsByTagName("button")[1].className = 'answerBtn';
        //reset answer 3
        document.getElementsByTagName("button")[2].id = 'answer3';
        document.getElementsByTagName("button")[2].className = 'answerBtn';
        //reset answer 4
        document.getElementsByTagName("button")[3].id = 'answer4';
        document.getElementsByTagName("button")[3].className = 'answerBtn';
}

let success = function() {
    if (questionTracker <= questions.length - 1) {//if there are questions left continue the game - number should equal number of questions -1
        genQuestion();
        genAnswers();
        //make sure text doesnt display before quiz begins
        if (questionTracker >1) {
            document.getElementById('accuracy').innerText = "Correct!";
        }
    }

    else if (questionTracker > questions.length - 1) {//end the game
        endGame();
    }

}

let failure = function() {
    //penalty for wrong answer
    if (timeLeft >= 10) {
        timeLeft = timeLeft - 10;
    }
    else if (timeLeft<10) {
        timeLeft = 0;
        return endGame();
    }

    if (questionTracker <= questions.length - 1) {//if there are questions left continue the game - number should equal number of questions -1
        genQuestion();
        genAnswers();
        document.getElementById('accuracy').innerText = "Wrong :(";
    }

    else if (questionTracker > questions.length - 1) { //end the game
        endGame();
    }
}

let endGame = function() {
    //clear everything out
    document.getElementById('question-box').remove();

    //stop timer and set to correct score
    clearInterval(timer);
    document.getElementById('timer').innerText = timeLeft;

    //create new elements on the page
    //div
    let endBoxEl = document.createElement('div');
    endBoxEl.id = 'end-box';
    mainBox.appendChild(endBoxEl);
    //h1 head
    let gameOverEl = document.createElement('h1');
    gameOverEl.id = 'game-over';
    gameOverEl.innerText = 'Game Over!'
    endBoxEl.appendChild(gameOverEl);
    //score
    let scoreBoxEl = document.createElement('p');
    scoreBoxEl.id = 'score-box';
    scoreBoxEl.innerText = "Your score is " + timeLeft + "!";
    endBoxEl.appendChild(scoreBoxEl);

    //initials form
    let endFormEl = document.createElement('form');
    endFormEl.id = "formEl";
    endBoxEl.appendChild(endFormEl);
    let initialLabelEl = document.createElement('label');
    initialLabelEl.setAttribute("for", "initials");
    initialLabelEl.innerText = 'Enter your initials to save your score!';
    endFormEl.appendChild(initialLabelEl);
    let textLineEl = document.createElement('input');
    textLineEl.setAttribute("type","text");
    textLineEl.id = 'userScore';
    endFormEl.appendChild(textLineEl);
    let formSubmitEl = document.createElement('button');
    formSubmitEl.setAttribute("type","button");
    formSubmitEl.setAttribute("onclick", 'saveScore()');
    formSubmitEl.innerText = "Submit Score";
    endFormEl.appendChild(formSubmitEl);

}

let saveScore = function() {
    //if no input assign value 'guest'
    let input = document.getElementById("userScore").value;
    if (input === "") {
        input = "guest";
    }
    //build object for array, save and push it, reload the page
    let scoreDisplayObj = {
        initials: input,
        score: timeLeft,
    }
    highScores.push(scoreDisplayObj);
    highScores.sort(function(a,b){return b.score-a.score});

    localStorage.setItem("names-and-scores", JSON.stringify(highScores));
    alert('Your high score was saved!');
    location.reload();
}

let scoreBoard = function() {
    //removes other elements
    mainBox.remove();
    document.getElementById('view-scores-box').remove();
    document.getElementById("timer-box").remove();
    document.getElementById('accuracy-box').remove();
    //create scoreboard base
    let scoreBoxEl = document.createElement("div");
    document.getElementById('page-body').appendChild(scoreBoxEl);

    let scoreLabelEl = document.createElement("h1");
    scoreLabelEl.innerText = "High Scores";
    scoreBoxEl.appendChild(scoreLabelEl);

    let scoreListEl = document.createElement('ol');
    scoreBoxEl.appendChild(scoreListEl);
    //populate scoreboard
    for (let i = 0; i<highScores.length; i++) {
        let scoreEl = document.createElement('li');
        scoreListEl.appendChild(scoreEl);
        scoreEl.innerText = highScores[i].initials + ":   " + highScores[i].score;
    }

    let backButtonEl = document.createElement("button");
    backButtonEl.innerText = "Back";
    backButtonEl.setAttribute("onclick","location.reload()");
    scoreBoxEl.appendChild(backButtonEl);


}

//start button event listeners
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", beginGame);
//scoreboard event listener
document.getElementById('view-scores-link').addEventListener("click", scoreBoard);
