
setupKeys = [
    "q","w","e","r","t","y",
    "u","i","o","p","a","s",
    "d","f","g","h","j","k",
    "l","enter","z","x","c",
    "v","b","n","m", "back"]


let firstRow = document.querySelector("#firstRow")
let secondRow = document.querySelector("#secondRow")
let thirdRow = document.querySelector("#thirdRow")
let keyBoardLocked = []

for (i = 0; i < setupKeys.length; i++) {
    let key = document.createElement("an")
    // key.addEventListener(`touchstart`, ev => keyBoardType(ev))
    key.addEventListener(`click`, ev => keyBoardType(ev))
    key.id = `${setupKeys[i]}`
    key.classList.add(`key`)
    key.innerText = `${setupKeys[i]}`
    if (i < 10) {
        firstRow.appendChild(key)
    } else if (i < 19) {
        secondRow.appendChild(key)
    } else {
        thirdRow.appendChild(key)
    }
}

let keyBoard = document.querySelectorAll(".key")

function keyBoardType (key) {
    key.preventDefault()
    let currentTile = document.querySelector(".currentTile")
    if (key.target.id === "back") {
        checkBackspace(currentTile, "Backspace")
    } else if (key.target.id === "enter") {
        checkEnter(currentTile, "Enter")
    } else {
        currentTile.value = key.target.innerText
        typing(currentTile, key.target.innerText)
    }
    
}