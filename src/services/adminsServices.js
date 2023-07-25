import axios from "axios";
import { endpoints } from "./data";

const getAdmins = async (email, password) => {
    try {
        const {data} = await axios.get(`${endpoints.urlAdmins}?email=${email}&password=${password}`) 
        if (data.length) {
            return data[0]
        } else{
            return false
        }
        
    } catch (error) {
        console.log(error)
    }
}

export default getAdmins;