import { writable } from "svelte/store";

export const darkModeStore = writable(true);
export const soundStore = writable({ src: "", paused: true });
