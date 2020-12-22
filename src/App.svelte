<script>
	import { onMount } from "svelte";
	import SongList from "./SongList.svelte";

	let searchQuery;
	let songs;

	const search = async () => {
		const res = await fetch(process.env.API_URL + "/q?query=" + searchQuery);
		const data = await res.json();
		console.log(data);
		songs = data.data.tracks.items;
	};

	onMount(async () => {});
</script>

<style>
</style>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.1/css/bulma.min.css" />
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
		class="container has-background-white p-1"
		style="padding: 0px 5px 10px 5px !important; height: 6rem;">
		<div class="field has-addons has-desktop-shadow is-paddingless">
			<div class="control" style="width: 100%;">
				<input
					bind:value={searchQuery}
					on:keypress={(event) => {
						if (event.key == 'Enter') search();
					}}
					style="height: 4rem; width: 100%; font-size: 1.2rem;"
					class="input has-background-light is-shadowless is-radiusless"
					type="text"
					placeholder="Search for a track..." />
			</div>
			<div class="control">
				<button
					class="button is-outlined is-radiusless"
					style="width: 3.8rem; height: 4rem; font-size: 1.5rem;"
					on:click={search}><i class="fa fa-search" /></button>
			</div>
		</div>
		<SongList {songs} />
	</div>
</main>
