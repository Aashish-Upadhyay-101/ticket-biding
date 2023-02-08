import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const signupController = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  console.log("Creating a new user...");

  res.send({});
};

export const signinController = (req: Request, res: Response) => {};

export const signoutController = (req: Request, res: Response) => {};

export const currentUserController = (req: Request, res: Response) => {};
