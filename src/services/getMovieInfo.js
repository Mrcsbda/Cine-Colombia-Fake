import axios from "axios";
import { endpointMovie } from "./data";

const getMovieInfo = async (id) => {
    try {
        const {data} = await axios.get(endpointMovie(id))
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getMovieInfo;