import {logger} from "../helpers/logger.js"
import service from "../services/index.js"

const getUsers = async (req, res) => {
    try{
        const params = req.params
        if(params?.id){
            const response = await service.UserService.getUsers({id: params.id})
            return res.status(200).send(response.rows[0])
        }
        const response = await service.UserService.getUsers()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const createUsers = async (req, res) => {
    try{
        const {username, password, email, last_login} = req.body
        const response = await service.userService.createUsers({username, password, email, last_login})
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const updateUsers = async (req, res) => {
    try{
        const response = await service.userService.updateUsers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const deleteUsers = async (req, res) => {
    try{
        const response = await service.userService.deleteUsers(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const createUserTable = async (req, res) => {
    try{
        const response = await service.userService.createUserTable()
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const updateUserPreference = async (req, res) => {
    try{
        const response = await service.userService.updateUserPreference(req)
        return res.status(200).send(response)
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

export const userController = { getUsers, createUsers, updateUsers,
    deleteUsers, createUserTable, updateUserPreference
 }