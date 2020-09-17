import {createContainer} from '../../../../lib/easy-dom/core.js'
import {ButtonTemplateContainer} from './button_template_container.js'

export const FooterContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'footer-container',
                className: 'footer-container',
            },
            children: [
                {
                    parent: ButtonTemplateContainer(
                        {
                            id: 'left-btn-container',
                            button: {
                                id: 'left-btn'
                            },
                            img: {
                                src: './img/left.png',
                            }
                        }
                    ),
                    children: [],
                },
                {
                    parent: ButtonTemplateContainer(
                        {
                            id: 'rotate-btn-container',
                            button: {
                                id: 'rotate-btn'
                            },
                            img: {
                                src: './img/rotate.png',
                            }
                        }
                    ),
                    children: [],
                },
                {
                    parent: ButtonTemplateContainer(
                        {
                            id: 'down-btn-container',
                            button: {
                                id: 'down-btn',
                            },
                            img: {
                                src: './img/down.png',
                            }
                        }
                    ),
                    children: [],
                },
                {
                    parent: ButtonTemplateContainer(
                        {
                            id: 'right-btn-container',
                            button: {
                                id: 'right-btn',
                            },
                            img: {
                                src: './img/right.png',
                            }
                        }
                    ),
                    children: [],
                },
            ]
        }
    )
}