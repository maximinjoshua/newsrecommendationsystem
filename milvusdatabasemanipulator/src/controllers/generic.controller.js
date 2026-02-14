import { controllerConfigs } from '../controllerConfigs.js';
import { milvusClient } from '../dbconnector/milvusConnection.js';

export const createMilvusCollection = async (req, res) => {
    try {
        const collectionName = req.body.name
        const response = await milvusClient.createCollection({
            collection_name: collectionName,
            fields: controllerConfigs[collectionName].schema,
            index_params: controllerConfigs[collectionName].index
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
        const response = await milvusClient.drop_collection({
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
        const response = await milvusClient.query({
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
