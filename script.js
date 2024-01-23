const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const word_display = document.querySelector(".word-display");
const guess_text = document.querySelector(".guess-text b");
import { wordList } from "./wordlist.js";
let CheckedWord,
  wrongGuessCount = 0,
  maxWrongGuesscount = 6;
const randomWord = () => {
  const { word, hint } = wordList[Math.trunc(Math.random() * wordList.length)];
  document.querySelector(".hint-text b").innerText = hint;
  CheckedWord = word;
  word_display.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const playGame = (button, clickedWord) => {
  if (CheckedWord.includes(clickedWord)) {
    [...CheckedWord].forEach((letter, index) => {
      if (letter == clickedWord) {
        word_display.querySelectorAll("li")[index].innerText = letter;
        word_display.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
  }
  guess_text.innerText = `${wrongGuessCount}/ ${maxWrongGuesscount}`;
  button.disabled = true;
};
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => {
    playGame(e.target, String.fromCharCode(i));
  });
}
randomWord();
