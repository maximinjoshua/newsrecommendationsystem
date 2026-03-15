import { callPublisherForArticles } from "../externalapicalls/publisher.calls.js"
import { asyncHandler } from "../helpers/asyncHandler.js"
import { logger } from "../helpers/logger.js"


const testGetArticlesFromApiCron = asyncHandler(async (req, res) => {
    return await callPublisherForArticles()
})

export const testController = {testGetArticlesFromApiCron}