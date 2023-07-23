import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { findProductById } from "../../../models/product";
import { createOrder, OrderWithoutId } from "../../../models/order";

/*
validate the lenght of zip
how about parcel information?
how about return address?
*/
const shipmentValidatorSchema = Joi.object({
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

const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, ...rest } = shipmentValidatorSchema.validate({
    quantity: req.body.quantity,
    destination_address: req.body.destination_address,
    origin_address: req.body.origin_address,
  });

  if (error) {
    return next(error);
  }

  next();
};

const createProducOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { quantity, origin_address, destination_address } = req.body;

  const product = await findProductById(parseInt(id));

  if (product === null) {
    return res.status(404).json({
      errors: [],
      message: "Product Not found",
      code: "NOT_FOUND",
    });
  }

  // check for product quantity
  if (!(quantity <= product.quantity)) {
    return res.status(422).json({
      errors: [],
      message: `Product ${product.id} is out of stock`,
      code: "UNPROCESSABLE_ENTITY",
    });
  }

  try {
    const newOrder = await createOrder({
      quantity,
      product_id: product.id,
      destination_address,
      origin_address,
      tracking_company: "USPS",
      tracking_number: "iuuid3hihd378338",
      status: "processing",
    });

    return res.status(201).json({ order: newOrder });
  } catch (error) {
    return next(error);
  }
};

export default [validatorMiddleware, createProducOrderController];
