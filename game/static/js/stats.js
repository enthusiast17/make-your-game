// drawStats create DOM elements for stats box
export const drawStats = () => {
    const stats = document.createElement('div')
    stats.id = 'stats'
    stats.className = 'box'
    stats.style.display = 'none'
    const header = document.createElement('p')
    header.textContent = 'Game Over'
    stats.appendChild(header)
    const score = document.createElement('p')
    score.id = 'score-stats'
    score.textContent = 'Score: 0'
    score.style.fontSize = '30px'
    stats.appendChild(score)
    const time = document.createElement('p')
    time.id = 'time-stats'
    time.textContent = 'time: 0'
    time.style.fontSize = '30px'
    stats.appendChild(time)

    /*const form = document.createElement('form')*/

    const record = document.createElement('p')
    record.id = 'enter-user-name'
    record.textContent = 'Enter your name'
    record.style.fontSize = '30px'
    stats.appendChild(record)

    const username = document.createElement('input')
    username.id = 'user-name'
    username.inputMode = 'text'
    username.maxLength = '20'
    username.style.fontSize = '30px'
    stats.appendChild(username)

    const exitBtn = document.createElement('button')
    exitBtn.id = 'exit-stats'
    exitBtn.textContent = 'Exit'
    stats.appendChild(exitBtn)

    /*stats.appendChild(form)*/


    const statsBackground = document.createElement('div')
    statsBackground.id = 'stats-background'
    statsBackground.className = 'box-background'
    statsBackground.style.display = 'none'  
    document.body.appendChild(stats)
    document.body.appendChild(statsBackground)
}

// setStats adds an event listner for exit from stats box
export const setStats = async (game, timer) => {
    const exit = document.getElementById('exit-stats')
    
    exit.addEventListener('click', async (event) => {
        bestResults()
        const points = Number(document.getElementById('score-stats').textContent.replace('Score: ', ''))
        if (document.getElementById('user-name').style.display == 'block') {
            const userName = document.getElementById('user-name').value.toUpperCase()
                        
            // if userName is empty - do nothing
            if (userName === '' || userName.length > 10 || /\s/.test(userName)) {
                alert("Name must be 1 to 10 letters long and can't contain spaces")
                return
            }

            let user = {
                Name: userName,
                Score: points,
                Time: timer.formatMinSec(),
              };

              // add new record to server statistics
            let promise = await fetch('http://'+document.location.hostname+':4000/scoreboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(user)
            }).catch(() => user = null)
            .then(async () => {
                return await takeRecords()
            })
            .then((recs) => {
                drawTable(game, recs, user)
            })
            
        } else {
            takeRecords().then(records => {
                drawTable(game, records)
            })
            .catch(() => null)
        }
    })
}

