//A Place for all the back end game checks and comparissons
//script is to set up the game board, word selection, and listen for typing and submissions. 
//visuals is for updating the UI as the game proceeds
//verify is to check submissions against a dictionary API

let letterLog = {}
let correctTiles = []
let possibleTiles = []
let userGuess = []

function reset () {
    letterLog = {}
    correctTiles = []
    possibleTiles = []
    userGuess = []
}


function submit () {
    //reset all global variables
    reset()

    //create a log of letters so we can account for double letters in guess and answers
    letterLog = dailyWord.reduce((total, word) => {
        if (word in total) {
            total[word]++
        } else {
            total[word] = 1
        }
        return total
    }, {})

    //Call verifyGuess with checkAnswer as a call back function. 
    //call everything else from within there
    
    verifyGuess()
}

//spols
//sootl

function checkAnswer () {

    let guess = document.querySelectorAll(`.currentRow .letter`)
    //check if current letter against corresponding letter of the answer
    for (let i = 0; i < dailyWord.length; i++) {
        let currentLetter = guess[i].value
        if (dailyWord[i] === currentLetter) {
            correctTiles.push(guess[i])
            letterLog[`${currentLetter}`]--
            //remove letter from letterLog so that we're keep track to not give users wrong info
            if (letterLog[currentLetter] <= 0) {
                delete letterLog[`${currentLetter}`]
            }
        } 
        userGuess.push(currentLetter)
    }
    //Check if current letter is in the answer at all
    guess.forEach(letter => {
        if (dailyWord.some(x => x === letter.value) && letter.value in letterLog) {
            possibleTiles.push(letter)
            letterLog[`${letter.value}`]--
            if (letterLog[`${letter.value}`] <= 0){
                delete letterLog[`${letter.value}`]
            }
        }
    })
    return guess
}

function checkWin (guess) {
    let currentRow = document.querySelector(`.currentRow`)
    if (guess.toString() === dailyWord.toString()) {
        currentRow.classList.remove(`currentRow`)
        document.querySelector(`h1`).innerText = `YOU WIN!`
        return true
    } else if (currentRow.id === `attempt6`) {
        document.querySelector(`h1`).innerText = `No Dice the word was ${displayWord} :( Better luck tomorrow!` 
        return true
    } else return false
}