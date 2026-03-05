import { fetchRecommendations } from "../externalapicalls/milvus.calls.js"
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

const getRecommendedArticles = asyncHandler(async (req, res) => {
    const userId = req.auth.userId
    return await fetchRecommendations(userId)
})

export const articleController = {
    getArticles, createArticles, updateArticles,
    deleteArticles, createArticleTable, createBatchArticles, getRecommendedArticles
}