import pool from '../helpers/databaseConnection.js';
import {logger} from '../helpers/logger.js';
import { queryBuilders } from '../helpers/queryBuilder.js';

const getPublishers = async(res) => {
    try{
        const response = await pool.query('SELECT * FROM publishers');
        return response.rows;
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const updatePublishers = async(res, opt) => {
    try{
        const queryElement = queryBuilders.generalUpdateQueryBuilder(opt?.updateItems)
        const response = await pool.query(`UPDATE publishers 
                                            SET ${queryElement}
                                            WHERE id=${opt?.publisherId} `);
        return res.status(200).send("Publisher record updated successfully");
    }
    catch(error){
        logger.error(error)
        res.status(500).send("Internal Server Error")
    }
}

const createPublishers = async(res, opt) => {
    try{
        const queryElement = queryBuilders.generalCreateQueryBuilder(opt?.createItems)
        const response = await pool.query(`INSERT INTO publishers 
                                            ${queryElement}`);
        return res.status(200).send("Publisher record created successfully");
    }
    catch(error){
        throw new Error('Creating publisher failed')
    }
}

const deletePublishers = async(req, res) => {
    try{
        const response = await pool.query(`DELETE FROM publishers
                                            WHERE id=${opt?.publisherId}`);
        return 'Publisher record deleted successfully';
    }
    catch(error){
        throw new Error('Deleting Publisher Failed')
    }
}

const createPublisherTable = async() => {
    try{
        const query = `CREATE TABLE IF NOT EXISTS publishers 
                    (id SERIAL PRIMARY KEY,
                    name VARCHAR (50) UNIQUE NOT NULL,
                    api_url VARCHAR (250) NOT NULL,
                    created_at TIMESTAMP NOT NULL
                    )`
        await pool.query(query);
        return true
    }catch(error){
        logger.error(error)
    }
}

export const publisherService = { getPublishers, updatePublishers, createPublishers, deletePublishers, createPublisherTable }