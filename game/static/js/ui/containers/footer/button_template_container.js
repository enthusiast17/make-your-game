import {createContainer} from '../../../lib/easy-dom/core.js'

export const ButtonTemplateContainer = (container) => {
    return createContainer({
        parent: {
            type: 'div',
            id: container.id,
            className: container.id,
        },
        children: [
            {
                parent: {
                    type: 'button',
                    id: container.button.id,
                    innerHTML: `<img src="${container.img.src}">`
                },
                children: []
            }
        ]
    })
}