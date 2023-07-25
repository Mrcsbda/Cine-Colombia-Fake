import axios from "axios";
import { endpoints } from "./data";

const getCinemas = async () => {
    try {
        const {data} = await axios.get(endpoints.urlTeatros) 
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getCinemas;