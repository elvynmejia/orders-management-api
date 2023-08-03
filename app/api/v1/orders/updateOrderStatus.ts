import Joi from "joi";

import { Request, Response, NextFunction } from "express";

import { findOrderById, updateOrder } from "models/order";

// add confirmed status to order
const shipmentValidatorSchema = Joi.object({
  status: Joi.string().valid("processing", "cancelled", "delivered").required(),
});

const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = shipmentValidatorSchema.validate({
    status: req.body.status,
  });

  if (error) {
    return next(error);
  }

  next();
};

const updateOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const order = await findOrderById(parseInt(id));

  if (order === null) {
    return res.status(404).json({
      errors: [],
      message: "Order Not found",
      code: "NOT_FOUND",
    });
  }

  if (order.status === "delivered") {
    return res.status(422).json({
      errors: [],
      message: `Order ${order.id} status cannot be updated. status delivered`,
      code: "UNPROCESSABLE_ENTITY",
    });
  }

  try {
    const fieldsToUpdate = {
      ...order,
      status: req.body.status,
    };

    const upodatedShipment = await updateOrder(order, fieldsToUpdate);
    return res.status(200).json({ order: upodatedShipment });
  } catch (error) {
    return next(error);
  }
};

export default [validatorMiddleware, updateOrderStatusController];
