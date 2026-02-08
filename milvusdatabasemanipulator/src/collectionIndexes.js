import { MetricType, IndexType } from "@zilliz/milvus2-sdk-node";

export const indexParams = {
    index_name: 'article_vector_index',
    field_name: 'article_vector',
    metric_type: MetricType.IP,
    index_type: IndexType.AUTOINDEX
};