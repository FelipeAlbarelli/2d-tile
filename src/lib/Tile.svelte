<script  lang="ts" >
    import { createEventDispatcher, onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored_packed.png'
    import asset2 from '../assets/colored.png'
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";
    import {  indexToCord , store, type TileData } from "../store";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 

    export let dimensions = 16;

    export let selected = false;

    const dispather = createEventDispatcher<{
        click: TileData,
    }>()

    export let gap = 4

    export let tileSetIndex =  -1;

    $: tileCord = indexToCord(tileSetIndex , $store)

    export let gridPosition : {
        col : number,
        row : number
    }

    onMount(() => {
        const img = document.createElement("img");
        img.src = asset;
        img.onload = () => {
            image = img;
        };
    });
    function setAtributes() {
        if (!handle) return;
        handle.width(dimensions  )
        handle.height(dimensions );
    }


    $ : if (dimensions ){
        setAtributes()
    }

    const changeCrop = () => {
        handle.crop({
            x: dimensions * tileCord.col,
            y: dimensions * tileCord.row ,
            width : dimensions ,
            height : dimensions ,
        })
    }

    $ : if (handle) {
        setAtributes();
        changeCrop()
    }

    $ : if ( tileCord && handle ) {
        changeCrop()
    }

    const click = (e : KonvaMouseEvent) => {
        dispather('click' , {
            col: gridPosition.col,
            row: gridPosition.row,
            id: tileSetIndex,
            dimensions: dimensions
        } )

    }


    // $ : if (tileCoord.col || tileCoord.row ) {
    //     handleCircleClick()
    // } 


</script>

{#if tileSetIndex >= 0}
<Image 
    on:pointerclick={click}
    bind:handle={handle}
    config={{ 
        image , 
        y: gridPosition.row *  (dimensions + gap )  , 
        x :  gridPosition.col 
    }}     
/>  
{/if}