<!-- Copied from https://github.com/edqx/Jadesite/blob/008c8eddfb5708b71f4a581c8ab49d2bd1359bbe/src/routes/college/%2Bpage.svelte -->
<script lang="ts">
    import { afterNavigate, disableScrollHandling } from "$app/navigation";
    import { onMount } from "svelte";
    export let data;

    let windowInnerWidth: number;
    let windowInnerHeight: number;

    let postersContainerElem: HTMLDivElement|undefined = undefined;
    let videoWidth = 0;
    let videoHeight = 0;

    $: if (windowInnerWidth && postersContainerElem) {
        videoWidth = postersContainerElem.getBoundingClientRect().width;
        videoHeight = videoWidth / (16 / 9);
    }

    onMount(() => {
        disableScrollHandling();
    });

    afterNavigate(() => {
        disableScrollHandling();
    });
</script>

<svelte:head>
    <title>College | Jade</title>
</svelte:head>

<svelte:window bind:innerWidth={windowInnerWidth} bind:innerHeight={windowInnerHeight}></svelte:window>

<div class="w-full flex flex-col items-center pt-48" style:color="white">
    <div class="lg:ml-38 mb-42 relative flex flex-col">
        <div class="absolute -top-32" id="magazine"></div>
        <div class="flex items-center flex-col xl:items-start xl:flex-row gap-16">
            <div class="mx-8 sm:mx-0 sm:w-[30rem]">
                <span class="text-4xl">Magazine Project</span>
                <p>
                    To the right or below is some graphic design and photography work done for a project aiming to create a magazine front cover and double page spread. My designs were inspired by the photographer Liam Wong, specifically his "Harajuku Umbrellas" collection. Along with design work, there were also multiple 'story' based challenges to consider too, including themeing for the photoshoot and what kind of text to create on the cover and pages. Though one of my earlier graphic design projects, I am still quite happy with how it turned out, it passed with top marks too, which is a nice bonus. Some clickable text to that leads to the google slides presentation is attached below in order to see some of the processes made to get me to those final designs. 
                    <br><br>
                    <a class="hover:underline" href="https://docs.google.com/presentation/d/1d-APPx1bwGE_9T6ASdWYTzbLSc5M-MJvLn39odNTzKI/edit?usp=sharing">Presentation</a>
                </p>
            </div>
            <div class="flex flex-col gap-2 2xl:w-[42rem] sm:w-[28rem] w-[20rem]">
                <a href="/college/0">
                    <img class="w-full" alt="A magazine cover for the Midlight magazine" src={data.pieces[0].src}/>
                </a>
                <a href="/college/1">
                    <img class="w-full" alt="A magazine headline for the Midlight magazine with text that reads &quot;It's essentially theft&quot;" src={data.pieces[1].src}/>
                </a>
            </div>
        </div>
    </div>
    <div class="lg:ml-38 mb-38 relative flex flex-col">
        <div class="absolute -top-32" id="advertising"></div>
        <div class="flex items-center flex-col xl:items-start xl:flex-row gap-16">
            <div class="mx-8 sm:mx-0 sm:w-[30rem]">
                <span class="text-4xl">Advertising Project</span>
                <p>
                    To the right or below is graphic design, photography and videography work done for an advertisement project with the goal of creating visual media promoting 4 films/shows of different genres for Netflix. At least 3 of whch had to be unique media styles ("exclusively graphic design", "including photography", "including videography") with the fourth being up to me. As it may be obvious, I prefer my work to be more minimalist and sleek, coveying just enough information as needed, whilst still piquing interest. Looking back on this project I don't think the designs are as good as they could have been, however I am again still quite happy with them, they too passed with top marks. As with the project above, a clickable link the google slides presentation is given below in order to see some design process and research.
                    <br><br>
                    <a class="hover:underline" href="https://docs.google.com/presentation/d/1nKX_MkpOb2gtokbY5AVFBusQLxHkb23JCW3mCBbvbAE/edit#slide=id.p1">Presentation</a> 
            </div>
            <div class="flex flex-col gap-2 2xl:w-[42rem] sm:w-[28rem] w-[20rem]">
                <div class="grid gap-1 grid-cols-3" bind:this={postersContainerElem}>
                    <a href="/college/2">
                        <img class="w-full" alt="Poster for artist Oliver Tree's song &quot;Alien Boy&quot;" src={data.pieces[2].src}>
                    </a>
                    <a href="/college/3">
                        <img class="w-full" alt="Poster for video game &quot;Tomorrow Won't Come for Those Without&quot;" src={data.pieces[3].src}>
                    </a>
                    <a href="/college/4">
                        <img class="w-full" alt="Poster for UK television show &quot;Utopia&quot;" src={data.pieces[4].src}>
                    </a>
                </div>
                <div>
                    <iframe title="Trailer for OMORI" width={videoWidth} height={videoHeight} src="https://www.youtube.com/embed/ehBbexwnfn8"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>
<slot/>