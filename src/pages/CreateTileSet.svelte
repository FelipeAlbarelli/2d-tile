<script lang="ts">
    import GridSystem from '../lib/GridSystem.svelte';
    import SingleTile from '../lib/SingleTile.svelte';
    import { nullTileState, type TileCoreData } from '../lib/tile-helpers';
    
    


    let gridCanva : GridSystem;

   
    const leftClickOnMain = (tile : TileCoreData) => {
        gridCanva.matrixSetTile( tile.inGrid , {selected : true})
    }
    const rightClickOnMain = (tile : TileCoreData) => {
        gridCanva.matrixSetTile( tile.inGrid , {selected : false})
    }



</script> 

<div class="container">
    <div class="side">
        <button
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
        on:confirm={ e => leftClickOnMain(e.detail)  }
        on:context={ e => rightClickOnMain(e.detail)  }
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