export const drawLives = () => {
    const container = document.getElementById('next-time-lives')
    const header = document.createElement('p')
    header.textContent = 'Lives'
    container.appendChild(header)
    
    const lives = document.createElement('p')
    lives.id = 'lives'
    lives.textContent = '3'
    container.appendChild(lives)
}

export const setLives = () => {

}