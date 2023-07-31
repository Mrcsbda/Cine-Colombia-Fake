import axios from "axios";
import { endpoints } from "./data";

export const getCinemas = async () => {
    try {
        const {data} = await axios.get(endpoints.urlTeatros)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getCinemaAndCinemaShows = async () => {
    try {
        const {data} = await axios.get(endpoints.urlCinemaAndCinemaShows)
        return data
    } catch (error) {
        console.log(error)
    }
}

