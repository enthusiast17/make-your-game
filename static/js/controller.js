export const setController = (game, board, randomizer) => {
    document.body.addEventListener('keydown', (event) => {
        const tetro = randomizer.current
        selectControl(game, board, tetro, event.code)
    })
}

const selectControl = (game, board, tetro, code) => {
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
        case 'Escape':
            escape(game)
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

const escape = (game) => {
    if (document.getElementById('menu').style.display !== 'none') return
    const pauseMenu = document.getElementById('pause-menu')
    const pauseMenuBackground = document.getElementById('pause-menu-background')
    if (pauseMenu.style.display === 'none') {
        game.stop()
        pauseMenu.style.display = 'block'
        pauseMenuBackground.style.display = 'block'
    } else {
        pauseMenu.style.display = 'none'
        pauseMenuBackground.style.display = 'none'
        game.start()
    }
}