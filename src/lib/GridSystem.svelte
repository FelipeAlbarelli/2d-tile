
<script lang="ts">
    import { indexToCord  } from '../store'
    import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { Stage as StegeKonva } from 'konva/lib/Stage'
    import { createEventDispatcher, getContext, onMount, setContext } from 'svelte';
    import { createEmptyMatrix, type  Cord, type InitialMatrixOptions , nullCord } from './grid-helpers';
    import { nullTileState, type TileCoreData } from './tile-helpers';
  
    export let gap : number
    export let padding = 12;
    export let tileSetDim = 16;
    export let dim = {col : 2 , row : 2}
    export let initialMatrix :InitialMatrixOptions = 'none'
    export let matrix = createEmptyMatrix( dim.col * dim.row , initialMatrix)
    export let scale : number

    export const matrixOp = (cord: Cord , value : number) => {
      matrix[cord.index] = value
    }

    /**
     * Tile que está sendo hover pelo mouse agora
     */
    export let activeTile : TileCoreData = nullTileState

    const despachante = createEventDispatcher<{
      confirm  : TileCoreData,
      context  : TileCoreData,
    }>()

    let stage : StegeKonva;
    let layerStage : LayerType



    $: width =  ((tileSetDim + (gap * 2) ) * scale * dim.col )  +  (padding * 2);
    $: height = ((tileSetDim + (gap * 2) ) * scale * dim.row ) + padding * 2

    const hanlderContext = (e: MouseEvent) => {
      despachante('context', activeTile )
    }

    const handleClick = (e : MouseEvent) => {
      despachante('confirm' , activeTile)
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
            on:mouseleave={ e => activeTile = nullTileState }
            on:mouseenter={ e => activeTile = {
              inGrid : cords,
              tileSheetIndex : index
            }}
            dimensions={tileSetDim}
            tileSetIndex={tile}
            gap={gap}
            gridPosition={{ col : cords.col , row : cords.row }}
        />
      {/each}
      <slot />
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