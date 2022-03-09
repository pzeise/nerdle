//Set up the game board and word selection, listen for typing and submissions. 
//gameElements is for backend calcs and comparisons
//visuals is for updating the UI as the game proceeds
//verify is to check submissions against a dictionary API


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

//set current row will be iterated by checkEnter() later
attempts[0].classList.add(`currentRow`)

//step through letters as you type
let allLetters = document.querySelectorAll("input")
allLetters.forEach(input => {
    input.addEventListener("keydown", letter => {
        if (letter.target.value.length === letter.target.maxLength){
            if (letter.target.nextSibling) {
                letter.target.disabled = true
                letter.target.nextSibling.disabled = false
                letter.target.nextSibling.focus()
            } 
        }   
    })
})


//SOLVE DOUBLE DELETE
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
            submit()
        }
    }
}
