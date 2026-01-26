import { callPublisherForArticles } from "../externalapicalls/callPublishers.js"
import { logger } from "../helpers/logger.js"


const testGetArticlesFromApiCron = async (req, res) => {
    try{
        await callPublisherForArticles()
        return res.status(200).send("Test ran successfully")
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const testController = {testGetArticlesFromApiCron}