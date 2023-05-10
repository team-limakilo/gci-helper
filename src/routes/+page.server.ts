import { fetchDataFromServer } from './common.js';

export async function load({ fetch }) {
    return fetchDataFromServer(fetch);
}
