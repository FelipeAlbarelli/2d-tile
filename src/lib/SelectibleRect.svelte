<script lang="ts">
    import { Stage, Layer,  Rect } from 'svelte-konva';
	import type { Cord } from './grid-helpers';
	import { derived, writable } from 'svelte/store';
	import { nullTileState, type TileCoreData } from './tile-helpers';

    export let tileSetDim : number;
    export let gap : number;

    export let topLeft : Cord | null = null;
    export let botRight : Cord | null = null;

    $: halfGap = gap/2;
    $: y =  topLeft ? halfGap + ( (tileSetDim + gap) * topLeft?.row ) : -100

    $: rectConfig = {
        x : halfGap,
        y,
        width: tileSetDim + gap,
        height: tileSetDim + gap,
        stroke: 'white',
        strokeWidth: 0.5,
        
    }


</script>


<Rect
    config={rectConfig}
></Rect>

