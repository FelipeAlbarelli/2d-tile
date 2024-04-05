<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import colored from './assets/colored.png'
  import Counter from './lib/Counter.svelte';
   import { Stage, Layer, Rect , Image } from 'svelte-konva';
    import Tile from './lib/Tile.svelte';
</script>

<div class="main">
  <div class="side-bar">
    <Stage config={{ width: 100, height: window.innerHeight - 40 }} > 
      <Layer
      config={{imageSmoothingEnabled: false }}
      >
        <Tile />

      </Layer>
    </Stage>
  </div>
  <div class="stage">
    <Stage config={{ width: 500, height: 300 }} />
  </div>

</div>

<style>
  img  {
    width : 50px;
    image-resolution: 2;
    height : 50px;
    image-rendering: pixelated;
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