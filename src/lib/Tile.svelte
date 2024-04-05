<script  lang="ts" >
    import { onMount, tick } from "svelte";
    import { Stage, Layer , Image, type KonvaMouseEvent } from "svelte-konva";
    import asset from '../assets/colored_packed.png'
    import asset2 from '../assets/colored.png'
    import type { KonvaEventObject } from "konva/lib/Node";
    import type { Image as KonvaImage } from "konva/lib/shapes/Image";

    let image : HTMLImageElement | undefined = undefined;
    let handle : KonvaImage; 

    export let tileSize = 16;
    export let scaleFactor = 3;

    export let rows = 22;
    export let cols = 49 ;

    export let gap = 4


    export let tileCoord : {
            col: number,
            row: number
    }
    
    export let gridPosition : {
        col : number,
        row : number
    }




    $: finalSize = tileSize * scaleFactor

    onMount(() => {
        const img = document.createElement("img");
        img.src = asset;
        img.onload = () => {
            image = img;
        };
    });
    function setAtributes() {
        handle.setAttrs({
              scaleX: scaleFactor,
              scaleY: scaleFactor,
              width: tileSize / 2,
              height: tileSize / 2,
              custom : {
                tileCoord,
                gridPosition
              }
            });

        handle.width(tileSize * scaleFactor)
        handle.height(tileSize * scaleFactor)
    }


    const changeCrop = () => {
        handle.crop({
            x: tileSize * tileCoord.col,
            y: tileSize * tileCoord.row ,
            width : tileSize ,
            height : tileSize ,
        })
    }

    $ : if (handle) {
        setAtributes();
        changeCrop()
    }

    $ : if ((tileCoord.col || tileCoord.row) && handle ) {
        changeCrop()
    }

    const click = (e : KonvaMouseEvent) => {
        console.log(e.detail.target.getAttr('custom')  )
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
        y: (gridPosition.col  * finalSize) + ( (gridPosition.col - 1) * gap )  , 
        x :  gridPosition.row }}     
    />