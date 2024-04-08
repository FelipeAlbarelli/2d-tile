<script lang="ts">
    import { Stage, Layer,  Rect } from 'svelte-konva';
	import type { Cord } from './grid-helpers';
	import { derived, writable } from 'svelte/store';
	import { nullTileState, type TileCoreData } from './tile-helpers';

    export let tileSetDim : number;
    export let gap : number;
    $: halfGap = gap/2;

    export let topLeft : Cord | null = null;
    export let activeTile : Cord | null = null;
    export let botRight : Cord | null = null;

    const getXY = (c : Cord | null) => ({
        x : c ? -halfGap + ( ( tileSetDim + gap ) * c.col  ) : -100,
        y:  c ? -halfGap + ( (tileSetDim + gap) * c.row ) : -100
    })


    $: topLeftXY = getXY(topLeft);

    $: activeXY = getXY(activeTile);

    $: totalWidth =  tileSetDim + activeXY.x - topLeftXY.x 
    $: totalHeight = tileSetDim + activeXY.y - topLeftXY.y


    $: clickConfig = {
        ...topLeftXY,
        width: tileSetDim + halfGap,
        height: tileSetDim + halfGap,
        stroke: 'white',
        strokeWidth: 1,
    }

    $: activeConfig = {
        ...topLeftXY,
        width: totalWidth + halfGap,
        height: totalHeight + halfGap,
        stroke: 'red',
        strokeWidth: 1,
    }

    $: activeConfig = {
        ...topLeftXY,
        width: totalWidth + halfGap,
        height: totalHeight + halfGap,
        stroke: 'red',
        strokeWidth: 1,
    }


</script>


<Rect
    config={clickConfig}
></Rect>
{#if topLeft && activeTile}
    <Rect
        config={activeConfig}
    ></Rect>
{/if}
