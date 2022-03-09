//This verifies the submission against a dictionary API 
//script is to set up the game board, word selection, and listen for typing and submissions. 
//gameElements is for backend calcs and comparisons
//visuals is for updating the UI as the game proceeds


function verifyGuess () {
    //update global array with the answers
    let guess = checkAnswer()
    //convert to a human readable string
    let wordGuess = userGuess.toString().replace(/,/g, '')
    //pass that into a dictionary
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordGuess}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "91da949df7mshce126bb237596e4p1d2602jsnb825b816aaff"
        }
    })
    //wait for dictionary to kick off turn end. 
    .then(response => {
        turnEnd(response, guess, wordGuess)
    })
    .catch(err => {
        console.error(err);
    });
}


function invalidWord (badWord) {
    document.querySelector(`h1`).innerText = `Sorry ${badWord} does not appear in our dictionary!`
    let lastTile = document.querySelector(`.currentRow .letter4`)
    lastTile.disabled = false
    lastTile.focus()
}

function turnEnd (res, checkString, printString) {
    if (wordChoices.some(word => word === printString) || res.ok) {
        updateColor(correctTiles, possibleTiles, checkString)
        if (!checkWin(userGuess)) {
            bumpRow()
        }
        return
    } else {
        invalidWord(printString)
        return
    } 
}