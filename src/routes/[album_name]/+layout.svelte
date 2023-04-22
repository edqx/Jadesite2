<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Masonry from "../Masonry.svelte";
    import { afterNavigate, disableScrollHandling } from "$app/navigation";
    export let data;

    onMount(() => {
        disableScrollHandling();
    });

    afterNavigate(() => {
        disableScrollHandling();
    });
</script>

<div class="w-screen h-screen flex items-center justify-center">
    <div class="flex items-center justify-center">
        <img alt="cover art" class="w-full md:h-[520px]" src="{data.album.cover_image_src}">
    </div>
</div>
<Masonry gap={4} defaultColumns={5} minColumnSize={320}>
    {#each data.album.pieces as piece, i}
        <a href="/{$page.params.album_name}/{i}">
            <img alt={""} style="transition: filter .15s;" class="w-full filter cursor-pointer hover:brightness-50" src={piece.src}/>
        </a>
    {/each}
</Masonry>
<slot/>