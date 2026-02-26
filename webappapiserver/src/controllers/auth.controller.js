import { logger } from "../helpers/logger.js"
import service from "../services/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {
        const {username, password, email, last_login} = req.body
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword.length)
        const response = await service.userService.createUsers({username, password: hashedPassword, email, last_login})
        return res.status(200).send(response)
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await service.userService.getUsers({whereConditions:{username: username}});
        if (!user) return res.status(404).json({ error: 'User not found' });

        const currentUser = user[0]
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: currentUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const authController = {register, login}