<script lang="ts">
    import { page } from "$app/stores";
    import Burger from "../icons/Burger.svelte";
    import X from "../icons/X.svelte";

    let burgerOpen = false;

    let innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    $: useMobileNavbar = innerWidth < 768;
    $: showNavbarItems = burgerOpen || !useMobileNavbar;

    $: $page.route && (burgerOpen = false);
</script>

<svelte:window bind:innerWidth></svelte:window>

<svelte:head>
    <title>Jade</title>
</svelte:head>

<div class="absolute top-0 text-zinc-300 py-36 hidden xl:block" style="font-family: Jost, sans-serif;">
    <div class="mx-16 flex flex-col gap-6 flex-1 items-start absolute">
        <div class="flex items-end gap-2">
            <span class="text-7xl">Jade</span><span>(she/her)</span>
        </div>
        <div class="flex flex-col">
            <span class="text-2xl">Artist</span>
            <span class="text-2xl text-zinc-500">Writer</span>
            <span class="text-2xl text-zinc-700">Game Developer</span>
            <span class="text-2xl text-zinc-800">Graphic Designer</span>
        </div>
        <div class="text-zinc-500">
            <a href="mailto:jade@midlight.studio">jade@midlight.studio</a>
        </div>
    </div>
</div>
<div
    class="fixed top-0 w-screen pb-4 flex flex-col items-center z-10 md:(h-auto pt-16 flex-row justify-center gap-16) text-lg text-white bg-zinc-900"
    class:h-screen={useMobileNavbar && burgerOpen}
>
    {#if useMobileNavbar}
        <div class="self-start relative">
            <div class="absolute left-0 top-0 w-screen flex items-center justify-center pt-8 pointer-events-none" class:hidden={!showNavbarItems}>Jade</div>
            <button class="bg-transparent border-none text-white" on:click={() => burgerOpen = !burgerOpen}>
                <div class="p-8 cursor-pointer">
                    {#if burgerOpen}
                        <X size={24}/>
                    {:else}
                        <Burger size={24}/>
                    {/if}
                </div>
            </button>
        </div>
    {/if}
    <a class:hidden={!showNavbarItems} class="underline-offset-4" class:p-8={useMobileNavbar} class:underline={$page.route.id === "/" || $page.route.id === "/[album_name]"} href="/"><div>PERSONAL</div></a>
    <a class:hidden={!showNavbarItems} class="underline-offset-4" class:p-8={useMobileNavbar} class:underline={$page.route.id === "/college"} href="/college"><div>COLLEGE</div></a>
    <a class:hidden={!showNavbarItems} class="underline-offset-4" class:p-8={useMobileNavbar} class:underline={$page.route.id === "/about"} href="/about"><div>ABOUT</div></a>
    <a class:hidden={!showNavbarItems} class="underline-offset-4" class:p-8={useMobileNavbar} class:underline={$page.route.id === "/cv"} href="/cv"><div>CV</div></a>
</div>
<div class="min-w-screen min-h-screen flex flex-col bg-zinc-900">
    <slot/>
</div>

<style global>
    html, body {
        padding: 0;
        margin: 0;
        font-family: "Sofia Sans Condensed", sans-serif;
        overflow-x: hidden;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
