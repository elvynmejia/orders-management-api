import Joi from "joi";

import { Request, Response, NextFunction } from "express";
import { findProductById } from "../../../models/product";
import { createOrder, OrderWithoutId } from "../../../models/order";

const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    quantity: Joi.number().required(),
  });

  const { error } = schema.validate({ quantity: req.body.quantity });

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
  const { quantity } = req.body;

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

  const order: Required<OrderWithoutId> = { quantity, product_id: product.id };

  try {
    const newOrder = await createOrder(order);

    return res.status(201).json({ order: newOrder });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export default [validatorMiddleware, createProducOrderController];
