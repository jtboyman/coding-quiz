let timeLeft = 60;
let startButton = document.querySelector('#startBtn')

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

let beginGame

startButton.addEventListener("click", startTimer);