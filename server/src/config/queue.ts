import { type ConnectionOptions, type DefaultJobOptions } from "bullmq";

function getRedisConnection(): ConnectionOptions {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    const isLocalRedis = (process.env.REDIS_HOST ?? "localhost") === "localhost";

    return {
      host: process.env.REDIS_HOST ?? "localhost",
      port: Number(process.env.REDIS_PORT ?? 6379),
      username: isLocalRedis ? undefined : process.env.REDIS_USERNAME || undefined,
      password: isLocalRedis ? undefined : process.env.REDIS_PASSWORD || undefined,
      ...(process.env.REDIS_TLS === "true" ? { tls: {} } : {}),
    };
  }

  const url = new URL(redisUrl);

  return {
    host: url.hostname,
    port: Number(url.port || 6379),
    username: url.username || undefined,
    password: url.password || undefined,
    ...(url.protocol === "rediss:" ? { tls: {} } : {}),
  };
}

export const redisConnection = getRedisConnection();

export const defaultQueueOptions: DefaultJobOptions = {
  removeOnComplete: {
    count: 20,
    age: 60 * 60,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 3000,
  },
  removeOnFail: false
};
