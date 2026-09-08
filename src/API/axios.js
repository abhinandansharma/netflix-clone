import axios from "axios";

// api.tmdb.org is an official alias for api.themoviedb.org and is reachable on networks
// where the main host is blocked (common with some ISPs). We try it first and fall back.
export const HOSTS = ["https://api.tmdb.org/3", "https://api.themoviedb.org/3"];

const instance = axios.create({
    baseURL: HOSTS[0],
    timeout: 12000,
    headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(undefined, async (error) => {
    const config = error.config || {};
    const isNetworkError = !error.response;
    if (isNetworkError && !config.__retriedHost) {
        config.__retriedHost = true;
        config.baseURL = HOSTS[1];
        return instance.request(config);
    }
    return Promise.reject(error);
});

export default instance;
