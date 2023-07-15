import axios from "axios";
import { endpoints } from "./data";

const getHistory = async () => {
    try {
        const {data} = await axios.get(endpoints.urlHistory) 
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getHistory;