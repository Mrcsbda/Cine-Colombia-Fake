import axios from "axios";
import { endpoints } from "./data";

const getCinemaShows = async () => {
    try {
        const {data} = await axios.get(endpoints.urlCinemaShows) 
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getCinemaShows;