<script>
  import Song from "./Song.svelte";
  import {darkModeStore} from "./store"

  let inDarkMode;

  darkModeStore.subscribe(value => {
    inDarkMode = value
  })

  export let songs = [];
</script>

<style>
  .song-list {
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }

  .song-list.dark-mode {
    background: black;
  }
</style>

<div class={`song-list ${inDarkMode ? "dark-mode" : ""}`}>
  {#if songs.length > 0}
    <table class={`table is-bordered table-bordered text-start ${inDarkMode && "has-background-black"}`}>
      <thead>
        <tr class={`${inDarkMode && "has-background-dark"}`}>
          <th class={`${inDarkMode && "has-text-light"}`} style="width: 9rem;">Cover</th>
          <th class={`${inDarkMode && "has-text-light"}`} style="width: 100vw">Title</th>
        </tr>
      </thead>
      <tbody>
        {#each songs as song}
          <Song {song} />
        {/each}
      </tbody>
    </table>
  {/if}
</div>
