import pool from '../../helpers/databaseConnection.js';
import { queryBuilders } from '../../helpers/postgresQueryBuilder.js';
import { publishToTopic } from '../../kafkafunctions/index.js';

const getArticles = async(req) => {
    try{
        const response = await pool.query('SELECT * FROM articles');
        return response.rows;
    }
    catch(error){
        throw error
    }
}

const updateArticles = async(req) => {
    try{
        const {query, values} = queryBuilders.generalUpdateQueryBuilder('articles', req.body)
        return await pool.query(query, values);
    }
    catch(error){
        throw error
    }
}

const createArticles = async(req) => {
    try{
        const { query, values } = queryBuilders.generalCreateQueryBuilder('articles', req.body)
        return await pool.query(query, values);
    }
    catch(error){
        throw error
    }
}

const createBatchArticles = async(req) => {
    try{
        const insertDataArray = req.body.insertData
        const { query, valueArray } = queryBuilders.generalBatchCreateQueryBuilder('articles', insertDataArray)
        return await pool.query(query, valueArray);
    }
    catch(error){
        throw error
    }
}

const createBatchArticlesForInternalApi = async(callResponse, publisherRecord) => {
    try{
        await pool.query('BEGIN')
        const returnValues = ['id', 'publisher_id', 'link', 'headline', 
            'category', 'short_description', 'authors', 'date', 'created_at'
        ]
        const { query, valueArray } = queryBuilders.generalBatchCreateQueryBuilder('articles', callResponse.data, returnValues, {'publisher_id': publisherRecord.id})
        const dbResponse = await pool.query(query, valueArray);

        const cleanedApiUrl = publisherRecord.api_url.replace(/[^a-zA-Z0-9]/g, '') //remove all slashes and other characters
        for (const row of dbResponse.rows){
            await publishToTopic(cleanedApiUrl, row)
        }
        
        await pool.query('COMMIT')
        return true
    }
    catch(error){
        await pool.query('ROLLBACK')
        throw error
    }
}

const deleteArticles = async(req) => {
    try{
        const params = req.params
        return await pool.query(`DELETE FROM articles
                                WHERE id=${params.id}`);
    }
    catch(error){
        throw error
    }
}

const createArticleTable = async() => {
    try{
        const query = `CREATE TABLE IF NOT EXISTS articles 
                    (id SERIAL PRIMARY KEY,
                    publisher_id INT NOT NULL,
                    link VARCHAR (3000) NOT NULL,
                    headline VARCHAR (1000) NOT NULL,
                    category VARCHAR (50) NOT NULL,
                    short_description VARCHAR (5000) NOT NULL,
                    authors VARCHAR (1000),
                    date DATE NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
                    CONSTRAINT fk_publisher 
                        FOREIGN KEY (publisher_id)
                        REFERENCES publishers (id)
                    );`
        return await pool.query(query);
    }catch(error){
        throw error
    }
}

export const articleService = { getArticles, updateArticles, createArticles, deleteArticles, createArticleTable,
    createBatchArticles, createBatchArticlesForInternalApi
 }