import { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { authJwtToken, authPayloadDecoder } from "../services/jwtController";
import { Password } from "../services/password";

export const signupController = async (req: Request, res: Response) => {
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
  const userJwtToken = authJwtToken({
    id: newUser.id,
    email: newUser.email,
  })

  // store it on session object
  req.session = {
    jwt: userJwtToken
  }

  res.status(201).json({
    newUser
  })
};

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser){
    throw new BadRequestError("Invalid email");
  }

  const isPasswordMatched = await Password.compare(existingUser.password, password);
  if (!isPasswordMatched) {
    throw new BadRequestError("Invalid password");
  }

  // generate jwt 
  const userJwtToken = authJwtToken({
    id: existingUser.id,
    email: existingUser.email,
  })

  req.session = {
    jwt: userJwtToken
  }

  res.status(200).json({
    existingUser
  })

};

export const currentUserController = (req: Request, res: Response) => {
  res.send({
    currentUser: req.currentUser,
  })
};

export const signoutController = (req: Request, res: Response) => {
  req.session = null;

  return res.status(200).json({})
};

