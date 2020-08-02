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
            turn(tetro, board)
            break
        default:
            return
    }
}

const left = (board, tetro) => {
    if (!(board.currentCol > 0)) return
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    board.left()
}

const right = (board, tetro) => {
    if (!(board.currentCol + tetro.get()[0].length <= board.state[0].length - 1)) return
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    board.right()
}

const turn = (tetro, board) => {
    board.removeTetro(tetro.get(), board.currentRow, board.currentCol)
    if (tetro.get()[0].length === 2 && !(board.currentCol + tetro.get()[0].length + 1 <= board.state[0].length - 1)) board.left()
    tetro.turn()
}