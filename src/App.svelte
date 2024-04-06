<script lang="ts">
  import { writable } from 'svelte/store';
  import SideBar from './lib/SideBar.svelte';
  import GridSystem from './lib/GridSystem.svelte';
  import { setContext } from 'svelte';
    import { nullTileState } from './lib/tile-helpers';
  
  
  let controlValues = writable<{
    scale: number, gap: number
  }>({
    scale : 4,
    gap : 2,
  })

  let selectedTile = nullTileState;
  let gridCanva : GridSystem;

  





</script> 

<div class="main">
  <SideBar
    bind:selectedTile={selectedTile}
    gap={  $controlValues.gap}
    scale={ $controlValues.scale }
  />
  <div class="stage">
    <GridSystem
    bind:this={gridCanva}
    on:confirm={ (tile) => gridCanva.matrixOp(tile.detail.inGrid , selectedTile.tileSheetIndex) }
      dim={{ col: 10 , row : 10} }
      gap={ $controlValues.gap}
      scale={ $controlValues.scale}
    />
  </div>

</div>

<div class="control-bar">
  <input   bind:value={$controlValues.scale} type="number" />  
  <input   bind:value={$controlValues.gap} type="number" />  
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