import { connectRedis, deleteRedisString, getRedisString, saveRedisString, saveRedisHash, getAllRedisHash } from "./config/Redis.config.js";

let Index = { connectRedis, deleteRedisString, getRedisString, saveRedisString, saveRedisHash, getAllRedisHash }

export default Index;