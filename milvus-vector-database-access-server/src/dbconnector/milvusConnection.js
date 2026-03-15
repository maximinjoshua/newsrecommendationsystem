import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: 'localhost:19530',
});

await client.connectPromise;

export const milvusClient = client