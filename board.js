export const drawBoard = (rowSize = 20, colSize = 10) => {
    const container = document.createElement('div')
    const board = document.createElement('div')
    Array(rowSize).fill(0).forEach((_, acc) => {
        const boxes = Array(colSize).fill(0).map((element, index) => {
            const box = document.createElement('div')
            box.id = `${acc}-${index}`
            box.style.display = 'inline-block'
            box.style.height = '25px'
            box.style.width = '25px'
            box.style.background = 'black'
            box.style.border = '2px solid gray'
            return box
        })
        const row = document.createElement('div')
        boxes.forEach(element => row.appendChild(element))
        board.appendChild(row)
    })
    container.appendChild(board)
    document.body.appendChild(container)
}

export const setBoard = (rowSize = 20, colSize = 10) => {
    const board = {
        currentRow: 0,
        currentCol: 3,
        state: Array(rowSize).fill(Array(colSize).fill(0))
    }
    board.start = () => {
        board.currentRow = 0
        board.currentCol = 3
    }
    board.isFirstRow = () => board.currentRow === 0
    board.down = (tetro) => board.currentRow += tetro.length
    board.addTetro = (tetro) => {
        board.state = board.state.map((element, indexRow) => {
            if (indexRow >= board.currentRow && indexRow <= board.currentRow + tetro.length - 1) {
                return element.map((element, indexCol) => {
                    if (indexCol >= board.currentCol && indexCol <= board.currentCol + tetro[0].length - 1) {
                        if (tetro[indexRow - board.currentRow][indexCol - board.currentCol] === 1) {
                            document.getElementById(`${indexRow}-${indexCol}`).style.background = 'red'
                            return tetro[indexRow - board.currentRow][indexCol - board.currentCol]
                        }
                        return element
                    }
                    return element
                })
            }
            return element
        })
    }
    // TO-DO: FIX IT
    board.isAvailable = (tetro) => tetro.every((elementRow, indexRow) => {
        if (board.currentRow + indexRow >= board.state.length) return false
        return elementRow.every((elementCol, indexCol) => {
            if (board.currentCol + indexCol >= board.state[0].length) return false
            if (elementCol === 1 && board.state[board.currentRow + indexRow][board.currentCol + indexCol] !== 0) return false
            return true
        })
    })

    // TO-DO: FIX IT
    board.removeTetro = (tetro, row = tetro.length, col) => {
        board.state = board.state.map((element, indexRow) => {
            if (indexRow >= (board.currentRow - (tetro.length)) && indexRow <= board.currentRow + (tetro.length - 1)) {
                return element.map((element, indexCol) => {
                    if (indexCol >= (board.currentCol - (tetro[0].length - 1)) && indexCol <= (board.currentCol + (tetro[0].length - 1))) {
                        document.getElementById(`${indexRow}-${indexCol}`).style.background = 'black'
                        return 0
                    }
                    return element
                })
            }
            return element
        })
    }
    return board
}
