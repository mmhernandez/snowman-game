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

function submitGuess(e) {
    e.preventDefault();
    
    guessedLetter = document.getElementById("letter").value;
    if(guessedLetter != '') {
        for(var i=0; i<word.length; i++) {
            if(guessedLetter == word[i]) {
                document.querySelector(`#letter${i}`).style.display = "contents";
            }
        }
    }
}