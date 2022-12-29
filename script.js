//TO DO
//Add "play again" button (consider checking to see if the word has been played already)
//Figure out why blank/empty guesses are being accepted once
//Make snowman parts disappear slowly



function playGame(element) {
    //remove play button
    element.remove();

    //display the game, after the user indicates they want to play
    wordGame.style.display = "contents";

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

function pickRandomWord() {
    var randomNum = Math.floor(Math.random() * 10);
    wordInPlay = words[randomNum];
    displayWordToGuess(randomNum);
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
}

function disappearingSnowman(num) {
    document.querySelector(`.d${num}`).style.visibility = "hidden";
    // console.log(document.querySelector(`.d${num}`).classList.add("slow-dissolve"));
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