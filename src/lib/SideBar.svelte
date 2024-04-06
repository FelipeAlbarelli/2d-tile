<script lang="ts">
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { derived, writable, type Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import GridSystem from './GridSystem.svelte';
    import { createEmptyMatrix, type Cord } from './grid-helpers';
    import { nullTileState, type TileCoreData } from './tile-helpers';
    import { Group, Rect } from 'svelte-konva';
    
    let sideStage : LayerType 


    let selectedTileWriteble = writable(nullTileState)

    export let selectedTile = nullTileState;

    $: {
      selectedTile = $selectedTileWriteble
    }

    export let gap : number
    export let tilesToDisplay = 10;
    export let scale : number;
    export let padding : number = 0;
    export let tileSetDim : number = 16;

    let gridActiveTile : TileCoreData

    const tileSheet = {
        totalCols: 49,
        totalRows: 22
    }

    const matrix = createEmptyMatrix( tileSheet.totalCols * tileSheet.totalRows , 'cresc' )

    $: matrixToShow = matrix.slice( page * tilesToDisplay , (page + 1) * tilesToDisplay  )

    const rectConfig = derived(selectedTileWriteble , (sel) => {
      const halfGap = -gap/2;
      const y = sel.inGrid.row == -1 ? -100 :  halfGap + ( (tileSetDim + gap) * sel.inGrid.row  )
      return {
        x: halfGap,
        y,
        width: tileSetDim + gap,
        height: tileSetDim + gap,
        // fill: 'green',
        stroke: 'white',
        strokeWidth: 0.5,

      }
    })
    
  
  

    let page = 0;



    

    
    const changePagination = (change: number) => {
      page = Math.max(0  , page + change);
    }




    const keyUp = (e: KeyboardEvent) => {
      $selectedTileWriteble = nullTileState;
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
      padding={padding}
      bind:tileSetDim={tileSetDim}
      bind:activeTile={gridActiveTile}
      on:confirm={ tile => {$selectedTileWriteble = tile.detail  ; console.log( tile.detail )  } }
      dim={{ col: 1 , row : 10} }
      gap={ gap}
      scale={scale}
    >
      <Group >
        <Rect 
          config={$rectConfig}
        />
      </Group>
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