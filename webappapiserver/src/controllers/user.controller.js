import {logger} from "../helpers/logger.js"
import {userService} from "../services/user.service.js"

const getUsers = async (req, res) => {
    try{
        const response = await userService.getUsers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const createUsers = async (req, res) => {
    try{
        const response = await userService.createUsers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const updateUsers = async (req, res) => {
    try{
        const response = await userService.updateUsers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const deleteUsers = async (req, res) => {
    try{
        const response = await userService.deleteUsers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const createUserTable = async (req, res) => {
    try{
        const response = await userService.createPublisherTable()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

export const userController = { getUsers, createUsers, updateUsers,
    deleteUsers, createUserTable
 }