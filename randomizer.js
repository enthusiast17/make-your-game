// setRandomizer returns an object with randomized tetro and next
export const setRandomizer = (tetros) => {
    const randomizer = {
        tetros: tetros,
        current: tetros[random(tetros.length)],
        next: tetros[random(tetros.length)]
    }
    randomizer.random = () => {
        randomizer.current = randomizer.next
        randomizer.next = tetros[random(tetros.length)]
    }
    return randomizer
}

// random returns a random number by given length
const random = (max) => Math.floor(Math.random() * Math.floor(max))