import axios from "./axios";
import requests from "./requests";
import fallback from "./fallback.json";

const cache = new Map();

/**
 * Load one of the named TMDB lists. Returns { results, offline } where `offline` is true when
 * the API could not be reached and the bundled snapshot was used instead.
 */
export async function fetchList(key) {
    if (cache.has(key)) return cache.get(key);
    const url = requests[key];
    let value;
    try {
        const { data } = await axios.get(url);
        value = { results: data.results || [], offline: false };
    } catch (error) {
        console.warn(`TMDB unreachable for ${key}, using bundled snapshot.`, error?.message);
        value = { results: fallback[key] || [], offline: true };
    }
    cache.set(key, value);
    return value;
}
