// drawLevel create DOM elements for level box
export const drawLevel = () => {
    const container = document.getElementById('score-level-lines')
    const header = document.createElement('p')
    header.textContent = 'Level'
    container.appendChild(header)
    
    const level = document.createElement('p')
    level.id = 'level'
    level.textContent = '0'
    container.appendChild(level)
}

// setLevel returns an object with number of level and frame
export const setLevel = () => {
    const level = {number : 0, frame: 48}
    
    level.updateLevel = (inputLines) => {
        const calc = ((level.number * 10) + 10)
        if (calc <= inputLines) {
            level.number += 1
            if (level.number <= 7) level.frame -= 5
            else if (level.number === 8) level.frame -= 2
            else {
                if (level.frame !== 1) level.frame -= 1
            }
        }
        
        document.getElementById('level').textContent = `${level.number}`
    }

    level.getSecPerGrid = () => level.frame * 24

    level.restart = () => {
        level.number = 0
        level.frame = 48
        document.getElementById('level').textContent = `${level.number}`
    }
    return level
}
