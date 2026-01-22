import pool from '../helpers/databaseConnection.js';

const getUsers = async(res) => {
    try{
        const response = await pool.query('SELECT * FROM users');
        return response.rows;
    }
    catch(error){
        throw error
    }
}

const updateUsers = async(req) => {
    try{
        const {query, values} = queryBuilders.generalUpdateQueryBuilder('users', req.body)
        return await pool.query(query, values);
    }
    catch(error){
        throw error
    }
}

const createUsers = async(req) => {
    try{
        const { query, values } = queryBuilders.generalCreateQueryBuilder('users', req.body)
        return await pool.query(query, values);
    }
    catch(error){
        throw error
    }
}

const deleteUsers = async(req) => {
    try{
        return await pool.query(`DELETE FROM users
                                WHERE id=${req.body.id}`);
    }
    catch(error){
        throw error
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
        return await pool.query(query);
    }catch(error){
        throw error
    }
}

export const userService = { getUsers, createUsers, updateUsers, deleteUsers, createUserTable }