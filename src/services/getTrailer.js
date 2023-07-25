import axios from "axios";
import { endpointTrailer } from "./data";

const getTrailer = async (id) => {
    try {
        const {data} = await axios.get(endpointTrailer(id))
        return data.results
    } catch (error) {
        console.log(error)
    }
}

export default getTrailer;