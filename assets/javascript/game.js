var words = ["space shuttle", "booster", "orbital rendezvous", "lunar lander", "all systems nominal", "launch pad", "go at throttle up"];
var acceptedLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var incorrectLetters = [];
var correctLetters = [];

var wins = 0;
var guesses;
var wordIndex = -1;

// goes to next word on list and displays "_" for each letter
function newWord() {

  wordIndex++;

  // If out of words start from beginning of list
  if (wordIndex >= words.length) {
    wordIndex = 0;
  }

  // reset
  incorrectLetters = [];
  correctLetters = [];
  guesses = 8;
  updateLettersGuessed();
  updateGuesses();
  
  document.querySelector("#currentWord").textContent = "Current Word: "

  // create new span element for each letter
  for (var i = 0; i < words[wordIndex].length; i++) {
    newLetter = document.createElement("span");

    if (words[wordIndex].charAt(i) === " ") {
      newLetter.textContent = " ";
    } else {
      newLetter.textContent = "_";
    }
    
    newLetter.setAttribute("letter", words[wordIndex].charAt(i));
    correctLetters.push(newLetter);
    newLetter.setAttribute("class", "letters");
    document.querySelector("#currentWord").append(newLetter);
  }
}

// displays number of wins
function updateWins() {
  document.querySelector("#wins").textContent = "Wins: " + wins;
}

// checks user input
function checkInput(userGuess) {

  var correctGuess = false;

  // check to see if the input letter is in the word
  correctLetters.forEach(function(element) {

    // if the input is in the word display it
    if (userGuess === element.getAttribute("letter")) {
      element.textContent = userGuess;
      correctGuess = true;
    }
  });
  
  // if letter guessed is in the word check to see if the word is completed
  if (correctGuess) {
    var completedWord = true;

    for(var i = 0; i < words[wordIndex].length; i++) {

      if (correctLetters[i].textContent !== words[wordIndex].charAt(i)) {
        completedWord = false;
        break
      }
    }

    if (completedWord) {
      wins++;
      updateWins();
      showPreviousWord();
      newWord(); 
    }

  } else {

    // check to see if the incorrect letter has been guessed before
    var newLetter = true;

    for (var i = 0; i < incorrectLetters.length; i++) {
      if (userGuess === incorrectLetters[i]) {
        newLetter = false;
        break;
      }
    }

    // if it hasn't been guessed before add it to the list and update guess count
    if (newLetter) {
      incorrectLetters.push(userGuess);
      guesses--;
      updateLettersGuessed();
      updateGuesses();
    }
  }


}

// display number of guesses remaining
function updateGuesses() {
  document.querySelector("#guesses").textContent = "Guesses remaining: " + guesses;
}

// display list of letters guessed
function updateLettersGuessed() {
  document.querySelector("#letters-guessed").textContent = "Letters guessed: ";

  for (var i = 0; i < incorrectLetters.length; i++) {
    document.querySelector("#letters-guessed").appendChild(document.createTextNode(incorrectLetters[i].toUpperCase() + " "));
  }
}

// display the previous word
function showPreviousWord() {
  document.getElementById("previous-word").textContent = "Previous word/phrase: " + words[wordIndex];
}

// Initial calls to set display
newWord();
updateWins();
updateGuesses();
updateLettersGuessed();

document.onkeyup = function (event) {

  var input = event.key.toLowerCase();

  // only run if it's a letter key
  if (acceptedLetters.indexOf(input) > -1) {
    checkInput(input);

    // if out of guesses go to new word and display last word
    if (guesses <= 0) {
      showPreviousWord();
      newWord();
    }
  }
};