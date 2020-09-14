import {createContainer} from '../../../lib/easy-dom/core.js'

export const PauseMenuContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'pause-menu-container',
                className: 'pause-menu-container',
            },
            children: [
                {
                    parent: {
                        type: 'h1',
                        textContent: 'Pause'
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
                                type: 'button',
                                id: 'continue',
                                className: 'continue-btn',
                                textContent: 'Continue',
                            },
                            children: [],
                        },
                    ]
                },
                {
                    parent: {
                        type: 'div'
                    }, 
                    children: [
                        {
                            parent: {
                                type: 'button',
                                id: 'restart',
                                className: 'restart-btn',
                                textContent: 'Restart',
                            },
                            children: [],
                        }
                    ]
                },
                {
                    parent: {
                        type: 'div'
                    }, 
                    children: [
                        {
                            parent: {
                                type: 'button',
                                id: 'exit',
                                className: 'exit-btn',
                                textContent: 'Exit',
                            },
                            children: [],
                        }
                    ]
                }
            ]
        }
    )
}