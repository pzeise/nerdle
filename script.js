// let allLetters = document.querySelectorAll("input")
let attempts = document.querySelectorAll(".attempts")
let turn = 0

let wordChoices = [
    "anime", "dwarf", "furry", 
    "robot", "chest", "sword", 
    "rogue", "nerdy", "comic", 
    "gnome", "cower"
]
let displayWord = pickDailyWord(wordChoices)
let dailyWord = displayWord.split("")
console.log(dailyWord);

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
        // console.log(`inside length check`);
            if (letter.target.nextSibling) {
                // console.log(`inside focus change`);
                letter.target.disabled = true
                // console.log(letter);
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
            // console.log(`were about to call check enter`);
            checkEnter(letter)
        }
    })
})


function checkBackspace (ev) {
    if (ev.key === "Backspace" || ev.key === "Delete") {
        // console.log(`in the backspace check`);
        if (ev.target.previousSibling.type === "text") {
            // console.log(ev.target.previousSibling);
            // console.log(`found backspace`);
            // console.log(ev);
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
    // console.log(`we're in checkEnter: ${ev}`, ev);
    // console.log(ev.key);
    if (ev.key === "Enter") {
        // console.log(`in the backspace check`);
        if (ev.target.classList.contains('letter4') && ev.target.value != "") {
            // console.log(`we're in the enter check`);
            ev.target.disabled = true
            checkAnswer()
        }
    }
}

function checkAnswer () {
    // console.log(`inside checkAnswer`);
    let userGuess = []
    for (let i = 0; i < 5; i++) {
        let currentTile = document.querySelector(`.currentRow .letter${i}`)
        // console.log(currentTile);
        if (dailyWord[i] === currentTile.value) {
            // console.log(`we have verified letters match!`);
            currentTile.style.background = "darkgreen";
            //record the correct letter so we can log repeats
        } else if (dailyWord.some(x => x === currentTile.value /* compare against log to catch repeats */)) { 
            // console.log(`we have verified letters in word!`);
            currentTile.style.background = "goldenrod";
        } else {
            currentTile.style.background = "rgb(64, 62, 59)";
        }
        userGuess.push(currentTile.value)
    }
    
    if (!checkWin(userGuess)) {
        //bumping to the next row and making it the new currentRow
        let currentRow = document.querySelector(`.currentRow`)
        let nextRow = document.querySelector(`.currentRow`).nextElementSibling
        // console.log(currentRow);
        // console.log(nextRow);
        if (nextRow) {
            // console.log(nextRow.firstElementChild);
            nextRow.classList.add(`currentRow`)
            nextRow.firstElementChild.disabled = false
            nextRow.firstElementChild.focus()
            currentRow.classList.remove(`currentRow`)
        } 
    }    
}

function checkWin (guess) {
    console.log(`inside checkWin`);
    let currentRow = document.querySelector(`.currentRow`)
    console.log(currentRow.classList.contains(`attempt6`));
    if (guess.toString() === dailyWord.toString()) {
        console.log(`They match...`);
        currentRow.classList.remove(`currentRow`)
        console.log(document.querySelector(`h1`));
        document.querySelector(`h1`).innerText = `YOU WIN!`
        return true
    } else if (currentRow.id === `attempt6`) {
        console.log(`ending game`);
        document.querySelector(`h1`).innerText = `No Dice the word was ${displayWord} :( Better luck tomorrow!` 
        return true
    } else return false
}


// verify word on first row
// add in bumping to next row functionality