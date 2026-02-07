import { logger } from "../helpers/logger.js"
import { createKafkaTopic } from '../kafkafunctions/index.js';


const createTopic = async (req, res) => {
    try{
        let topicConfigs = [{topic: req.body.topicName}]
        let otherConfigs = {}
        await createKafkaTopic(topicConfigs, otherConfigs)
        return res.status(200).send("Topic Created successfully")
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const kafkaController = {createTopic}