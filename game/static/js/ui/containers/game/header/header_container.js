import {createContainer} from '../../../../lib/easy-dom/core.js'
import {LeftContainer} from './left/left_container.js'
import {RightContainer} from './right/right_container.js'

export const HeaderContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'header-container',
                className: 'header-container',
            },
            children: [
                {
                    parent: LeftContainer(),
                    children: [],
                },
                {
                    parent: RightContainer(),
                    children: [],
                },
            ]
        }
    )
}