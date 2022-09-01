<script>
	import { onMount } from "svelte";
	import { HtmlTag } from "svelte/internal";
	import SongList from "./SongList.svelte";
	import { darkModeStore } from "./store";

	let searchQuery;
	let songs;

	const search = async () => {
		const res = await fetch(__myapp.env.API_URL + "/q?query=" + searchQuery);
		const data = await res.json();
		songs = data.data.tracks.items;
	};

	let inDarkMode;

	darkModeStore.subscribe((value) => {
		inDarkMode = value;
		document.querySelector("html").style.background = value ? "#000" : "#fff";
	});

	const toggleScheme = () => {
		darkModeStore.update((i) => {
			localStorage.setItem("theme", !i ? "dark" : "light");
			return !i;
		});
	};

	onMount(async () => {
		const currentTheme = localStorage.getItem("theme");
		darkModeStore.set(currentTheme !== "light");
	});
</script>

<svelte:head>
	<style>
		html {
			padding: 5% 0;
			padding-bottom: 5rem;
		}

		* {
			box-sizing: border-box;
		}

		@media (min-width: 801px) {
			.has-desktop-shadow {
				box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
					0 0 0 1px rgba(10, 10, 10, 0.02) !important;
			}

			.main {
				position: absolute;
				top: 40%;
				width: 70vw;
				left: 15vw;
			}
		}
	</style>
</svelte:head>
<main class="main is-centered is-flex is-justify-content-center is-half">
	<div
		class={`container sticky has-background-${
			inDarkMode ? "black" : "white"
		} p-1`}
		style="padding: 0px 5px 10px 5px !important; height: 6rem;"
	>
		<div class="field has-addons has-desktop-shadow is-paddingless">
			<div class="control">
				<button
					class={`button is-outlined is-radiusless has-background-${
						inDarkMode ? "black" : "white"
					}`}
					style="width: 3.8rem; height: 4rem; font-size: 1.5rem;"
					on:click={toggleScheme}><i class="fa fa-circle-half-stroke" /></button
				>
			</div>
			<div class="control" style="width: 100%;">
				<input
					bind:value={searchQuery}
					on:keypress={(event) => {
						if (event.key == "Enter") search();
					}}
					style="height: 4rem; width: 100%; font-size: 1.2rem;"
					class={`input has-background-${
						inDarkMode ? "dark has-text-white" : "light"
					} is-shadowless is-radiusless`}
					type="text"
					placeholder="Search for a track..."
				/>
			</div>
			<div class="control">
				<button
					class={`button is-outlined is-radiusless has-background-${
						inDarkMode ? "black" : "white"
					}`}
					style="width: 3.8rem; height: 4rem; font-size: 1.5rem;"
					on:click={search}><i class="fa fa-search" /></button
				>
			</div>
		</div>
		<SongList {songs} />
	</div>
</main>

<style>
	.sticky {
		position: -webkit-sticky; /* Safari */
		position: sticky;
		top: 0;
	}
</style>
