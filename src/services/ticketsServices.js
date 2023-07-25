import axios from "axios";
import { endpoints } from "./data";

const getTickets = async () => {
    try {
        const {data} = await axios.get(endpoints.urlTickets) 
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getTickets;