// drawTable shows best records table after endgame
export const drawTable = (game, records, user) => {
    console.log(records)
    console.log(user)
    if (records === null) {
        console.log('connection lost')
        game.restart()
        document.getElementById('stats').style.display = 'none'
        document.getElementById('stats-background').style.display = 'none'
        document.getElementById('user-name').autofocus = 'false'
        document.getElementById('menu').style.display = 'block'
        document.getElementById('menu-background').style.display = 'block'
        return
    }
    
    if (user) {
        let percent = Math.floor(user.Score * 100 / records[0].Score)
        let position = records.filter((rec) => rec.Score == user.Score && rec.Name == user.Name)[0].Rank
        
        switch(Number(position)%10) {
            case 1 :
                position = String(position) + 'st'
                break
            case 2 :
                position = String(position) + 'nd'
                break
            case 3 :
                position = String(position) + 'nd'
                break
            default:
                position = String(position) + 'th'
        }
                
        let congrats = `Congrats ${user.Name}, you are in the top of ${percent}%, in the ${position} position`
        document.getElementById('rank').textContent = congrats
    
    }
    game.restart()
    document.getElementById('stats').style.display = 'none'
    document.getElementById('stats-background').style.display = 'none'
    document.getElementById('user-name').autofocus = 'false'
    document.getElementById('best-results').style.display = 'block'
    document.getElementById('best-results-background').style.display = 'block'

    fillTopList(records)

    document.getElementById('prev').addEventListener('click', (event) => {
        let str = pageNumber.textContent.split(/\s|\//)
        
        // if first page - do nothing
        if (str[1] == 1) {
            return
        }

        let tb = document.getElementById('table-body')
        tb.parentNode.removeChild(tb)
        fillTopList(records, Number(str[1])-1)
    })

    document.getElementById('next').addEventListener('click', (event) => {
        let str = pageNumber.textContent.split(/\s|\//)
        
        // if last page - do nothing
        if (str[1] == str[2]) {
            return
        }

        let tb = document.getElementById('table-body')
        tb.parentNode.removeChild(tb)
        fillTopList(records, Number(str[1])+1)
    })
}

const fillTopList = (records, n = 1) => {
    let tb = document.getElementById('table-body')
    if (tb) tb.parentNode.removeChild(tb)

    let rankTable = document.getElementById('rankTable')
    let tbody = document.createElement('tbody')
    tbody.id = 'table-body'
    rankTable.appendChild(tbody)

    for (let i = 0 + (n-1)*5; i < n * 5; i++) {
        if (records.length <= i) {
            tbody.appendChild(addEmptyRow())
            continue
        }
        tbody.appendChild(newRow(records[i]))
    }

    document.getElementById('pageNumber').textContent = `Page ${n}/${Math.ceil(records.length / 5)}`
}

const addEmptyRow = () => {
    let shapka = document.createElement('tr')
    shapka.style.height = '27px'
    shapka.className = 'record-row'
    return shapka
}

const newRow = (record) => {
    let shapka = document.createElement('tr')
    shapka.style.height = '27px'
    shapka.className = 'record-row'

            let col0Head = document.createElement('th')
            col0Head.scope = 'col'
            col0Head.textContent = record.Rank
            shapka.appendChild(col0Head)

            let col1Head = document.createElement('th')
            col1Head.scope = 'col'
            col1Head.textContent = record.Name
            shapka.appendChild(col1Head)

            let col2Head = document.createElement('th')
            col2Head.scope = 'col'
            col2Head.textContent = record.Score
            shapka.appendChild(col2Head)

            let col3Head = document.createElement('th')
            col3Head.scope = 'col'
            col3Head.textContent = record.Time
            shapka.appendChild(col3Head)
    return shapka
}

// takeRecords
const takeRecords = async () => {
    let allRecords = await fetch('http://'+document.location.hostname+':4000/scoreboard')
    .then((response) => response.json())
    .then((recs) => recs.sort((a, b) => {
        let result = b.Score - a.Score
        if ((result === 0) && (b.Time > a.Time)) return 1
        return result
    }))
    .then(recs => {
        for (let i in recs) {
            recs[i].Rank = Number(i) + 1
        }
        console.log(recs)
        return recs
    })
    .catch(() => null)
    console.log(allRecords)
    return allRecords
}

// bestResults draws page of best results from scoreboard server
const bestResults = () => {
    const bestResults = document.createElement('div')
    bestResults.id = 'best-results'
    bestResults.className = 'box'
    bestResults.style.display = 'none'

    const header = document.createElement('p')
    header.textContent = 'Top list'
    bestResults.appendChild(header)

    const rank = document.createElement('div')
    rank.id = 'rank'
    rank.style.textAlign = 'center'
    rank.style.paddingBottom = '10px'
    bestResults.appendChild(rank)

    const rankTable = document.createElement('table')
    rankTable.id = 'rankTable'
    rankTable.style.height = '161px'
    bestResults.appendChild(rankTable)

        let shapka = document.createElement('tr')
        shapka.style.height = '24px'

            let col0Head = document.createElement('th')
            col0Head.scope = 'col'
            col0Head.textContent = 'Rank'
            shapka.appendChild(col0Head)

            let col1Head = document.createElement('th')
            col1Head.scope = 'col'
            col1Head.textContent = 'Name'
            shapka.appendChild(col1Head)

            let col2Head = document.createElement('th')
            col2Head.scope = 'col'
            col2Head.textContent = 'Score'
            shapka.appendChild(col2Head)

            let col3Head = document.createElement('th')
            col3Head.scope = 'col'
            col3Head.textContent = 'Time'
            shapka.appendChild(col3Head)

        rankTable.appendChild(shapka)

    const paginator = document.createElement('div')
    paginator.id = 'paginator'
    paginator.style.textAlign = 'center'
    paginator.style.padding = '10px 0px'
    bestResults.appendChild(paginator)

        const previous = document.createElement('a')
        previous.id = 'prev'
        previous.textContent = '<-'
        previous.style.paddingRight = '15px'
        paginator.appendChild(previous)

        const pageNumber = document.createElement('div')
        pageNumber.id = 'pageNumber'
        pageNumber.style.display = 'inline-block'
        pageNumber.textContent = 'Page 0/0'
        paginator.appendChild(pageNumber)

        const next = document.createElement('a')
        next.id = 'next'
        next.style.paddingLeft = '15px'
        next.textContent = '->'
        paginator.appendChild(next)

    const exitBtn = document.createElement('button')
    exitBtn.id = 'exit'
    exitBtn.textContent = 'Exit'
    /*exitBtn.style.padding = '10px 0px'*/
    bestResults.appendChild(exitBtn)

    const bestResultsBackground = document.createElement('div')
    bestResultsBackground.id = 'best-results-background'
    bestResultsBackground.className = 'box-background'
    bestResultsBackground.style.display = 'none'  
    
    document.body.appendChild(bestResults)
    document.body.appendChild(bestResultsBackground)

    exitBtn.addEventListener('click', (event) => {
        document.getElementById('best-results').remove()
        document.getElementById('best-results-background').remove()
        document.getElementById('menu').style.display = 'block'
        document.getElementById('menu-background').style.display = 'block'
    })
}