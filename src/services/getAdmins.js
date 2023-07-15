import axios from "axios";
import { endpoints } from "./data";

const getAdmins = async () => {
    try {
        const {data} = await axios.get(endpoints.urlAdmins) 
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getAdmins;