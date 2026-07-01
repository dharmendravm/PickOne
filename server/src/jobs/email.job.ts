import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendMail } from "../config/mail.js";

export const emailQueueName = "emailQueue";

interface EmailJobDataType {
  to: string;
  subject: string;
  body: string;
}

export const emailQueue = new Queue<EmailJobDataType>(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

// Worker
export const queueWorker = new Worker(
  emailQueueName,
  async (Job: Job) => {
    const data: EmailJobDataType = Job.data;
    await sendMail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnection,
  },
);
