//declaring elements that exist in html;
const scoresBtnEl = document.querySelector('#scoresBtn'); 
const timeLabelEl = document.querySelector('#timer-label');
const timerEl = document.querySelector('#timer');
const contentEl = document.querySelector('.content');
const promptEl = document.querySelector('#quiz-prompt');
const startBtnEl = document.querySelector('#start');
const quizResEl = document.querySelector('#quiz-results');
const quizFormEl = document.querySelector('#quiz-form');
const scoreEl = document.querySelector('#score');
const userInputEl = document.querySelector('#initials');
const retryEl = document.querySelector('#retryBtn');
const submitEl = document.querySelector('#submitBtn');
const hiscoresEl = document.querySelector('#scores-card');
const highListEl = document.querySelector('#highscores-list');
const clearEl = document.querySelector('#clear-button');
const resetEl = document.querySelector('#resetBtn');

// declare elements that need to be created then appended to html;
const quizContentEl = document.createElement('article');
quizContentEl.setAttribute('class', 'quiz-content');
const questionEl = document.createElement('h2');
questionEl.setAttribute('class', 'questions');
const ansGroupEl = document.createElement('div');
ansGroupEl.setAttribute('class', 'answer-group');
const ansPrompt = document.createElement('p');
ansPrompt.setAttribute('class', 'answer-prompt');

//declaring global variables;
let score = 0;
let timeLeft = 60;
let index = 0;
let stored = JSON.parse(localStorage.getItem('High Scores')) || [];

// countdown function; to be called on start click
const timerCountdown = () => { 
  let timerInterval = setInterval(function() {
    if (timeLeft > 0) {
    timeLeft--;
    timerEl.textContent = timeLeft + ' seconds remaining';
    } else {
      clearInterval(timerInterval);
      hide(timerEl);
      saveResults();
    }
  }, 1000);
}

//function to render questionEl and related answer buttons;
const renderQuiz = () => { 
  hide(promptEl);
  show(quizContentEl);
  document.querySelectorAll('.answer').forEach(item => item.remove());
  
  if (index < qandAs.length) {
    questionEl.textContent = qandAs[index].quest;
  
    let answers = qandAs[index].ans;
    // console.log(answers);
    for (let a = 0; a < answers.length; a++) {
      let ansBtnEl = document.createElement('button');
      ansBtnEl.setAttribute('class', 'answer');
      ansBtnEl.textContent = answers[a];
      ansBtnEl.addEventListener('click', isCorrect);
      ansGroupEl.appendChild(ansBtnEl);
    }
  }
  if (index > qandAs.length - 1) {
    saveResults();
  }
  quizContentEl.append(questionEl);
  quizContentEl.append(ansGroupEl);
  contentEl.append(quizContentEl);
  quizContentEl.appendChild(ansPrompt);
}

const isCorrect = (event) => {
  const choice = event.target.textContent;
  const rightAns = qandAs[index].correct;
  let isCorrect = true;

  if (choice !== rightAns) {
    !(isCorrect);
    ansPrompt.textContent = 'Incorrect!';
      if (timeLeft > 10) {
        timeLeft -= 10;
        nextQuestion();
      } else  if (timeLeft = 0) {
        clearInterval(timerInterval);
        saveResults();
      }
  } else {
    (isCorrect);
    score += 10;
    ansPrompt.textContent = 'Correct!';
    nextQuestion();
  }

  const removePrompt = setTimeout(function() {
    ansPrompt.remove();
  }, 500);
}

const nextQuestion = () => {  
  if (index <= qandAs.length - 1) {
    renderQuiz(index++);
  }
  if (index === qandAs.length) {
  clearInterval(timerInterval);
  saveResults();
  }
}

const saveResults = () => {
  hide(timerEl);
  hide(quizContentEl);
  hide(hiscoresEl);
  show(quizResEl);

  scoreEl.innerHTML = score + ' out of ' + (qandAs.length * 10) + '.';
  
  submitEl.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    let initials = userInputEl.value;
    let user = {
      name: initials,
      score: score
    };

    if (initials === '') {
      window.alert('Please enter your initials to save');
      return;
    } else {
      stored.push(user);
      initials = '';
      localStorage.setItem('High Scores', JSON.stringify(stored))
      showHighScores();
    }
  });
}

const showHighScores = () => {
  hide(quizResEl);
  hide(promptEl);
  show(hiscoresEl);
  stored = JSON.parse(localStorage.getItem('High Scores'));

  if (stored !== null) {
    stored.forEach(user => {
      let scorerEl = document.createElement('ol');
      scorerEl.setAttribute('class', 'saved-scorer');
      scorerEl.textContent = user.name + '-' + user.score;
      highListEl.appendChild(scorerEl);
    });
  }
}

// assisting functions to hide or show html elements
const hide = (e) => {
  e.setAttribute('style', 'display: none;');
}

const show = (e) => {
  e.setAttribute('style', 'display: block;');
}

// navigational button event listeners
scoresBtnEl.addEventListener('click', function(e) {
  e.stopPropagation();
  e.preventDefault();
  hide(promptEl);
  hide(quizContentEl);
  showHighScores();
});

startBtnEl.addEventListener('click', function(e) {
  e.preventDefault();
  timerCountdown();
  renderQuiz();
});
  
submitEl.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
});

clearEl.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  localStorage.removeItem('High Scores');
  stored = [];
  location.reload();
});

resetEl.addEventListener('click', function (e) {
  e.stopImmediatePropagation();
  e.preventDefault();
  location.reload();  
});

// function to start quiz;
const init = () => {
  hide(quizContentEl);
  hide(quizResEl);
  hide(hiscoresEl);
  show(promptEl);
}

init();