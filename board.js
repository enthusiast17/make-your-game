// drawBoard draws board for tetris
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

// setBoard return a board's object with funcs
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

    board.addTetro = (tetro, color) => {
        tetro.forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                if (elementCol === 1) {
                    document.getElementById(`${board.currentRow + indexRow}-${board.currentCol + indexCol}`).style.background = color
                    board.state[board.currentRow + indexRow][board.currentCol + indexCol] = elementCol
                }
            })
        })
    }  

    board.checkDownSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol) => {
        if (board.currentRow + indexRow + 1 >= board.state.length) return false
        if (elementCol === 1 && indexRow + 1 < arrRow.length && 
            arrRow[indexRow + 1][indexCol] !== 1 &&
            board.state[board.currentRow + indexRow + 1][board.currentCol + indexCol] === 1) return false
        if (indexRow === arrRow.length - 1 && 
            elementCol === 1 && 
            board.state[board.currentRow + indexRow + 1][board.currentCol + indexCol] === 1) return false
        return true
    }))

    board.checkLeftSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol, arrCol) => {
        if (board.currentCol + indexCol - 1 < 0) return false
        if (elementCol === 1 && indexCol - 1 > 0 &&
            arrCol[indexCol] !== 1 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol - 1] === 1) return false
        if (indexCol === 0 &&
            elementCol === 1 && 
            board.state[board.currentRow + indexRow][board.currentCol + indexCol - 1] === 1) return false
        return true
    }))

    board.checkRightSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol, arrCol) => {
        if (board.currentCol + indexCol + 1 >= board.state[0].length) return false
        if (elementCol === 1 && indexCol + 1 < arrCol.length &&
            arrCol[indexCol] !== 1 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol + 1] === 1) return false
        if (indexCol === arrCol.length - 1 &&
            elementCol === 1 && 
            board.state[board.currentRow + indexRow][board.currentCol + indexCol + 1] === 1) return false
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
