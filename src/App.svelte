<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte';
   import { Stage, Layer, Rect , Image } from 'svelte-konva';
</script>

<div class="main">
  <div class="side-bar">
    <img   />
  </div>
  <div class="stage">
    <Stage config={{ width: 500, height: 300 }} />
  </div>

</div>

<style>
  img  {
    width : 50px;
    height : 50px;
    background: url(assets/colored.png) ;
    object-fill: 
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
    width: 100px;
  }

</style>
