import {createContainer} from '../../../../../lib/easy-dom/core.js'
import {PauseContainer} from './pause_container.js'
import {NextTetrominoContainer} from './next_tetromino_container.js'
import {TextTemplateContainer} from './text_template_container.js'

export const RightContainer = () => {
    return createContainer({
        parent: {
            type: 'div',
            id: 'header-right-container',
            className: 'header-right-container',
        },
        children: [
            {
                parent: PauseContainer(),
                children: [],
            },
            {
                parent: NextTetrominoContainer(),
                children: [],
            },
            {
                parent: TextTemplateContainer({
                    id: 'score-container',
                    h3: {
                        textContent: 'Score',
                    },
                    p: {
                        id: 'score',
                        textContent: '0',
                    },
                }),
                children: [],
            },
            {
                parent: TextTemplateContainer({
                    id: 'level-container',
                    h3: {
                        textContent: 'Level',
                    },
                    p: {
                        id: 'level',
                        textContent: '0',
                    },
                }),
                children: [],
            },
            {
                parent: TextTemplateContainer({
                    id: 'lines-container',
                    h3: {
                        textContent: 'Lines',
                    },
                    p: {
                        id: 'lines',
                        textContent: '0',
                    },
                }),
                children: [],
            },
            {
                parent: TextTemplateContainer({
                    id: 'timer-container',
                    h3: {
                        textContent: 'Timer',
                    },
                    p: {
                        id: 'timer',
                        innerHTML: '<label id="minutes">00</label>:<label id="seconds">00</label>',
                    },
                }),
                children: [],
            },
            {
                parent: TextTemplateContainer({
                    id: 'lives-container',
                    h3: {
                        textContent: 'Lives',
                    },
                    p: {
                        id: 'lives',
                        textContent: '3',
                    },
                }),
                children: [],
            }
        ]
    })
}