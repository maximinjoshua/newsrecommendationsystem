import {logger} from "../helpers/logger.js"
import { articleService } from "../services/article.service.js"

const getArticles = async (req, res) => {
    try{
        const response = await articleService.getArticles()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createArticles = async (req, res) => {
    try{
        const response = await articleService.createArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

const updateArticles = async (req, res) => {
    try{
        const response = await articleService.updateArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const deleteArticles = async (req, res) => {
    try{
        const response = await articleService.deleteArticles(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const createArticleTable = async (req, res) => {
    try{
        const response = await articleService.createArticleTable()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const articleController = { getArticles, createArticles, updateArticles,
    deleteArticles, createArticleTable
 }