//declaring elements that exist in html;
let timerEl = document.querySelector("#timer");
let contentEl = document.querySelector(".content");
let promptEl = document.querySelector("#quiz-prompt");
let startBtnEl = document.querySelector("#start");


// declare elements that need to be created then appended to html;
let quizContentEl = document.createElement("article");
quizContentEl.setAttribute("class", "quiz-content");
let questionEl = document.createElement("h2");
questionEl.setAttribute("class", "questionEl");
let ansGroupEl = document.createElement("div");
ansGroupEl.setAttribute("class", "answer-group");
let ansPrompt = document.createElement("p");
ansPrompt.setAttribute("class", "answer-prompt");

//declaring global variables;
let score = 0;
let timeLeft = 80;
let index = 0;

// countdown function; to be called on start click
function timerCountdown() {
  let timerInterval = setInterval(function() {
    timeLeft--;
    timerEl.textContent = timeLeft + " seconds remaining";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      quizResults();
    }
  }, 1000);
}

//function to render questionEl and related answer buttons;
function renderQuiz() {
  hide(promptEl);
  questionEl.textContent = qandAs[index].quest;
  // console.log(qandAs[index].quest);
  let answers = qandAs[index].ans;
  // console.log(answers);
  
  //how I am making the buttons is causing duplication of last answer of previous question on index++ loop >:(
  if (index === 0) {
    for (let a = 0; a < answers.length; a++) {
      let ansBtnEl = document.createElement("button");
      ansBtnEl.setAttribute("class", "answer");
      ansBtnEl.textContent = answers[a];
      console.log(ansBtnEl);
      ansGroupEl.appendChild(ansBtnEl);
      //add event listener to each button and calls isCorrect function to check answer;
      ansBtnEl.addEventListener("click", isCorrect);
    }
  } else {
    for (let a = 0; a < answers.length; a++) {
      let ansBtnEl = document.querySelector("button");
      ansBtnEl.innerText = answers[a];
      //add event listener to each button and calls isCorrect function to check answer;
      ansBtnEl.addEventListener("click", isCorrect);
      }
  }
  quizContentEl.append(questionEl);
  quizContentEl.append(ansGroupEl);
  contentEl.append(quizContentEl);
  quizContentEl.appendChild(ansPrompt);
}

function hide(element) {
  element.setAttribute("style", "display: none;");
}

function show(element) {
  element.setAttribute("style", "display: block;");
}

function isCorrect(event) {
  let choice = event.target.textContent;
  // console.log(choice);
  let rightAns = qandAs[index].correct;
  // console.log(rightAns);
  let isCorrect = true;

  if (choice !== rightAns) {
    !(isCorrect);
    ansPrompt.textContent = "Incorrect!";
      if (timeLeft <= 10) {
        timeLeft = 0;
        quizResults();
      } else {
        timeLeft -= 10;
      }
    nextQuestion();
  } else {
    (isCorrect);
    score += 10;
    ansPrompt.textContent = "Correct!";
    nextQuestion();
    }

  let removePrompt = setTimeout(function() {
    quizContentEl.removeChild(ansPrompt);
  }, 1000);
}

function nextQuestion() {
  if (index < qandAs.length - 1) {
    renderQuiz(index++);
  } else {
    hide(quizContentEl);
    quizResults();
  }
}

startBtnEl.addEventListener("click", function() {
  timerCountdown();
  renderQuiz();
});