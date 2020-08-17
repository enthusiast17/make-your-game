// drawPauseMenu create DOM elements for pause menu box
export const drawPauseMenu = () => {
    const pauseMenu = document.createElement('div')
    pauseMenu.id = 'pause-menu'
    pauseMenu.className = 'box'
    pauseMenu.style.display = 'none'

    const header = document.createElement('p')
    header.textContent = 'Pause'
    pauseMenu.appendChild(header)

    const continuePlay = document.createElement('button')
    continuePlay.id = 'continue'
    continuePlay.textContent = 'Continue'
    pauseMenu.appendChild(continuePlay)

    const exit = document.createElement('button')
    exit.id = 'exit'
    exit.textContent = 'Exit'
    pauseMenu.appendChild(exit)

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
    continuePlay.addEventListener('click', (event) => {
        pauseMenu.style.display = 'none'
        pauseMenuBackground.style.display = 'none'
        game.start()
    })
    const exit = document.getElementById('exit')
    const menu = document.getElementById('menu')
    const menuBackground = document.getElementById('menu-background')
    exit.addEventListener('click', (event) => {
        game.exit()
        pauseMenu.style.display = 'none'
        pauseMenuBackground.style.display = 'none'
        menu.style.display = 'block'
        menuBackground.style.display = 'block'
    })
}