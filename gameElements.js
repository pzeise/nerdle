//A Place for all the back end game checks and comparissons
//script is to set up the game board, word selection, and listen for typing and submissions. 
//visuals is for updating the UI as the game proceeds
//verify is to check submissions against a dictionary API

let letterLog = {}
let correctTiles = []
let possibleTiles = []
let userGuess = []


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
    
    verifyGuess()
}

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
        if (dailyWord.some(x => x === letter.value) && letter.value in letterLog && !correctTiles.some(x => x === letter)) {
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
    let popup = document.querySelector(`#popup`)
    if (guess.toString() === dailyWord.toString()) {
        currentRow.classList.remove(`currentRow`)
        popup.firstElementChild.innerHTML = `Congrats!<br>You Won!`
        popup.classList.remove(`hidden`)
        return true
    } else if (currentRow.id === `attempt6`) {
        popup.firstElementChild.innerHTML = `No Dice the word was ${displayWord} :(<br>Better luck next time!` 
        popup.classList.remove(`hidden`)
        return true
    } else return false
}