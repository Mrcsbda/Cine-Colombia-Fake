import axios from "axios";
import { endpoints } from "./data";

export const getHistory = async () => {
    try {
        const { data } = await axios.get(endpoints.urlHistory)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const savePurchase = async (purchase) => {
    try {
        const { data } = await axios.post(endpoints.urlHistory, purchase)
        return data
    } catch (error) {
        console.log(error)
    }
}
