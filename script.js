function playGame(element) {
    //remove play button
    element.remove();

    //display the game, after the user indicates they want to play
    wordGame.style.display = "contents";

    //display the remaining guesses section
    document.querySelector(".guessesRemaining").style.display = "contents";

    displayWordToGuess();
}

var word = ['h','o','r','s','e']
var wordToGuess = document.getElementById("word");

function displayWordToGuess() {
    for(var i=0; i<word.length; i++) {
        wordToGuess.innerHTML += `<p class="word-to-guess"><span class="letter" id="letter${i}">${word[i]}</span/</p>`
        document.querySelector(`#letter${i}`).style.display = "none";
    }
}

var guessedLetter;
var incorrectGuesses = 0;
var incorrectlyGuessedLetters = [];

function submitGuess(e) {
    e.preventDefault();
    
    guessedLetter = document.getElementById("letter").value.toLowerCase();
    var check = 0; //check to bypass incorrect guess workflow

    for(var i=0; i<incorrectlyGuessedLetters.length; i++) {
        if(guessedLetter = incorrectlyGuessedLetters[i]) {
            check++;
        }
    }
    if(guessedLetter != '') {
        for(var j=0; j<word.length; j++) {
            if(guessedLetter == word[j]) {
                document.querySelector(`#letter${j}`).style.display = "contents";
                check++;
            }
        }
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
}

function disappearingSnowman(num) {
    // console.log(document.querySelector(`.d${num}`));
    document.querySelector(`.d${num}`).style.visibility = "hidden";
    // document.querySelector(`.d${num}`).opacity = "0";
}