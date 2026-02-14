import pool from '../../helpers/databaseConnection.js';
import { queryBuilders } from '../../helpers/postgresQueryBuilder.js';
import { publishToTopic } from '../../kafkafunctions/index.js';

const getUsers = async (res) => {
    try {
        const response = await pool.query('SELECT * FROM users');
        return response.rows;
    }
    catch (error) {
        throw error
    }
}

const updateUsers = async (req) => {
    try {
        const { query, values } = queryBuilders.generalUpdateQueryBuilder('users', req.body)
        return await pool.query(query, values);
    }
    catch (error) {
        throw error
    }
}


const createUsers = async (req) => {
    try {
        await pool.query('BEGIN')

        const returnValues = ['id', 'username', 'password', 'email', 'created_at', 'last_login']
        const { query, values } = queryBuilders.generalCreateQueryBuilder('users', req.body, returnValues)
        const dbResponse = await pool.query(query, values);

        for (const row of dbResponse.rows) {
            row["user_preference_vector"] = new Array(384).fill(0.0)
            await publishToTopic('users', row, row.id)
        }
        await pool.query('COMMIT')
        return true
    }
    catch (error) {
        await pool.query('ROLLBACK')
        throw error
    }
}

const deleteUsers = async (req) => {
    try {
        return await pool.query(`DELETE FROM users
                                WHERE id=${req.body.id}`);
    }
    catch (error) {
        throw error
    }
}

const createUserTable = async (res) => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS users 
                    (id SERIAL PRIMARY KEY,
                    username VARCHAR (50) UNIQUE NOT NULL,
                    password VARCHAR (50) NOT NULL,
                    email VARCHAR (255) UNIQUE NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
                    last_login TIMESTAMP
                    )`
        return await pool.query(query);
    } catch (error) {
        throw error
    }
}

const updateUserPreference = async (req) => {
    try {
        const message = {id: req.body.user_id, user_id: req.body.user_id, interacted_article: req.body.article_id}
        await publishToTopic('user_preference', message, req.body.user_id)
        return true
    }
    catch (error) {
        throw error
    }
}

export const userService = { getUsers, createUsers, updateUsers, deleteUsers, createUserTable, updateUserPreference
 }