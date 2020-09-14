import {createContainer} from '../../../lib/easy-dom/core.js'
import {HeaderContainer} from './header/header_container.js'
import {FooterContainer} from './footer/footer_container.js'

export const GameContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'game-container',
                className: 'screen-container',
            },
            children: [
                {
                    parent: HeaderContainer(),
                    children: [],
                },
                {
                    parent: FooterContainer(),
                    children: [],
                }
            ]
        }
    )
}