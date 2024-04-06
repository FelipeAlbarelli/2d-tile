<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import colored from './assets/colored.png'
  import Counter from './lib/Counter.svelte';
   import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './lib/Tile.svelte';
    import { setContext } from 'svelte';
    import { allTiles, store, totalTiles , someTiles, type TileInGrid } from './store';
  import { Layer as LayerType } from 'konva/lib/Layer'
    import { scale } from 'svelte/transition';
    import { writable } from 'svelte/store';
    import SideBar from './lib/SideBar.svelte';
    import GridSystem from './lib/GridSystem.svelte';

    
  let controlValues = writable<{
    scale: number, gap: number, selectedTile : TileInGrid | null
  }>({
    scale : 4,
    gap : 2,
    selectedTile : null
  })

  const context = setContext('controler' , controlValues)



  const updateStore = () => {
    // store.set({
    //   totalCols: controlValues.y,
    //   totalRows : controlValues.x
    // })
  }

  let page = 0;


</script>

<div class="main">
  <SideBar 
    gap={  $controlValues.gap}
    scale={ $controlValues.scale }
  />
  <div class="stage">
    <GridSystem
      dim={{ col: 10 , row : 10} }
      gap={ $controlValues.gap}
      scale={ $controlValues.scale}
    />
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
    padding: 12px;
    display: flex;
    
  }


</style>