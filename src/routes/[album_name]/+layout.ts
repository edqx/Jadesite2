import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const collage = await fetch("/collage");
    const albums = await collage.json() as App.Album[];

    const album = albums.find((album: any) => album.name.toLowerCase().replace(/ /g, "_") === params.album_name);

    if (album === undefined)
        throw redirect(300, "/");

    return { album };
}