<script>
  import Song from "./Song.svelte";

  export let songs = [];
</script>

<style>
  .song-list {
    display: flex;
    flex-direction: column;
    background: white;
  }
</style>

<div class="song-list">
  {#if songs.length > 0}
    <table class="table is-bordered table-bordered text-start">
      <thead>
        <tr>
          <th style="width: 9rem;">Cover Art</th>
          <th style="width: 100vw">Title</th>
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
