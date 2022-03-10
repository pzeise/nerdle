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
        nextRow.firstElementChild.classList.add(`currentTile`)
        currentRow.classList.remove(`currentRow`)
        currentRow.lastElementChild.classList.remove(`currentTile`)
    } 
}

function updateColor (green, yellow, tiles) {
    tiles.forEach(tile => {
        tile.style.background = "rgb(64, 62, 59)"
        keyBoard.forEach(key => {
            if (key.innerText === tile.value){
                key.style.background = "rgb(64, 62, 59)"
            }})
    })
    green.forEach(tile => {
        tile.style.background = "darkgreen"
        keyBoard.forEach(key => {
            if (key.innerText === tile.value){
                key.style.background = "darkgreen"
            }})
    })
    yellow.forEach(tile => {
        tile.style.background = "goldenrod"
        keyBoard.forEach(key => {
            if (key.innerText === tile.value){
                key.style.background = "goldenrod"
        }})
    })
}