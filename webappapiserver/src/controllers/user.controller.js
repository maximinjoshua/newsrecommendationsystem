import { asyncHandler } from "../helpers/asyncHandler.js"
import {logger} from "../helpers/logger.js"
import service from "../services/index.js"

const getUsers = asyncHandler(async (req, res) => {
    const {selectColumns, whereConditions} = req.params
    return await service.userService.getUsers({selectConditons: selectColumns, whereConditions: whereConditions})
})

const createUsers = asyncHandler(async (req, res) => {
    const {username, password, email, last_login} = req.body
    return await service.userService.createUsers({username, password, email, last_login})
})

const updateUsers = asyncHandler(async (req, res) => {
    return await service.userService.updateUsers(req)
})

const deleteUsers = asyncHandler(async (req, res) => {
    return await service.userService.deleteUsers(req)
})

const createUserTable = asyncHandler(async (req, res) => {
        return await service.userService.createUserTable()
})

const updateUserPreference = asyncHandler(async (req, res) => {
    return await service.userService.updateUserPreference(req)
})

export const userController = { getUsers, createUsers, updateUsers,
    deleteUsers, createUserTable, updateUserPreference
 }

//  logger.error(error)