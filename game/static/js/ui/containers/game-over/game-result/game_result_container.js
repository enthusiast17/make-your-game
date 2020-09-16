import {createContainer} from '../../../../lib/easy-dom/core.js'

export const GameResultContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'game-result-container',
                className: 'game-result-container',
            },
            children: [
                {
                    parent: {
                        type: 'p',
                        id: 'game-result-score',
                        textContent: 'Score: 0',
                    },
                    children: [],
                },
                {
                    parent: {
                        type: 'p',
                        id: 'game-result-time',
                        textContent: 'Time: 00:00'
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
                                type: 'input',
                                id: 'game-result-name-input',
                                placeholder: 'Enter your name',
                            },
                            children: [],
                        }
                    ],
                },
                {
                    parent: {
                        type: 'button',
                        id: 'game-result-exit-btn',
                        textContent: 'Exit',
                    },
                    children: [],
                }
            ]
        }
    )
}