import Joi from "joi";

import { Request, Response, NextFunction } from "express";

const productValidatorSchema = Joi.object({
  price: Joi.number().required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
});

const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = productValidatorSchema.validate({
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  });

  if (error) {
    return next(error);
  }

  next();
};

export default validatorMiddleware;