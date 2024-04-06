import { nullCord, type Cord } from "./grid-helpers";


export type TileCoreData = {
    inGrid : Cord,
    tileSheetIndex: number
}


export const nullTileState : TileCoreData = {
    inGrid : nullCord,
    tileSheetIndex: -1
}