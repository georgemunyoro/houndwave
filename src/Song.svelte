<script>
  export let song;
  let downloading = false;

  const download = async () => {
    downloading = true;
    const res = await fetch(process.env.API_URL + "/download/" + song.id);
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

<style>
  .info {
    display: flex;
    border: none !important;
  }
</style>

<tr class="card song">
  <td><img class="art" src={song.album.images[0].url} alt="" /></td>
  <td class="">
    <p class="has-text-weight-bold	">{song.name}</p>
    <p>{song.artists[0].name}</p>
    <p>{song.album.release_date}</p>
  </td>
  <td class="info flex-columns is-flex-direction-column" style="">
    <button class="button is-white" style="width: 2rem;" on:click={download}>
      {#if downloading}
        <div class="loader-wrapper">
          <div class="loader is-loading" />
        </div>
      {:else}<i class="fa fa-download" />{/if}
    </button>
    <button class="button is-white" style="width: 2rem;"><i
        class="fa fa-info" /></button>
    <button class="button is-white" style="width: 2rem;"><i
        class="fa fa-play" /></button>
  </td>
</tr>
