import pool from '../helpers/databaseConnection.js';
import { queryBuilders } from '../helpers/queryBuilder.js';

const getPublishers = async(req) => {
    try{
        const response = await pool.query('SELECT * FROM publishers');
        return response.rows;
    }
    catch(error){
        throw error
    }
}

const updatePublishers = async(req) => {
    try{
        const {query, values} = queryBuilders.generalUpdateQueryBuilder('publishers', req.body)
        return await pool.query(query, values);
    }
    catch(error){
        throw error
    }
}

const createPublishers = async(req) => {
    try{
        const { query, values } = queryBuilders.generalCreateQueryBuilder('publishers', req.body)
        return await pool.query(query, values);
    }
    catch(error){
        throw error
    }
}

const deletePublishers = async(req) => {
    try{
        return await pool.query(`DELETE FROM publishers
                                WHERE id=${req.body.id}`);
    }
    catch(error){
        throw error
    }
}

const createPublisherTable = async() => {
    try{
        const query = `CREATE TABLE IF NOT EXISTS publishers 
                    (id SERIAL PRIMARY KEY,
                    name VARCHAR (50) UNIQUE NOT NULL,
                    api_url VARCHAR (250) NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP)
                    )`
        return await pool.query(query);
    }catch(error){
        throw error
    }
}

export const publisherService = { getPublishers, updatePublishers, createPublishers, deletePublishers, createPublisherTable }