import {createContainer} from '../../../lib/easy-dom/core.js'

export const MenuContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'menu-container',
                className: 'menu-container',
            },
            children: [
                {
                    parent: {
                        type: 'h1',
                        textContent: 'Tetris'
                    },
                    children: [],
                },
                {
                    parent: {
                        type: 'div',
                        id: 'how-to-play-container',
                        innerHTML: `
                            <h2>How to play</h2>
                            <p>Keyboard commands</p>
                            <p>← left → right</p>
                            <p>↑ rotate ↓ down </p>
                            <p>esc - pause</p>
                        `,
                    },
                    children: [],
                },
                {
                    parent: {
                        type: 'button',
                        id: 'play',
                        className: 'play-btn',
                        textContent: 'Play',
                    },
                    children: [],
                }
            ]
        }
    )
}