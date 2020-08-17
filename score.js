// drawScore create DOM elements for score box
export const drawScore = () => {
    const container = document.createElement('div')
    container.id = 'score-level-lines'
    const header = document.createElement('p')
    header.textContent = 'Score'
    container.appendChild(header)
    const score = document.createElement('p')
    score.id = 'score'
    score.textContent = '0'
    container.appendChild(score)
    document.body.appendChild(container)
}

// setScore returns an object with number of points
export const setScore = () => {
    const score = {points: 0}
    
    score.updateScore = (inputLines) => {
        switch (inputLines) {
            case 1:
                score.points += 40
                break
            case 2:
                score.points += 100
                break
            case 3:
                score.points += 300
                break
            default:
                score.points = lines >= 4 ? score.points + 1200 : score.points
                break
        }
        document.getElementById('score').textContent = `${score.points}`
    }

    score.restart = () => {
        score.points = 0
        document.getElementById('score').textContent = `${score.points}`
    }

    return score
}