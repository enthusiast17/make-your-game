// setGame returns an object with start and stop game functions
export const setGame = (board, randomizer, score, level, lines, timer) => {
    let timeout
    const start = () => {
        if (board.checkDownSpace(randomizer.current.get())) {
            board.down()
            board.removeTetro(randomizer.current.get())
            board.addTetro(randomizer.current.get(), randomizer.current.color)
            timeout = setTimeout(() => window.requestAnimationFrame(start), level.getSecPerGrid())
        } else {
            if (board.isFirstRow()) {
                timer.stop()
                window.cancelAnimationFrame(start)
                clearTimeout(timeout)
                document.getElementById('stats').style.display = 'block'
                document.getElementById('stats-background').style.display = 'block'
                document.getElementById('score-stats').textContent = `Score: ${score.points}`
                document.getElementById('time-stats').textContent = `Time: ${timer.formatMinSec()}`
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
            randomizer.current.restart()
            randomizer.random()
            board.setCurrentRow(-1)
            board.setCurrentCol(3)
            window.requestAnimationFrame(start)
        }
    }

    const game = {}

    game.start = () =>{
        window.requestAnimationFrame(start)
        timer.start()
    }
    game.stop = () => {
        window.cancelAnimationFrame(start)
        clearTimeout(timeout)
        timer.stop()
    }

    game.exit = () => {
        board.setState(board.restartState())
        randomizer.current.restart()
        randomizer.random()
        board.setCurrentRow(-1)
        board.setCurrentCol(3)
        score.restart()
        level.restart()
        lines.restart()
        timer.restart()
    }
    return game
}