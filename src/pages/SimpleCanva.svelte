<script lang="ts">
  import { writable } from 'svelte/store';
  import SideBar from '../lib/SideBar.svelte';
  import GridSystem from '../lib/GridSystem.svelte';
  import { setContext } from 'svelte';
    import { nullTileState } from '../lib/tile-helpers';
	import Header from '../lib/maincomponents/Header.svelte';
  import {globalGridConfig} from '../stores/global_store'
  
  


  let selectedTile = nullTileState;
  let gridCanva : GridSystem;

  





</script> 

  <div class="body">
    <SideBar
      bind:selectedTile={selectedTile}
      gap={  $globalGridConfig.gap}
      scale={ $globalGridConfig.scale }
    />
    <div class="stage">
      <GridSystem
      bind:this={gridCanva}
      on:confirm={ (tile) => gridCanva.matrixOp(tile.detail.inGrid , selectedTile.tileSheetIndex) }
        dim={{ col: 10 , row : 10} }
        gap={ $globalGridConfig.gap}
        scale={ $globalGridConfig.scale}
      />
    </div>
  </div>


<style lang="scss" >
  

  .body {
    padding: 12px;
    display: flex;
    
  }


</style>