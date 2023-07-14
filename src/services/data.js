const URL_API_JSON = "https://back-cinema.onrender.com/"
export const URL_API_TMDB = "https://api.themoviedb.org/3/movie/now_playing?api_key=1feb292ba6b836164398cc7b3245ab59&language=es-ES"

export const endpoints = {
    urlTeatros: `${URL_API_JSON}cinemas`,
    urlCinemaShows: `${URL_API_JSON}cinema_shows`,
    urlTickets: `${URL_API_JSON}tickets`,
    urlHistory: `${URL_API_JSON}history`,
    urlUsers: `${URL_API_JSON}users`,
}

export const endpointTrailer = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1feb292ba6b836164398cc7b3245ab59&language=es-ES`;
}