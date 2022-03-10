
setupKeys = [
    "q","w","e","r","t","y",
    "u","i","o","p","a","s",
    "d","f","g","h","j","k",
    "l","z","x","c","v","b",
    "n","m"]


let firstRow = document.querySelector("#firstRow")
let secondRow = document.querySelector("#secondRow")
let thirdRow = document.querySelector("#thirdRow")

for (i = 0; i < setupKeys.length; i++) {
    let key = document.createElement("div")
    // letter.addEventListener(`input`, ev => ev.target.value = ev.target.value.replace(/[^a-zA-Z]/, ''))
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