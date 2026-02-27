import { asyncHandler } from "../helpers/asyncHandler.js"
import { logger } from "../helpers/logger.js"
import service from "../services/index.js"


const getArticles = asyncHandler(async (req, res) => {
    return await service.articleService.getArticles()
})

const createArticles = asyncHandler(async (req, res) => {
    return await service.articleService.createArticles(req)
})

const createBatchArticles = asyncHandler(async (req, res) => {
    return await service.articleService.createBatchArticles(req)
})

const updateArticles = asyncHandler(async (req, res) => {
    return await service.articleService.updateArticles(req)
})

const deleteArticles = asyncHandler(async (req, res) => {
    return await service.articleService.deleteArticles(req)
})

const createArticleTable = asyncHandler(async (req, res) => {
    return await service.articleService.createArticleTable()
})

export const articleController = {
    getArticles, createArticles, updateArticles,
    deleteArticles, createArticleTable, createBatchArticles
}