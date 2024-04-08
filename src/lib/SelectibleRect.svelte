<script lang="ts">
    import { Stage, Layer,  Rect } from 'svelte-konva';
	import type { Cord } from './grid-helpers';
	import { derived, writable } from 'svelte/store';
	import { nullTileState, type TileCoreData } from './tile-helpers';

    export let tileSetDim : number;
    export let gap : number;
    $: halfGap = gap/2;

    export let topLeft : Cord | null = null;
    export let botRight : Cord | null = null;
    export let color = 'white';
    export let strokeWidth = 1;

    const getXY = (c : Cord | null) => ({
        x : c ? -halfGap + ( ( tileSetDim + gap ) * c.col  ) : -100,
        y:  c ? -halfGap + ( (tileSetDim + gap) * c.row ) : -100
    })


    $: topLeftXY = getXY(topLeft);
    $: botLeftXY = getXY(botRight);


    $: activeWidth =  tileSetDim + botLeftXY.x - topLeftXY.x 
    $: activeHeight =  tileSetDim + botLeftXY.y - topLeftXY.y 


    $: clickConfig = {
        ...topLeftXY,
        width: tileSetDim + halfGap,
        height: tileSetDim + halfGap,
        stroke: 'white',
        strokeWidth: 1,
    }

    $: activeConfig = {
        ...topLeftXY,
        width: activeWidth + halfGap,
        height: activeHeight + halfGap,
        stroke: color,
        strokeWidth: strokeWidth
    }


</script>

{#if topLeft}
    <Rect
        config={activeConfig}
    ></Rect>
{/if}
