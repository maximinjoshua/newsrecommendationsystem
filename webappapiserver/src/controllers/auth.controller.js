import { asyncHandler } from "../helpers/asyncHandler.js"
import { AuthError, NotFoundError } from "../helpers/error.js"
import { logger } from "../helpers/logger.js"
import service from "../services/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = asyncHandler(async (req, res) => {

    const { username, password, email, last_login } = req.body

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    return await service.userService.createUsers({ username, password: hashedPassword, email, last_login })
})

const login = asyncHandler(async (req, res) => {

    const { username, password } = req.body
    const user = await service.userService.getUsers({ whereConditions: { username: username } });
    if  (!user) throw new NotFoundError("User not found", 404)

    const currentUser = user[0]
    const isMatch = await bcrypt.compare(password, currentUser.password);
    if (!isMatch) throw new AuthError("Invalid Credentials", 401)

    const token = jwt.sign({ userId: currentUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token
})

export const authController = { register, login }