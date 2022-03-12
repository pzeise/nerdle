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
        if (green.some(x => x === tile)) {
            tile.style.background = "darkgreen"
            tile.classList.add("animate")
                for (i = keyBoard.length-1; i >= 0; i--) {
                    if (keyBoard[i].innerText === tile.value) {
                        keyBoard[i].style.background = "darkgreen"
                        //remove from array so I can dont color over it later in case of double letters
                        keyBoardLocked.push(keyBoard[i])
                    }       
                }                    
        } else if (yellow.some(x => x === tile)) {
            tile.style.background = "goldenrod"
            tile.classList.add("animate")
            keyBoard.forEach(key => {
                if (key.innerText === tile.value && !keyBoardLocked.some(x => x.innerText === key.innerText)){
                    key.style.background = "goldenrod"
                }
            })
        } else {
            tile.style.background = "rgb(64, 62, 59)"
            tile.classList.add("animate")
            keyBoard.forEach(key => {
                if (key.innerText === tile.value && !keyBoardLocked.some(x => x.innerText === key.innerText)){
                    key.style.background = "rgb(64, 62, 59)"
                }
            })
        }
    })
    
    
    
    
    
    // green.forEach(tile => {
    //     tile.style.background = "darkgreen"
    //     tile.classList.add("animate")
    //     for (i = keyBoard.length-1; i >= 0; i--) {
    //         if (keyBoard[i].innerText === tile.value) {
    //             keyBoard[i].style.background = "darkgreen"
    //             //remove from array so I can dont color over it later in case of double letters
    //             keyBoardLocked.push(keyBoard[i])
    //         }
    //     }
    // })
    // yellow.forEach(tile => {
    //     tile.style.background = "goldenrod"
    //     tile.classList.add("animate")
    //     keyBoard.forEach(key => {
    //         if (key.innerText === tile.value && !keyBoardLocked.some(x => x.innerText === key.innerText)){
    //             key.style.background = "goldenrod"
    //     }})
    // })
}