import {createContainer} from '../../lib/easy-dom/core.js'
import {MainContainer} from './main/main_container.js'
import {FooterContainer} from './footer/footer_container.js'
import {MenuContainer} from './menu/menu_container.js'


export const ScreenContainer = () => {
    return createContainer(
        {
            parent: document.body,
            children: [
                {
                    parent: {
                        type: 'div',
                        id: 'screen-container',
                        className: 'screen-container',
                    },
                    children: [
                        // {
                        //     parent: MenuContainer(),
                        //     children: [],
                        // },
                        {
                            parent: MainContainer(),
                            children: [],
                        },
                        {
                            parent: FooterContainer(),
                            children: [],
                        }
                    ]
                }
            ]
        }
    )
}

ScreenContainer()