//This verifies the submission against a dictionary API 
//script is to set up the game board, word selection, and listen for typing and submissions. 
//gameElements is for backend calcs and comparisons
//visuals is for updating the UI as the game proceeds


function verifyGuess () {
    let guess = checkAnswer()
    let wordGuess = userGuess.toString().replace(/,/g, '')
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordGuess}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "91da949df7mshce126bb237596e4p1d2602jsnb825b816aaff"
        }
    })
    .then(response => {
        console.log(response.ok);
        if (wordChoices.some(word => word === wordGuess) || response.ok) {
            updateColor(correctTiles, possibleTiles, guess)
            if (!checkWin(userGuess)) {
                bumpRow()
            }
            return
        } else {
            invalidWord(wordGuess)
            return
        } 
    })
    .catch(err => {
        console.error(err);
    });
}


function invalidWord (badWord) {
    console.log(`in invalidWord`);
    document.querySelector(`h1`).innerText = `Sorry ${badWord} does not appear in our dictionary!`
    let lastTile = document.querySelector(`.currentRow .letter4`)
    console.log(lastTile);
    lastTile.disabled = false
    lastTile.focus()
    console.log(lastTile);
}