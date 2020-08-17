// drawMenu create DOM elements for menu box
export const drawMenu = () => {
    const menu = document.createElement('div')
    menu.id = 'menu'
    menu.className = 'box'
    const header = document.createElement('p')
    header.textContent = 'Tetris'
    menu.appendChild(header)
    const howToPlay = document.createElement('div')
    howToPlay.innerHTML = `<p>How to play?</p>
    <p>Keyboard commands</p>
    <p>← left → right</p>
    <p>↑ rotate ↓ down </p>
    <p>esc - pause</p>
    `
    menu.appendChild(howToPlay)
    const play = document.createElement('button')
    play.id = 'play'
    play.textContent = 'Play'
    menu.appendChild(play)
    const menuBackground = document.createElement('div')
    menuBackground.id = 'menu-background'
    menuBackground.className = 'box-background'
    document.body.appendChild(menu)
    document.body.appendChild(menuBackground)
}

// setMenu adds an event listener for play button from menu box
export const setMenu = (game) => {
    const play = document.getElementById('play')
    play.addEventListener('click', (event) => {
        document.getElementById('menu').style.display = 'none'
        document.getElementById('menu-background').style.display = 'none'
        game.start()
    })
}