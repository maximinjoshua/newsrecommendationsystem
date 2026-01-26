import { Pool } from "pg";
import busboy from 'busboy'
import fs from 'fs'
import { json } from "stream/consumers";

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
});

export const fetchArticlesFromPublisher = async (req, res) => {
    try {
        const response = await pool.query(`SELECT link, headline, category, short_description, authors, date FROM articles WHERE date='${String(req.params.date)}'`)
        return res.status(200).send(response.rows)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const createArticleTable = async (req, res) => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS articles 
                    (id SERIAL PRIMARY KEY,
                    link VARCHAR (3000) NOT NULL,
                    headline VARCHAR (1000) NOT NULL,
                    category VARCHAR (50) NOT NULL,
                    short_description VARCHAR (5000) NOT NULL,
                    authors VARCHAR (1000),
                    date DATE NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP)
                    );`
        await pool.query(query);
        return res.status(200).send("Table created successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const insertUsingTheScript = async (req, res) => {
    try {
        const bb = busboy({ headers: req.headers });

        const writableStream = fs.createWriteStream('tempFiles/sqlQuery.json')
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            console.log(
                `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
                filename,
                encoding,
                mimeType
            );
            file.pipe(writableStream)
            file.on('close', async () => {
                const jsonFileData = fs.readFileSync('tempFiles/sqlQuery.json', 'utf8').toString().split("\n")
                var query = ''
                for (const jsonLine of jsonFileData) {
                    try {
                        const parsedJson = JSON.parse(jsonLine)
                        const columns = Object.keys(parsedJson)
                        const values = Object.values(parsedJson).map((item) => { const escaped = item.replace(/'/g, "''"); return `'${escaped}'` })
                        query = `INSERT INTO articles (${columns.join(',')}) VALUES (${values.join(',')});`
                        await pool.query(query)
                    }
                    catch (error) {
                        continue
                    }
                }
                return res.status(200).send("Table created successfully")
            });
        });
        req.pipe(bb)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}


