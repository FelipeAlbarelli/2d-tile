import { writable } from "svelte/store"


export type TileSetItem = {
    tilesheetIndexes: number[],
    tags: string[],
    name: string,
    uuid: number,
}

export const tileSetStore = writable<TileSetItem[]>([])

export const addTileSet = (tile: Omit<TileSetItem, 'uuid'>) => {
    tileSetStore.update(prev => {
        const newUUid = Math.max(...prev.map(tile => tile.uuid), 0) + 1;
        return [...prev, { ...tile, uuid: newUUid }]
    })
}

