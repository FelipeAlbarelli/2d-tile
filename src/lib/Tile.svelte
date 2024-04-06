<script  lang="ts" >
    import { createEventDispatcher, getContext, onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored_packed.png'
    import asset2 from '../assets/colored.png'
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";
    import {  indexToCord , store, type TileData } from "../store";
    import type { Writable } from "svelte/store";
    import { getTilePositionOnTileSheet, type GridContext } from "./grid-helpers";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 
    export let tileSetIndex =  -1;

    export let dimensions = 16;
    const tileSheet = {
        totalCols: 49,
        totalRows: 22
    }

    $: tileCropPosition = getTilePositionOnTileSheet({
        index : tileSetIndex , 
        sheetCols : tileSheet.totalCols ,
        sheetRows : tileSheet.totalRows
    })

    const dispather = createEventDispatcher<{
        click: TileData,
    }>()

    export let gap = 4



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
            x: dimensions * tileCropPosition.col,
            y: dimensions * tileCropPosition.row ,
            width : dimensions ,
            height : dimensions ,
        })
    }

    $ : if (handle) {
        setAtributes();
        changeCrop()
    }

    $ : if ( gridPosition && handle ) {
        changeCrop()
    }

    const click = (e : KonvaMouseEvent) => {
        console.log(tileSetIndex)
        dispather('click' , {
            col: gridPosition.col,
            row: gridPosition.row,
            id: tileSetIndex,
            dimensions: dimensions
        } )

    }


</script>


<Image 
    on:pointerclick={click}
    on:mouseenter={(e) => {
        // gridStore.pointerX = gridPosition.col ;
        // gridStore.pointerY = gridPosition.row;
        // gridStore.index = gridIndex;
    }}
    on:mouseleave={(e) => {
        // gridStore.pointerX = null ;
        // gridStore.index = null;
        // gridStore.pointerY = null;
    }}
    bind:handle={handle}
    config={{ 
        image , 
        y:  gridPosition.row *  (dimensions + gap )  , 
        x : gridPosition.col *  (dimensions + gap )
    }}     
/>  
