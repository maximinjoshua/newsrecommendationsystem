import axios from "axios"
import { get } from "./services/apiClient"

export const loadRecommendedArticles = async () => {
    const response = await get('articles/get-recommendations')
    return response.results
}