import {createContainer} from '../../../../lib/easy-dom/core.js'
import {PauseContainer} from './pause_container.js'
import {NextTetrominoContainer} from './next_tetromino_container.js'

export const RightContainer = () => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'main-right-container',
            className: 'main-right-container',
        },
        children: [
            {
                parent: PauseContainer(),
                children: []
            },
            {
                parent: NextTetrominoContainer(),
                children: [],
            }
        ]
    })
}