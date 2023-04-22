import collage from "./collage.json";

/** @type {import('./$types').PageLoad} */
export function GET({ params, fetch }) {
    return new Response(JSON.stringify(collage), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}