import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const signupController = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Invalid email or password");
  }

  const { email, password } = req.body;

  console.log("Creating a new user...");

  res.send({});
};

export const signinController = (req: Request, res: Response) => {};

export const signoutController = (req: Request, res: Response) => {};

export const currentUserController = (req: Request, res: Response) => {};
