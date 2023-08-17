import { API_URL, API_KEY } from "@/util/constants";
import axios from "axios"

export const postPayment = async (payload: any) => {
    
    try {
        const {data} = await axios.post(`${API_URL}/payment-request`,payload, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
        }
    })

    return data
    
    } catch (error) {
        throw error; 
    }
    
}