function playGame(element) {
    //remove play button
    element.remove();

    //display the game, after the user indicates they want to play
    wordGame.style.display = "contents";

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

function submitGuess(e) {
    e.preventDefault();
    
    guessedLetter = document.getElementById("letter").value;
    if(guessedLetter != '') {
        var check = 0; //check to see if guessed letter is in the word
        for(var i=0; i<word.length; i++) {
            if(guessedLetter == word[i]) {
                document.querySelector(`#letter${i}`).style.display = "contents";
                check++;
            }
        }
        if(check == 0) {
            document.getElementById("guessed-letters").innerHTML += `<p>${guessedLetter}</p>`
            incorrectGuesses++;
            disappearingSnowman(incorrectGuesses);
        }
    }
    //reset textbox for player to guess another letter 
    document.getElementById("letter").value = '';
}

function disappearingSnowman(num) {
    console.log(document.querySelector(`.d${num}`));
    document.querySelector(`.d${num}`).style.visibility = "hidden";
    // document.querySelector(`.d${num}`).opacity = "0";
}