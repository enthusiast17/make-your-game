// drawStats create DOM elements for stats box
export const drawStats = () => {
    const stats = document.createElement('div')
    stats.id = 'stats'
    stats.className = 'box'
    stats.style.display = 'none'
    const header = document.createElement('p')
    header.textContent = 'Game Over'
    stats.appendChild(header)
    const score = document.createElement('p')
    score.id = 'score-stats'
    score.textContent = 'Score: 0'
    score.style.fontSize = '30px'
    stats.appendChild(score)
    const time = document.createElement('p')
    time.id = 'time-stats'
    time.textContent = 'time: 0'
    time.style.fontSize = '30px'
    stats.appendChild(time)
    const exit = document.createElement('button')
    exit.id = 'exit-stats'
    exit.textContent = 'Exit'
    stats.appendChild(exit)
    const statsBackground = document.createElement('div')
    statsBackground.id = 'stats-background'
    statsBackground.className = 'box-background'
    statsBackground.style.display = 'none'  
    document.body.appendChild(stats)
    document.body.appendChild(statsBackground)
}

// setStats adds an event listner for exit from stats box
export const setStats = (game) => {
    const exit = document.getElementById('exit-stats')
    const menu = document.getElementById('menu')
    const menuBackground = document.getElementById('menu-background')
    const stats = document.getElementById('stats')
    const statsBackground = document.getElementById('stats-background')
    exit.addEventListener('click', (event) => {
        game.exit()
        stats.style.display = 'none'
        statsBackground.style.display = 'none'
        menu.style.display = 'block'
        menuBackground.style.display = 'block'
    })
}