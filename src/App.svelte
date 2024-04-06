<script lang="ts">
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import SideBar from './lib/SideBar.svelte';
    import GridSystem from './lib/GridSystem.svelte';

    
  let controlValues = writable<{
    scale: number, gap: number
  }>({
    scale : 4,
    gap : 2,
  })

  const context = setContext('controler' , controlValues)

  controlValues.subscribe( ({}) => {
    
  })



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