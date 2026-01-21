import {logger} from '../helpers/logger.js';
import pool from '../helpers/databaseConnection.js';

const getUsers = async(res) => {
    try{
        const response = await pool.query('SELECT * FROM users');
        return response.rows;
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const createUserTable = async(res) => {
    try{
        query = `CREATE TABLE IF NOT EXISTS users 
                    (user_id SERIAL PRIMARY KEY,
                    username VARCHAR (50) UNIQUE NOT NULL,
                    password VARCHAR (50) NOT NULL,
                    email VARCHAR (255) UNIQUE NOT NULL,
                    created_at TIMESTAMP NOT NULL,
                    last_login TIMESTAMP
                    )`
        await pool.query(query);
        res.status(200).send('Table created successfully')
    }catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

export const userService = { getUsers, createUserTable }