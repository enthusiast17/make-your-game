// turns returns 3d array with all possible turns of tetromino
const turns = (tetro) => {
    if (tetro.length === 2 && tetro[0].length === 2) return [tetro, tetro, tetro, tetro]
    const firstTurn = select(tetro)
    const secondTurn = select(firstTurn)
    const thirdTurn = select(secondTurn)
    return [tetro, firstTurn, secondTurn, thirdTurn]
}

// select returns selected proper an ixj array
const select = (tetro) => {
    if (tetro.length === 3 || tetro.length === 2) return tetro.length === 3 ? turn3X2(tetro) : turn2X3(tetro)
    return tetro.length === 4 ? turn4X1(tetro) : turn1x4(tetro)
}

// turn1x4 returns an 4x1 array
const turn1x4 = (tetro) => tetro.reduce((acc, [a, b, c, d]) => acc.push([a], [b], [c], [d]) && acc, [])

// turn4x1 returns an 1x4 array
const turn4X1 = (tetro) => tetro.reduce((acc, element) => acc[0].push(...element) && acc, [[]])

// turn3x2 returns an 2x3 array
const turn3X2 = (tetro) => tetro.reduce((acc, [a, b]) => acc[0].unshift(a) && acc[1].unshift(b) && acc,[[], []])

// turn2x3 returns an 3x2 array
const turn2X3 = (tetro) => tetro.reduce((acc, [a, b, c]) => acc[0].unshift(a) && acc[1].unshift(b) && acc[2].unshift(c) && acc, [[], [], []])

// setTetro returns an object with turn and get functions
const setTetro = (arr, color) => {
    const tetro = {status: 1, color: color, tetroes: turns(arr)}
    tetro.turn = () => tetro.status = tetro.status !== 4 ? tetro.status + 1 : 1
    tetro.get = () => tetro.tetroes[tetro.status - 1]
    tetro.backup = () => {
        tetro.status = 1
    }
    tetro.getNextTurn = () => tetro.tetroes[tetro.status === 4 ? 0 : tetro.status]
    return tetro
}

// possible tetrominoes
const tetroes = [
    {arr: [[1, 1, 1, 1]], color: 'aqua'},
    {arr: [[1, 1], [1, 1]], color: 'yellow'},
    {arr: [[1, 1, 1], [1, 0, 0]], color: 'orange'},
    {arr: [[1, 1, 1], [0, 0, 1]], color: 'blue'},
    {arr: [[0, 1, 1], [1, 1, 0]], color: 'green'},
    {arr: [[1, 1, 0], [0, 1, 1]], color: 'red'},
    {arr: [[1, 1, 1], [0, 1, 0]], color: 'purple'},
]

// allTetroes returns an array of tetromino object
export const allTetroes = () => tetroes.map(({arr, color}) => setTetro(arr, color))