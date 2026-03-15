import { postgresService } from "./postgresServices/index.js";

const dbType = process.env.CURRENT_DB || 'postgres';

let service;

switch (dbType) {
  case 'postgres':
    service = postgresService
    break;
  case 'milvus':
    service = undefined
    break
  default:
    service = postgresService;
}

export default service

