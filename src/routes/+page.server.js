import { redirect } from '@sveltejs/kit';
export async function load(event) {
    throw redirect(302, 'https://kestrelsnest.co.ua/');
}