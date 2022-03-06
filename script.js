// let allLetters = document.querySelectorAll("input")
let attempts = document.querySelectorAll(".attempts")
let turn = 0

let wordChoices = [
    "anime", "dwarf", "furry", 
    "robot", "chest", "sword", 
    "rogue", "nerdy", "comic", 
    "gnome", "cower"
]

dailyWord = pickDailyWord(wordChoices).split("")
console.log(dailyWord);

function pickDailyWord (options) {
    return options[Math.floor(Math.random() * options.length)]
}

//create play screen
attempts.forEach(attempt => {
    for (let i =0; i < 5; i++) {
        let letter = document.createElement("input")
        letter.type = "text"
        letter.oninput = "this.value = this.value.replace(/[^a-z]/, '')"
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
            checkAnswer()
        }
    }
}

function checkAnswer () {
    // console.log(`inside checkAnswer`);
    for (let i = 0; i < 5; i++) {
        let currentTile = document.querySelector(`.letter${i}`)
        console.log(currentTile);
        if (dailyWord[i] === currentTile.value) {
            console.log(`we have verified letters match!`);
            currentTile.style.background = "darkgreen";

            //record the correct letter so we can log repeats
        } else if (dailyWord.some(x => x === currentTile.value /* compare against log to catch repeats */)) { 
            console.log(`we have verified letters in word!`);
            currentTile.style.background = "goldenrod";
        }
    }
}


// verify word on first row
// add in bumping to next row functionality