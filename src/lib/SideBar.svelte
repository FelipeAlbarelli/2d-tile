<script lang="ts">
    import { someTiles, type TileData, type TileInGrid  } from '../store'
    import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { derived, writable, type Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    


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

    export let scale : number

    export let gap : number
    export let padding = 12;
    export let tilesToDisplay = 10;
    export let tileSetDim = 16;

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
    <Stage 
      config={{ width: ((16 + gap) * scale )  +  padding , height: window.innerHeight - 100 , scale : {x: 1, y : 1} }} > 
      <Layer
        bind:handle={sideStage}
        config={{
          imageSmoothingEnabled: false ,
          y : 8,
          x : 8,
          scaleX : scale,
          scaleY : scale 
        }}
      >
        
      {#each sideTiles as tile }
        <Tile 
        dimensions={tileSetDim}
            tileSetIndex={tile.id}
        on:click={ (event) => {selectedTile.set({ ...event.detail, gridPosX : 0 , gridPosY : tile.pagePos  })} }
        selected={ tile.id == $selectedTile?.id }
          gap={gap}
          gridPosition={{col : 0 , row : tile.pagePos}}
        />
      {/each}
        <Rect
            config={{
                listening : false,
                x: 0,
                y: $rectParams.y,
                width: 16 + gap / 2,
                height: 16 + gap / 2 ,
                // fill: 'green',
                stroke: '#008',
                strokeWidth: 1,
                z: 2
            }} 

        />
      </Layer>
    </Stage>
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