import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({
      errors: err.serializeError(),
    });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong. Please try again.",
      },
    ],
  });
};
