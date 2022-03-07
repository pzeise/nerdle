// let allLetters = document.querySelectorAll("input")
let attempts = document.querySelectorAll(".attempts")
let turn = 0

let wordChoices = [
    "anime", "dwarf", "furry", 
    "robot", "chest", "sword", 
    "rogue", "nerdy", "comic", 
    "gnome", "cower", "guild",
    "magic", "armor", "stash",
    "score", "prowl", "wreck",
    "leech", "slide", "bravo",
    "super", "mecha", "drake",
    "dwell", "delve", "hound",
    "guide", "ruler", "prime",
    "novel", "witch", "flame",
    "mercy", "torch", "blood",
    "story", "realm", "hoard",
    "pixie", "knoll", "gnoll",
    "amber", "ninja", "shark",
]
let displayWord = pickDailyWord(wordChoices)
let dailyWord = displayWord.split("")
console.log(dailyWord)

function pickDailyWord (options) {
    return options[Math.floor(Math.random() * options.length)]
}

//create play screen
attempts.forEach(attempt => {
    for (let i =0; i < 5; i++) {
        let letter = document.createElement("input")
        letter.type = "text"
        //replaces anything that is not a lower case letter with nothing
        letter.addEventListener(`input`, ev => ev.target.value = ev.target.value.replace(/[^a-z]/, ''))
        letter.maxLength = "1"
        letter.classList.add(`letter${i}`)
        letter.classList.add(`letter`)
        attempt.appendChild(letter)
        letter.disabled = true
    }
})
//enable first letter
let first = document.querySelector("input")
first.disabled = false
first.focus()

//set current row will be iterated by checkEnter() later
attempts[0].classList.add(`currentRow`)

//step through letters as you type
let allLetters = document.querySelectorAll("input")
allLetters.forEach(input => {
    input.addEventListener("keyup", letter => {
        if (letter.target.value.length === letter.target.maxLength){
            if (letter.target.nextSibling) {
                letter.target.disabled = true
                letter.target.nextSibling.disabled = false
                letter.target.nextSibling.focus()
            } 
        }   
    })
})

//listen for delete/backspaces
allLetters.forEach(input => {
    input.addEventListener("keydown", letter => {
        checkBackspace(letter)
        if (letter.target.classList.contains('letter4')) {
            checkEnter(letter)
        }
    })
})


function checkBackspace (ev) {
    if (ev.key === "Backspace" || ev.key === "Delete") {
        if (ev.target.previousSibling.type === "text") {
            //disable current field and push the cursor back, clearing both fields as you do
            ev.target.disabled = true
            ev.target.value = ""
            ev.target.previousSibling.value = ""
            ev.target.previousSibling.disabled = false
            ev.target.previousSibling.focus()
        }
    }
}

function checkEnter(ev) {
    if (ev.key === "Enter") {
        if (ev.target.classList.contains('letter4') && ev.target.value != "") {
            ev.target.disabled = true
            checkAnswer()
        }
    }
}

function checkAnswer () {
    let userGuess = []
    //create a log of letters so we can account for double letters in guess and answers
    let letterLog = dailyWord.reduce((total, word) => {
        if (word in total) {
            total[word]++
        } else {
            total[word] = 1
        }
        return total
    }, {})

    for (let i = 0; i < 5; i++) {
        let currentTile = document.querySelector(`.currentRow .letter${i}`)
        let currentLetter = currentTile.value
        if (dailyWord[i] === currentLetter) {
            currentTile.style.background = "darkgreen"
            letterLog[`${currentLetter}`]--

            //remove letter form log so that we're keep track to not give users wrong info
            if (letterLog[currentLetter] <= 0) {
                delete letterLog[`${currentLetter}`]
            }
        } else if (dailyWord.some(x => x === currentLetter) && currentLetter in letterLog) { 
            currentTile.style.background = "goldenrod"
            letterLog[`${currentLetter}`]--
            
            //remove letter form log so that we're keep track to not give users wrong info
            if (letterLog[currentLetter] <= 0) {
                delete letterLog[`${currentLetter}`]
            }
        } else {
            currentTile.style.background = "rgb(64, 62, 59)"
        }
        userGuess.push(currentLetter)
    }
    
    if (!checkWin(userGuess)) {
        //bumping to the next row and making it the new currentRow
        let currentRow = document.querySelector(`.currentRow`)
        let nextRow = document.querySelector(`.currentRow`).nextElementSibling
        if (nextRow) {
            nextRow.classList.add(`currentRow`)
            nextRow.firstElementChild.disabled = false
            nextRow.firstElementChild.focus()
            currentRow.classList.remove(`currentRow`)
        } 
    }    
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


// verify word on first row
// add in bumping to next row functionality