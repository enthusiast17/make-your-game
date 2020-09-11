import {createContainer} from '../../../lib/easy-dom/core.js'
import {LeftContainer} from './left/left_container.js'
import {RightContainer} from './right/right_container.js'

export const MainContainer = () => {
    return createContainer(
        {
            parent: document.body,
            children: [
                {
                    parent: {
                        type: 'div',
                        id: 'main-container',
                        className: 'main-container',
                    },
                    children: [
                        {
                            parent: LeftContainer(),
                            children: [],
                        },
                        {
                            parent: RightContainer(),
                            children: [],
                        }
                    ]
                }
            ]
    })
}

MainContainer()