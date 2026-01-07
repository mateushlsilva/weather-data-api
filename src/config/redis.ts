import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config();

export const redis = new Redis({
    host: process.env.REDIS_HOST, 
    port: Number(process.env.REDIS_PORT)
})

redis.on("connect", () => {
  console.log("Redis conectado");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});