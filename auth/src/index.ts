import express, { Express } from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app: Express = express();

const port = "8000";

// middlewares
app.use(json());

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
