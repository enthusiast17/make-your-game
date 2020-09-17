import {createContainer} from '../../../../../lib/easy-dom/core.js'

export const TextTemplateContainer = (container) => {
    return createContainer({
        parent: {
            type: 'div',
            id: container.id,
            className: container.id,
        },
        children: [
            {
                parent: {
                    type: 'h3',
                    textContent: container.h3.textContent,
                },
                children: [],
            },
            {
                parent: {
                    type: 'div',
                },
                children: [
                    {
                        parent: {
                            type: 'p',
                            id: container.p.id,
                            innerHTML: container.p.innerHTML === undefined ? container.p.textContent : container.p.innerHTML,
                        },
                        children: [],
                    }
                ]
            }
        ]
    })
}