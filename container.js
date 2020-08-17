export const drawContainer = (id) => {
    if (id === undefined) return
    
    const container = document.createElement('div')
    container.id = id
    document.body.appendChild(container)
}