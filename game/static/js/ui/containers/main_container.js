import {createContainer} from '../../lib/easy-dom/core.js'
import {GameContainer} from './game/game_container.js'
import {MenuContainer} from './menu/menu_container.js'
import {PauseMenuContainer} from './pause-menu/pause-menu-container.js'
import {GameOverContainer} from './game-over/game_over_container.js'

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
                        // {
                        //     parent: PauseMenuContainer(),
                        //     children: [],
                        // },
                        // {
                        //     parent: MenuContainer(),
                        //     children: [],
                        // },
                        // {
                        //     parent: GameContainer(),
                        //     children: [],
                        // },
                        {
                            parent: GameOverContainer(),
                            children: [],
                        },
                    ]
                }
            ]
        }
    )
}

MainContainer()