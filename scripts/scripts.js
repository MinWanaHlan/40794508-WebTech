// Redirect to intro page if game not started properly
if (!sessionStorage.getItem("gameStarted")) {
    window.location.href = "intro.html";
}

const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

const restartBtn = document.getElementById("restart-btn");
const newWordBtn = document.getElementById("newword-btn");
const introBtn = document.getElementById("intro-btn");


// ============================
// SCORE SYSTEM
// ============================
const scoreText = document.querySelector(".score-text b");

let score = sessionStorage.getItem("score")
    ? parseInt(sessionStorage.getItem("score"))
    : 0;

// ============================
// DIFFICULTY SYSTEM
// ============================
const difficulty = sessionStorage.getItem("difficulty") || "easy";

// Display difficulty on screen
const modeElement = document.getElementById("mode-value");

if (modeElement) {
    modeElement.innerText =
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

// ============================
// GAME VARIABLES
// ============================
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// ============================
// RESET GAME
// ============================
const resetGame = () => {

    correctLetters = [];
    wrongGuessCount = 0;

    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");

    gameModal.classList.remove("show");

    scoreText.innerText = score;
};


// ============================
// GET RANDOM WORD BASED ON DIFFICULTY
// ============================
const getRandomWord = () => {

    // filter words by difficulty
    const filteredWords = wordList.filter(obj =>
        obj.difficulty === difficulty
    );

    // pick random word from filtered list
    const randomObj =
        filteredWords[Math.floor(Math.random() * filteredWords.length)];

    currentWord = randomObj.word.toLowerCase();

    console.log("Difficulty:", difficulty);
    console.log("Answer:", currentWord);

    document.querySelector(".hint-text b").innerText = randomObj.hint;

    resetGame();
};

// ============================
// GAME OVER
// ============================
const gameOver = (isVictory) => {

    setTimeout(() => {

        if (isVictory) {
            winSound.currentTime = 0;
            winSound.play();
        } else {
            loseSound.currentTime = 0;
            loseSound.play();
        }

        // Update session score
        sessionStorage.setItem("score", score);
        scoreText.innerText = score;

        const modalText =
            isVictory ? `You found the word:` : `The correct word was:`;

        gameModal.querySelector("img").src =
            `images/${isVictory ? 'victory' : 'lost'}.gif`;

        gameModal.querySelector(".modal-title").innerText =
            isVictory ? 'Congrats!' : 'Game Over!';

        gameModal.querySelector(".result-text").innerHTML =
            `${modalText} <b>${currentWord}</b>`;

        gameModal.querySelector(".final-score b").innerText = score;

        gameModal.classList.add("show");

        

    }, 300);
};


// ============================
// GAME LOGIC
// ============================
const initGame = (button, clickedLetter) => {

    if (currentWord.includes(clickedLetter)) {

        correctSound.currentTime = 0;
        correctSound.play();

        score += 10;

        [...currentWord].forEach((letter, index) => {

            if (letter === clickedLetter) {

                correctLetters.push(letter);

                wordDisplay.querySelectorAll("li")[index].innerText = letter;

                wordDisplay.querySelectorAll("li")[index]
                    .classList.add("guessed");
            }

        });

    } else {

        wrongSound.currentTime = 0;
        wrongSound.play();

        wrongGuessCount++;

        score -= 5;

        hangmanImage.src =
            `images/hangman-${wrongGuessCount}.svg`;
    }

    sessionStorage.setItem("score", score);

    scoreText.innerText = score;

    button.disabled = true;

    guessesText.innerText =
        `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses)
        return gameOver(false);

    if (correctLetters.length === currentWord.length)
        return gameOver(true);
};


// ============================
// CREATE KEYBOARD
// ============================
keyboardDiv.innerHTML = "";

for (let i = 97; i <= 122; i++) {

    const button = document.createElement("button");

    button.innerText = String.fromCharCode(i);

    keyboardDiv.appendChild(button);

    button.addEventListener("click",
        e => initGame(e.target, String.fromCharCode(i))
    );
}


// ============================
// BUTTON EVENTS
// ============================

// start game
getRandomWord();

// play again from modal
playAgainBtn.addEventListener("click", () => {
    gameModal.classList.remove("show");
    getRandomWord();
});



// restart SAME word
restartBtn.addEventListener("click", () => {
    correctLetters = [];
    wrongGuessCount = 0;

    hangmanImage.src = `images/hangman-0.svg`;
    guessesText.innerText = `0 / ${maxGuesses}`;

    keyboardDiv.querySelectorAll("button")
        .forEach(btn => btn.disabled = false);

    wordDisplay.innerHTML =
        currentWord
            .split("")
            .map(() => `<li class="letter"></li>`)
            .join("");
});

// new random word
newWordBtn.addEventListener("click", getRandomWord);

// back to difficulty
introBtn.addEventListener("click", () => {
    sessionStorage.removeItem("gameStarted");
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("difficulty");

    window.location.href = "difficulty.html";
});

