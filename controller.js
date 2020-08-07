export const setController = (board, randomizer) => {
    document.body.addEventListener('keydown', (event) => {
        const tetro = randomizer.current
        selectControl(board, tetro, event.code)
    })
}

const selectControl = (board, tetro, code) => {
    switch (code) {
        case 'ArrowLeft':
            left(board, tetro)
            break
        case 'ArrowRight':
            right(board, tetro)
            break
        case 'ArrowUp':
            turn(board, tetro)
            break
        case 'ArrowDown':
            down(board, tetro)
            break
        default:
            return
    }
}

const left = (board, tetro) => {
    if (!board.checkLeftSpace(tetro.get())) return
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    board.left()
    board.addTetro(tetro.get(), tetro.color)
}

const right = (board, tetro) => {
    if (!board.checkRightSpace(tetro.get())) return
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    board.right()
    board.addTetro(tetro.get(), tetro.color)
}

const down = (board, tetro) => {
    if (!board.checkDownSpace(tetro.get())) return
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    board.down()
    board.addTetro(tetro.get(), tetro.color)
}

const turn = (board, tetro) => {
    if (!board.checkTurnSpace(tetro.getNextTurn(), tetro.get())) return
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    tetro.turn()
    board.addTetro(tetro.get(), tetro.color)
}