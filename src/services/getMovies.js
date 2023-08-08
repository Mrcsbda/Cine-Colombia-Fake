import axios from "axios";
import { URL_API_TMDB } from "./data";

const getMovies = async () => {
    try {
        const {data} = await axios.get(URL_API_TMDB) 
        return data.results
    } catch (error) {
        console.log(error)
    }
}

export default getMovies;