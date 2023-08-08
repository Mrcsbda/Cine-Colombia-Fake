import axios from "axios";
import { URL_API_TMDB_GENRE } from "./data";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmViMjkyYmE2YjgzNjE2NDM5OGNjN2IzMjQ1YWI1OSIsInN1YiI6IjY0YWVlZGU4YzQ5MDQ4MDEzOWNmZDIzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85WxkEcVLxqeSh3eQ0pf4Y_PrCmOBDsmGjR0Eo8Od6s'
    },
};

const getMoviesGenre = async () => {
    try {
        const {data} = await axios.get(URL_API_TMDB_GENRE, options) 
        return data.genres
    } catch (error) {
        console.log(error)
    }
}

export default getMoviesGenre;