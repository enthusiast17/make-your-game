export const drawLives = () => {
    const nextTimeLives = document.getElementById('next-time-lives')
    const header = document.createElement('p')
    header.textContent = 'Lives'
    const lives = document.createElement('p')
    lives.id = 'lives'
    lives.textContent = '3'
    nextTimeLives.appendChild(header)
    nextTimeLives.appendChild(lives)
}

export const setLives = () => {

}