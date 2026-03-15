import { asyncHandler } from "../helpers/asyncHandler.js";
import { logger } from "../helpers/logger.js"
import { createKafkaTopic } from '../kafkafunctions/index.js';


const createTopic = asyncHandler(async (req, res) => {
    let topicConfigs = [{ topic: req.body.topicName }]
    let otherConfigs = {}
    return await createKafkaTopic(topicConfigs, otherConfigs)
})

export const kafkaController = { createTopic }