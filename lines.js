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

export const drawLines = () => {
    const container = document.getElementById('score-level-lines')
    const header = document.createElement('p')
    header.style.margin = '0px'
    header.style.textAlign = 'center'
    header.style.fontSize = '28px'
    header.textContent = 'Lines'
    container.appendChild(header)
    const lines = document.createElement('p')
    lines.id = 'lines'
    lines.style.margin = '0px'
    lines.style.textAlign = 'center'
    lines.style.fontSize = '28px'
    lines.textContent = '0'
    container.appendChild(lines)
}