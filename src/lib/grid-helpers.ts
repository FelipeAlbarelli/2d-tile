import { derived, writable, type Writable } from 'svelte/store';


export type GridContext = {
    // pointerX : number | null,
    // pointerY : number | null,
    // index  : number | null,
    totalCols : number,
    totalRows : number
}
export type InitialMatrixOptions = 'random' | 'cresc' | 'asce' | 'none';

export const createEmptyMatrix = (n : number , options : 'random' | 'cresc' | 'asce' | 'none' = 'none' ) => {
    const result = [];
    for (let index = 0; index < n; index++) {
        let item : number;
        if (options == 'random') {
            console.log(options)
            item =  Math.floor( Math.random() * 100)         
        } else if (options == 'asce') {
            console.log(options)
            item = n -index;
        } else if (options == 'cresc') {
            console.log(options)
            item = index;
        } else {
            console.log(options)
            item = -1;            
        }
        result.push(item)
    }
    return result
}



export const getTilePositionOnTileSheet = ({index, sheetCols,sheetRows} : {index: number , sheetCols: number ,  sheetRows : number}) => {
    if (index == -1) {
        return {
            col : 0,
            row: 0
        }
    }
    return {
        col : index % sheetCols,
        row: Math.floor( index / sheetRows )
    }
}