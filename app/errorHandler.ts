import { Request, Response, Errback, NextFunction } from "express";
import Joi from "joi";

export default (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Joi.ValidationError) {
    return res.status(422).json({
      errors: err.details.map((err) => {
        return {
          message: err.message,
        };
      }),
      message: "Unprocessable Entity",
      code: "UNPROCESSABLE_ENTITY",
    });
  }
  return next(err);
};
