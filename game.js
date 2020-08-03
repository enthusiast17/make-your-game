export const setGame = (board, tetro) => {
    let timeout
    const start = () => {
        if (board.checkDownSpace(tetro.get())) {
            console.log(board.currentRow + " " + board.currentCol)
            board.down()
            board.removeTetro(tetro.get())
            board.addTetro(tetro.get(), tetro.color)
            timeout = setTimeout(() => window.requestAnimationFrame(start), 1000)
        } else {
            if (board.isFirstRow()) {
                window.cancelAnimationFrame(start)
                console.log(board.state)
                console.log("STOPPED")
            } else {
                board.setCurrentRow(-1)
                board.setCurrentCol(3)
                window.requestAnimationFrame(start)
            }   
        }
    }

    const game = {}

    game.start = () => window.requestAnimationFrame(start)

    game.stop = () => {
        window.cancelAnimationFrame(start)
        clearTimeout(timeout)
    }

    return game
}