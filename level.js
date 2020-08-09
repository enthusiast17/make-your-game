export const setLevel = () => {
    const level = {number : 0, frame: 48}
    
    level.updateLevel = (inputLines) => {
        const calc = (level.number * 10) + 10
        if (calc === inputLines) {
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

    return level
}

export const drawLevel = () => {
    const container = document.getElementById('score-level-lines')
    const header = document.createElement('p')
    header.style.margin = '0px'
    header.style.textAlign = 'center'
    header.style.fontSize = '28px'
    header.textContent = 'Level'
    container.appendChild(header)
    const level = document.createElement('p')
    level.id = 'level'
    level.style.margin = '0px'
    level.style.textAlign = 'center'
    level.style.fontSize = '28px'
    level.textContent = '0'
    container.appendChild(level)
}

