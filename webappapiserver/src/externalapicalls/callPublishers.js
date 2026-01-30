import axios from 'axios'
import service from '../services/index.js'

export const callPublisherForArticles = async () =>{
    try{
        const publisherRecords = await service.publisherService.getPublishers()
        let currentDate = new Date('2022-06-14').toJSON().slice(0, 10);
        for (const row of publisherRecords){
            const response = await axios.get(`${row.api_url}${currentDate}`)
            await service.articleService.createBatchArticlesForInternalApi(response, row)
        }
    }
    catch(error){
        throw error
    }
}