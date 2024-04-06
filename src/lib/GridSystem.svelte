
<script lang="ts">
    import { indexToCord, someTiles, store, type TileData, type TileInGrid  } from '../store'
    import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { Stage as StegeKonva } from 'konva/lib/Stage'
    import { derived, writable, type Writable } from 'svelte/store';
    import { getContext, setContext } from 'svelte';
    import { createEmptyMatrix, type GridContext, type InitialMatrixOptions  } from './grid-helpers';

    export let gap : number
    export let padding = 12;
    export let tileSetDim = 16;
    export let dim = {col : 2 , row : 2}
    export let initialMatrix :InitialMatrixOptions = 'none'
    export let matrix = createEmptyMatrix( dim.col * dim.row , initialMatrix)

    console.log({matrix , initialMatrix})

    let stage : StegeKonva;
    let layerStage : LayerType

    export let gridStore : GridContext = {

      totalCols : dim.col,
      totalRows : dim.row
    }



    export let scale : number

    $: width =  ((tileSetDim + gap) * scale * dim.col )  +  padding * 2;
    $: height = ((tileSetDim + gap) *scale * dim.row) + padding * 2

    const hanlderContext = (e: MouseEvent) => {
        // console.log( $gridStore )
        // matrix[gridStore.index!] -= 1;
        // console.log(gridStore )
    }

    const handleClick = (e : MouseEvent) => {
        // matrix[gridStore.index!] += 1;
        // console.log(gridStore )

    }

  
  </script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    on:contextmenu|preventDefault={hanlderContext}
    on:click={handleClick}
    class="grid-cont"
    >

    <Stage 
        bind:ref={stage}
         config={{ width:width, height: height , scale : {x: 1, y : 1} }} > 
      <Layer
        bind:handle={layerStage}
        config={{
          imageSmoothingEnabled: false ,
          y : 8,
          x : 8,
          scaleX : scale,
          scaleY : scale 
        }}
      >
        
      {#each matrix as tile , index }
      {@const cords = indexToCord({index, totalCols : dim.col , totalRows : dim.row})}
        <Tile
            dimensions={tileSetDim}
            tileSetIndex={tile}
            gap={gap}
            gridPosition={{ col : cords.col , row : cords.row }}
        />
      {/each}

      </Layer>
    </Stage>
  </div>


  <style lang="scss" >
  
.grid-cont {
    display: flex;
    padding: 12px;
    border: 2px solid white;
}
  
</style>