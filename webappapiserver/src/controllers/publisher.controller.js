import { asyncHandler } from "../helpers/asyncHandler.js"
import { logger } from "../helpers/logger.js"
import service from "../services/index.js"

const getPublishers = asyncHandler(async (req, res) => {
    return await service.publisherService.getPublishers()
})


const createPublishers = asyncHandler(async (req, res) => {
    return await service.publisherService.createPublishers(req)
})


const updatePublishers = asyncHandler(async (req, res) => {
    return await service.publisherService.updatePublishers(req)
})

const deletePublishers = asyncHandler(async (req, res) => {
    return await service.publisherService.deletePublishers(req) 
})

const createPublisherTable = asyncHandler(async (req, res) => {
    return await service.publisherService.createPublisherTable()
})

export const publisherController = {
    getPublishers, createPublishers, updatePublishers,
    deletePublishers, createPublisherTable
}