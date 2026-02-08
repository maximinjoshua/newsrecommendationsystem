import { DataType } from '@zilliz/milvus2-sdk-node';

export const articleCollectionSchema = [
    {
        name: 'id',
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
    },
    {
        name: 'publisher_id',
        data_type: DataType.Int64,
    },
    {
        name: 'link',
        data_type: DataType.VarChar,
        max_length: 3000,
    },
    {
        name: 'headline',
        data_type: DataType.VarChar,
        max_length: 1000,
    },
    {
        name: 'category',
        data_type: DataType.VarChar,
        max_length: 50,
    },
    {
        name: 'short_description',
        data_type: DataType.VarChar,
        max_length: 5000,
    },
    {
        name: 'authors',
        data_type: DataType.VarChar,
        max_length: 1000,
    },
    {
        name: 'date',
        data_type: DataType.VarChar,
        max_length: 100,
    },
    {
        name: 'created_at',
        data_type: DataType.VarChar,
        max_length: 100,
    },
    {
        name: 'article_vector',
        data_type: DataType.FloatVector,
        dim: 384,
    },
];

