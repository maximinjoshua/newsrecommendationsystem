import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: process.env.MILVUS_DATABASE_URL,
});

await client.connectPromise;

export const milvusClient = client