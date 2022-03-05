let allLetters = document.querySelectorAll("input")
let attempts = document.querySelectorAll(".attempts")




attempts.forEach(attempt => {
    for (let i =0; i < 5; i++) {
        let letter = document.createElement("input")
        letter.type = "text"
        letter.oninput = "this.value = this.value.replace(/[^a-z]/, '')"
        letter.maxLength = "1"
        attempt.appendChild(letter)
    }
})



//restrict the user to one letter per input field 
//have the user be able to type all five words seemlessly across the fields. 
//verify that only letters are allowed. 