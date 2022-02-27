let scoresEl = document.querySelector("#scores-card");
let highListEl = document.createElement("ul");
highListEl.setAttribute("class", "highscores-list");

let highscores = {
  initials:[],
  scores:[],
}

function quizResults() {
  hide(timeLabelEl);
  
  let quizResEl = document.createElement("article");
  quizResEl.setAttribute("id", "quiz-results");
  let resHeadEl = document.createElement("h1");
  resHeadEl.textContent = "All done!"
  let finalScoreEl = document.createElement("p");
  finalScoreEl.textContent = "Your final score is " + score + " out of " + (qandAs.length * 10) + ".";
  let scoresPromptEl = document.createElement("p");
  scoresPromptEl.textContent = "Enter your initials below and click submit to be added to the highscores list!";
  let resformEl = document.createElement("form");
  resformEl.setAttribute("id", "quiz-form");
  let userLabelEl = document.createElement("label");
  userLabelEl.textContent = "Enter initials: ";
  let userInputEl = document.createElement("input");
  userInputEl.setAttribute("type", "text");
  let formBtnsEl = document.createElement("div");
  formBtnsEl.setAttribute("id", "res-form-btns");
  let submitEl = document.createElement("button");
  submitEl.setAttribute("id", "submitBtn");
  submitEl.textContent = "Submit";
  let resetEl = document.createElement("button");
  resetEl.setAttribute("id", "resetBtn");
  resetEl.textContent = "Reset Quiz";

  formBtnsEl.appendChild(resetEl);
  formBtnsEl.appendChild(submitEl);
  userLabelEl.appendChild(userInputEl);
  resformEl.appendChild(userLabelEl);
  resformEl.appendChild(formBtnsEl);
  quizResEl.appendChild(resHeadEl);
  quizResEl.appendChild(finalScoreEl);
  quizResEl.appendChild(scoresPromptEl);
  quizResEl.appendChild(resformEl); 
  contentEl.replaceWith(quizResEl);

  submitEl.addEventListener("click", function(e) {
    e.preventDefault();
    if (userInputEl.value === "") {
      return null;
    }
    saveScore(userInputEl.value, score);
    window.location = "highscores.html";
  });

  resetEl.addEventListener("click", function(e) {
    e.preventDefault();
    document.location.reload();
  });
}

function saveScore(newUser, newScore) {  
  highscores.initials.push(newUser);
  highscores.scores.push(newScore);
  let storedScore = JSON.stringify(highscores);
  localStorage.setItem("highscores", storedScore);
}

function renderScores() {
  let storedScores = localStorage.getItem("highscores");

  if (storedScores !== null) {
    let scoresList = JSON.parse(storedScores);
    let scorers = scoresList.initials;
    for (let i = 0; i < scorers.length; i++) {
      let userEl = document.createElement("ol");
      userEl.textContent = scorers[i] + " - " + scoresList.scores[i];
      
      highListEl.appendChild(userEl);
      scoresEl.appendChild(highListEl);
    }
  }
  let clearBtnEl = document.createElement("button");
  clearBtnEl.setAttribute("id", "clearBtn")
  clearBtnEl.textContent = "Clear Scores";

  clearBtnEl.addEventListener("click", function(e) {
    e.stopPropagation();
    localStorage.removeItem("highscores");
  })
}

renderScores();