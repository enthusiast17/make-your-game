// drawLines create DOM elements for lines box
export const drawLines = () => {
    const container = document.getElementById('score-level-lines')
    const header = document.createElement('p')
    header.textContent = 'Lines'
    container.appendChild(header)
    const lines = document.createElement('p')
    lines.id = 'lines'
    lines.textContent = '0'
    container.appendChild(lines)
}

// setLines returns object with number of lines
export const setLines = () => {
    const lines = {number: 0}

    lines.updateLines = (inputLines) => {
        lines.number += inputLines
        document.getElementById('lines').textContent = `${lines.number}`
    }
    
    lines.restart = () => {
        lines.number = 0
        document.getElementById('lines').textContent = `${lines.number}`
    }
    return lines
}