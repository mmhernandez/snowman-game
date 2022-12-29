//TO DO
//Add "play again" button (consider checking to see if the word has been played already)
//Need to account for guesses with multiple characters (limit to single character guesses)
//Figure out why blank/empty guesses are being accepted once
//Make snowman parts disappear slowly



function playGame(element) {
    //check if player is playing again
    if(incorrectGuesses > 0) {
        //if player is playing again, reset created HTML elements
        const previousWordToClearList = document.getElementById("word");
        while (previousWordToClearList.hasChildNodes()) {
            previousWordToClearList.removeChild(previousWordToClearList.firstChild);
        }
        const previousGuessedLettersToClearList = document.getElementById("guessed-letters");
        while (previousGuessedLettersToClearList.hasChildNodes()) {
            previousGuessedLettersToClearList.removeChild(previousGuessedLettersToClearList.firstChild);
        }

        //if player is playing again, reset game variables/fields
        incorrectGuesses = 0;
        remainingGuesses.innerText = 10;
        wordGame.style.display = "none";
        document.querySelector(".guessesRemaining").style.display = "none";
        playBtn.style.display = "block";
        document.getElementById("gameOver").innerText = '';
        gameOverMessage.innerText = '';
        document.getElementById("hint").style.visibility = "hidden";

        //if player is playing again, reset arrays
        for(let i=wordInPlay.length-1; i>=0; i--) {
            wordInPlay.pop();
        }
        for (let j=incorrectlyGuessedLetters.length-1; j>=0; j--) {
            incorrectlyGuessedLetters.pop();
        }

        //if player is playing again, redraw the snowman
        for(let k=1; k<=10; k++) {
            document.querySelector(`.d${k}`).style.visibility = "visible";
            document.querySelector(`.d${k}`).classList.remove("slow-dissolve");
        }
    }


    //remove play button
    element.style.display = "none";

    //display the game
    wordGame.style.display = "contents";
    document.getElementById("letter").style.visibility = "visible";
    document.getElementById("guessButton").style.visibility = "visible";

    //display the remaining guesses section
    document.querySelector(".guessesRemaining").style.display = "contents";

    pickRandomWord();
}

var words = [
    ['h','o','r','s','e'],
    ['t','a','b','l','e'],
    ['p','a','l','a','c','e'],
    ['o','r','a','n','g','e'],
    ['p','l','a','n','e','t'],
    ['c','h','a','m','e','l','e','o','n'],
    ['i','r','a','t','e'],
    ['a','d','v','e','n','t','u','r','e'],
    ['p','i','c','t','u','r','e'],
    ['w','a','t','c','h'],
    ];
const hint = {
    horse: "This animal wears shoes",
    table: "This household object has 4 legs",
    palace: "The king and queen live in this type of residence",
    orange: "A fruit and a color",
    planet: "MVEMJSUN(p?)",
    chameleon: "Lizard with impressive capabilities",
    irate: "Very very angry",
    adventure: "An exciting experience or activity",
    picture: "This thing is often placed in homes",
    watch: "A piece of functional jewelry",
};

var wordInPlay = [];
var playedWords = [];
var randomNum;

function pickRandomWord() {
    randomNum = Math.floor(Math.random() * 10);
    for(let i=0; i<playedWords.length; i++) {
        if(playedWords[i] == randomNum) {
            randomNum = Math.floor(Math.random() * 10);
        }
    }
    wordInPlay = words[randomNum];
    playedWords.push(words[randomNum]);
    displayWordToGuess();
}

function displayWordToGuess() {
    for(var i=0; i<wordInPlay.length; i++) {
        document.getElementById("word").innerHTML += `<p class="word-to-guess"><span class="letter" id="letter${i}">${wordInPlay[i]}</span/</p>`
        document.querySelector(`#letter${i}`).style.display = "none";
    }
}

var guessedLetter;
var incorrectGuesses = 0;
var incorrectlyGuessedLetters = [];

function submitGuess(e) {
    e.preventDefault(); //don't adjust the URL upon submitting a guess
    
    guessedLetter = document.getElementById("letter").value.toLowerCase();
    var check = 0; //check to bypass incorrect guess workflow

    //check if the guessed letter has already been guessed
    for(var i=0; i<incorrectlyGuessedLetters.length; i++) {
        if(guessedLetter == incorrectlyGuessedLetters[i]) {
            check++;
        }
    }

    //confirm the guess is not empty/blank upon submitting
    if(guessedLetter != ' ' || guessedLetter != '') {
        for(var j=0; j<wordInPlay.length; j++) {
            //check if the guessed letter is in the word
            if(guessedLetter == wordInPlay[j]) {
                document.querySelector(`#letter${j}`).style.display = "contents";
                check++;
            }
        }
        //if guessed letter isn't in the word and hasn't already been guessed, proceed
        if(check == 0) {
            document.getElementById("guessed-letters").innerHTML += `<p>${guessedLetter}</p>`
            incorrectlyGuessedLetters.push(guessedLetter);
            remainingGuesses.innerText --;
            incorrectGuesses++;
            disappearingSnowman(incorrectGuesses);
        }
    }

    //reset textbox for player to guess another letter 
    document.getElementById("letter").value = '';
    
    //determine if the hint icon should be displayed
    if(incorrectGuesses == 6) {
        document.getElementById("hint").style.visibility = "visible";
    }

    //determine how to proceed if the game is over
    if(remainingGuesses.innerText == 0) {
        gameOver();
    }
}

function disappearingSnowman(num) {
    document.querySelector(`.d${num}`).style.visibility = "hidden";
    document.querySelector(`.d${num}`).classList.add("slow-dissolve");
}

let hintKey = '';

function displayHint() {
    for(let i=0; i<wordInPlay.length; i++) {
        hintKey += wordInPlay[i];
    }
    document.querySelector(".hint-text").style.visibility = "visible";
    document.querySelector(".hint-text").innerText = `Hint: ${hint[hintKey]}`;
}

function hideHint() {
    document.querySelector(".hint-text").style.visibility = "hidden";
    hintKey = '';
}

function gameOver() {
    //hide guess field/button so no further guesses can be made
    document.getElementById("letter").style.visibility = "hidden";
    document.getElementById("guessButton").style.visibility = "hidden";

    //display game over messages
    document.getElementById("gameOverMessage").innerText = "You did not guess the word before the snowman disappeared. \n\nBetter luck next time!";
    document.getElementById("gameOver").innerText = "Game over"

    playBtn.style.display = "block";
    playBtn.innerText = "Play Again";
}