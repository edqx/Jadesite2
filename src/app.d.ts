// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Artwork {
			src: string;
			description: string;
		}

		interface Album {
			name: string;
			description: string;
			cover_image_src: string;
			pieces: Artwork[];
		}
	}
}

export {};
