import express, { Express, Request, Response } from "express";

const app: Express = express();

const port = "8000";

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello, world!");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
