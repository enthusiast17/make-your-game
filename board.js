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
export const drawBoard = (id, rowSize = 20, colSize = 10, title = '') => {
    if (id === undefined) return
    const container = document.getElementById(id)
    const header = document.createElement('p')
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
        row.id = `${acc}`
        boxes.forEach(element => row.appendChild(element))
        board.appendChild(row)
    })
    container.appendChild(board)
    container.appendChild(border(rowSize))
}

// setBoard return a board's object with funcs
export const setBoard = (rowSize = 20, colSize = 10) => {
    const board = {
        currentRow: -1,
        currentCol: 3,  
        state: Array(rowSize).fill(0).reduce((acc) => {
            acc.push(Array(colSize).fill(0).reduce((acc) => acc.push({value: 0, color: 'black'}) && acc, []))
            return acc
        }, [])
    }

    board.restartState = () => Array(rowSize).fill(0).reduce((acc) => {
        acc.push(Array(colSize).fill(0).reduce((acc) => acc.push({value: 0, color: 'black'}) && acc, []))
        return acc
    }, [])

    board.setState = (newState) => {
        newState.forEach((elementRow, indexRow) => elementRow.forEach((elementCol, indexCol) => {
            const box = document.getElementById(`board-${indexRow}-${indexCol}`)
            box.style.background = elementCol.color
            if (elementCol.color === 'black') box.style.borderStyle = 'none'
            else box.style.borderStyle = 'outset'
        }))
        board.state = newState
    }
    
    board.setCurrentRow = (row) => {
        board.currentRow = row
    }

    board.setCurrentCol = (col) => {
        board.currentCol = col
    }

    board.isFirstRow = () => board.currentRow === -1

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
                    board.state[board.currentRow + indexRow][board.currentCol + indexCol] = {value: elementCol, color: color}
                }
            })
        })
    }  

    board.checkDownSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol) => {
        if (board.currentRow + indexRow + 1 >= board.state.length) return false
        if (elementCol === 1 && indexRow + 1 < arrRow.length && 
            arrRow[indexRow + 1][indexCol] !== 1 &&
            board.state[board.currentRow + indexRow + 1][board.currentCol + indexCol].value === 1) return false
        if (indexRow === arrRow.length - 1 && 
            elementCol === 1 && 
            board.state[board.currentRow + indexRow + 1][board.currentCol + indexCol].value === 1) return false
        return true
    }))

    board.checkLeftSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol, arrCol) => {
        if (board.currentCol + indexCol - 1 < 0) return false
        if (elementCol === 1 && indexCol - 1 >= 0 &&
            arrCol[indexCol - 1] !== 1 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol - 1].value === 1) return false
        if (elementCol === 1 &&
            indexCol === 0 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol - 1].value === 1) return false
        return true
    }))

    board.checkRightSpace = (tetro) => tetro.every((elementRow, indexRow, arrRow) => elementRow.every((elementCol, indexCol, arrCol) => {
        if (board.currentCol + indexCol + 1 >= board.state[0].length) return false
        if (elementCol === 1 && indexCol + 1 < arrCol.length &&
            arrCol[indexCol + 1] !== 1 &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol + 1].value === 1) return false
        if (elementCol === 1 && 
            indexCol + 1 === arrCol.length &&
            board.state[board.currentRow + indexRow][board.currentCol + indexCol + 1].value === 1) return false
        return true
    }))

    board.checkTurnSpace = (nextTetro, tetro) => nextTetro.every((elementRow, indexRow) => elementRow.every((elementCol, indexCol) => {
        if (board.currentRow + indexRow >= board.state.length || 
            board.currentCol + indexCol >= board.state[0].length || 
            board.currentCol + indexCol < 0) return false
        if (elementCol === 1 && 
            board.state[board.currentRow + indexRow][board.currentCol + indexCol].value === 1 && 
            indexRow >= tetro.length && indexCol >= tetro[0].length) return false
        if (elementCol === 1 && 
            board.state[board.currentRow + indexRow][board.currentCol + indexCol].value === 1 &&
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
                    board.state[row + indexRow][col + indexCol] = {value: 0, color: 'black'}
                }
            })
        })
    }

    board.checkScoreLines = () => board.state.some((elementRow) => elementRow.every((elementCol) => elementCol.value === 1))

    board.getScoreLines = () => {
        const lines = {count: 0}

        const add = (index) => {
            lines[index] = (lines[index] || 0) + 1
            lines.count = Object.entries(lines).reduce((acc, [k, v]) => k !== 'count' ? acc + v : acc, 0)
        }
    
        const filtered = board.state.filter((elementRow, indexRow) => {
            if (elementRow.every((element) => element.value === 1)) {
                add(`${indexRow - lines.count}`)
                return false
            }
            return true
        })

        board.setState([...Array(lines.count).fill(0).reduce((acc) => {
            acc.push(Array(colSize).fill(0).reduce((acc) => acc.push({value: 0, color: 'black'}) && acc, []))
            return acc
        }, []), ...filtered])

        return lines
    }
    return board
}