import { DataType } from '@zilliz/milvus2-sdk-node';

export const articleCollectionSchema = [
    {
        name: 'id',
        data_type: DataType.Int64,
        is_primary_key: true,
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

export const userCollectionSchema = [
    {
        name: 'id',
        data_type: DataType.Int64,
        is_primary_key: true,
    },
    {
        name: 'first_name',
        data_type: DataType.VarChar,
        max_length: 255,
    },
    {
        name: 'last_name',
        data_type: DataType.VarChar,
        max_length: 255,
    },
    {
        name: 'password',
        data_type: DataType.VarChar,
        max_length: 255,
    },
    {
        name: 'email',
        data_type: DataType.VarChar,
        max_length: 255,
    },
    {
        name: 'created_at',
        data_type: DataType.VarChar,
        max_length: 100,
    },
    {
        name: 'last_login',
        data_type: DataType.VarChar,
        max_length: 100,
    },
    {
        name: 'user_preference_vector',
        data_type: DataType.FloatVector,
        dim: 384
    }
]

