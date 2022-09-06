<script>
	import { onMount } from "svelte";
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

		.search.dark-mode::-webkit-input-placeholder {
			/* Edge */
			color: silver;
		}

		.search.dark-mode:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: silver;
		}

		.search.dark-mode::placeholder {
			color: silver;
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
		<script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9986712438425399"
			crossorigin="anonymous"></script>
		<!-- houndwave -->
		<ins
			class="adsbygoogle"
			style="display: block"
			data-ad-client="ca-pub-9986712438425399"
			data-ad-slot="1810286132"
			data-ad-format="auto"
			data-full-width-responsive="true"
		/>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({});
		</script>

		<div
			style="padding: 10px; margin-bottom: 10px;"
			class="card has-background-dark has-text-success"
		>
			We're back!!! Didn't realize this would be so popular, so might be a few
			issues here and there, but I'm now actively working on this project as
			much as I can. Feel free to request features and file issues/bugs <a
				href="https://github.com/georgemunyoro/houndwave">on the github repo</a
			>
		</div>
		<div class="field has-addons has-desktop-shadow is-paddingless">
			<div class="control">
				<button
					class={`button is-outlined is-radiusless has-background-${
						inDarkMode ? "black has-text-light" : "white"
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
					class={`input search has-background-${
						inDarkMode ? "dark dark-mode has-text-light" : "light"
					} is-shadowless is-radiusless`}
					type="text"
					placeholder="Search for a track..."
				/>
			</div>
			<div class="control">
				<button
					class={`button is-outlined is-radiusless has-background-${
						inDarkMode ? "black has-text-light" : "white"
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
