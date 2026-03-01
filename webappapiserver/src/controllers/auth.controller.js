import { asyncHandler } from "../helpers/asyncHandler.js"
import { CustomError } from "../helpers/error.js"
import service from "../services/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = asyncHandler(async (req, res) => {

    const { firstName: first_name, lastName: last_name, password, email } = req.body

    const currentDate = new Date();
    const isoDate = currentDate.toISOString().split('T')[0];

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    return await service.userService.createUsers({ first_name, last_name, password: hashedPassword, email, last_login: isoDate })
})

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await service.userService.getUsers({ whereConditions: { email: email } });
    if  (user.length==0) throw new CustomError("User not found", 404)
    if (user.length > 1) throw new CustomError("More than one record found for user", 500)

    const currentUser = user[0]
    const isMatch = await bcrypt.compare(password, currentUser.password);
    if (!isMatch) throw new CustomError("Invalid Credentials", 401)

    const token = jwt.sign({ userId: currentUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {"token": token}
})

export const authController = { register, login }