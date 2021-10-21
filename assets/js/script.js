let timeLeft = 60;
let startButton = document.querySelector('#startBtn');
let introBox = document.getElementById('introBox');
let mainBox = document.getElementById("mainBox");
const questions = ["Commonly used data types DO NOT include...", "The condition in an if/else statement is enclosed in..."];
const answers = [
    {
        answers1: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false},
        ]
    },
]


let startTimer = function() {

    let timerEl = document.createElement("p");

    timerEl.id = "timer";
    
    timerEl.append(timeLeft);

    let timerBox = document.querySelector('#timerBox');

    timerBox.appendChild(timerEl);
    
    setInterval(function() {
    
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').innerHTML = timeLeft;
        }

        else if (timeLeft <= 0)
            //come back to make this take you to the end screen
            return;
    }, 1000);
}

//begin game function
//remove the intro div
//create new div
//create p element and append text
//create 4 button elements and append text
//on click button will: display 'correct' or 'wrong'; bring up next question

let beginGame = function() {
    //removes old box
    introBox.remove();

    //creates and appends new div to main
    let questionBoxEl = document.createElement("div");
    mainBox.appendChild(questionBoxEl);

    //run the function to load question 1
}

let genQuestion = function() {
    //create p element for question text and assign variable, append to main
    let questionText = document.createElement("p");
    questionText.id = "questionText";
    mainBox.appendChild(questionText);
    //pull from array of questions to fill p
    for (let i = 0; i<questions.length; i++) {
        questionText.innerText = questions[i];
        
    }
}

let genAnswers = function() {
    let answer1 = document.createElement("button");
    mainBox.appendChild(answer1);

    let answer2 = document.createElement("button");
    mainBox.appendChild(answer2);

    let answer3 = document.createElement("button");
    mainBox.appendChild(answer3);

    let answer4 = document.createElement("button");
    mainBox.appendChild(answer4);

    for (let i = 0; i<answers.length; i++) {
        answer1.innerText = answers[i].answers1[0].text;
        answer2.innerText = answers[i].answers1[1].text;
        answer3.innerText = answers[i].answers1[2].text;
        answer4.innerText = answers[i].answers1[3].text;
    }
}

startButton.addEventListener("click", startTimer);

startButton.addEventListener("click", beginGame);