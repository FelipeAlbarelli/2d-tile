import { derived, writable } from "svelte/store";

export type Store = {
    totalRows : number,
    totalCols : number,
}

export const store = writable<Store>({
    totalCols: 49,
    totalRows: 22
})

export const totalTiles = derived( store , ({totalCols,totalRows}) => totalCols *  totalRows  )

export const indexToCord = (index : number , store : Store) => {
    const col = index % store.totalCols;
    const row =  Math.floor( index / store.totalCols);

    return {col, row}
}

export const allTiles = derived( store , ({totalCols,totalRows}) => {
    const total = totalCols * totalRows;
    const result = [];
    for (let index = 0; index < total; index++) {
        result.push(indexToCord(index , {totalCols , totalRows}))
    }
    return result
})
