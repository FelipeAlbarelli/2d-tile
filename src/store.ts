import { derived, writable } from "svelte/store";

export type Store = {
    totalRows : number,
    totalCols : number,
}

export type TileInGrid = TileData & {
    gridPosX : number,
    gridPosY : number,
} 

export type TileData = {
    dimensions: number,
    id : number,
    col : number,
    row: number
}

export const store = writable<Store>({
    totalCols: 49,
    totalRows: 22
})

export const totalTiles = derived( store , ({totalCols,totalRows}) => totalCols *  totalRows  )

export const indexToCord = ( {totalCols,index,totalRows} : {
        index : number , totalCols : number , totalRows: number
    }) => {
    const col = index % totalCols;
    const row =  Math.floor( index / totalCols);

    return {col, row , id: index} as TileData
}

export const allTiles = derived( store , ({totalCols,totalRows}) => {
    const total = totalCols * totalRows;
    const result = [];
    for (let index = 0; index < total; index++) {
        result.push(indexToCord( {index, totalCols , totalRows  }))
    }
    return result
})

export const someTiles = derived( allTiles , $allTiles  => {
    return (page : number , size : number) =>  $allTiles
        .slice(page , page + size)
        .map( (p,i) => ({...p , pagePos : i}) )
})


