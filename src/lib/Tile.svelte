<script  lang="ts" >
    import { createEventDispatcher, getContext, onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored_packed.png'
    import asset2 from '../assets/colored.png'
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";
    import {  indexToCord , store, type TileData } from "../store";
    import type { Writable } from "svelte/store";
    import { getTilePositionOnTileSheet  } from "./grid-helpers";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 
    export let tileSetIndex =  -1;

    export let dimensions = 16;
    const tileSheet = {
        totalCols: 49,
        totalRows: 22
    }

    const changeCrop = ({col,row }:{col :number , row: number}) => {
        if ( !handle)  return;
        handle.crop({
            x: dimensions * col,
            y: dimensions * row ,
            width : dimensions ,
            height : dimensions ,
        })
    }

    $: tileCropPosition = getTilePositionOnTileSheet({
        index : tileSetIndex , 
        sheetCols : tileSheet.totalCols ,
        sheetRows : tileSheet.totalRows
    })

    $: changeCrop(tileCropPosition)

    const dispather = createEventDispatcher<{
        click: number,
        mouse : number,
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


    $ : if (handle && tileCropPosition) {
        setAtributes();
        changeCrop(tileCropPosition )
    }

    $ : if ( gridPosition && handle ) {
        changeCrop(tileCropPosition)
    }

    const click = (e : KonvaMouseEvent) => {
        console.log(tileSetIndex)
        dispather('click' , tileSetIndex )

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
