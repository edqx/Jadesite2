import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const collage = await fetch("/collage");

    return { collage: await collage.json() as App.Album[] };
}