const URL_API_JSON = "https://back-cinema.onrender.com/"
//All movies
export const URL_API_TMDB = "https://api.themoviedb.org/3/movie/now_playing?api_key=1feb292ba6b836164398cc7b3245ab59&language=es-ES"
export const URL_API_TMDB_GENRE = "https://api.themoviedb.org/3/genre/movie/list?language=es-ES"

export const endpoints = {
    urlTeatros: `${URL_API_JSON}cinemas`,
    urlCinemaShows: `${URL_API_JSON}cinema_shows`,
    urlTickets: `${URL_API_JSON}tickets`,
    urlHistory: `${URL_API_JSON}history`,
    urlAdmins: `${URL_API_JSON}admins`,
    urlCinemaAndCinemaShows: `${URL_API_JSON}cinemas?_embed=cinema_shows`
}

export const endpointTrailer = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1feb292ba6b836164398cc7b3245ab59&language=es-ES`;
}

//One movie
export const endpointMovie = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=1feb292ba6b836164398cc7b3245ab59&language=es-ES`;
}