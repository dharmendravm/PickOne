import "dotenv/config";
import express, { type Application, type Request, type Response } from "express";

const app: Application = express();

const PORT = process.env.PORT || 5050;

app.get("/", (req: Request, res: Response) => {
  return res.send("server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT}`);
});
