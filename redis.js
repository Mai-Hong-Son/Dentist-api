import redis from "redis";
import { promisify } from "util";

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

client.on("error", function (err) {
  console.log("Error " + err);
});

export default client;

export const redisGet = promisify(client.get).bind(client);
export const redisSet = promisify(client.set).bind(client);
export const redisDelete = promisify(client.del).bind(client);
export const redisExpired = promisify(client.expire).bind(client);