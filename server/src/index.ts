import "dotenv/config";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, "views", "emails", "new-user.ejs"),
    {
      name: "Dharmendra",
      appName: "PickOne",
      loginUrl: "http://localhost:3000/login",
      supportEmail: "support@pickone.com",
    },
  );

  // await sendMail("dk3672205@gmail.com", "testing smtp", html)
  await emailQueue.add(emailQueueName, {
    to: "test@gmail.com",
    subject: "Testing queue email",
    body: html,
  });
  return res.json({
    message: "email send successfully",
  });
});

// Queues
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT}`);
});
