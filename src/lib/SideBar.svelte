<script lang="ts">
    import { someTiles, type TileData, type TileInGrid  } from '../store'
    import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { derived, writable, type Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import GridSystem from './GridSystem.svelte';
    import { createEmptyMatrix } from './grid-helpers';
    
    export let scale : number

    export let gap : number
    export let padding = 12;
    export let tilesToDisplay = 10;
    export let tileSetDim = 16;

    const tileSheet = {
        totalCols: 49,
        totalRows: 22
    }

    const matrix = createEmptyMatrix( tileSheet.totalCols * tileSheet.totalRows , 'cresc' )

    $: matrixToShow = matrix.slice( page * tilesToDisplay , (page + 1) * tilesToDisplay  )

    const controlerContext = getContext<
      Writable<{
      scale: number, gap: number, selectedTile : TileInGrid | null
    }>
    >('controler');

    controlerContext.subscribe( s => {
    })

    const selectedTile = writable<TileInGrid  | null>(null)
    const rectParams = derived(selectedTile , (sel) => {
        if (sel == null) {
            return {
                y : -100,
            }
        }
        return {
            y : (sel.dimensions + gap) * sel.gridPosY,
            x : (sel.dimensions + gap) * sel.gridPosX,
        }
    })
    
    $: $controlerContext.selectedTile = $selectedTile
  
    let sideStage : LayerType
  

    let page = 0;

    $: matrixSliceToShow = matrix.slice(  )


    let selectedTileIndex : number = 1;
    
    $: sideTiles =  $someTiles( page * tilesToDisplay ,tilesToDisplay);

    
    const changePagination = (change: number) => {
      page = Math.max(0  , page + change);
      $controlerContext.selectedTile = null;
    }




    const keyUp = (e: KeyboardEvent) => {
      $selectedTile = null;
    } 
  
  </script>

<svelte:body on:keyup={keyUp}  />
<div class="side-bar">
    <div class="side-nav">
      <button on:click={ () => changePagination(-1) }>  👈  </button>
      <b>{page}</b>
      <button on:click={ () =>  changePagination(1)} >  👉  </button>
    </div>
    <GridSystem 
      matrix={matrixToShow}
      dim={{ col: 1 , row : 10} }
      gap={ $controlerContext.gap}
      scale={ $controlerContext.scale}
    >
    </GridSystem>
  </div>


  <style lang="scss" >
  

  
    .side-bar {
      border: 2px solid white;
      display: flex;
      flex-direction: column;
  
      &:nth-child(2) {
        display: contents
      }
      /* width: 100px; */
    }
  
    .side-nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      input {
        width: 32px;
      }
      button {
        padding: 8px;
        border: 2px solid blue;
      }
    }
  
  </style>