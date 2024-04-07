<script lang="ts">
  import { writable } from 'svelte/store';
  import SideBar from './lib/SideBar.svelte';
  import GridSystem from './lib/GridSystem.svelte';
  import { setContext } from 'svelte';
    import { nullTileState } from './lib/tile-helpers';
	import Header from './lib/maincomponents/Header.svelte';
	import SimpleCanva from './pages/SimpleCanva.svelte';
  import { globalGridConfig } from  './stores/global_store'
  import { currentComponent } from './stores/nav_store'
  

  let selectedTile = nullTileState;
  let gridCanva : GridSystem;

  // currentComponent.subscribe( (s) => {
  //   console.log(s)
  // })





</script> 

<div class="main">
  <Header></Header>

  <svelte:component this={$currentComponent} ></svelte:component>
  <!-- <SimpleCanva></SimpleCanva> -->

</div>

<div class="control-bar">
  <input   bind:value={$globalGridConfig.scale} type="number" />  
  <input   bind:value={$globalGridConfig.gap  } type="number" />  
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
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    // max-height: 100vh;
  }


</style>