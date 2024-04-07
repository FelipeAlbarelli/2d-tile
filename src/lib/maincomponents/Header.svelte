<script lang="ts">
	import { routeState , type RouteKey } from "../../stores/nav_store";

    const setRoute = (key : RouteKey) => {
        $routeState.current = key;
    }
    
</script>

<div class="nav">
    <span on:click={ () => setRoute('simple-canva') }  class="link" > simple canva </span>
    <span on:click={ () => setRoute('create-tile-set') }  class="link" > create tile set </span>
</div>

<style lang="scss" >
    .nav {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    .link {
        text-decoration: underline blue;
        text-decoration-thickness: 2px;
        cursor: pointer;
        transition: all 0.25s;

        &:hover {
            text-decoration-color: white;
            text-decoration-thickness: 4px;
        }
    }
</style>