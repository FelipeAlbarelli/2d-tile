<script  lang="ts" >
    import { onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored.png'
    import type { KonvaEventObject } from "konva/lib/Node";
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 
    onMount(() => {
        const img = document.createElement("img");
        img.src = asset;
        img.onload = () => {
            image = img;
        };
    });
    function handleCircleClick(e : KonvaMouseEvent) {
        console.log(e);
        handle.crop()
        
    }

</script>

<Image 
    on:click={handleCircleClick}
    bind:handle={handle}
    config={{ image , x: 0 , y: 0 , width: 16 * 5, height: 16 * 5 , offsetX: 0, offsetY : 0, 
        fillPatternOffset : {x: 0, y: 0},
        fillPatternScale : {x: 16 * 5, y : 16 * 5},
        fill : 'fill'
         }}     
    />