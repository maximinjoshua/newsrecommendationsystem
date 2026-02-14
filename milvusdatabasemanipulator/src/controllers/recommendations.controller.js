import { milvusClient } from '../dbconnector/milvusConnection.js';

export const fetchRecommendations = async (req, res) => {
    try {
        const userId = req.params.user_id

        // console.log(userId, "user id")
        const userRecord = await milvusClient.get({
            collection_name:"users",
            ids: [userId]
        })

        const userPreferenceVector = userRecord["data"][0]["user_preference_vector"]

        const response = await milvusClient.search({
            collection_name: "articles",
            anns_field: "article_vector",
            data: userPreferenceVector,
            output_fields: ["short_description", "headline"],
            topk: 6,
            params: {"metric_type": "IP"}
        })

        return res.status(200).send(response)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}