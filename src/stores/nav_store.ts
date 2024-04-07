import SimpleCanva from "../pages/SimpleCanva.svelte"
import CreateTileSet from "../pages/CreateTileSet.svelte"
import { derived, writable } from "svelte/store"
import type { SvelteComponent } from "svelte"

export const allRoutes = [
    'simple-canva',
    'create-tile-set'
] as const

export type RouteKey = (typeof allRoutes)[number]

export const Routes: Record<RouteKey, any> = {
    'simple-canva': SimpleCanva,
    'create-tile-set': CreateTileSet
}

export const routeState = writable<{
    current: RouteKey;
}>({
    current: 'create-tile-set'
})

export const currentComponent = derived(routeState, (state) => {
    return Routes[state.current]
})