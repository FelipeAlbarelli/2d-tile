import { writable } from "svelte/store"
import type { TileGridConfig } from "../lib/tile-helpers"

export const globalGridConfig = writable<TileGridConfig>({
    gap: 2,
    padding: 4,
    scale: 3
})