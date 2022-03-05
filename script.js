// let allLetters = document.querySelectorAll("input")
let attempts = document.querySelectorAll(".attempts")
let turn = 0



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
            console.log(`inside length check`);
            if (letter.target.nextSibling) {
                console.log(`inside focus change`);
                letter.target.disabled = true
                console.log(letter);
                letter.target.nextSibling.disabled = false
                letter.target.nextSibling.focus()
            } //else if ( handle backspace here)
        }
    })
}

)



//have the user be able to type all five words seemlessly across the fields. 