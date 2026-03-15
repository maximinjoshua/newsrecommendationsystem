import { articleVectorIndexParams, userPreferenceVectorIndexParams } from "./collectionIndexes.js";
import { articleCollectionSchema, userCollectionSchema } from "./collectionSchemas.js";

export const controllerConfigs = {
    'articles':{
        schema: articleCollectionSchema,
        index: articleVectorIndexParams
    },
    'users':{
        schema: userCollectionSchema,
        index: userPreferenceVectorIndexParams
    }
} 