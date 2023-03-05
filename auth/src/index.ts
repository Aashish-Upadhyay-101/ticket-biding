import express, { Express } from "express";
import mongoose from "mongoose";
import "express-async-errors"
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { globalErrorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app: Express = express();

const port = "3000";

// middlewares
app.use(json());

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

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/')
    console.log("connected to database!");
    
  }catch (err) {
    console.log(err);
  }
}

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

start()
