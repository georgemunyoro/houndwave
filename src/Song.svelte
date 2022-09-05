<script>
  import ID3Writer from "browser-id3-writer";
  import { onDestroy } from "svelte";
  import { createFFmpeg } from "@ffmpeg/ffmpeg";
  import { darkModeStore } from "./store";

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

  const download = async () => {
    plausible("download", song)
    if (downloading) return;
    downloading = true;
    const res = await fetch(__myapp.env.API_URL + "/download/" + song.id);
    const blob = await res.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `${song.artists[0].name} - ${song.name}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    downloading = false;
  };
</script>

<tr class="card song">
  <td class={`${inDarkMode && "has-background-black has-text-white-ter"}`}
    ><img class="art" src={song.album.images[0]?.url} alt="" /></td
  >
  <td class={`${inDarkMode && "has-background-black has-text-white-ter"}`}>
    <p class="has-text-weight-bold">{song.name}</p>
    <p>{song.artists[0].name}</p>
    <p>{song.album.release_date}</p>
  </td>
  <td class={`info flex-columns is-flex-direction-column ${inDarkMode && "has-background-dark"}`} style="">
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
      style="width: 2rem;"><i class="fa fa-info" /></button
    >
    <button
      class={`button is-${inDarkMode ? "dark" : "white"}`}
      on:click={() => (showEmbed = !showEmbed)}
      style="width: 2rem;"><i class="fa fa-play" /></button
    >
  </td>
</tr>
<tr class="embed-row">
  {#if showEmbed}
    <td colspan="3" style="margin-top: 10px">
      <iframe
        src={`https://open.spotify.com/embed/track/${song.id}`}
        width="100%"
        height="80"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </td>
  {/if}
</tr>

<style>
  .info {
    display: flex;
    border: none !important;
  }
</style>
