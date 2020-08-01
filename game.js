export const initGame = (board, tetro) => {
    const game = {
        start: () => {
            if (!board.isFirstRow()) board.removeTetro(tetro.get())
                if (board.isAvailable(tetro.get())) {
                    board.addTetro(tetro.get())
                    setTimeout(() => window.requestAnimationFrame(game.start), 10000)
                } else {
                    if (board.isFirstRow()) {
                        window.cancelAnimationFrame(game.start)
                        console.log(board.state)
                        console.log("STOPPED")
                    } else {
                        board.start()
                        if (tetr === tetroes.length - 1) tetr = 0
                        else tetr += 1
                        board.currentCol += 1
                        window.requestAnimationFrame(game.start)
                    }   
                }
            window.requestAnimationFrame(game.start)
        },
        stop: () => window.cancelAnimationFrame(game.start)
    }
    return game
}