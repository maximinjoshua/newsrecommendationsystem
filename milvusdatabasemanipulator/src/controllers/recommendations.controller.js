import { milvusClient } from '../dbconnector/milvusConnection.js';
import { asyncHandler } from '../helpers/asynchandler.js';
import { AppError } from '../helpers/error.js';

export const fetchRecommendations = asyncHandler(async (req, res) => {
    const userId = req.params.user_id

    const userRecord = await milvusClient.get({
        collection_name: "users",
        ids: [userId]
    })

    if (!userRecord?.data) {
        throw new AppError("Invalid userRecord response", 500)
    }

    if (userRecord.data.length !== 1) {
        throw new AppError(`Expected 1 user but got ${userRecord.data.length}`, 500)
    }

    const userPreferenceVector = userRecord.data[0].user_preference_vector

    const response = await milvusClient.search({
        collection_name: "articles",
        anns_field: "article_vector",
        data: userPreferenceVector,
        output_fields: ['id', 'publisher_id', 'link', 'headline',
            'category', 'short_description', 'authors', 'date', 'created_at'
        ],
        topk: 6,
        params: { "metric_type": "IP" }
    })

    return response
})