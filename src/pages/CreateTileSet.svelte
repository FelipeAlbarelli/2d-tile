<script lang="ts">
    import GridSystem from '../lib/GridSystem.svelte';
    import SingleTile from '../lib/SingleTile.svelte';
    import { nullTileState } from '../lib/tile-helpers';
    
    


    let selectedTile = nullTileState;
    let gridCanva : GridSystem;

    let totalTiles = 1
    let tilesInfos = [{}]


</script> 

<div class="container">
    <div class="side">
        <button
            on:click={ () => tilesInfos.push({})}
        >
            ➕
        
        </button>
        <SingleTile 
            tilesheetIndex={0}
            gap={1} scale={2}
        />
    </div>
    <div class="side">
        <GridSystem 
            dim={{col: 2 , row : 20}}
            gap={1}
            scale={2}
        />
    </div>
    <div class="main">
      <GridSystem
      bind:this={gridCanva}
        dim={{ col: 49 , row : 22} }
        initialMatrix='cresc'
        gap={1}
        scale={ 2 }
      />
    </div>
</div>


<style lang="scss" >
  
    .container {
        padding: 8px;
        display: flex;
        flex-direction: row;
    }

    .side {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main {
        overflow-x: scroll;
        overflow-y: hidden;
    }



</style>