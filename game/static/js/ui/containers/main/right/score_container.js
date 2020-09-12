import {createContainer} from '../../../../lib/easy-dom/core.js'

export const ScoreContainer = () => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'score-container',
            className: 'score-container',
        },
        children: [
            {
                parent: {
                    type: 'p',
                    textContent: 'Score',
                },
                children: [],
            },
            {
                parent: {
                    type: 'div'
                },
                children: [
                    {
                        parent: {
                            type: 'p',
                            id: 'score',
                            textContent: '0',
                        },
                        children: []
                    }
                ]
            }
        ]
    })
}