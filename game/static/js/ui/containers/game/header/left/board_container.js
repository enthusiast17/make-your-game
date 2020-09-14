import {createContainer} from '../../../../../lib/easy-dom/core.js'

export const BoardContainer = (rows, columns) => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'board-container',
            className: 'board-container',
        },
        children: [
            ...Array(rows).fill(0).map((_, acc) => {
                return {
                    parent: {
                        type: 'div',
                    },
                    children: [
                        ...Array(columns).fill(0).map((_, index) => {
                            return {
                                parent: {
                                    type: 'div',
                                    className: 'box',
                                },
                                children: [
                                    {
                                        parent: {
                                            type: 'div',
                                            id: `border-${acc}-${index}`,
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
    })
}
