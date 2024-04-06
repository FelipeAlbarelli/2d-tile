<script  lang="ts" >
    import { createEventDispatcher, onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored_packed.png'
    import asset2 from '../assets/colored.png'
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";
    import {  indexToCord , store, type TileData } from "../store";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 

    export let tileSize = 16;

    export let selected = false

    const dispather = createEventDispatcher<{
        click: TileData,
    }>()

    export let gap = 4

    export let tileSetIndex = 0;

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
        handle.width(tileSize  )
        handle.height(tileSize );
    }


    $ : if (tileSize ){
        setAtributes()
    }

    const changeCrop = () => {
        handle.crop({
            x: tileSize * tileCord.col,
            y: tileSize * tileCord.row ,
            width : tileSize ,
            height : tileSize ,
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
            dimensions: tileSize
        } )

    }


    // $ : if (tileCoord.col || tileCoord.row ) {
    //     handleCircleClick()
    // } 


</script>

<Image 
    on:pointerclick={click}
    bind:handle={handle}
    config={{ 
        image , 
        y: gridPosition.col *  (tileSize + gap )  , 
        x :  gridPosition.row }}     
    />