<script lang="ts">
    import { someTiles  } from '../store'
     import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
      import { writable } from 'svelte/store';

    
  
    let sideStage : LayerType
  

    let page = 0;

    export let scale : number

    export let gap : number
    export let padding = 12;

    let selectedTileIndex : null | number = 1;
    
    $: sideTiles =  $someTiles( page * 10 ,10).map( m => ({...m , selected : m.id == selectedTileIndex  }) )
    
    $: selectedTile = sideTiles.at( selectedTileIndex ?? -1 ) ?? {col : -1 , row : -1 , dimensions : 0}

    $: console.log({selectedTile , selectedTileIndex})

    const keyUp = (e: KeyboardEvent) => {
        selectedTileIndex = null;
    } 
  
  </script>

<svelte:body on:keyup={keyUp}  />
<div class="side-bar">
    <div class="side-nav">
      <button on:click={ () => page = page != 0 ? (page - 1) : page } >  👈  </button>
      <b>{page}</b>
      <button on:click={ () => page += 1 } >  👉  </button>
    </div>
    <Stage 
      config={{ width: ((16 + gap) * scale )  +  padding , height: window.innerHeight - 40 , scale : {x: 1, y : 1} }} > 
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
            tileSetIndex={tile.id}
        on:click={ (event) => {selectedTileIndex = event.detail.id ; console.log( event.detail )} }
        selected={ tile.selected }
          gap={gap}
          gridPosition={{col : tile.pagePos , row : 0}}
        />
      {/each}
        <Rect
            config={{
                listening : false,
                x: 0,
                y: selectedTile.col * selectedTile.dimensions,
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
      height: 100%;
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