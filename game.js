// setGame returns an object with start and stop game functions
export const setGame = (board, randomizer) => {
    let timeout
    const start = () => {
        if (board.checkDownSpace(randomizer.current.get())) {
            board.down()
            board.removeTetro(randomizer.current.get())
            board.addTetro(randomizer.current.get(), randomizer.current.color)
            timeout = setTimeout(() => window.requestAnimationFrame(start), 1000)
        } else {
            if (board.isFirstRow()) {
                window.cancelAnimationFrame(start)
                console.log(board.state)
                console.log("STOPPED")
            } else {
                randomizer.current.backup()
                randomizer.random()
                if (randomizer.current.get().lenght === 3) board.setCurrentRow(-2)
                else board.setCurrentRow(-1)
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