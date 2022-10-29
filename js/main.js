let letters = "qwertyuiopasdfghjklzxcvbnm";
let lettersArray = Array.from(letters).sort();

let containerLetters = document.querySelector(".letters");

// create elements
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.className = "letter-box";
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);

  containerLetters.appendChild(span);
});

// Object Of Words + Categories
let words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the chosen word
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let guessLetters = document.querySelector(".letters-guess");
// the chosen word to Array
let lettersAndSpace = Array.from(randomValueValue);

// create guess-spans
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "with-space";
  }

  guessLetters.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className == "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });

    // check status-value
    if (theStatus !== true) {
      wrongAttempts += 1;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts == 8) {
        endGame();
        containerLetters.classList.add("finished");
      }
    }
  }
});

// create endGame-fun
function endGame() {
  let div = document.createElement("div");
  div.className = "popup";
  div.innerHTML = `Game Over, The Word Is <span>${randomValueValue}</span> `;
  document.body.appendChild(div);
}
