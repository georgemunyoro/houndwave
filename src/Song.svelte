<script>
  import ID3Writer from "browser-id3-writer";
  import { onDestroy } from 'svelte';
  import {createFFmpeg} from "@ffmpeg/ffmpeg"

  export let song;
  let downloading = false;
  let showEmbed = false;

  const onSongChange = () => {
    showEmbed = false;
    downloading = false;
  }

  $: song, onSongChange();

  const download = async () => {
    downloading = true;

    const res = await fetch(__myapp.env.API_URL + `/download/${song.id}`);
    const data = await res.json()

    const sourceBuffer = await fetch(`${__myapp.env.CORS_PROXY}/${data.formats[1].url}`).then(r => r.arrayBuffer());

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    const outputFileName = `${song.artists[0].name} - ${song.name}.mp3`;

    ffmpeg.FS("writeFile", "input.m4a", new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength));
    await ffmpeg.run("-i", "input.m4a", outputFileName);
    
    const output = ffmpeg.FS("readFile", outputFileName);

    const coverImage = await fetch(song.album.images[0].url);
    const coverArrayBuffer = await coverImage.arrayBuffer(); 

    const writer = new ID3Writer(output.buffer);
    writer.setFrame("TIT2", song.name)
      .setFrame("TPE1", song.artists.map(({name}) => name))
      .setFrame("TPE1", song.album.artists.map(({name}) => name))
      .setFrame("TALB", song.album.name)
      .setFrame("TYER", song.album.release_date)
      .setFrame("TRCK", song.track_number)
      .setFrame("APIC", {
        type: 3,
        data: coverArrayBuffer,
        description: "Front Cover"
      });
    writer.addTag();

    const url = writer.getURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = outputFileName;
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

  .embed-row {
        
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
        <button class="button is-white" on:click={() => showEmbed = !showEmbed} style="width: 2rem;"><i
                                        class="fa fa-play" /></button>
  </td>
</tr>
<tr class="embed-row">
  {#if showEmbed}
    <td colspan="3" style="margin-top: 10px">
      <iframe src={`https://open.spotify.com/embed/track/${song.id}`} width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </td>
  {/if}
</tr>
