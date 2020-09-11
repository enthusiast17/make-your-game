import {createContainer, getContainer} from '../../../../lib/easy-dom/core.js'

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
                    type: 'img',
                    src: './img/pause.png',
                },
                children: [],
            }
        ]
    })
}