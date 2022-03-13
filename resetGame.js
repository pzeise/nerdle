document.querySelector("#resetGame").addEventListener("click", () => resetGame())

function resetGame () {
    keyBoard = document.querySelectorAll(".key")
    keyBoardLocked = []
    unusedWordChoices = wordChoices
    displayWord = pickDailyWord(unusedWordChoices)
    dailyWord = displayWord.split("")
    //enable first letter
    let first = document.querySelector("input")
    first.disabled = false
    first.focus()
    first.classList.add(`currentTile`)
    //set current row will be iterated by checkEnter() later
    attempts[0].classList.add(`currentRow`)
    allLetters.forEach(letter => {
        letter.style.background = "grey"
        letter.value = ""
        letter.classList.remove(`animate`)
    })
    keyBoard.forEach(key => key.style.background = "#E0E0E4")
    popup.classList.add(`hidden`)
    console.log(dailyWord)
}

function reset () {
    letterLog = {}
    correctTiles = []
    possibleTiles = []
    userGuess = []
}