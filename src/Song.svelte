<script>
  import ID3Writer from "browser-id3-writer";
  import { onDestroy } from "svelte";
  import { createFFmpeg } from "@ffmpeg/ffmpeg";
  import { darkModeStore, soundStore } from "./store";

  export let song;
  let downloading = false;
  let showEmbed = false;

  const onSongChange = () => {
    showEmbed = false;
    downloading = false;
  };

  $: song, onSongChange();

  let inDarkMode;

  darkModeStore.subscribe((value) => {
    inDarkMode = value;
  });

	let paused;
	let sound;

	soundStore.subscribe(({src}) => {
		if (src !== song.preview) {
			if (sound) sound.pause()
			paused = true
		}
	})

	const playPreview = () => {
		soundStore.update(() => ({ src: song.preview, paused: false }))
		if (!sound) {
			sound = new Audio(song.preview)
			sound.onended = () => {
				paused = true
				sound = null
			}
		}
		sound.play()
		paused = false
	}

	const pausePreview = () => {
		soundStore.update(() => ({ src: song.preview, paused: true }))
		sound.pause()
		paused = true
	}

  const download = async () => {
    if (downloading) return;
    downloading = true;
    const res = await fetch(__myapp.env.API_URL + "/download/" + song.id);
    const blob = await res.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `${song.artist.name} - ${song.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    downloading = false;
  };
</script>

<tr class="card song">
  <td class={`${inDarkMode && "has-background-black has-text-white-ter"}`}
    ><img class="art" src={song.album.cover} alt="" /></td
  >
  <td class={`${inDarkMode && "has-background-black has-text-white-ter"}`}>
    <p class="has-text-weight-bold">{song.title}</p>
    <p>{song.artist.name}</p>
  </td>
	<td class={`info flex-columns is-flex-direction-column ${inDarkMode && "has-background-dark"}`} style="height: 110px;">
    <button
      class={`button is-${inDarkMode ? "dark" : "white"}`}
      style="width: 2rem;"
      on:click={download}
    >
      {#if downloading}
        <div class="loader-wrapper">
          <div class="loader is-loading" />
        </div>
      {:else}<i class="fa fa-download" />{/if}
    </button>
    <button
      class={`button is-${inDarkMode ? "dark" : "white"}`}
				on:click={() => {
					if (paused) {
						playPreview()
					} else {
						pausePreview()
					}
				}}
			style="width: 2rem;"><i class={`fa ${paused ? "fa-play" : "fa-pause"}`} /></button
    >
  </td>
</tr>
<tr class="embed-row">
  {#if showEmbed}
    <td colspan="3" style="margin-top: 10px">
			<audio data-role="audio-player" controls>
				<source src={song.preview} type="audio/mp3">
			</audio>
    </td>
  {/if}
</tr>

<style>
  .info {
    display: flex;
    border: none !important;
  }
</style>
