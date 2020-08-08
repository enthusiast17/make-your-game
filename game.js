// setGame returns an object with start and stop game functions
export const setGame = (board, randomizer, score) => {
    let timeout
    const start = () => {
        if (board.checkDownSpace(randomizer.current.get())) {
            board.down()
            board.removeTetro(randomizer.current.get())
            board.addTetro(randomizer.current.get(), randomizer.current.color)
            if (board.checkScoreLines()) {
                const scoreLines = board.getScoreLines()
                Object.entries(scoreLines).forEach(([k, v]) => k !== 'count' ? score.setPoints(v) : score.setPoints(0))
            }
            timeout = setTimeout(() => window.requestAnimationFrame(start), 1000)
        } else {
            if (board.isFirstRow()) {
                window.cancelAnimationFrame(start)
                clearTimeout(timeout)
                return
            }
            randomizer.current.backup()
            randomizer.random()
            board.setCurrentRow(-1)
            board.setCurrentCol(3)
            window.requestAnimationFrame(start)
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