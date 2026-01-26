import axios from 'axios'
import { articleService } from '../services/article.service.js'
import { publisherService } from '../services/publisher.service.js'

export const callPublisherForArticles = async () =>{
    try{
        const publisherRecords = await publisherService.getPublishers()
        let currentDate = new Date('2022-06-14').toJSON().slice(0, 10);
        for (const row of publisherRecords){
            const response = await axios.get(`${row.api_url}${currentDate}`)
            await articleService.createBatchArticlesForInternalApi(response, row)
        }
    }
    catch(error){
        throw error
    }
}