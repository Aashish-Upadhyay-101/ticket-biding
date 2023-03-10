import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong. Please try again.",
      },
    ],
  });
};

