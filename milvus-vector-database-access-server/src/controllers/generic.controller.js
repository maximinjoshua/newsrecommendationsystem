import { controllerConfigs } from '../controllerConfigs.js';
import { milvusClient } from '../dbconnector/milvusConnection.js';
import { asyncHandler } from '../helpers/asynchandler.js';

export const createMilvusCollection = asyncHandler(async (req, res) => {
        const collectionName = req.body.name
        const response = await milvusClient.createCollection({
            collection_name: collectionName,
            fields: controllerConfigs[collectionName].schema,
            index_params: controllerConfigs[collectionName].index
        });
        return response
    })

export const dropMilvusCollection = asyncHandler(async (req, res) => {
        const params = req.params
        const response = await milvusClient.drop_collection({
            collection_name: params.collection
        })
        return response
})

export const getRowsFromCollection = asyncHandler(async (req, res) => {
        const params = req.params
        await client.loadCollection({
            collection_name: params.collection,
        })
        const response = await milvusClient.query({
            collection_name: params.collection
            // output_fields: ["headline"],
            // limit: 3
        })

        return response
})
