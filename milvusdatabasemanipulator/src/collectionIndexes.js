import { MetricType, IndexType } from "@zilliz/milvus2-sdk-node";

export const articleVectorIndexParams = {
    index_name: 'article_vector_index',
    field_name: 'article_vector',
    metric_type: MetricType.IP,
    index_type: IndexType.AUTOINDEX
};

export const userPreferenceVectorIndexParams = {
    index_name: 'user_preference_vector_index',
    field_name: 'user_preference_vector',
    metric_type: MetricType.IP,
    index_type: IndexType.AUTOINDEX
};