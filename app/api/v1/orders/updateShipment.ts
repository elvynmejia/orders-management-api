import Joi from "joi";

import { Request, Response, NextFunction } from "express";

import { findOrderById } from "../../../models/order";
import {
  findShipmentByIdOrderId,
  updateShipment,
} from "../../../models/shipment";

const shipmentValidatorSchema = Joi.object({
  tracking_company: Joi.string().required(),
  tracking_number: Joi.string().required(),
  status: Joi.string().required(),
});

const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = shipmentValidatorSchema.validate({
    tracking_company: req.body.tracking_company,
    tracking_number: req.body.tracking_number,
    status: req.body.status,
  });

  if (error) {
    return next(error);
  }

  next();
};

const updateShipmentController = async (
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

  // find shipment to update
  const shipment = await findShipmentByIdOrderId(order.id);

  if (shipment === null) {
    return res.status(404).json({
      errors: [],
      message: "Order has no associated shipment",
      code: "NOT_FOUND",
    });
  }

  try {
    const fieldsToUpdate = {
      ...shipment,
      tracking_company: req.body.tracking_company,
      tracking_number: req.body.tracking_number,
      status: req.body.status,
    };

    const upodatedShipment = await updateShipment(shipment, fieldsToUpdate);
    return res.status(200).json({ shipment: upodatedShipment });
  } catch (error) {
    return next(error);
  }
};

export default [validatorMiddleware, updateShipmentController];
