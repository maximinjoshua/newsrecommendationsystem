import axios from 'axios'

export const fetchRecommmendedArticles = async (user_id) =>{
    try{
        const response = await axios.get(`${row.api_url}${currentDate}`)
        await service.articleService.createBatchArticlesForInternalApi(response, row)
    }
    catch(error){
        throw error
    }
}