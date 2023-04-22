<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";

    export let data;

    $: piece = data.album.pieces[parseInt($page.params.piece_id)];

    let imageElement: HTMLImageElement|undefined = undefined;
    let orientation: "landscape"|"portrait" = "portrait";

    let innerHeight = 0;

    function updateOrientation() {
        if (imageElement === undefined)
            return;

        const bounds = imageElement.getBoundingClientRect();
        const aspectRatio = bounds.width / bounds.height;
        if (innerWidth * 0.8 / aspectRatio > innerHeight * 0.8) {
            orientation = "portrait";
        } else {
            orientation = "landscape";
        }
    }

    onMount(() => {
        if (!browser)
            return;

        document.body.style.overflow = "hidden";
    });

    onDestroy(() => {
        if (!browser)
            return;

        document.body.style.overflow = "auto";
    });

    function backToAlbum() {
        goto("/" + $page.params.album_name, { replaceState: true });
        history.go(-1);
    }

    $: imageElement && innerHeight && updateOrientation();
</script>

<svelte:head>
    <title>Piece from {data.album.name} | Jade</title>
</svelte:head>

<svelte:window bind:innerHeight></svelte:window>

<a
    on:click={ev => (ev.preventDefault(), backToAlbum())}
    href="/{$page.params.album_name}"
    on:keypress={ev => ev.key === "Enter" && backToAlbum()}
    class="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center flex-col z-20"
>
    <img
        alt={""}
        style:width={orientation === "landscape" ? "80%" : "auto"}
        style:height={orientation === "portrait" ? "80%" : "auto"}
        src={piece.src}
        bind:this={imageElement}
    >
    <p class="text-lg max-w-90vw sm:max-w-60vw" style="color: white;">{piece.description}</p>
</a>