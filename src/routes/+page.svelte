<script lang="ts">
    import Masonry from "./Masonry.svelte";

    export let data;
</script>

<svelte:head>
    <title>Personal | Jade</title>
</svelte:head>

<div class="w-screen h-screen flex items-center justify-center">
    <div class="flex items-center justify-center">
        <img alt="cover art" class="w-full md:h-[520px]" src="/edith-cover.png">
    </div>
</div>
<Masonry gap={4} defaultColumns={5} minColumnSize={320}>
    {#each data.collage as album}
        <a href="/{album.name.toLowerCase().replace(/ /g, "_")}" class="relative group">
            <img alt={album.description} style="transition: filter .15s;" class="flex w-full filter cursor-pointer brightness-50 sm:brightness-100 sm:group-hover:brightness-50" src={album.cover_image_src}/>
            <div class="absolute w-full h-full left-0 top-0 items-center justify-center flex sm:hidden sm:group-hover:flex">
                <span class="text-xl" style="color: white;">{album.name}</span>
            </div>
        </a>
    {/each}
</Masonry>