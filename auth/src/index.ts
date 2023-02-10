import express, { Express } from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { globalErrorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app: Express = express();

const port = "8080";

// middlewares
app.use(json());

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", () => {
  throw new NotFoundError();
})

// global error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
