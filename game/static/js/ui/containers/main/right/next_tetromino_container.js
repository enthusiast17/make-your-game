import {createContainer} from '../../../../lib/easy-dom/core.js'

export const NextTetrominoContainer = () => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'next-tetromino-container',
            className: 'next-tetromino-container',
        },
        children: [
            {
                parent: {
                    type: 'h3',
                    textContent: 'Next',
                },
                children: [],
            },
            {
                parent: {
                    type: 'div',
                },
                children: [
                    ...Array(2).fill(0).map((_, acc) => {
                        return {
                            parent: {
                                type: 'div',
                            },
                            children: [
                                ...Array(4).fill(0).map((_, index) => {
                                    return {
                                        parent: {
                                            type: 'div',
                                            className: 'box',
                                        },
                                        children: [
                                            {
                                                parent: {
                                                    type: 'div',
                                                    id: `next-${acc}-${index}`,
                                                },
                                                children: [],
                                            }
                                        ]
                                    }
                                })
                            ]
                        }
                    })
                ]
            }
        ]
    })
}