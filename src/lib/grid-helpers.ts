import { derived, writable, type Writable } from 'svelte/store';

export type Cord = {
    col : number, 
    row : number,
    index: number,
};

export const nullCord : Cord = {
    col: -1, index : -1,row: -1
} 

export type GridContext = {
    index : number
}
export type InitialMatrixOptions = 'random' | 'cresc' | 'asce' | 'none';

export const createEmptyMatrix = (n : number , options : 'random' | 'cresc' | 'asce' | 'none' = 'none' ) => {
    const result = [];
    for (let index = 0; index < n; index++) {
        let tileSetIndex: number;
        if (options == 'random') {
            console.log(options)
            tileSetIndex = Math.floor(Math.random() * 100)         
        } else if (options == 'asce') {
            console.log(options)
            tileSetIndex = n - index;
        } else if (options == 'cresc') {
            console.log(options)
            tileSetIndex = index;
        } else {
            console.log(options)
            tileSetIndex = -1;            
        }
        result.push({
            tileSetIndex,
            selected: false
        })
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
        row: Math.floor(index / sheetCols)
    }
}