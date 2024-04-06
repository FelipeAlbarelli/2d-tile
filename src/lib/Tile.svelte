<script  lang="ts" >
    import { createEventDispatcher, getContext, onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored_packed.png'
    import asset2 from '../assets/colored.png'
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";
    import {  indexToCord , store, type TileData } from "../store";
    import type { Writable } from "svelte/store";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 

    export let dimensions = 16;

    export let selected = false;



    const gridStore = getContext<
      Writable<{
            pointerX : number | null,
            pointerY : number | null
    }>
    >('grid');

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

    const mouseEnter = (e: KonvaMouseEvent) => {
        
    }


    // $ : if (tileCoord.col || tileCoord.row ) {
    //     handleCircleClick()
    // } 


</script>

{#if tileSetIndex >= 0}
<Image 
    on:pointerclick={click}
    on:mouseenter={(e) => {
        $gridStore.pointerX = gridPosition.col ;
        $gridStore.pointerY = gridPosition.row;
    }}
    on:mouseleave={(e) => {
        $gridStore.pointerX = gridPosition.col ;
        $gridStore.pointerY = gridPosition.row;
    }}
    bind:handle={handle}
    config={{ 
        image , 
        y:  gridPosition.row *  (dimensions + gap )  , 
        x :  gridPosition.col 
    }}     
/>  
{/if}