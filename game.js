// setGame returns an object with start and stop game functions
export const setGame = (board, randomizer, score, level, lines) => {
    let timeout
    const start = () => {
        if (board.checkDownSpace(randomizer.current.get())) {
            board.down()
            board.removeTetro(randomizer.current.get())
            board.addTetro(randomizer.current.get(), randomizer.current.color)
            timeout = setTimeout(() => window.requestAnimationFrame(start), level.getSecPerGrid())
        } else {
            if (board.isFirstRow()) {
                console.log("GAME OVER")
                console.log(board.state)
                window.cancelAnimationFrame(start)
                clearTimeout(timeout)
                return
            }
            if (board.checkScoreLines()) {
                const scoreLines = board.getScoreLines()
                Object.entries(scoreLines).forEach(([k, v]) => {
                    if (k !== 'count') {
                        score.updateScore(parseInt(v))
                        lines.updateLines(parseInt(v))
                    }
                })
                level.updateLevel(lines.number)
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