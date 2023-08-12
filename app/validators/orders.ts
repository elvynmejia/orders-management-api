import Joi from "joi";

import { Request, Response, NextFunction } from "express";

// add confirmed status to order
const statusValidatorSchema = Joi.object({
  status: Joi.string().valid("processing", "cancelled", "delivered").required(),
});

const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = statusValidatorSchema.validate({
    status: req.body.status,
  });

  if (error) {
    return next(error);
  }

  next();
};

/*
validate the length of zip
how about parcel information?
how about return address?
*/
const orderValidatorSchema = Joi.object({
  quantity: Joi.number().required(),
  destination_address: Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  origin_address: Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

const createOrderValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = orderValidatorSchema.validate({
    quantity: req.body.quantity,
    destination_address: req.body.destination_address,
    origin_address: req.body.origin_address,
  });

  if (error) {
    return next(error);
  }

  next();
};

export {
  createOrderValidatorMiddleware
};

export default validatorMiddleware;
