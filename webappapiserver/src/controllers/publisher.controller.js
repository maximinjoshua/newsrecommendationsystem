import {logger} from "../helpers/logger.js"
import { publisherService } from "../services/publisher.service.js"

const getPublishers = async (req, res) => {
    try{
        const response = await publisherService.getPublishers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createPublishers = async (req, res) => {
    try{
        const response = await publisherService.createPublishers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

const updatePublishers = async (req, res) => {
    try{
        const response = await publisherService.updatePublishers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const deletePublishers = async (req, res) => {
    try{
        const response = await publisherService.deletePublishers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createPublisherTable = async (req, res) => {
    try{
        const response = await publisherService.createPublisherTable()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const publisherController = { getPublishers, createPublishers, updatePublishers,
    deletePublishers, createPublisherTable
 }