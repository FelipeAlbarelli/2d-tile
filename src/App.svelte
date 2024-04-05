<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import colored from './assets/colored.png'
  import Counter from './lib/Counter.svelte';
   import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './lib/Tile.svelte';
    import { setContext } from 'svelte';
    import { allTiles, store, totalTiles } from './store';


    
  const controlValues = {
    x : 0,
    y: 0
  }

  const updateStore = () => {
    // store.set({
    //   totalCols: controlValues.y,
    //   totalRows : controlValues.x
    // })
  }


</script>

<div class="main">
  <div class="side-bar">
    <Stage 
    config={{ width: 160, height: window.innerHeight - 40 }} > 
      <Layer
      config={{imageSmoothingEnabled: false }}
      >
      {#each $allTiles.filter( (a,i) => i < 5 ) as tile }
        <Tile 
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
  <input on:change={updateStore}  bind:value={controlValues.x} type="number" />  
  <input on:change={updateStore}  bind:value={controlValues.y} type="number" />  
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
    /* width: 100px; */
  }

</style>