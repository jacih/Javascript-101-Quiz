function quizResults() {
  hide(quizContentEl);
    
  let quizResEl = document.createElement("article");
  quizResEl.setAttribute("id", "quiz-results");
  let resHeadEl = document.createElement("h1");
  resHeadEl.textContent = "All done!"
  let finalScoreEl = document.ecreateElement("p");
  finalScoreEl.textContent = "Your final score is " + score + " out of " + (qandAs.length * 10) + ". /n/n Enter your initials below and click submit to be added to the highscores list!";
  let resformEl = document.createElement("form");
  resformEl.setAttribute("id", "quiz-form");
  let userLabelEl = document.createElement("label");
  userLabelEl.textContent = "Enter initials: ";
  let userInputEl = document.createElement("input");
  userInputEl.setAttribute("type", "text");
  let formBtnsEl = document.createElement("div");
  formBtnsEl.setAttribute("id", "res-form-btns");
  let submitEl = document.createElement("submit-button");
  submitEl.setAttribute("id", "submit");
  submitEl.textContent = "Submit";
  let resetEl = document.createElement("reset-button");
  resetEl.setAttribute("id", "reset");
  resetEl.textContent = "Reset Quiz";

  formBtnsEl.appendChildren(resetEl, submitEl);
  userLabelEl.appendChild(userInputEl);
  resformEl.appendChild(userLabelEl);
  resformEl.appendChild(formBtnsEl);
  quizResEl.appendChild(resHeadEl);
  quizResEl.appendChild(finalScoreEl);
  quizResEl.appendChild(resformEl); 
  contentEl.replaceChild(quizDone, quizContentEl);
  }



// let scoreList = document.querySelector("#highscore-list");

// let highscores = {
//     initials : [],
//     scores : [],
// }

// function getScores() {
//     let storedHighscoresString = localStorage.getItem("highscores");

//     if (storedHighscoresString !== null) {
//         let storedHighscores = JSON.parse(storedHighscoresString);
//         highscores.initials = storedHighscores.initials;
//         highscores.scores = storedHighscores.scores;
//     }
//     else {
//         highscores.initials = [];
//         highscores.scores = [];
//     }
// }

// function renderScores() {
//     scoreList.innerHTML = "";
    
//     getScores();

//     for (let i = 0; i < highscores.initials.length; i++) {
//         let listEl = document.createElement("li");
//         let pEl = document.createElement("p");
//         pEl.setAttribute("class", "highscore");
//         pEl.textContent = (i + 1) + ". " + highscores.initials[i] + " - " + highscores.scores[i];
        
//         listEl.appendChild(pEl);
//         scoreList.appendChild(listEl);
//     }
// }

// function saveScore(newInitials, newScore) {
//     getScores();
    
//     highscores.initials.push(newInitials);
//     highscores.scores.push(newScore);

//     let highscoresString = JSON.stringify(highscores);
//     localStorage.setItem("highscores", highscoresString);
// }

// function clearScores() {
//     localStorage.removeItem("highscores");
//     renderScores();
// }

// if (scoreList !== null) {
//     renderScores();
// }