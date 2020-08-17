// drawLines create DOM elements for lives box
export const drawLives = () => {
    const container = document.getElementById('next-timer-lives')
    const header = document.createElement('p')
    header.textContent = 'Lives'
    container.appendChild(header)

    const lives = document.createElement('p')
    lives.id = 'lives'
    lives.textContent = '3'
    container.appendChild(lives)
}

// setLives returns object with number of lives
export const setLives = () => {
    const lives = {count: 3}

    lives.isLivesExists = () => lives.count !== 1

    lives.updateLives = () => {
        lives.count -= 1
        document.getElementById('lives').textContent = `${lives.count}`
    }

    lives.restart = () => {
        lives.count = 3
        document.getElementById('lives').textContent = `${lives.count}`
    }

    return lives
}