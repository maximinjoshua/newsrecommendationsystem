import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { articleCollectionSchema } from './collectionSchemas.js';

const client = new MilvusClient({
    address: 'localhost:19530',
});

await client.connectPromise;
console.log('Connected to Milvus!');

export const createMilvusCollection = async (req, res) => {
    try {
        const response = await client.createCollection({
            collection_name: req.body.name,
            fields: articleCollectionSchema,
        });
        return res.status(200).send(response)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}