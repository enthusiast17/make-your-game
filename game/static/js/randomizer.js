// setRandomizer returns an object with randomized tetro and next
export const setRandomizer = (tetros) => {
    const randomizer = {
        tetros: tetros,
        current: tetros[random(tetros.length)],
        next: tetros[random(tetros.length)]
    }
    drawNext(randomizer.next)
    randomizer.random = () => {
        clearNext()
        randomizer.current = randomizer.next
        randomizer.next = tetros[random(tetros.length)]
        drawNext(randomizer.next)
    }

    randomizer.restart = () => {
        clearNext()
        randomizer.current = tetros[random(tetros.length)]
        randomizer.next = tetros[random(tetros.length)]
        drawNext(randomizer.next)
    }
    return randomizer
}

// random returns a random number by given length
const random = (max) => Math.floor(Math.random() * Math.floor(max))

// drawNext draws next tetro
const drawNext = (tetro) => tetro.get().forEach((elementRow, indexRow) => elementRow.forEach((elementCol, indexCol) => {
    if (elementCol === 1) {
        const box = document.getElementById(`next-timer-lives-${indexRow}-${indexCol}`)
        box.style.background = tetro.color
        box.style.border = 'outset gray'
    }
}))

// clearNext clears next tetro
const clearNext = () => Array(2).fill(Array(4).fill(0)).forEach((elementRow, indexRow) => elementRow.forEach((elementCol, indexCol) => {
    const box = document.getElementById(`next-timer-lives-${indexRow}-${indexCol}`)
    box.style.background = 'black'
    box.style.borderStyle = 'none'
}))