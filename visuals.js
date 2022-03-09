//A Place for updating the UI as the game proceeds
//script is to set up the game board, word selection, and listen for typing and submissions. 
//gameElements is for backend calcs and comparisons
//verify is to check submissions against a dictionary API

function bumpRow () {
    let currentRow = document.querySelector(`.currentRow`)
    let nextRow = document.querySelector(`.currentRow`).nextElementSibling
    if (nextRow) {
        nextRow.classList.add(`currentRow`)
        nextRow.firstElementChild.disabled = false
        nextRow.firstElementChild.focus()
        currentRow.classList.remove(`currentRow`)
    } 
}

function updateColor (green, yellow, tiles) {
    tiles.forEach(ev => ev.style.background = "rgb(64, 62, 59)")
    green.forEach(ev => ev.style.background = "darkgreen")
    yellow.forEach(ev => ev.style.background = "goldenrod")
}