import {createContainer} from '../../../../lib/easy-dom/core.js'
import {BoardContainer} from './board_container.js'

export const LeftContainer = () => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'main-left-container',
            className: 'main-left-container',
        },
        children: [
            {
                parent: BoardContainer(20, 10),
                children: []
            }
        ]
    })
}