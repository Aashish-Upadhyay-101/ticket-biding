import express, { Express } from "express";
import "express-async-errors"
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { globalErrorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app: Express = express();
app.set('trust proxy', true);

// middlewares
app.use(json());
app.use(cookieSession({
  signed: false, 
  secure: true,
}));

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// unhandled routes
app.all("*", async () => {
  throw new NotFoundError();
})

// global error handler
app.use(globalErrorHandler);

export { app };