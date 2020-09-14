import {createContainer} from '../../../../../lib/easy-dom/core.js'

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
                    innerHTML: `<img src="./img/pause.png">`
                },
                children: []
            }
        ]
    })
}