import pieces from "./pieces.json";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    return { pieces: pieces as App.Artwork[] };
}