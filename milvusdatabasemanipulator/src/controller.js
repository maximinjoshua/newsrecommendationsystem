import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { articleCollectionSchema } from './collectionSchemas.js';
import { indexParams } from './collectionIndexes.js';

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
            index_params: indexParams
        });
        return res.status(200).send(response)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const dropMilvusCollection = async (req, res) => {
    try {
        const params = req.params
        const response = await client.drop_collection({
            collection_name: params.collection
        })
        return res.status(200).send(response)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const getRowsFromCollection = async (req, res) => {
    try {
        const params = req.params
        await client.loadCollection({
            collection_name: params.collection,
        })
        const response = await client.query({
            collection_name: params.collection
            // output_fields: ["headline"],
            // limit: 3
        })

        return res.status(200).send(response)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}
