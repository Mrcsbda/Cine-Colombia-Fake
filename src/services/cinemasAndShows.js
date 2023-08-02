import axios from "axios";

export const deleteElement = (url, id) => {
    try {
        const response = axios.delete(`${url}/${id}`)
        return response
    } catch (error) {
        console.log(error);
        return error
    }
}

export const editElement = (url, newEl) => {
    try {
        const response = axios.patch(url, newEl)
        return response
    } catch (error) {
        console.log(error);
        return error
    }
}

export const postElement = (url, newEl) => {
    try {
        const response = axios.post(url, newEl)
        return response
    } catch (error) {
        console.log(error);
        return error
    }
}