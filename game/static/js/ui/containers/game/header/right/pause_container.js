import {createContainer} from '../../../../../lib/easy-dom/core.js'
import {route} from '../../../../../lib/easy-dom/route.js'

export const PauseContainer = () => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'pause-container',
            className: 'pause-container',
        },
        children: [
            {
                parent: {
                    type: 'button',
                    id: 'pause',
                    innerHTML: `<img src="./img/pause.png">`,
                },
                children: [],
            }
        ]
    })
}