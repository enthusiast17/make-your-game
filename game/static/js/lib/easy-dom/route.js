import {getContainer} from './core.js'

export const route = (parent, child) => {
    const parentContainer = getContainer(parent)
    const childContainer = getContainer(child)

    const parentChildContainer = parentContainer.childNodes[0]

    if (parentChildContainer === undefined) throw new Error(`The parent '${parent}' doesn't have the child`)

    parentContainer.replaceChild(childContainer, parentChildContainer)
}   