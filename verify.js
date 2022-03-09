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
        if (!response.ok) {
            document.querySelector(`h1`).innerText = `Sorry ${wordGuess} does not appear in our dictionary!`
            invalidWord()
            return
        } else {
            updateColor(correctTiles, possibleTiles, guess)
            if (!checkWin(userGuess)) {
                bumpRow()
            }
        } // maybe this is untested
    })
    .catch(err => {
        console.error(err);
    });
}


function invalidWord () {
    let lastTile = document.querySelector(`.currentRow .letter4`)
    lastTile.disabled = "false"
    lastTile.focus()
}

//things to call from inside color change
    //row bump
    //check win