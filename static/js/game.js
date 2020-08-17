// setGame returns an object with start and stop game functions
export const setGame = (board, randomizer, score, level, lines, timer, lives) => {
    let timeout
    const engine = () => {
        if (board.checkDownSpace(randomizer.current.get())) {
            /*
                Checking down space if tetromino can add or not
            */
            board.down()
            board.removeTetro(randomizer.current.get())
            board.addTetro(randomizer.current.get(), randomizer.current.color)
            timeout = setTimeout(() => window.requestAnimationFrame(engine), level.getSecPerGrid())
        } else {
            if (board.isFirstRow()) {
                /*
                    Checking lives if exists or not
                    if lives are exist, then restart game
                    else stop it and show stats menu
                */
                if (lives.isLivesExists()) {
                    board.setState(board.restartState())
                    randomizer.current.restart()
                    randomizer.random()
                    board.setCurrentRow(-1)
                    board.setCurrentCol(3)
                    level.restart()
                    lines.restart()
                    lives.updateLives()
                } else {
                    timer.stop()
                    window.cancelAnimationFrame(engine)
                    clearTimeout(timeout)
                    document.getElementById('stats').style.display = 'block'
                    document.getElementById('stats-background').style.display = 'block'
                    document.getElementById('score-stats').textContent = `Score: ${score.points}`
                    document.getElementById('time-stats').textContent = `Time: ${timer.formatMinSec()}`
                    return
                }
            }
            if (board.checkScoreLines()) {
                /*
                    Checking lines for scoring
                    if true, then get lines and update score
                    else skip it
                */
                const scoreLines = board.getScoreLines()
                Object.entries(scoreLines).forEach(([k, v]) => {
                    if (k !== 'count') {
                        score.updateScore(parseInt(v))
                        lines.updateLines(parseInt(v))
                    }
                })
                level.updateLevel(lines.number)
            }

            /*
                Restarting current tetromino turn and call random fucntion to randomize tetromino
                Restarting current row and col
                After all this function, call engine recursively 
            */
            randomizer.current.restart()
            randomizer.random()
            board.setCurrentRow(-1)
            board.setCurrentCol(3)
            window.requestAnimationFrame(engine)
        }
    }

    const game = {}

    game.start = () =>{
        window.requestAnimationFrame(engine)
        timer.start()
    }
    game.stop = () => {
        window.cancelAnimationFrame(engine)
        clearTimeout(timeout)
        timer.stop()
    }

    game.restart = () => {
        board.setState(board.restartState())
        randomizer.current.restart()
        randomizer.restart()
        board.setCurrentRow(-1)
        board.setCurrentCol(3)
        score.restart()
        level.restart()
        lines.restart()
        timer.restart()
        lives.restart()
    }
    return game
}