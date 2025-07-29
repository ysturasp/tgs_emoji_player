import { json } from '@sveltejs/kit';
import stickersList from '$lib/stickers-list.json';

export const prerender = true;

export async function GET() {
	return json(stickersList);
} 