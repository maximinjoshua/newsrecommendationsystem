import {logger} from "../helpers/logger.js"
import service from "../services/index.js"

const getArticles = async (req, res) => {
    try{
        const response = await service.articleService.getArticles()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createArticles = async (req, res) => {
    try{
        const response = await service.articleService.createArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

const createBatchArticles = async (req, res) => {
    try{
        const response = await service.articleService.createBatchArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

const updateArticles = async (req, res) => {
    try{
        const response = await service.articleService.updateArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const deleteArticles = async (req, res) => {
    try{
        const response = await service.articleService.deleteArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createArticleTable = async (req, res) => {
    try{
        const response = await service.articleService.createArticleTable()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const articleController = { getArticles, createArticles, updateArticles,
    deleteArticles, createArticleTable, createBatchArticles
 }