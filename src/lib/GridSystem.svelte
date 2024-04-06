
<script lang="ts">
    import { indexToCord, someTiles, store, type TileData, type TileInGrid  } from '../store'
    import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './Tile.svelte'
    import { Layer as LayerType } from 'konva/lib/Layer'
    import { Stage as StegeKonva } from 'konva/lib/Stage'
    import { derived, writable, type Writable } from 'svelte/store';
    import { getContext, setContext } from 'svelte';


    const createEmptyMatrix = (n : number , options : {random? : number} = {}) => {
        const result = [];
        for (let index = 0; index < n; index++) {
            if (options.random != undefined) {
                result.push( Math.floor( Math.random() * options.random) )            
            } else {
                result.push(-1)            
            }
        }
        return result
    }


    const selectedTile = writable<TileInGrid  | null>(null);
    
    let stage : StegeKonva;


    const controlerContext = getContext<
      Writable<{
      scale: number, gap: number, selectedTile : null  
    }>
    >('controler');

    controlerContext.subscribe( s => {
      console.log(s)
    })

    let gridStore = writable<{
            pointerX : number | null,
            pointerY : number | null
        }>({
            pointerX : null,
            pointerY :null
    })

    const context = setContext('grid' , gridStore)

    gridStore.subscribe( ({pointerX,pointerY}) => {
        console.log({pointerX, pointerY})
    })

    
    let sideStage : LayerType
    export let scale : number

    export let gap : number
    export let padding = 12;
    export let tileSetDim = 16;
    export let dim = {col : 2 , row : 2}
    export let matrix = createEmptyMatrix( dim.col * dim.row , {random: 10})


    $: width =  ((tileSetDim + gap) * scale * dim.col )  +  padding * 2;
    $: height = ((tileSetDim + gap) *scale * dim.row) + padding * 2

    const hanlderContext = (e: MouseEvent) => {
        console.log(e.clientX , e.clientY)
    }

    const logger = (e: any) => {
        console.log(e)
    }

    const mouseEnterTile = (e : MouseEvent) => {

    }

  
  </script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    on:contextmenu|preventDefault={hanlderContext}
    on:click={() => console.log(matrix)}
    class="grid-cont"
    >

    <Stage 
        bind:ref={stage}
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