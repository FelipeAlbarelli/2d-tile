<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import colored from './assets/colored.png'
  import Counter from './lib/Counter.svelte';
   import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './lib/Tile.svelte';
    import { setContext } from 'svelte';
    import { allTiles, store, totalTiles } from './store';
  import { Layer as LayerType } from 'konva/lib/Layer'
    import { scale } from 'svelte/transition';
    import { writable } from 'svelte/store';

    
  let controlValues = writable({
    scale : 4,
    gap : 2,
  })

  let sideStage : LayerType

  const updateStore = () => {
    // store.set({
    //   totalCols: controlValues.y,
    //   totalRows : controlValues.x
    // })
  }


</script>

<div class="main">
  <div class="side-bar">
    <div class="side-nav">
      <button>  👈  </button>
      <button>  👉  </button>
    </div>
    <Stage 
    config={{ width: (16 * $controlValues.scale) + 8 , height: window.innerHeight - 40 , scale : {x: 1, y : 1} }} > 
      <Layer
        bind:handle={sideStage}
        config={{
          imageSmoothingEnabled: false ,
          y : 8,
          x : 8,
          scaleX : $controlValues.scale,
          scaleY : $controlValues.scale 
        }}
      >
      {#each $allTiles.filter( (a,i) => i < 5 ) as tile }
        <!-- <Tile 
          gridPosition={{col : tile.index , row : 0}}
          tileCoord={{col : tile.col , row : tile.row }}
        /> -->
        <Tile 
          gap={$controlValues.gap}
          gridPosition={{col : tile.index , row : 0}}
          tileCoord={{col : tile.col , row : tile.row }}
        />
      {/each}

      </Layer>
    </Stage>
  </div>
  <div class="stage">
    <Stage 
    config.width={100}
    config={{ height: 300 }} />
  </div>

</div>

<div class="control-bar">
  <input on:change={updateStore}  bind:value={$controlValues.scale} type="number" />  
  <input on:change={updateStore}  bind:value={$controlValues.gap} type="number" />  
</div>

<style lang="scss" >
  
  .control-bar {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 12px;
    right: 12px;

    input {
      width: 12px * 8
    }
  }

  

  .main {
    height: 100vh;
    width: 100vw;
    padding: 12px;
    display: flex;
    
  }

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
    button {
      padding: 8px;
      border: 2px solid blue;
    }
  }

</style>