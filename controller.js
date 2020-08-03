export const setController = (board, tetro) => {
    document.body.addEventListener('keydown', (event) => {
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
        default:
            return
    }
}

const left = (board, tetro) => {
    if (!(board.currentCol > 0)) return
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

const turn = (board, tetro) => {
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    if (tetro.get()[0].length === 2 && !(board.currentCol + tetro.get()[0].length + 1 <= board.state[0].length - 1)) board.left()
    tetro.turn()
    board.addTetro(tetro.get(), tetro.color)
}