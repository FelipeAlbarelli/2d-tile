<script lang="ts">
	import GridSystem from "./GridSystem.svelte";
    
    export let gap: number;
    export let scale: number; 
    let gridCanva : GridSystem;

    export let tilesheetIndex = 0;

    $: if (gridCanva) {
        gridCanva.matrixSetTile( { col : 0 , row : 0 , index: 0} , tilesheetIndex)
    }
    

</script>


<GridSystem
    bind:this={gridCanva}
    dim={{
        col : 1, row : 1
    }}
    {gap} {scale}
>

</GridSystem>