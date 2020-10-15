import {createContainer} from '../../../lib/easy-dom/core.js'
import {GameResultContainer} from './game-result/game_result_container.js'
import {ScoreboardContainer} from './scoreboard/scoreboard_container.js'

export const GameOverContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'game-over-container',
                className: 'game-over-container',
            },
            children: [
                {
                    parent: {
                        type: 'h1',
                        textContent: 'Game Over',
                    },
                    children: [],
                },
                {
                    parent: GameResultContainer(),
                    children: [],
                },
                {
                    parent: ScoreboardContainer(),
                    children: [],
                }
            ]
        }
    )
}