const border = (size) => {
    const boxes = Array(size).fill(0).map(() => {
        const box = document.createElement('div')
        box.style.height = '25px'
        box.style.width = '25px'
        box.style.background = 'gray'
        box.style.border = '2px outset'
        return box
    })
    const border = document.createElement('div')
    border.style.display = 'inline-block'
    boxes.forEach(element => border.appendChild(element))
    return border
}

// drawBoard draws board for tetris
export const drawBoard = (id = 'board', rowSize = 20, colSize = 10, title = '') => {
    const container = document.createElement('div')
    container.id = id
    const header = document.createElement('p')
    header.style.margin = '0px'
    header.style.textAlign = 'center'
    header.style.fontSize = '28px'
    header.textContent = title
    container.appendChild(header)
    container.appendChild(border(rowSize))
    const board = document.createElement('div')
    board.style.display = 'inline-block'
    Array(rowSize).fill(0).forEach((_, acc) => {
        const boxes = Array(colSize).fill(0).map((element, index) => {
            const box = document.createElement('div')
            const innerBox = document.createElement('div')
            innerBox.id = `${id}-${acc}-${index}`
            innerBox.style.height = '20px'
            innerBox.style.width = '20px'
            box.style.display = 'inline-block'
            box.style.height = '25px'
            box.style.width = '25px'
            box.style.background = 'black'
            box.style.border = '2px solid gray' // Consider about this
            box.appendChild(innerBox)
            return box
        })
        const row = document.createElement('div')
        boxes.forEach(element => row.appendChild(element))
        board.appendChild(row)
    })
    container.appendChild(board)
    container.appendChild(border(rowSize))
    document.body.appendChild(container)
}

// setBoard return a board's object with funcs
export const setBoard = (rowSize = 20, colSize = 10) => {
    const board = {
        currentRow: -1,
        currentCol: 3,  
        state: Array(rowSize).fill(0).reduce((acc, element) => {
            acc.push(Array(colSize).fill(0).reduce((acc, _) => acc.push(0) && acc, []))
            return acc
        }, [])
    }
    
    board.setCurrentRow = (row) => {
        board.currentRow = row
    }

    board.setCurrentCol = (col) => {
        board.currentCol = col
    }

    board.isFirstRow = () => board.currentRow === 0

    board.down = () => board.currentRow += 1

    board.left = () => board.currentCol = board.currentCol > 0 ? board.currentCol - 1 : 0

    board.right = () => board.currentCol = board.currentCol < colSize - 1 ? board.currentCol + 1 : colSize - 1

    board.addTetro = (tetro, color) => {
        tetro.forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                if (elementCol === 1 && board.currentRow + indexRow >= 0) {
                    const box = document.getElementById(`board-${board.currentRow + indexRow}-${board.currentCol + indexCol}`)
                    box.style.background = color
                    box.style.borderStyle = 'outset'
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
            arrCol[indexCol - 1] !== 1 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol - 1] === 1) return false
        if (elementCol === 1 &&
            indexCol === 0 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol - 1] === 1) return false
        return true
    }))

    board.checkRightSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol, arrCol) => {
        if (board.currentCol + indexCol + 1 >= board.state[0].length) return false
        if (elementCol === 1 && indexCol + 1 < arrCol.length &&
            arrCol[indexCol + 1] !== 1 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol + 1] === 1) return false
        if (elementCol === 1 && 
            indexCol + 1 === arrCol.length &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol + 1] === 1) return false
        return true
    }))

    board.checkTurnSpace = (nextTetro, tetro) => nextTetro.every((elementRow, indexRow) => elementRow.every((elementCol, indexCol) => {
        if (board.currentRow + indexRow >= board.state.length || 
            board.currentCol + indexCol >= board.state[0].length || 
            board.currentCol + indexCol < 0) return false
        if (elementCol === 1 && 
            board.state[board.currentRow + indexRow][board.currentCol + indexCol] === 1 && 
            indexRow >= tetro.length && indexCol >= tetro[0].length) return false
        if (elementCol === 1 && 
            board.state[board.currentRow + indexRow][board.currentCol + indexCol] === 1 &&
            tetro[indexRow][indexCol] !== 1) return false
        return true
    }))

    board.removeTetro = (tetro, row = board.currentRow - 1, col = board.currentCol) => {
        tetro.forEach((elementRow, indexRow) => {
            elementRow.forEach((elementCol, indexCol) => {
                if (elementCol === 1 && row + indexRow >= 0) {
                    const box = document.getElementById(`board-${row + indexRow}-${col + indexCol}`)
                    box.style.background = 'black'
                    box.style.borderStyle = 'none'
                    board.state[row + indexRow][col + indexCol] = 0
                }
            })
        })
    }
    return board
}
