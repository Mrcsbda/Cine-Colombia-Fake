import axios from "axios";
import { endpoints } from "./data";

export const getTickets = async () => {
    try {
        const { data } = await axios.get(endpoints.urlTickets)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const editTickets = async (id, properties) => {
    try {
        const { data } = await axios.patch(`${endpoints.urlTickets}/${id}`, { ...properties })
        return data
    } catch (error) {
        return null
    }
}

export const saveTickets = async (tickets) => {
    try {
        const { data } = await axios.post(endpoints.urlTickets, { ...tickets })
        return data
    } catch (error) {
       return null
    }
}
