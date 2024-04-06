
<script lang="ts">
    import { indexToCord, someTiles, store, type TileData, type TileInGrid  } from '../store'
    import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { derived, writable, type Writable } from 'svelte/store';
    import { getContext } from 'svelte';


    const selectedTile = writable<TileInGrid  | null>(null)


    const controlerContext = getContext<
      Writable<{
      scale: number, gap: number, selectedTile : null
    }>
    >('controler');

    controlerContext.subscribe( s => {
      console.log(s)
    })

    
  
    let sideStage : LayerType
    export let scale : number

    export let gap : number
    export let padding = 12;
    export let tileSetDim = 16;
    export let dim = {col : 2 , row : 2}
    export let matrix = Array( dim.col * dim.row ).map( _ => -1)


    $: width =  ((tileSetDim + gap) * scale * dim.col )  +  padding * 2;
    $: height = ((tileSetDim + gap) *scale * dim.row) + padding * 2



  
  </script>

<div class="grid-cont">

    <Stage 
      config={{ width:width, height: height , scale : {x: 1, y : 1} }} > 
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
        
      {#each matrix as tile , index }
      {@const cords = indexToCord(index, $store)}
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