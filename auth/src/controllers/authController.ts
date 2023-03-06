import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

export const signupController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  
  // check if user already exists
  if (existingUser){
    throw new BadRequestError("User with that email already exists");
  }

  // create a new user
  const newUser = await User.create({ email, password });
  await newUser.save();

  // generate jwt 
  const userJwtToken = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    }, 
      process.env.JWT_KEY!
    )

  // store it on session object
  req.session = {
    jwt: userJwtToken
  }

  res.status(201).json({
    newUser
  })
};

export const signinController = (req: Request, res: Response) => {};

export const signoutController = (req: Request, res: Response) => {};

export const currentUserController = (req: Request, res: Response) => {};
