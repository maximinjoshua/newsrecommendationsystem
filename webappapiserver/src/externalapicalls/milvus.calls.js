import axios from 'axios'
import { ExternalAppError } from '../helpers/error.js'

const baseURL = process.env.MILVUS_SERVER_URL

export const fetchRecommendations = async (userId) =>{
    try{
        const response = await axios.get(`${baseURL}/get-recommendations/${userId}`)
        return response.data
    }
    catch(error){
        throw new ExternalAppError(error?.response?.data?.message, 502)
    }
}