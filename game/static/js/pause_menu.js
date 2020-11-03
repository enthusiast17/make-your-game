// drawPauseMenu create DOM elements for pause menu box
export const drawPauseMenu = () => {
    const pauseMenu = document.createElement('div')
    pauseMenu.id = 'pause-menu'
    pauseMenu.className = 'box'
    pauseMenu.style.display = 'none'

    const header = document.createElement('p')
    header.textContent = 'Pause'
    pauseMenu.appendChild(header)

    const continueBtn = document.createElement('button')
    continueBtn.id = 'continue'
    continueBtn.textContent = 'Continue'
    pauseMenu.appendChild(continueBtn)

    const restartBtn = document.createElement('button')
    restartBtn.id = 'restart'
    restartBtn.textContent = 'Restart'
    pauseMenu.appendChild(restartBtn)

    const exitBtn = document.createElement('button')
    exitBtn.id = 'exit'
    exitBtn.textContent = 'Exit'
    pauseMenu.appendChild(exitBtn)

    const pauseMenuBackground = document.createElement('div')
    pauseMenuBackground.id = 'pause-menu-background'
    pauseMenuBackground.className = 'box-background'
    pauseMenuBackground.style.display = 'none'  
    
    document.body.appendChild(pauseMenu)
    document.body.appendChild(pauseMenuBackground)
}

// setPauseMenu add an event listener for continue and exit from pause menu
export const setPauseMenu = (game) => {
    const pauseMenu = document.getElementById('pause-menu')
    const pauseMenuBackground = document.getElementById('pause-menu-background')
    const continuePlay = document.getElementById('continue')
    const gameboard = document.getElementById('board')
    continuePlay.addEventListener('click', () => {
        pauseMenu.style.display = 'none'
        pauseMenuBackground.style.display = 'none'
        gameboard.style.display = 'block'
        game.start()
    })
    const exit = document.getElementById('exit')
    const menu = document.getElementById('menu')
    const menuBackground = document.getElementById('menu-background')
    exit.addEventListener('click', () => {
        game.restart()
        pauseMenu.style.display = 'none'
        pauseMenuBackground.style.display = 'none'
        menu.style.display = 'block'
        menuBackground.style.display = 'block'
    })
    const restart = document.getElementById('restart')
    restart.addEventListener('click', () => {
        game.restart()
        pauseMenu.style.display = 'none'
        pauseMenuBackground.style.display = 'none'
        gameboard.style.display = 'block'
        game.start()
    })
}