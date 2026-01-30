import {logger} from "../helpers/logger.js"
import service from "../services/index.js"

const getPublishers = async (req, res) => {
    try{
        const response = await service.publisherService.getPublishers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createPublishers = async (req, res) => {
    try{
        const response = await service.publisherService.createPublishers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

const updatePublishers = async (req, res) => {
    try{
        const response = await service.publisherService.updatePublishers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const deletePublishers = async (req, res) => {
    try{
        const response = await service.publisherService.deletePublishers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createPublisherTable = async (req, res) => {
    try{
        const response = await service.publisherService.createPublisherTable()
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