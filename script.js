//Set up the game board and word selection, listen for typing and submissions. 
//gameElements is for backend calcs and comparisons
//visuals is for updating the UI as the game proceeds
//verify is to check submissions against a dictionary API


let attempts = document.querySelectorAll(".attempts")

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
//use a dummy array to hold the words and allow a reset to avoid duplicates
let unusedWordChoices = wordChoices

//pick a new word each day
let displayWord = pickDailyWord(unusedWordChoices)
let dailyWord = displayWord.split("")

//cheat
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
        letter.addEventListener(`input`, ev => ev.target.value = ev.target.value.replace(/[^a-zA-Z]/, ''))
        letter.maxLength = "1"
        letter.classList.add(`letter${i}`)
        letter.classList.add(`letter`)
        attempt.appendChild(letter)
        letter.disabled = true
        letter.autocorrect = "off"
        letter.autocapitalize = "none"
    }
})
//enable first letter
let first = document.querySelector("input")
first.disabled = false
first.focus()
first.classList.add(`currentTile`)

//set current row will be iterated by checkEnter() later
attempts[0].classList.add(`currentRow`)

//listen as you type
let allLetters = document.querySelectorAll("input")
allLetters.forEach(input => {
    input.addEventListener("keydown", letter => {
        typing(letter.target, letter.key)
        checkBackspace(letter.target, letter.key) 
        if (letter.target.classList.contains('letter4')) {
            checkEnter(letter.target, letter.key)
        } 
    })
})

//type forward if you fill input
function typing (currentTile, key) {
    if (currentTile.value.length === currentTile.maxLength && currentTile.nextSibling && key != "Backspace" && key != "Delete"){
        currentTile.disabled = true
        currentTile.classList.remove(`currentTile`)
        currentTile.nextSibling.disabled = false
        currentTile.nextSibling.focus()
        currentTile.nextSibling.classList.add(`currentTile`)
    }
}

//backspace smoothly
function checkBackspace (currentTile, key) {
    if ((key === "Backspace" || key === "Delete") && currentTile.value.length === currentTile.maxLength) {
        currentTile.value = ""
    } else if ((key === "Backspace" || key === "Delete") && currentTile.previousSibling.type === "text") {
        //disable current field and push the cursor back, clearing both fields as you do
        currentTile.disabled = true
        currentTile.value = ""
        currentTile.classList.remove(`currentTile`)
        currentTile.previousSibling.value = ""
        currentTile.previousSibling.disabled = false
        currentTile.previousSibling.focus()
        currentTile.previousSibling.classList.add(`currentTile`)
    }
}

//kick off game if you hit enter in the right spot
function checkEnter(currentTile, key) {
    if (key === "Enter") {
        if (currentTile.classList.contains('letter4') && currentTile.value != "") {
            currentTile.disabled = true
            submit()
        }
    }
}
