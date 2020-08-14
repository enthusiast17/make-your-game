// drawTimer create DOM elements for timer box
export const drawTimer = () => {
    const nextTetromino = document.getElementById('next-tetromino')
    const header = document.createElement('p')
    header.style.margin = '0px'
    header.style.textAlign = 'center'
    header.style.fontSize = '28px'
    header.textContent = 'Time'
    const timer = document.createElement('p')
    timer.style.margin = '0px'
    timer.style.textAlign = 'center'
    timer.style.fontSize = '28px'
    timer.innerHTML = '<label id="minutes">00</label>:<label id="seconds">00</label>'
    nextTetromino.appendChild(header)
    nextTetromino.appendChild(timer)
}

// setTimer returns an object with totalSec, min and sec
export const setTimer = () => {
    const minLabel = document.getElementById('minutes')
    const secLabel = document.getElementById('seconds')
    const timer = {totalSec: 0, min: 0, sec: 0}
    let intervalTimer
    timer.start = () => {
        intervalTimer = setInterval(() => timing(timer, minLabel, secLabel), 1000)
    }
    timer.stop = () => {
        clearInterval(intervalTimer)
    }
    timer.restart = () => {
        timer.totalSec = 0
        timer.min = 0
        timer.sec = 0
        minLabel.textContent = '00'
        secLabel.textContent = '00'
    }
    timer.formatMinSec = () => `${format(timer.min)}:${format(timer.sec)}`
    return timer
}

const timing = (timer, minLabel, secLabel) => {
    timer.totalSec += 1
    timer.sec = parseInt(timer.totalSec % 60)
    timer.min = parseInt(timer.totalSec / 60)
    minLabel.textContent = format(timer.min)
    secLabel.textContent = format(timer.sec)
}

const format = (value) => {
    const result = String(value)
    return result.length < 2 ? '0' + result : result
}