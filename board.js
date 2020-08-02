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
        state: Array(rowSize).fill(0).reduce((acc, element) => {
            acc.push(Array(colSize).fill(0).reduce((acc, _) => acc.push(0) && acc, []))
            return acc
        }, [])
    }
    
    board.start = () => {
        board.currentRow = 0
        board.currentCol = 3
    }

    board.isFirstRow = () => board.currentRow === 0

    board.down = () => board.currentRow += 1

    board.left = () => board.currentCol = board.currentCol > 0 ? board.currentCol - 1 : 0

    board.right = () => board.currentCol = board.currentCol < colSize - 1 ? board.currentCol + 1 : colSize - 1

    board.addTetro = (tetro) => {
        tetro.forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                if (elementCol === 1) {
                    document.getElementById(`${board.currentRow + indexRow}-${board.currentCol + indexCol}`).style.background = 'red'
                    board.state[board.currentRow + indexRow][board.currentCol + indexCol] = elementCol
                }
            })
        })
    }  

    // TO-DO: FIX IT DO NOT CHECK ONLY LAST ITEMS
    board.checkDownSpace = (tetro) => tetro.slice(-1).every((elementRow, indexRow) => elementRow.every((elementCol, indexCol) => {
        if (elementCol === 0) {
            if (board.currentRow + (tetro.length - 1) + indexRow >= board.state.length) return false
            if (board.state[board.currentRow + (tetro.length - 1) + indexRow][board.currentCol + indexCol] === 1) return false 
        } else {
            if (board.currentRow + tetro.length + indexRow >= board.state.length) return false
            if (board.state[(board.currentRow + tetro.length) + indexRow][board.currentCol + indexCol] === 1) return false
        }
        return true
    }))

    board.removeTetro = (tetro, row = board.currentRow - 1, col = board.currentCol) => {
        tetro.forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                if (elementCol === 1) {
                    document.getElementById(`${row + indexRow}-${col + indexCol}`).style.background = 'black'
                    board.state[row + indexRow][col + indexCol] = 0
                }
            })
        })
    }
    return board
}
